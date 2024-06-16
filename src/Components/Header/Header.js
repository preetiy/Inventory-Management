import React from 'react';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Switch } from '@mui/material';
import './Header.css';

const Header = ({ setIsUser }) => {
  const handleSwitchChange = (event) => {
    setIsUser(!event.target.checked);
  };

  return (
    <header className="header-container mx-1">
      <span>user</span>
      <Switch
        onChange={handleSwitchChange}
        defaultChecked
        color="secondary"
      />
      <span>admin</span>
      <span className="mx-1">
        <ExitToAppOutlinedIcon />
      </span>
    </header>
  );
};

export default Header;
