// src/app/components/AddButton.js
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { supabase } from '../../utils/supabaseClient';

export default function AddButton() {
  const [newItemName, setNewItemName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = async () => {
    setIsAdding(true);
    const { data, error } = await supabase.from('Routes Table').insert([{ route_name: newItemName }]);
    if (error) console.error('Error adding item:', error);
    else setNewItemName('');
    setIsAdding(false);
  };

  return (
    <>
      <TextField
        label="New Item"
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAdd}
        disabled={isAdding}
      >
        {isAdding ? 'Adding...' : 'Add Route'}
      </Button>
    </>
  );
}
