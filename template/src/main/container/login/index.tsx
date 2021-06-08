import * as React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LoginForm from '../../components/forms/login';
import Copyright from '../../components/helping/copyright';
import LeftImageSection from '../../components/helping/leftImageSection';
import MetaTags from '../../utilities/metaTags';

const Login = () => {
  return (
    <>
      <MetaTags
        title="Login"
        description="Login"
      />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <LeftImageSection />
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          item
          xs={12}
          sm={false}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            width={1}
            sx={{
              my: 4,
              px: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Typography component="h1" variant="h5">
            Log In
            </Typography>
            <LoginForm />
            <Box width={1}>
              <Grid
                container
                justifyContent="flex-end"
              >
                <Grid item>
                  <Typography component="span">
                    {'Don\'t have an account? '}
                  </Typography>
                  <Link component={RouterLink} to="/signup">
                    {'Sign Up'}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
