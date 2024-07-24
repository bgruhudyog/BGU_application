// "use client";

// import { useEffect, useState } from 'react';
// import { Box, Select, MenuItem, InputLabel, FormControl, Button, TextField } from '@mui/material';
// import supabaseClient from '../../utils/supabaseClient';

// export default function RouteSelect({ setVillages, setRouteId }) {
//   const [routes, setRoutes] = useState([]);
//   const [newRouteName, setNewRouteName] = useState('');
//   const [addingRoute, setAddingRoute] = useState(false);

//   useEffect(() => {
//     fetchRoutes();
//   }, []);

//   const fetchRoutes = async () => {
//     const { data, error } = await supabaseClient.from('Routes Table').select('*');
//     if (error) console.error('Error fetching routes:', error);
//     else setRoutes(data);
//   };

//   const handleRouteChange = async (event) => {
//     const routeId = event.target.value;
//     setRouteId(routeId);
//     const { data, error } = await supabaseClient.from('Villages Table').select('*').eq('route_id', routeId);
//     if (error) console.error('Error fetching villages:', error);
//     else setVillages(data);
//   };

//   const addRoute = async () => {
//     const { data, error } = await supabaseClient.from('Routes Table').insert([{ route_name: newRouteName }]);
//     if (error) console.error('Error adding route:', error);
//     else fetchRoutes();
//     setNewRouteName('');
//     setAddingRoute(false);
//   };

//   return (
//     <Box mb={2} mt={2}>
//       {addingRoute ? (
//         <>
//           <TextField
//             label=" नए रूट का नाम लिखे "
//             value={newRouteName}
//             onChange={(e) => setNewRouteName(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Button variant="contained" color="primary" onClick={addRoute} disabled={!newRouteName}>
//             Submit Route
//           </Button>
//           <Button variant="outlined" color="secondary" onClick={() => setAddingRoute(false)} style={{ marginLeft: 8 }}>
//             Cancel / रद्द करे 
//           </Button>
//         </>
//       ) : (
//         <>
//           <FormControl fullWidth>
//             <InputLabel id="route-select-label">रूट चुने </InputLabel>
//             <Select labelId="route-select-label" onChange={handleRouteChange}>
//               {routes.map((route) => (
//                 <MenuItem key={route.id} value={route.id}>
//                   {route.id}.{route.route_name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Button variant="contained" color="primary" onClick={() => setAddingRoute(true)} style={{ marginTop: 8 }}>
//             नया रूट जोड़े 
//           </Button>
//         </>
//       )}
//     </Box>
//   );
// }


"use client";

import { useEffect, useState } from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl, Button, TextField } from '@mui/material';
import supabaseClient from '../../utils/supabaseClient';

export default function RouteSelect({ setVillages, setRouteId }) {
  const [routes, setRoutes] = useState([]);
  const [newRouteName, setNewRouteName] = useState('');
  const [addingRoute, setAddingRoute] = useState(false);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const { data, error } = await supabaseClient.from('Routes Table').select('*');
    if (error) console.error('Error fetching routes:', error);
    else setRoutes(data);
  };

  const handleRouteChange = async (event) => {
    const routeId = event.target.value;
    setRouteId(routeId);
    const { data, error } = await supabaseClient.from('Villages Table').select('*').eq('route_id', routeId);
    if (error) console.error('Error fetching villages:', error);
    else setVillages(data);
  };

  const addRoute = async () => {
    const { data, error } = await supabaseClient.from('Routes Table').insert([{ route_name: newRouteName }]);
    if (error) console.error('Error adding route:', error);
    else fetchRoutes();
    setNewRouteName('');
    setAddingRoute(false);
  };

  return (
    <Box mb={2} mt={2}>
      {addingRoute ? (
        <>
          <TextField
            label=" नए रूट का नाम लिखे "
            value={newRouteName}
            onChange={(e) => setNewRouteName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addRoute} disabled={!newRouteName}>
            Submit Route
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setAddingRoute(false)} style={{ marginLeft: 8 }}>
            Cancel / रद्द करे 
          </Button>
        </>
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id="route-select-label">रूट चुने </InputLabel>
            <Select labelId="route-select-label" onChange={handleRouteChange}>
              {routes.map((route) => (
                <MenuItem key={route.id} value={route.id}>
                  {route.id}.{route.route_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => setAddingRoute(true)} style={{ marginTop: 8 }}>
            नया रूट जोड़े 
          </Button>
        </>
      )}
    </Box>
  );
}
