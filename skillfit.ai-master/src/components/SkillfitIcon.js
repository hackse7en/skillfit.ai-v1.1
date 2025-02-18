import React from 'react';
import Logo from '../assets/Logo.png';

export default function SkillfitIcon() {
  return (
    <img
      src={Logo}
      alt="Sitemark Logo"
      style={{
        height: '38px', 
        width: '120px',
        marginRight: '8px' // equivalent to `mr: 2` in Material-UI
      }}
    />
  );
}
