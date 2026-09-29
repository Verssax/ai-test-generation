class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.cookieAcceptButton = page.getByRole('button', { name: 'Згода' });
    this.searchInput = page.getByRole('searchbox', { name: 'Пошук товарів' });
    this.heading = page.getByRole('heading', { level: 1 });
    this.productCount = page.getByText(/Продукти:\s*\d+/);
    this.productItems = page.locator('[data-test-id="product-list-item"]');
  }

  /**
   * @param {string} path
   */
  async goto(path) {
    await this.page.goto(path);
  }

  async acceptCookies() {
    await this.cookieAcceptButton.click();
  }

  /**
   * @param {string} query
   */
  async search(query) {
    await this.searchInput.click();
    await this.searchInput.fill(query);
    await this.searchInput.press('Enter');

    const { SearchResultsPage } = require('./SearchResultsPage');
    return new SearchResultsPage(this.page);
  }

  firstProductLink() {
    return this.productItems.first().locator('a[href*="/p/"]');
  }

  async productCountValue() {
    const text = await this.productCount.innerText();
    const count = text.match(/Продукти:\s*(\d+)/);
    if (!count) {
      throw new Error('Product count was not found');
    }
    return count[1];
  }

  async firstProductHref() {
    return this.firstProductLink().getAttribute('href');
  }
}

module.exports = { BasePage };
