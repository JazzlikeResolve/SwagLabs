export const YourCartLocators = {
  yourCartTitle: 'Your Cart', //await page.getByText('Your Cart!')
  quantity: 'QTY', //await page.getByText('QTY')
  description: 'Description', //await page.getByText('Description')
  allProducts: '.inventory_item_name',
  allProductPrices: '.inventory_item_price',
  firstaddButton: '#add-to-cart-sauce-labs-backpack',
  removeButton: "button', { name: 'Remove' })", //add wait time
  continueShopping: '.btn.btn_secondary.back.btn_medium',
  cartQuantity: '.cart_quantity', //this is a string not value
  checkOutButton: '.btn.btn_action.btn_medium.checkout_button ',
  shoppingCartQuantity: '.shopping_cart_badge',
  shoppingCartLink: '.shopping_cart_link',
};
