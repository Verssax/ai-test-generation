export class BasePage {
  constructor(path = '/') {
    this.path = path;
  }

  get cookieAcceptButton() {
    return cy.get('[data-test-id="customer-consents-button"]');
  }

  open() {
    cy.visit(this.path);
    return this;
  }

  acceptCookies() {
    this.cookieAcceptButton.should('be.visible').click();
    return this;
  }
}
