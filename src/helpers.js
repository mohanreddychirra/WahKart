export const getCartProducts = (products, cartItems) => {
  const result = [];

  cartItems.map(cartItem => {
    products.map(product => {
      if(cartItem.productId === product.id) {
        result.push(product);
      }
    });
  });

  return result;
}

export const getToken = () => {
  return localStorage.getItem('token');
}