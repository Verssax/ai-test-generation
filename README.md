# AI Test Generation – modivo.ua

## Summary

This project demonstrates AI-assisted end-to-end test generation for the online store [modivo.ua](https://modivo.ua) using three solutions:

| Solution | AI tool | Framework | Test cases | Location |
|----------|---------|-----------|------------|----------|
| 1 | Cursor IDE + Playwright MCP | Playwright (JS) | TC1, TC2 | `tests/cursor/` |
| 2 | Claude Desktop + Playwright MCP | Playwright (JS) | TC3, TC4 | `tests/claude/` |
| 3 | Claude Desktop | Cypress (JS) + Cypress Cloud | TC5, TC6 | `cypress/e2e/` |

All tests follow the **Page Object Model (POM)**. The AI agent rules for the Playwright MCP solutions are in `.cursor/rules/playwright-mcp.mdc` (Cursor) and `ai-rules/playwright-mcp-rules.md` (Claude). Every prompt used for generating and fixing the tests is saved in `prompts.md`.

### Test cases

| ID | Title | Solution |
|----|-------|----------|
| TC1 | Search for "кросівки" shows a product list | Cursor + Playwright |
| TC2 | Applying a brand filter on a category page updates the results | Cursor + Playwright |
| TC3 | Adding a product with a selected size to the cart | Claude + Playwright |
| TC4 | Removing a product from the cart leaves the cart empty | Claude + Playwright |
| TC5 | Login with invalid credentials shows an error message | Claude + Cypress |
| TC6 | Search with a nonsense query shows a "no results" message | Claude + Cypress |

Full test case descriptions (preconditions, steps, expected results) are in `docs/TEST_CASES.md`.

### Project structure

```
ai-test-generation/
├── .cursor/
│   ├── mcp.json                  # Playwright MCP config for Cursor
│   └── rules/playwright-mcp.mdc  # AI agent rules (Cursor)
├── ai-rules/
│   └── playwright-mcp-rules.md   # AI agent rules (Claude Desktop)
├── pages/                        # Playwright page objects
├── tests/
│   ├── cursor/                   # Playwright tests generated with Cursor
│   ├── claude/                   # Playwright tests generated with Claude
│   └── data/                     # Test data
├── cypress/
│   ├── e2e/                      # Cypress specs
│   ├── pages/                    # Cypress page objects
│   └── support/                  # Cypress support files
├── prompts.md                    # Prompts used for test generation
├── playwright.config.js
├── cypress.config.js
└── .env.example                  # Environment variable template
```

## Requirements

- [Node.js](https://nodejs.org/) 20 LTS or newer (includes npm)
- [Git](https://git-scm.com/)
- Internet access (tests run against the live site https://modivo.ua)
- For AI generation (optional, not needed to run the tests):
  - [Cursor IDE](https://cursor.com/) with Playwright MCP (`.cursor/mcp.json`)
  - [Claude Desktop](https://claude.ai/download) with Playwright MCP configured in `claude_desktop_config.json`
- For Cypress Cloud recording: a [Cypress Cloud](https://cloud.cypress.io/) account and project record key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Verssax/ai-test-generation
   cd ai-test-generation
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```
4. Create a `.env` file from the template and add your Cypress Cloud record key (only needed for recording):
   ```bash
   cp .env.example .env
   ```
   ```
   CYPRESS_RECORD_KEY=your-record-key
   ```

## How to run tests

### Playwright

```bash
npx playwright test                  # all Playwright tests
npx playwright test tests/cursor     # Solution 1 (Cursor)
npx playwright test tests/claude     # Solution 2 (Claude)
npx playwright test --headed         # run with a visible browser
npx playwright test --ui             # interactive UI mode
```

### Cypress

```bash
npx cypress run                      # headless run
npx cypress open                     # interactive Test Runner
```

Run with recording to Cypress Cloud (the record key is read from the `CYPRESS_RECORD_KEY` environment variable):

PowerShell:
```powershell
$env:CYPRESS_RECORD_KEY="your-record-key"; npx cypress run --record
```
Bash:
```bash
export CYPRESS_RECORD_KEY=your-record-key && npx cypress run --record
```

## How to generate reports

### Playwright HTML report

An HTML report is generated automatically in `playwright-report/` after every run. Open it with:

```bash
npx playwright show-report
```

Failed tests include screenshots and traces in `test-results/`. To open a trace:

```bash
npx playwright show-trace test-results/<test-folder>/trace.zip
```

### Cypress reports

- **Cypress Cloud:** runs started with `--record` appear in the project dashboard at https://cloud.cypress.io with results, screenshots, videos and history.
- **Local:** the console shows a summary after `npx cypress run`; screenshots of failed tests are saved to `cypress/screenshots/`.

> Generated report folders (`playwright-report/`, `test-results/`, `cypress/screenshots/`, `cypress/videos/`) are excluded from the repository via `.gitignore`.
