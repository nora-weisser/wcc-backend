import Ajv, { ValidateFunction } from 'ajv';

import { ErrorObject } from 'ajv';

interface DataValidateFunction {
  (data: any, dataCtx?: any): boolean;
  errors?: Partial<ErrorObject>[]; // must be undefined or array, never null
}

const ajv = new Ajv({ allErrors: true, verbose: true, strict: false });

ajv.addKeyword({
  keyword: 'x-case-insensitive',
  type: 'string', // the data being validated is a string enum
  modifying: false,

  // compile receives the extension schema, which is an object here
  compile(schema: any, parentSchema: any): DataValidateFunction {
    // schema is like { "x-case-insensitive": "true" } or undefined
    let caseInsensitive = false;

    if (schema && typeof schema === 'object' && typeof schema['x-case-insensitive'] === 'string') {
      // convert "true"/"false" string to boolean
      caseInsensitive = schema['x-case-insensitive'].toLowerCase() === 'true';
    }

    const enumValues: string[] = parentSchema.enum || [];

    const validate: DataValidateFunction = (data: any) => {
      if (typeof data !== 'string') return false;

      if (!caseInsensitive) {
        return enumValues.includes(data);
      }

      return enumValues.some(v => v.toLowerCase() === data.toLowerCase());
    };

    validate.errors = undefined; // AJV expects errors to be undefined or array

    return validate;
  },

  metaSchema: {
    type: 'object', // your extension value is an object, not boolean
    properties: {
      'x-case-insensitive': { type: 'string' },
    },
    required: ['x-case-insensitive'],
    additionalProperties: false,
  },
});

/**
 * Represents a formatted error object with detailed validation information.
 */
interface FormattedError {
  message: string;
  path: string;
  value: unknown;
  keyword: string;
  params: unknown;
}

/**
 * Validates the provided data against a specified JSON schema using AJV.
 *
 * @param schema - The JSON schema to validate the data against.
 * @param data - The data to be validated.
 * @throws {Error} Throws an error if validation fails, including detailed error info.
 */
export function validateSchema<T>(schema: object, data: T): void {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid && validate.errors) {
    const formattedErrors = formatErrors(validate.errors);
    console.log('Detailed Errors:', JSON.stringify(formattedErrors, null, 2));
    throw new Error(`Validation failed with errors: ${JSON.stringify(formattedErrors, null, 2)}`);
  }

  console.log('Schema validated successfully!');
}

/**
 * Formats AJV validation errors into a more readable structure.
 *
 * @param errors - Raw AJV errors.
 * @returns An array of formatted error objects.
 */
function formatErrors(errors: ErrorObject[] | null): FormattedError[] {
  if (!errors) return [];

  return errors.map((err) => ({
    message: err.message || 'Unknown error',
    path: err.instancePath || 'N/A',
    value: (err as any).data ?? 'N/A', // AJV 8+ includes `data` via `verbose: true`
    keyword: err.keyword || 'N/A',
    params: err.params || {},
  }));
}
