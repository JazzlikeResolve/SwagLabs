# 🧪 Automated Testing Suite for Sauce Demo

Automated testing suite for Sauce Demo website using Playwright with TypeScript and Page Object Model pattern.

## 🚀 Quick Start

### Installation
```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
Running Tests
bash
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
 Project Structure

SwagLabs/
├── tests/
│   ├── specs/              # Test files
│   │   ├── cart.spec.ts            # Cart operations
│   │   ├── checkout-.spec.ts       # Basic checkout
│   │   ├── checkout-overview.spec.ts # Multi-user checkout
│   │   ├── inventory.spec.ts       # Product tests
│   │   └── login.spec.ts           # Login tests
│   ├── pages/              # Page Object Models
│   │   ├── constants/              # App constants
│   │   ├── base-page.ts            # Base page class
│   │   ├── cart-page.ts            # Cart page
│   │   ├── checkout-overview.ts    # Checkout step 2
│   │   ├── checkout-page-your-info.ts # Checkout step 1
│   │   ├── inventory-page.ts       # Products page
│   │   └── login-page.ts           # Login page
│   └── data/               # Test data
│       ├── user-info.ts            # Checkout information
│       └── users.ts                # User credentials
├── .github/workflows/      # CI/CD pipeline
├── playwright-report/      # HTML test reports
├── test-results/           # Test artifacts (videos, screenshots)
├── playwright.config.ts    # Playwright configuration
├── package.json            # Dependencies
└── README.md               # Project documentation
🧪 Test Scenarios
Authentication
Login with valid credentials

Login with invalid credentials

Inventory Management
Browse products

View product details

Add/Remove items from cart

Sort products (A-Z, Z-A, price high-low, low-high)

Shopping Cart
Add single item to cart

Add multiple items to cart

Remove items from cart

Verify cart counts and totals

Checkout Process
Complete checkout with valid information

Multi-user checkout testing (Adnan, Helen, Roger)

Form validation (empty fields, invalid data)

Order confirmation

⚙️ Configuration
Environment Variables
Create .env file for sensitive data:

env
BASE_URL=https://www.saucedemo.com
USERNAME=standard_user
PASSWORD=secret_sauce
Playwright Configuration
See playwright.config.ts for:

Browser settings (Chromium, Firefox, WebKit)

Timeout configurations

Video recording settings

Screenshot policies

🐛 Troubleshooting
Common Issues
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
 CI/CD Pipeline
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

 Notes
See NOTES.md for detailed testing notes, troubleshooting, and project-specific information.

 License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
Playwright 

Sauce Demo for the test application

AI Tools for helping when nothing works
