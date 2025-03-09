import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanningRow } from '../../utils/crossJoinUtils';
import { getUserData, saveUserData } from '../../utils/localStorageUtils';

const initialState: PlanningRow[] = getUserData<PlanningRow[]>('planning') || [];

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setPlanningData: (_state, action: PayloadAction<PlanningRow[]>) => {
      saveUserData('planning', action.payload);
      return action.payload;
    },

    updatePlanningData: (state, action: PayloadAction<PlanningRow>) => {
      const index = state.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        saveUserData('planning', state);
      }
    },
  },
});

export const { setPlanningData, updatePlanningData } = planningSlice.actions;

export default planningSlice.reducer;
