import { expect, test } from '@playwright/test';
import { validateSchema } from '@utils/helpers/schema.validation';
import { bookClubTestData } from '@utils/datafactory/test-data/book.club.page';
import { programmePageSchema } from '@utils/datafactory/schemas/programme.schema';


test.describe('Validate positive test cases for Program Page API', () => {
  test.beforeEach(async ({ request }) => {
    console.log(`Creating Programme Page`);
    const createPageResponse = await request.post('/api/platform/v1/program?type=Book%20Club', {
      data: bookClubTestData,
    });
    console.log(`Sending POST request to: ${createPageResponse.url()}`);
    console.log(`Response Status: ${createPageResponse.status()}`);
    console.log('Response Body:', JSON.stringify(createPageResponse.json()));

    if (createPageResponse.status() == 409) {
      console.log(`Updating FOOTER Page`);
      const updateFooterPageResponse = await request.put('/api/platform/v1/program?type=Book%20Club', {
        data: bookClubTestData,
      });
      console.log(`Sending PUT request to: ${updateFooterPageResponse.url()}`);
      console.log(`Response Status: ${updateFooterPageResponse.status()}`);
      console.log('Response Body:', JSON.stringify(updateFooterPageResponse.json()));
    }
  });

  test('GET /api/cms/v1/footer returns correct footer data', async ({ request }) => {
    const response = await request.get(`/api/cms/v1/footer`);

    // response status validation
    expect(response.status()).toBe(200);

    const body = await response.json();

    // schema validation
    try {
      validateSchema(programmePageSchema, body);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new Error(`Schema validation failed: ${e.message}`);
      } else {
        throw new Error('Schema validation failed with an unknown error');
      }
    }
  });

  test.afterEach(async ({ request }) => {
    console.log(`Deleting FOOTER Page`);
    const deleteFooterPageResponse = await request.delete('/api/platform/v1/program?type=Book%20Club');
    console.log(`Sending PUT request to: ${deleteFooterPageResponse.url()}`);
    console.log(`Response Status: ${deleteFooterPageResponse.status()}`);
  });
});

test.describe('unauthorized request with invalid headers', () => {
  const testData = [
    { description: 'header is empty', headers: { 'X-API-KEY': '' } },
    { description: 'header is invalid', headers: { 'X-API-KEY': 'invalid_key' } },
  ];

  testData.forEach(({ description, headers }) => {
    test(`${description}`, async ({ request }) => {
      const response = await request.get(`/api/cms/v1/program?type=Book%20Club`, {
        headers: headers,
      });
      expect(response.status()).toBe(401);
    });
  });
});
