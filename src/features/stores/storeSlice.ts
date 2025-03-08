import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Store } from './storeTypes';

const loadFromLocalStorage = () => {
  const data = localStorage.getItem('stores');
  return data ? JSON.parse(data) : [];
};

const initialState: Store[] = loadFromLocalStorage();

const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    addStore: (state, action: PayloadAction<Store>) => {
      state.push(action.payload);
      localStorage.setItem('stores', JSON.stringify(state));
    },
    updateStore: (state, action: PayloadAction<Store>) => {
      const index = state.findIndex((store) => store.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('stores', JSON.stringify(state));
      }
    },
    deleteStore: (state, action: PayloadAction<number>) => {
      const updatedState = state.filter((store) => store.id !== action.payload);
      localStorage.setItem('stores', JSON.stringify(updatedState));
      return updatedState;
    },
    setStores: (state, action: PayloadAction<Store[]>) => {
      localStorage.setItem('stores', JSON.stringify(action.payload));
      return action.payload;
    },
  },
});

export const { addStore, updateStore, deleteStore, setStores } =
  storeSlice.actions;
export default storeSlice.reducer;
