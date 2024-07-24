"use client";

import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import RouteSelect from './components/RouteSelect';
import VillageSelect from './components/VillageSelect';
import ShopSelect from './components/ShopSelect';
import supabaseClient from '../utils/supabaseClient';
import './glass.css';

export default function Home() {
  const [routes, setRoutes] = useState([]);
  const [villages, setVillages] = useState([]);
  const [shops, setShops] = useState([]);
  const [routeId, setRouteId] = useState(null);
  const [villageId, setVillageId] = useState(null);

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const { data, error } = await supabaseClient.from('Routes Table').select('*');
    if (error) console.error('Error fetching routes:', error);
    else setRoutes(data);
  };

  const fetchVillages = async (routeId) => {
    const { data, error } = await supabaseClient.from('Villages Table').select('*').eq('route_id', routeId);
    if (error) console.error('Error fetching villages:', error);
    else setVillages(data);
  };

  const fetchShops = async (villageId) => {
    const { data, error } = await supabaseClient.from('Shops Table').select('*').eq('village_id', villageId);
    if (error) console.error('Error fetching shops:', error);
    else setShops(data);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Balaji Gruh Udyog
      </Typography>
      <Box className="glass">
        <RouteSelect setVillages={setVillages} setRouteId={setRouteId} />
      </Box>
      <Box className="glass">
        <VillageSelect villages={villages} setShops={setShops} routeId={routeId} setVillageId={setVillageId} fetchVillages={fetchVillages} />
      </Box>
      <Box className="glass">
        <ShopSelect shops={shops} villageId={villageId} setShops={setShops} fetchShops={fetchShops} />
      </Box>
    </Container>
  );
}
