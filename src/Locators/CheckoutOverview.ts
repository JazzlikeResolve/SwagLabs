export const CheckoutOverviewLocators = {
  checkoutOverviewTitle: '.title',
  paymentInformationTitle: 'Payment Information', //get •	await page.getByText('Payment Information:')
  shippingInformationTitle: 'Shipping Information:', //get •	await page.getByText('Shipping Information:')
  priceTotalTitle: '[data-test="total-info-label"]', // //get •	await page.getByText('Price Total')
  itemTotal: '.summary_subtotal_label',
  tax: '.summary_tax_label',
  total: '.summary_total_label',
  cancelButton: '#cancel',
  finishButton: '#finish',
};
