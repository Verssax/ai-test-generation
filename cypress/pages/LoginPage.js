import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor() {
    super('/login');
  }

  get emailInput() {
    return cy.get('#email');
  }

  get passwordInput() {
    return cy.get('#password');
  }

  get submitButton() {
    return cy.get('[data-test-id="log-in-button"]');
  }

  get errorMessage() {
    return cy.contains('Неправильний e-mail або пароль');
  }

  login(email, password) {
    this.emailInput.should('be.visible');
    this.emailInput.click({ force: true }).type(email);
    this.passwordInput.should('be.visible')
    this.passwordInput.click({ force: true }).type(password, { log: false });
    this.submitButton.click();
    return this;
  }
}
