export const ProductsPageLocators = {
  pageTitle: '.title',
  shoppingCartButton: '.shopping_cart_link',
  shoppingCartItemsInside: '.shopping_cart_badge',

  allProducts: '.inventory_item_name',
  allProductPrices: '.inventory_item_price',
  sauceLabsBackPackLink: 'Sauce Labs Backpack', //page.getByText('Sauce Labs Backpack')
  sauceLabsBackPackDescription:
    'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.', //page.getByText('Sauce Labs Backpack')
  sauceLabsBackPackPrice: '$29.99', //page.getByText('$29.99')
  sauceLabsBackPackAddButton: '#add-to-cart-sauce-labs-backpack',

  sauceLabsBikeLightLink: 'Sauce Labs Bike Light', //page.getByText('Sauce Labs Bike Light')
  sauceLabsBikeLightDescription:
    "A red light isn't the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.", //page.getByText('Sauce Labs Light')
  sauceLabsBikeLightPrice: '$9.99', // the dollar is separate in the DOM file
  sauceLabsBikeLightAddButton: '#add-to-cart-sauce-labs-bike-light',

  sauceLabsBoltTshirtLink: 'Sauce Labs Bolt T-Shirt', //page.getByText('Sauce Labs Bolt T-shirt')
  sauceLabsBoltTshirtDescription:
    'Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.', //page.getByText('Sauce Labs T Shirt')
  sauceLabsBoltTshirtPrice: '$15.99', //page.getByText('$15.99')
  sauceLabsBoltTshirtAddButton: '#add-to-cart-sauce-labs-bolt-t-shirt',

  sauceLabsFleeceJacketLink: 'Sauce Labs Fleece Jacket', //page.getByText('Sauce Labs Flee Jacket')
  sauceLabsFleeceJacketDescription:
    "It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.", //page.getByText('Sauce Labs Backpack')
  sauceLabsFleeceJacketPrice: '$49.99', //page.getByText('$29.99')
  sauceLabsFleeceJacketAddButton: '#add-to-cart-sauce-labs-fleece-jacket',

  sauceLabsOnesieLink: 'Sauce Labs Onesie', //page.getByText('Sauce Labs Onesie')
  sauceLabsOnesieDescription:
    "Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel.", //page.getByText('Sauce Labs Backpack')
  sauceLabsOnesiePrice: '$7.99', //page.getByText('$7.99')
  sauceLabsOnesieAddButton: '#add-to-cart-sauce-labs-onesie',

  redTshirtLink: 'Test.allTheThings() T-Shirt (Red)', //page.getByText('Test.allTheThings() T-Shirt (Red)')
  redTshirtLinkDescription:
    'This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.', //page.getByText('Sauce Labs Backpack')
  redTshirtLinkPrice: '$15.99', //page.getByText('$19.99')
  redTshirtLinkAddButton:
    '#add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)',
  addButton: '.btn.btn_small.btn_inventory',

  dropDownMenuProducts: '.product_sort_container',
  dropDownAtoZ: 'option[value="az"]', //const locator = page.locator('option[value="az"]');
  dropDownZtoA: 'option[value="za"]', //const locator = page.locator('option[value="za"]');
  dropDownPriceLowToHigh: 'Price (low to high)', //page.getByText('Price (low to high)')
  dropDownPriceHighToLow: 'Price (high to low)', //page.getByText(''Price (high to low)'')
  hamburgerMenu: '#react-burger-menu-btn',
  aboutSideLink: '#about_sidebar_link',
  logOutSideLink: '#logout_sidebar_link',
  sauceLabsBookADemo: 'button:has-text("Book a demo")'
};
