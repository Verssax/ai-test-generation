const { BasePage } = require('./BasePage');
const { CartPage } = require('./CartPage');

class ProductPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.productName = page.getByRole('heading', { level: 1 });
    this.addToCartButton = page.getByRole('button', { name: 'Додати до кошика' });
    this.sizeButtons = page.locator('[data-test-id="product-size"]');
    this.availableSizes = this.sizeButtons.and(page.getByRole('button', { name: /^(?!.*недоступний)/ }));
    this.selectedSize = this.sizeButtons.and(page.getByRole('button', { name: /вибрані/ }));
    this.addedToCartDialog = page.getByRole('dialog', { name: 'Додано в кошик' });
    this.showCartButton = this.addedToCartDialog.getByRole('button', { name: 'Показати кошик' });
  }

  async waitForLoaded() {
    await this.addToCartButton.waitFor({ state: 'visible' });
  }

  async hasAvailableSize() {
    return (await this.availableSizes.count()) > 0;
  }

  async getProductName() {
    const rawName = await this.productName.innerText();
    return rawName.replace(/\s+/g, ' ').trim();
  }

  async selectFirstAvailableSize() {
    await this.availableSizes.first().click();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.addedToCartDialog.waitFor({ state: 'visible' });
  }

  async goToCart() {
    await this.showCartButton.click();
    const cartPage = new CartPage(this.page);
    await cartPage.waitForLoaded();
    return cartPage;
  }
}

module.exports = { ProductPage };
