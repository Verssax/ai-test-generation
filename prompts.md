Cursor (Agent mode), TC1–2:

Follow the project rules. Using Playwright MCP, open https://modivo.ua, accept the cookie banner, and explore the search and a category page (e.g. women's shoes). Generate a Playwright JavaScript file tests/cursor/search-filter.spec.js with 2 tests: (1) searching for "кросівки" shows a list of products, (2) applying a brand filter on a category page updates the product list and the URL. Run the tests and fix them until they pass.

Claude Desktop, TC3–4:

Read ai-rules/playwright-mcp-rules.md and follow it strictly. Using Playwright MCP, open https://modivo.ua, accept cookies, open any product from a category listing, select an available size and add it to the cart, then explore the cart page. Generate a Playwright JavaScript file tests/claude/cart.spec.js with 2 tests: (1) after selecting a size and adding to cart, the cart contains the product, (2) removing the product from the cart shows an empty cart. Do not proceed to checkout. Save the file with the filesystem tool.

Claude Desktop, Cypress TC5–6. Cypress has no MCP, so let Claude look at the real site with Playwright MCP first so it gets real selectors:

Using Playwright MCP only to explore (don't write Playwright code), open https://modivo.ua, accept cookies, and inspect the login form and the search. Then generate a Cypress JavaScript test file cypress/e2e/login-search.cy.js (baseUrl is already configured) with 2 tests: (1) logging in with test.invalid@example.com / WrongPass123 shows an error message, (2) searching for "qwxzqwxz" shows a "nothing found" message. Handle the cookie banner in beforeEach, use stable selectors, no cy.wait with fixed times. write the file through the desktop app's file transfer as you did before because Filesystem MCP doesn't work

---------------------------
Refactor with prompts to add POM
--------------------------
Cursor (TC1–2):

Follow the project rules, especially the Page Object Model section. Refactor tests/cursor/search-filter.spec.js to POM: create BasePage (cookie handling, navigation), HomePage, SearchResultsPage and CategoryPage in pages/, move all selectors and actions into them, keep assertions in the test. Use Playwright MCP to re-verify selectors if needed. Run the tests and fix until they pass.

Claude (TC3–4):

Read ai-rules/playwright-mcp-rules.md, especially the POM section. Refactor tests/claude/cart.spec.js to POM: reuse pages/BasePage.js, and create ProductPage and CartPage in pages/. Move all selectors and actions out of the test file. Give me the full content of every changed file.

Claude (Cypress TC5–6):

Refactor cypress/e2e/login-search.cy.js to Page Object Model: create cypress/pages/LoginPage.js and cypress/pages/SearchPage.js as classes with methods like open(), login(email, password), search(query), and getter methods returning cy elements. The spec file must contain no selectors, only page object calls and assertions.