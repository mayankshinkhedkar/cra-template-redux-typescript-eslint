import React from 'react';

interface AuthLayoutProps {
  children: any;
}

const AuthLayout = (props: AuthLayoutProps) => {
  const { children } = props;

  return (
    <>
      {children}
    </>
  );
};

export default AuthLayout;
