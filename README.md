Automated Testing Suite for Sauce Demo website using Playwright with TypeScript and Page Object Model concept.

Quick Start (Install):

- npm init playwright@latest

Dependencies:

- npm install

Install Playwright Browsers:

- npx playwright install

Running the Tests in the Test Suite:

# Run all tests

npm test

# Run tests with UI mode

npm run test:ui

# Run specific test file

npx playwright test tests/specs/checkout-overview.spec.ts

# Run tests in headed mode (visible browser)

npm run test:headed

# Generate and open HTML report

npm run report

# Debug tests

npm run test:debug

Project Structure:

SwagLabs/
├─ .github/
│ └─ workflows/
│ └─ playwright.yml
├─ playwright-report/
│ ├─ data/
│ │ └─ d8da542ef25dc55b48104616ca5e0bca4b70e848.webm
│ └─ index.html
├─ test-results/
│ ├─ specs-checkout--CheckoutProcess-Vajla--chromium/
│ │ └─ video.webm
│ ├─ specs-checkout-overview-checkout-form-left-empty-error-chromium/
│ │ └─ video.webm
│ ├─ specs-checkout-overview-CheckoutProcess-Vajla--chromium/
│ │ └─ video.webm
│ ├─ specs-inventory-add-all-of-the-inventory-items-chromium/
│ │ └─ video.webm
│ └─ specs-inventory-verify-buttons-change-after-adding-to-cart-chromium/
│ └─ video.webm
├─ tests/
│ ├─ data/
│ │ ├─ user-info.ts
│ │ └─ users.ts
│ ├─ pages/
│ │ ├─ constants/
│ │ │ └─ app.constants.ts
│ │ ├─ base-page.ts
│ │ ├─ cart-page.ts
│ │ ├─ checkout-overview.ts
│ │ ├─ checkout-page-step-two.ts
│ │ ├─ checkout-page-your-info.ts
│ │ ├─ inventory-page.ts
│ │ └─ login-page.ts
│ ├─ specs/
│ │ ├─ cart.spec.ts
│ │ ├─ checkout-.spec.ts
│ │ ├─ checkout-overview.spec.ts
│ │ ├─ inventory.spec.ts
│ │ └─ login.spec.ts
│ └─ example.spec.ts
├─ .gitignore
├─ before-cart.png
├─ debug-page.png
├─ NOTES.md
├─ package-lock.json
├─ package.json
├─ playwright.config.ts
├─ README.md
├─ results.xml
└─ test-results.json

Authentication:

- Login with valid credenitals
- Login with invalid credentials

Inventory:

- Browse products
- View product details
- Add / Remove items from cart
- Sort products (A-Z, Z-A, price high-low, low-high)

Shopping Cart:

- Add single item to cart
- Add multiple items to cart
- Remove items from cart
- Verify Cart Counts and Totals

Checkout Process:

- Complete checkout with valid information
- Multi-user checkout testing (Adnan, Helen, Roger)
- Form validation (empty fields, invalid data)
- Order Confirmation

Environment Variables:

- Create .env file for sensitive data:

- env (file)

BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
Playwright Configuration
See playwright.config.ts for:

Browser settings (Chromium, Firefox, WebKit)

Timeout configurations

Video recording settings

Screenshot policies

Troubleshooting

- Common Issues:
  Tests failing on form submission

Ensure ZIP codes are strings: "32258" not 32258

Use .toString() if passing numbers

Element not clickable

typescript
// Add force option
await button.click({ force: true });
Page not loading

typescript
// Add explicit URL verification
await expect(page).toHaveURL(/expected-page\.html$/);
Debugging
bash

# Run in debug mode

npx playwright test --debug

# Use codegen to record new tests

npx playwright codegen https://www.saucedemo.com

# Update snapshots

npx playwright test --update-snapshots

- CI/CD Pipeline:
  Automated testing via GitHub Actions:

Runs on every push to main branch

Runs on pull requests

Uploads test artifacts and reports

Supports all major browsers

Contributing
Fork the repository

Create a feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add AmazingFeature')

Push to branch (git push origin feature/AmazingFeature)

Open a Pull Request

Notes:

- See NOTES.md for detailed testing notes, troubleshooting, and project-specific information.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Playwright Website

Sauce Demo for the test application

The testing community for best practices and patterns
