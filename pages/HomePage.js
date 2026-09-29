const { BasePage } = require('./BasePage');

class HomePage extends BasePage {
  async open() {
    await this.goto('/');
    await this.acceptCookies();
  }
}

module.exports = { HomePage };
