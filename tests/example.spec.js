
// @ts-check
const { test, expect } = require('@playwright/test');

const LOCALHOST_URL = 'http://localhost:5173/'
const API_PREFIX = 'https://pixabay.com/api/'

test('has title', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const image = await page.getByRole('img')
  const imageSrc = await image.getAttribute('src')

  await expect(imageSrc?.startsWith(API_PREFIX)).toBeTruthy()
});

