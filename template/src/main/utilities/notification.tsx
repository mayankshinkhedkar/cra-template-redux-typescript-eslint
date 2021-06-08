import React from 'react';
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar';

interface State extends SnackbarOrigin {
  open: boolean;
}

interface Props {
  message: string;
}

export default function Notification (props: Props) {
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'center'
  });

  const { vertical, horizontal, open } = state;
  const { message } = props;

  const handleClick = () => () => {
    setState({ ...state, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  React.useEffect(() => {
    handleClick();
    return () => {
      handleClose();
    };
  }, [message]);

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message={message}
      key={vertical + horizontal}
    />
  );
}
