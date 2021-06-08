export const requireAuthPaths = [
  {
    path: '/dashboard',
    userType: ['admin']
  },
  {
    path: '/manage-matcher',
    userType: ['admin']
  }
];

export const notRequireAuthPaths = [
  '/',
  '/signup'
];

export const redirectPathIfRequireAuthFails = '/';

export const redirectPathIfNotRequireAuthFails = [
  {
    path: '/dashboard',
    userTypes: ['admin']
  }
];
