"use client";

import { useState, useEffect } from 'react';
import { Container, Typography, Select, MenuItem, TextField, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { fetchRoutes, addRoute } from './pagefiles/data';
import { AppBar } from './pagefiles/ui';
import { themeSettings } from './theme';

const Home = () => {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newRoute, setNewRoute] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedRoutes = await fetchRoutes();
      setRoutes(fetchedRoutes);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleAddRoute = async () => {
    if (newRoute.trim() === '') {
      console.error('Route name cannot be empty');
      return;
    }
    const result = await addRoute(newRoute);
    if (result.error) {
      console.error('Error adding route:', result.error);
    } else {
      setRoutes([...routes, ...result.data]);
      setIsAdding(false);
      setNewRoute('');
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const theme = createTheme(themeSettings(darkMode ? 'dark' : 'light'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <AppBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0' }}>
          {isAdding ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <TextField
                value={newRoute}
                onChange={(e) => setNewRoute(e.target.value)}
                label="New Route"
                variant="outlined"
                size="small"
              />
              <Button onClick={handleAddRoute} variant="contained" color="primary" style={{ marginTop: '1rem' }}>
                Add
              </Button>
            </div>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <Select
                value=""
                onChange={(e) => console.log(e.target.value)}
                variant="outlined"
                size="small"
                style={{ width: 300, marginBottom: '1rem' }}
              >
                {routes.map(route => (
                  <MenuItem key={route.id} value={route.id}>
                    {route.name_of_routes}
                  </MenuItem>
                ))}
              </Select>
              <Button onClick={() => setIsAdding(true)} variant="contained" color="primary" startIcon={<AddIcon />}>
                Add Route
              </Button>
            </div>
          )}
        </div>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
