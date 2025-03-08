import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addStore, updateStore } from '../features/stores/storeSlice';
import { Store } from '../features/stores/storeTypes';

interface StoreFormProps {
  open: boolean;
  handleClose: () => void;
  initialData?: Store;
  mode: 'add' | 'edit';
}

const StoreForm: React.FC<StoreFormProps> = ({
  open,
  handleClose,
  initialData,
  mode,
}) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialData || {
      name: '',
      city: '',
      state: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Store name is required'),
      city: Yup.string().required('City is required'),
      state: Yup.string()
        .max(2, 'State should be 2 characters')
        .required('State is required'),
    }),
    onSubmit: (values) => {
      if (mode === 'edit' && initialData) {
        dispatch(updateStore({ ...initialData, ...values }));
      } else {
        dispatch(addStore({ id: Date.now(), ...values }));
      }
      handleClose();
    },
    enableReinitialize: true, // Allows the form to update when initialData changes
  });

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2,
          width: 400,
          margin: '100px auto',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="Store Name"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="City"
            {...formik.getFieldProps('city')}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
            margin="normal"
          />
          <TextField
            fullWidth
            label="State"
            {...formik.getFieldProps('state')}
            error={formik.touched.state && Boolean(formik.errors.state)}
            helperText={formik.touched.state && formik.errors.state}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {mode === 'edit' ? 'Update Store' : 'Add Store'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default StoreForm;
