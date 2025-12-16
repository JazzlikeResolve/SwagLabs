export const validuser = {
  standard: { username: 'standard_user', password: 'secret_sauce' },
};

export const invalidUsers = {
  locked_out_user: { username: 'locked_out_user', password: 'secret_sauce' },

  noUsername: { username: '', password: 'secret_sauce' },

  noPassword: { username: 'no_password', password: '' },
};
