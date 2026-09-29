// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { CategoryPage } from '../../pages/CategoryPage.js';
import { testData } from '../data/testData.js';

test.describe('Search and category filters', () => {
  test.describe.configure({ timeout: 60_000 });

  /** @type {import('../../pages/HomePage.js').HomePage} */
  let homePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
    await expect(homePage.cookieAcceptButton).toBeHidden();
  });

  test('TC1: should show a list of products when searching for кросівки', async ({ page }) => {
    const results = await homePage.search(testData.searchQuery);

    await expect(page).toHaveURL(testData.searchResultsUrl);
    await expect(results.heading).toContainText(testData.searchResultsHeading);
    await expect(results.productCount).toBeVisible();
    await expect(results.productItems.first()).toBeVisible();
    await expect(results.firstProductLink()).toBeVisible();
  });

  test('TC2: should update the product list and the URL when applying a brand filter', async ({ page }) => {
    const category = new CategoryPage(page);
    await category.open(testData.womensShoesPath);

    await expect(category.productCount).toBeVisible();
    const countBefore = await category.productCountValue();
    await expect(category.firstProductLink()).toBeVisible();
    const hrefBefore = await category.firstProductHref();

    const brandName = await category.applyFirstBrandFilter();

    await expect(page).toHaveURL(testData.brandFilterUrl);
    await expect(category.heading).toContainText(brandName, { ignoreCase: true });
    await expect.poll(() => category.productCountValue()).not.toBe(countBefore);
    await expect(category.firstProductLink()).not.toHaveAttribute('href', hrefBefore ?? '');
    await expect(category.productItems.first()).toBeVisible();
  });
});
