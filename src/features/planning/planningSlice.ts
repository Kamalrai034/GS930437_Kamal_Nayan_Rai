import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanningData } from './planningTypes.ts';

const initialState: PlanningData[] = [];

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setPlanningData: (state, action: PayloadAction<PlanningData[]>) => {
      return action.payload;
    },
  },
});

export const { setPlanningData } = planningSlice.actions;
export default planningSlice.reducer;
