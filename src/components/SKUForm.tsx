import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Modal, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addSKU, updateSKU } from '../features/skus/skuSlice';
import { SKU } from '../features/skus/skuTypes';

interface SKUFormProps {
  open: boolean;
  handleClose: () => void;
  initialData?: SKU;
  mode: 'add' | 'edit';
}

const SKUForm: React.FC<SKUFormProps> = ({ open, handleClose, initialData, mode }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialData || {
      name: '',
      price: '',
      cost: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('SKU name is required'),
      price: Yup.number().required('Price is required').min(0, 'Price must be positive'),
      cost: Yup.number().required('Cost is required').min(0, 'Cost must be positive'),
    }),
    onSubmit: (values) => {
      const skuData: SKU = {
        id: initialData ? initialData.id : Date.now(), // ✅ Ensure id and all fields are present
        name: values.name,
        price: parseFloat(values.price.toString()),
        cost: parseFloat(values.cost.toString()),
      };

      if (mode === 'edit') {
        dispatch(updateSKU(skuData)); // ✅ Pass full SKU object
      } else {
        dispatch(addSKU(skuData)); // ✅ Pass full SKU object
      }

      handleClose();
    },
    enableReinitialize: true, // ✅ Reset form on state change
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
            label="SKU Name"
            {...formik.getFieldProps('name')}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Price"
            type="number"
            {...formik.getFieldProps('price')}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Cost"
            type="number"
            {...formik.getFieldProps('cost')}
            error={formik.touched.cost && Boolean(formik.errors.cost)}
            helperText={formik.touched.cost && formik.errors.cost}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {mode === 'edit' ? 'Update SKU' : 'Add SKU'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SKUForm;
