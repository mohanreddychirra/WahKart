export const homePath = (role) => (
  role === 'admin'
    ? '/admin'
    : (
      role === 'vendor'
        ? '/'
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