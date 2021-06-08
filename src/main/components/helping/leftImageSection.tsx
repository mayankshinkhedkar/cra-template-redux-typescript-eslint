import React from 'react';
import Grid from '@material-ui/core/Grid';

const LeftImageSection = () => {
  return (
    <Grid
      item
      xs={false}
      sm={false}
      md={7}
      sx={{
        backgroundImage: 'url(https://picsum.photos/500)',
        backgroundRepeat: 'no-repeat',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[50]
            : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    />
  );
};

export default LeftImageSection;
