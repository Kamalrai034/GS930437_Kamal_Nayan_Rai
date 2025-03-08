import { useState } from 'react';
import { Button } from '@mui/material';
import StoreTable from '../components/StoreTable';
import StoreForm from '../components/StoreForm';
import { Store } from '../features/stores/storeTypes';

const Stores = () => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<Store | undefined>(undefined);
  const [mode, setMode] = useState<'add' | 'edit'>('add');

  const handleOpen = () => {
    setMode('add');
    setInitialData(undefined);
    setOpen(true);
  };

  const handleEdit = (data: Store) => {
    setMode('edit');
    setInitialData(data);
    setOpen(true);
  };

  return (
    <div>
      <StoreTable onEdit={handleEdit} />
      <Button onClick={handleOpen} variant="contained" color="primary" style={{marginTop:"40px"}}>
        New Store
      </Button>
      <StoreForm
        open={open}
        handleClose={() => setOpen(false)}
        initialData={initialData}
        mode={mode}
      />
    </div>
  );
};

export default Stores;
