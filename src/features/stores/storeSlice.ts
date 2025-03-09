import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from './storeTypes';
import {
  getUserData,
  saveUserData,
  // removeUserData,
} from '../../utils/localStorageUtils';

const initialState: Store[] = getUserData<Store[]>('stores') || [];

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.push(action.payload);
      saveUserData('stores', state);
    },

    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveUserData('stores', state);
      }
    },

    deleteStore: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((store) => store.id !== action.payload);
      saveUserData('stores', updatedState);
      return updatedState;
    },

    setStores: (_state, action: PayloadAction<Store[]>) => {
      saveUserData('stores', action.payload);
      return action.payload;
    },
  },
});

export const { addStore, updateStore, deleteStore, setStores } =
  storeSlice.actions;

export default storeSlice.reducer;
