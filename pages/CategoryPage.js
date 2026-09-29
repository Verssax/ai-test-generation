const { BasePage } = require('./BasePage');
const { ProductPage } = require('./ProductPage');

class CategoryPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.brandFilterButton = page.getByRole('button', { name: 'Виробник', exact: true });
    this.brandDialog = page.getByRole('dialog', { name: 'Виробник' });
    this.firstBrandOption = this.brandDialog.getByRole('listitem').first();
    this.applyFiltersButton = this.brandDialog.getByRole('button', { name: 'Показати' });
  }

  /**
   * @param {string} path
   */
  async open(path) {
    await this.goto(path);
  }

  async applyFirstBrandFilter() {
    await this.brandFilterButton.click();
    await this.firstBrandOption.waitFor({ state: 'visible' });

    const brandName = (await this.firstBrandOption.innerText()).split('\n')[0].trim();
    await this.firstBrandOption.click();
    await this.applyFiltersButton.click();

    return brandName;
  }

  /**
   * @param {number} index
   */
  async openProductAt(index) {
    await this.productItems.nth(index).getByRole('link').first().click();
    const productPage = new ProductPage(this.page);
    await productPage.waitForLoaded();
    return productPage;
  }

  /**
   * Opens products of the category one by one (starting with the first)
   * and returns the first one that has at least one size in stock.
   * @param {string} path
   * @param {number} maxProductsToTry
   */
  async openFirstProductWithAvailableSize(path, maxProductsToTry) {
    for (let index = 0; index < maxProductsToTry; index++) {
      await this.open(path);
      const productPage = await this.openProductAt(index);
      if (await productPage.hasAvailableSize()) {
        return productPage;
      }
    }
    throw new Error(`No product with an available size among the first ${maxProductsToTry} in ${path}`);
  }
}

module.exports = { CategoryPage };
