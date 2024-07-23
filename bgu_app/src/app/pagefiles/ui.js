// import React from 'react';
// import { AppBar as MuiAppBar, Toolbar, Typography, IconButton, Switch } from '@mui/material';
// import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';

// export const AppBar = ({ darkMode, setDarkMode }) => {
//   return (
//     <MuiAppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" sx={{ flexGrow: 1 }}>
//           Balaji Gruh Udyog
//         </Typography>
//         <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
//           {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
//         </IconButton>
//       </Toolbar>
//     </MuiAppBar>
//   );
// };

// // Add additional UI components if needed, like a Logo component
// export const Logo = () => (
//   <div>
//     {/* Logo component content */}
//   </div>
// );

import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { LightMode as LightModeIcon, DarkMode as DarkModeIcon } from '@mui/icons-material';

export const AppBar = ({ darkMode, setDarkMode }) => {
  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Balaji Gruh Udyog
        </Typography>
        <IconButton color="inherit" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};
