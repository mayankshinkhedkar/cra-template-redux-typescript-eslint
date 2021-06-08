import React from 'react';
import { Route } from 'react-router-dom';

interface RouteWithLayoutProps {
  [x: string]: any;
  layout: any;
  component: any;
}

const RouteWithLayout = (props: RouteWithLayoutProps) => {
  const { layout: Layout, component: PureComponent, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(matchProps: any) => (
        <Layout>
          <PureComponent {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default RouteWithLayout;
