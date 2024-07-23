import { supabase } from '../config/supabaseClient';

// Fetch routes from Supabase
export const fetchRoutes = async () => {
  const { data: routes, error } = await supabase.from('routes').select('*');
  if (error) {
    console.error('Error fetching data:', error);
    return [];
  }
  return routes;
};

// Add a new route to Supabase
export const addRoute = async (routeName) => {
  const { data, error } = await supabase
    .from('routes')
    .insert([{ name_of_routes: routeName }]);
  
  return { data, error };
};
