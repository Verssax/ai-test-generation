import { BasePage } from '../pages/BasePage';
import { LoginPage } from '../pages/LoginPage';
import { SearchPage } from '../pages/SearchPage';

const INVALID_USER = {
  email: 'test.invalid@example.com',
  password: 'WrongPass123',
};
const NONSENSE_QUERY = 'qwxzqwxz';

describe('Login and search', () => {
  const homePage = new BasePage();
  const loginPage = new LoginPage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    cy.on('uncaught:exception', () => false);

    homePage.open().acceptCookies();
    homePage.cookieAcceptButton.should('not.exist');
  });

  it('should show an error message when logging in with invalid credentials', () => {
    loginPage.open();
    loginPage.login(INVALID_USER.email, INVALID_USER.password);

    loginPage.errorMessage.should('be.visible');
    cy.location('pathname').should('eq', loginPage.path);
    loginPage.emailInput.should('have.value', INVALID_USER.email);
  });

  it('should show a "nothing found" message when searching for a nonsense phrase', () => {
    searchPage.enterQuery(NONSENSE_QUERY);
    searchPage.submitSearch();

    cy.location('pathname').should('eq', searchPage.resultsPath(NONSENSE_QUERY));
    searchPage.noResultsHeading(NONSENSE_QUERY).should('be.visible');
  });
});
