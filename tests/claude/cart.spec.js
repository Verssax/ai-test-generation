// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/HomePage.js';
import { CategoryPage } from '../../pages/CategoryPage.js';
import { testData } from '../data/testData.js';

const { cart: cartData } = testData;

test.describe('Cart', () => {
  /** @type {import('../../pages/ProductPage.js').ProductPage} */
  let productPage;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.open();
    await expect(homePage.cookieAcceptButton).toBeHidden();

    productPage = await new CategoryPage(page).openFirstProductWithAvailableSize(
      cartData.categoryPath,
      cartData.maxProductsToTry,
    );
    await expect(page).toHaveURL(cartData.productUrl);
  });

  test('TC1: should contain the product when a size is selected and the product is added to cart', async ({ page }) => {
    const productName = await productPage.getProductName();

    await productPage.selectFirstAvailableSize();
    await expect(page).toHaveURL(cartData.selectedSizeUrl);
    await expect(productPage.selectedSize).toBeVisible();

    await productPage.addToCart();
    await expect(productPage.addedToCartDialog).toBeVisible();

    const cartPage = await productPage.goToCart();
    await expect(page).toHaveURL(cartData.cartUrl);
    await expect(cartPage.cartHeading).toContainText(cartData.singleItemCountText);

    const cartItem = cartPage.cartItemByName(productName);
    await expect(cartItem).toHaveCount(1);
    await expect(cartItem).toContainText(cartData.sizeLabel);
    await expect(cartItem).toContainText(cartData.singleQuantityText);
    await expect(cartPage.removeButtonOf(cartItem)).toBeVisible();
  });

  test('TC2: should show an empty cart when the product is removed from cart', async ({ page }) => {
    await productPage.selectFirstAvailableSize();
    await productPage.addToCart();

    const cartPage = await productPage.goToCart();
    await expect(page).toHaveURL(cartData.cartUrl);
    await expect(cartPage.cartHeading).toContainText(cartData.singleItemCountText);

    await cartPage.removeFirstItem();

    await expect(cartPage.emptyCartHeading).toBeVisible();
    await expect(cartPage.continueShoppingLink).toBeVisible();
    await expect(cartPage.removeItemButtons).toHaveCount(0);
  });
});
