import React from 'react';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Header from '../components/header';

interface MainLayoutProps {
  children: any;
}

const MainLayout = (props: MainLayoutProps) => {
  const { children } = props;

  return (
    <>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Header />
        <Box
          component="main"
          bgcolor={'#F4F6F8'}
          sx={{
            flexGrow: 1,
            p: 3
          }}
        >
          <Toolbar />
          {children}
        </Box>
      </Box>
    </>
  );
};

export default MainLayout;
