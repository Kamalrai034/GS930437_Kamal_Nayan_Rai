import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SKU } from './skuTypes';

const loadFromLocalStorage = () => {
    const data = localStorage.getItem('skus');
    return data ? JSON.parse(data) : [];
  };

const initialState: SKU[] = loadFromLocalStorage();

const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    setSKUs: (state, action: PayloadAction<SKU[]>) => {
      const updatedState = action.payload;
      localStorage.setItem('skus', JSON.stringify(updatedState));
      return updatedState;
    },
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
      localStorage.setItem('skus', JSON.stringify(state));
    },
    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('skus', JSON.stringify(state));
      }
    },
    deleteSKU: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((sku) => sku.id !== action.payload);
      localStorage.setItem('skus', JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

export const { setSKUs, addSKU, updateSKU, deleteSKU } = skuSlice.actions;

export default skuSlice.reducer;
