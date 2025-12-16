# SwagLabs Playwright Tests

Automated end-to-end tests for [SauceDemo](https://www.saucedemo.com/) built with **Playwright**, **TypeScript**,
This project validates the full checkout flow — from login, adding products to cart, filling checkout info, and verifying the checkout complete page. An end to end process.

---

## 🚀 Getting Started (Setup)

### Prerequisites (Have Installed on your PC or MAC) 
- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/JazzlikeResolve/SwagLabs.git
cd SwagLabs
npm install
▶️ Running Tests
Run all tests:

bash
npx playwright test
Run tests in headed mode (browser visible):

bash
npx playwright test --headed
Run a specific test file:

bash
npx playwright test src/tests/checkoutcomplete.spec.ts
Generate and view HTML report:

bash
npx playwright test --reporter=html
npx playwright show-report
📂 Project Structure
Code
src/
  Pages/              # Page Object classes (LoginPage, ProductsPage, CheckoutYourInfo, etc.)
  Locators/           # Centralized selectors
  Data/               # Test data (users, credentials)
  tests/              # Test specs
🛠 Features
Page Object Model for maintainable test code

Reusable locators and helper methods

Assertions for checkout complete title, thank you message, and back home button

Video and screenshot capture on failures

📄 License
This project is licensed under the MIT License.

Have Fun! 
