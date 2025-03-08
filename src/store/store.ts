import { configureStore } from '@reduxjs/toolkit';
import storeReducer from '../features/stores/storeSlice';
import skuReducer from '../features/skus/skuSlice';
import planningReducer from '../features/planning/planningSlice';

export const store = configureStore({
  reducer: {
    stores: storeReducer,
    skus: skuReducer,
    planning: planningReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
