import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SKU } from './skuTypes.ts';

const initialState: SKU[] = [];

const skuSlice = createSlice({
  name: 'skus',
  initialState,
  reducers: {
    addSKU: (state, action: PayloadAction<SKU>) => {
      state.push(action.payload);
    },
    removeSKU: (state, action: PayloadAction<number>) => {
      return state.filter(sku => sku.id !== action.payload);
    },
  },
});

export const { addSKU, removeSKU } = skuSlice.actions;
export default skuSlice.reducer;
