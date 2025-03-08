import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PlanningRow } from '../../utils/crossJoinUtils';

const loadFromLocalStorage = () => {
    const data = localStorage.getItem('planning');
    return data ? JSON.parse(data) : [];
};
const initialState: PlanningRow[] = loadFromLocalStorage();

const planningSlice = createSlice({
  name: 'planning',
  initialState,
  reducers: {
    setPlanningData: (_state, action: PayloadAction<PlanningRow[]>) => {
      localStorage.setItem('planning', JSON.stringify(action.payload));
      return action.payload;
    },
    updatePlanningData: (state, action: PayloadAction<PlanningRow>) => {
      const index = state.findIndex((row) => row.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
        localStorage.setItem('planning', JSON.stringify(state));
      }
    },
  },
});

export const { setPlanningData, updatePlanningData } = planningSlice.actions;
export default planningSlice.reducer;
