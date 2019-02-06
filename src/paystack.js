const parameters = {
  key: 'pk_test_57e2b12a1fcf0334458d59c81786bbeedd613b3b',
  email: 'mohanreddy1594@gmail.com',
  currency: 'NGN',
  onClose: () => null
}

const paystack = (amount, callback) => PaystackPop.setup({
  ...parameters,
  amount,
  callback
});

export default paystack;
