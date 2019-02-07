export const homePath = (role) => (
  role === 'admin'
    ? '/admin'
    : (
      role === 'vendor'
        ? '/'
        : '/'
    )
);
