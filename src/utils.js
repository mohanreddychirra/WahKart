export const homePath = (role) => (
  role === 'admin'
    ? '/admin'
    : (
      role === 'vendor'
        ? '/vendor'
        : '/'
    )
);

export const customerRedirectPath = (pathname) => {
  const allowedPaths = [
    '/vendor',
    '/admin',
    '/admin/requests'
  ];

  const match = allowedPaths.some(allowedPath => !!pathname.match(allowedPath));
  return match ? '/' : pathname;
}

export const vendorRedirectPath = (pathname, status) => {
  if (status !== 'approved') return '/vendor';

  const allowedPaths = [
    '/vendor',
    /^\/product\/.+/,
  ];

  const match = allowedPaths.some(allowedPath => !!pathname.match(allowedPath));
  return match ? pathname : '/';
}

export const adminRedirectPath = (pathname) => {
  const allowedPaths = [
    '/admin',
    /^\/product\/.+/,
  ];

  const match = allowedPaths.some(allowedPath => !!pathname.match(allowedPath));
  return match ? pathname : '/';
}

export const updateProduct = (products, product) => {
  return products.map(prod => (
    prod.id === product.id
      ? product : prod
  ));
}