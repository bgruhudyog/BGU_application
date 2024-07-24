"use client";

import { useEffect, useState } from 'react';
import { Box, Select, MenuItem, InputLabel, FormControl, Button, TextField } from '@mui/material';
import supabaseClient from '../../utils/supabaseClient';

export default function VillageSelect({ villages, setShops, routeId, setVillageId, fetchVillages }) {
  const [newVillageName, setNewVillageName] = useState('');
  const [addingVillage, setAddingVillage] = useState(false);

  const handleVillageChange = async (event) => {
    const villageId = event.target.value;
    setVillageId(villageId);
    const { data, error } = await supabaseClient.from('Shops Table').select('*').eq('village_id', villageId);
    if (error) console.error('Error fetching shops:', error);
    else setShops(data);
  };

  const addVillage = async () => {
    const { data, error } = await supabaseClient.from('Villages Table').insert([{ village_name: newVillageName, route_id: routeId }]);
    if (error) console.error('Error adding village:', error);
    else fetchVillages();
    setNewVillageName('');
    setAddingVillage(false);
  };

  return (
    <Box mb={2}mt={2}>
      {addingVillage ? (
        <>
          <TextField
            label="नए गाँव का नाम लिखे"
            value={newVillageName}
            onChange={(e) => setNewVillageName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={addVillage} disabled={!newVillageName || !routeId}>
            जमा करे 
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => setAddingVillage(false)} style={{ marginLeft: 8 }}>
            Cancel/ रद्द करे 
          </Button>
        </>
      ) : (
        <>
          <FormControl fullWidth>
            <InputLabel id="village-select-label">गाँव या शहर का नाम चुनें </InputLabel>
            <Select labelId="village-select-label" onChange={handleVillageChange}>
              {villages.map((village) => (
                <MenuItem key={village.id} value={village.id}>
                  {village.village_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" onClick={() => setAddingVillage(true)} style={{ marginTop: 8 }} disabled={!routeId}>
            नया गाँव या शहर जोड़े 
          </Button>
        </>
      )}
    </Box>
  );
}
 