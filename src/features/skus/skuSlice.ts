import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SKU } from './skuTypes';
import { getUserData, saveUserData } from '../../utils/localStorageUtils';

const initialState: SKU[] = getUserData<SKU[]>('skus') || [];

const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    setSKUs: (_state, action: PayloadAction<SKU[]>) => {
      const updatedState = action.payload;
      saveUserData('skus', updatedState);
      return updatedState;
    },

    addSKU: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
      saveUserData('skus', state);
    },

    updateSKU: (state, action: PayloadAction<SKU>) => {
      const index = state.findIndex((sku) => sku.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveUserData('skus', state);
      }
    },

    deleteSKU: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((sku) => sku.id !== action.payload);
      saveUserData('skus', updatedState);
      return updatedState;
    },
  },
});

export const { setSKUs, addSKU, updateSKU, deleteSKU } = skuSlice.actions;

export default skuSlice.reducer;
