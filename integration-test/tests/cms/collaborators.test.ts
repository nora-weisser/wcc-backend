import { expect } from '@playwright/test';
import {test} from 'utils/fixtures/fixtures'
import { PATHS } from '@utils/datafactory/paths.data';
import { validateSchema } from '@utils/helpers/schema.validation';
import { createOrUpdatePage } from '@utils/helpers/preconditions';
import { collaboratorsPageData } from '@utils/datafactory/test-data/collaborators.page.data';
import { SCHEMAS } from '@utils/datafactory/schemas.data';


test.describe('Validate positive test cases for COLLABORATORS Page API', () => {
  test.beforeEach(async ({ request }) => {
    const url = `${PATHS.PLATFORM_PAGE}?pageType=COLLABORATOR`;
    await createOrUpdatePage(request, 'COLLABORATORS Page', url, collaboratorsPageData);
  });

  test.fixme('GET /api/cms/v1/collaborators returns correct data', async ({ request, openApiSchemas }) => {
    const response = await request.get(PATHS.COLLABORATORS);
    expect(response.status()).toBe(200);
    const body = await response.json();
    // schema validation
    try {
      validateSchema(openApiSchemas[SCHEMAS.COLLABORATORS_], body);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Schema validation failed: ${e.message}`);
      } else {
        throw new Error('Schema validation failed with an unknown error');
      }
    }
  });
});

test.describe('unauthorized request with invalid headers', () => {
  const testData = [
    { description: 'header is empty', headers: { 'X-API-KEY': '' } },
    { description: 'header is invalid', headers: { 'X-API-KEY': 'invalid_key' } },
  ];

  testData.forEach(({ description, headers }) => {
    test(`${description}`, async ({ request }) => {
      const response = await request.get(PATHS.COLLABORATORS, {
        headers: headers,
      });
      expect(response.status()).toBe(401);
    });
  });
});
