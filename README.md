# ServeRest — Automated Tests with Cypress

End-to-end and API test automation project for the [ServeRest](https://serverest.dev/) application, built with Cypress and JavaScript.

## Application under test

| Layer | URL |
|-------|-----|
| Frontend | https://front.serverest.dev |
| API (Swagger) | https://serverest.dev |

## Tech stack

- [Cypress](https://www.cypress.io/) v13
- [cypress-mochawesome-reporter](https://github.com/LironEr/cypress-mochawesome-reporter) — HTML reports
- GitHub Actions — CI/CD pipeline

## Architecture

The project applies the following design patterns:

| Pattern | Usage |
|---------|-------|
| **Page Object Model (POM)** | Encapsulates selectors and actions per screen in `cypress/pages/` |
| **Service Object Pattern** | Abstracts API HTTP calls in `cypress/services/` |
| **Fixtures** | Centralizes test data and templates in `cypress/fixtures/` |
| **Custom Commands** | Reuses common operations (`cy.createUser`, `cy.loginUI`, etc.) |
| **cy.session** | Reuses authenticated session across tests, avoiding repeated UI logins |

```
cypress/
├── e2e/
│   ├── frontend/           # E2E tests (UI)
│   │   ├── login.cy.js
│   │   ├── registration.cy.js
│   │   ├── home.cy.js
│   │   └── products.cy.js
│   └── api/                # API tests
│       ├── login.cy.js
│       ├── users.cy.js
│       └── products.cy.js
├── fixtures/               # Test data and templates
│   ├── users.json
│   └── products.json
├── pages/                  # Page Objects (POM)
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── HomePage.js
│   └── ProductsPage.js
├── services/               # Service Objects (API)
│   ├── AuthService.js
│   ├── UserService.js
│   └── ProductService.js
└── support/
    ├── commands.js         # Reusable custom commands
    └── e2e.js
```

## Test Scenarios

### Frontend E2E

| File | Suite | Test cases |
|------|-------|------------|
| `login.cy.js` | Login — User Authentication | ✅ Valid credentials / ❌ Wrong password / ❌ Unregistered email |
| `registration.cy.js` | Registration — New User Registration | ✅ Navigate to registration / ✅ Successful registration / ❌ Existing email |
| `home.cy.js` | Home — Authenticated user actions | ✅ Logout and redirect to login |
| `products.cy.js` | Products — Catalog View & Access Control | ✅ Product list / ✅ Admin button visible / ❌ Admin button hidden for non-admin |

### API

| File | Suite | Test cases |
|------|-------|------------|
| `login.cy.js` | API Login — Token generation (POST /login) | ✅ Valid credentials return token / ❌ Wrong password (401) / ❌ Unregistered email (401) |
| `users.cy.js` | API Users — User management (/usuarios) | ✅ Create user (201) / ❌ Duplicate email (400) / ✅ Fetch by ID (200) / ❌ Missing required fields (400) |
| `products.cy.js` | API Products — Product management (/produtos) | ✅ Create with token (201) / ✅ List products (200) / ❌ Create without token (401) |

## Installation and usage

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run all tests (headless)

```bash
npm test
```

### Run frontend tests only

```bash
npm run cy:run:frontend
```

### Run API tests only

```bash
npm run cy:run:api
```

### Open interactive mode

```bash
npm run cy:open
```

## CI/CD

Tests run automatically via **GitHub Actions** on every `push` or `pull request` to `main`/`master`. API and Frontend jobs run in parallel.

HTML reports (Mochawesome) are published as **artifacts** in the repository's Actions tab.
