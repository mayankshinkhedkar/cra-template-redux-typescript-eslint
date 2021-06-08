import React from 'react';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';
import MetaTags from '../../utilities/metaTags';

const Notfound = () => (
  <>
    <MetaTags
      title="Not Found"
      description="Not Found"
    />
    <Container maxWidth="md" sx={{ textAlign: 'center', p: 3 }}>
      <Typography
        align="center"
        color="textPrimary"
        variant="h4"
      >
          404: The page you are looking for isn’t here
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="subtitle2"
      >
          You either tried some shady route or you came here by mistake.
          Whichever it is, try using the navigation
      </Typography>
      <Box sx={{ textAlign: 'center', p: 3 }}>
        <img
          alt="Under development"
          src="/static/images/notfound.png"
          style={{
            marginTop: 50,
            display: 'inline-block',
            maxWidth: '100%',
            width: 560
          }}
        />
      </Box>
    </Container>
  </>
);

export default Notfound;
