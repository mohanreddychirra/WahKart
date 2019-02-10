export const homePath = (role) => (
  role === 'admin'
    ? '/admin'
    : (
      role === 'vendor'
        ? '/vendor'
        : '/'
    )
);

export const allowedPaths = (role) => (
  role == 'admin'
    ? ['/admin', '/admin/requests'] : (
      role == 'vendor'
        ? ['/vendor']
        : []
    )
);

export const redirectPath = (pathname, role) => (
  (pathname == '/' || allowedPaths(role).includes(pathname))
    ? pathname
    : homePath(role)
);

export const vendorRedirectPath = (pathname, status) => {
  if (status !== 'approved') return '/vendor';

  const allowedPaths = [
    '/vendor',
    /^\/product\/.+/,
  ];

  const match = allowedPaths.some(allowedPath => !!pathname.match(allowedPath));
  return match ? pathname : '/';
}
