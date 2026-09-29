const { BasePage } = require('./BasePage');

class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.cartSection = page
      .getByRole('region')
      .filter({ has: page.getByRole('heading', { level: 1, name: /Кошик/ }) });
    this.cartHeading = this.cartSection.getByRole('heading', { level: 1 });
    this.cartItems = this.cartSection.getByRole('listitem');
    this.removeItemButtons = page.getByRole('button', { name: /Видалити з кошика/ });
    this.emptyCartHeading = page.getByRole('heading', { name: 'Твій кошик порожній' });
    this.continueShoppingLink = page.getByRole('link', { name: 'Продовжити покупки' });
  }

  async waitForLoaded() {
    await this.cartHeading.waitFor({ state: 'visible' });
  }

  /**
   * @param {string} productName
   */
  cartItemByName(productName) {
    return this.cartItems.filter({ has: this.page.getByRole('link', { name: productName }) });
  }

  /**
   * @param {import('@playwright/test').Locator} cartItem
   */
  removeButtonOf(cartItem) {
    return cartItem.getByRole('button', { name: /Видалити з кошика/ });
  }

  async removeFirstItem() {
    await this.removeItemButtons.first().click();
  }
}

module.exports = { CartPage };
