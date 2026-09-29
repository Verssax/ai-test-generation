import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  constructor() {
    super('/');
  }

  get searchInput() {
    return cy.get('#search-input-field-header-id');
  }

  noResultsHeading(query) {
    return cy.contains('h4', `Немає результатів для '${query}'`);
  }

  resultsPath(query) {
    return `/s/${query}`;
  }

  enterQuery(query) {
    this.searchInput.click();
    this.searchInput.should('be.visible').type(query);

    return this;
  }

  submitSearch() {
    this.searchInput.click();
    this.searchInput.type('{enter}');
    return this;
  }

  search(query) {
    return this.enterQuery(query).submitSearch();
  }
}
