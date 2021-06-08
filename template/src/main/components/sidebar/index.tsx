import React from 'react';
import Divider from '@material-ui/core/Divider';
import LogoutIcon from '@material-ui/icons/Logout';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { logoutAction } from '../../redux/auth/authSlice';

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
  };
  return (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Sidebar
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {['Logout'].map((text, index) => (
          <ListItem
            button
            onClick={handleLogout}
            key={text}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
