import { useState, useRef } from 'react';
import { Button, Box, Snackbar } from '@mui/material';
import SKUTable from '../components/SKUTable';
import SKUForm from '../components/SKUForm';
import { importExcelData } from '../utils/excelUtils';
import { useDispatch, useSelector } from 'react-redux';
import { setSKUs } from '../features/skus/skuSlice';
import { RootState } from '../store/store';
import { SKU } from '../features/skus/skuTypes';

const SKUs = () => {
  const [open, setOpen] = useState(false);
  const [initialData, setInitialData] = useState<SKU | undefined>(undefined);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const skus = useSelector((state: RootState) => state.skus);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpen = () => {
    setMode('add');
    setInitialData(undefined);
    setOpen(true);
  };

  const handleEdit = (data: SKU) => {
    setMode('edit');
    setInitialData(data);
    setOpen(true);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importExcelData(file, (data) => {
     /* eslint-disable @typescript-eslint/no-explicit-any */
        const newData = data.map((item: any, index: number) => ({
          id: Date.now() + index,
          name: item['SKU'] || '',
          price: parseFloat(item['Price']) || 0,
          cost: parseFloat(item['Cost']) || 0,
        }));

        dispatch(setSKUs([...skus, ...newData]));

        setSnackbarMessage('Excel data imported successfully!');
        setSnackbarOpen(true);
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          sx={{ marginRight: 2 }}
        >
          New SKU
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => fileInputRef.current?.click()}
          sx={{ marginRight: 2 }}
        >
          Import Excel
        </Button>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </Box>

      <SKUTable onEdit={handleEdit} />

      <SKUForm
        open={open}
        handleClose={() => setOpen(false)}
        initialData={initialData}
        mode={mode}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default SKUs;
