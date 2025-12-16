export const users = {
  valid: [
    { firstName: 'Adnan', lastName: 'secret_sauce', postalCode: '71300' },
  ],
  invalid: [
    { firstName: 'locked_out_user', lastName: 'secret_sauce', postalCode: '' }, //no postcode
    { firstName: '', lastName: 'secret_sauce', postalCode: '789456' }, // no username
    { firstName: 'no_password', lastName: '', postalCode: '12345' }, // no lastname
  ],
};
