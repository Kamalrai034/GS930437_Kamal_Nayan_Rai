import { SKU } from '../features/skus/skuTypes';
import { Store } from '../features/stores/storeTypes';
import { generateCalendarWeeks } from './calendarUtils';

export interface PlanningRow {
  id: string;
  store: string;
  sku: string;
  price: number;
  cost: number;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  [key: string]: any; 
}

const weeks = generateCalendarWeeks();

export const generatePlanningData = (stores: Store[], skus: SKU[]): PlanningRow[] => {
  const rows: PlanningRow[] = [];

  stores.forEach((store) => {
    skus.forEach((sku) => {
      const row: PlanningRow = {
        id: `${store.id}-${sku.id}`,
        store: store.name,
        sku: sku.name,
        price: sku.price,
        cost: sku.cost,
      };

      // Create dynamic fields for each week (set default value = 0)
      weeks.forEach((week) => {
        row[`salesUnits_${week.month}_${week.weekNumber}`] = 0;
      });

      rows.push(row);
    });
  });

  return rows;
};
