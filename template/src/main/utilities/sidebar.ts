export const sidebarJSON = (t = (arg: any) => arg) => [
  {
    endPoint: '/dashboard',
    authRequire: true,
    addInSideBar: true,
    active: [
      '/dashboard'
    ],
    title: t('dashboard.title'),
    icon: 'icon-dashboard',
    userTypes: ['admin', 'subadmin'],
    moduleKey: 'dashboard'
  },
  {
    endPoint: '/manage-matcher',
    authRequire: true,
    addInSideBar: true,
    active: [
      '/manage-matcher'
    ],
    title: t('user.title'),
    icon: 'icon-total-user',
    userTypes: ['admin'],
    moduleKey: 'manage-matcher'
  }
];
