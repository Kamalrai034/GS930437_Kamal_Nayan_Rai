import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  CellValueChangedEvent,
} from "ag-grid-community";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updatePlanningData } from "../features/planning/planningSlice";
import { PlanningRow } from "../utils/crossJoinUtils";
import { generateCalendarWeeks } from "../utils/calendarUtils";
import { useMemo, useRef, useState, useEffect } from "react";
import { Box } from "@mui/material";

ModuleRegistry.registerModules([AllCommunityModule]);

const weeks = generateCalendarWeeks();

const PlanningTable = () => {
  const originalData: PlanningRow[] = useSelector(
    (state: RootState) => state.planning
  );
  const dispatch = useDispatch();

  const gridRef = useRef<AgGridReact>(null);

  // Create a **deep copy** of row data to make it mutable
  const [rowData, setRowData] = useState<PlanningRow[]>([]);

  // Copy data when Redux state changes (deep copy ensures no immutability issues)
  useEffect(() => {
    const mutableData = JSON.parse(JSON.stringify(originalData));
    setRowData(mutableData);
  }, [originalData]);

  // Handle Cell Value Change
  const handleCellValueChanged = (params: CellValueChangedEvent) => {
    console.log("Cell changed:", params);
    if (params.data) {
      const { colDef, newValue } = params;
      const fieldName = colDef.field;

      if (fieldName && newValue !== undefined) {
        const updatedRow = {
          ...params.data,
          [fieldName]: Number(newValue || 0),
        };

        console.log("Updated Row:", updatedRow);

        const updatedData = rowData.map((row) =>
          row.id === updatedRow.id ? updatedRow : row
        );
        setRowData(updatedData);

        dispatch(updatePlanningData(updatedRow));

        // Force refresh to update computed columns
        gridRef.current?.api.refreshCells({
          rowNodes: [params.node],
          force: true,
        });
      }
    }
  };

  const getGMPercentStyle = (params: any) => {
    if (!params.colDef.field) return {};

    const weekNumber = params.colDef.field?.split('_')[1];
    if (!weekNumber) return {}; 

    const units = params.data[`salesUnits_${weekNumber}`] ?? 0;
    const salesDollars = units * params.data.price;
    const gmDollars = units * (params.data.price - params.data.cost);

    if (salesDollars === 0) return { backgroundColor: "#f0f0f0", color: "#000" };

    const gmPercent = (gmDollars / salesDollars) * 100;

    if (gmPercent >= 40) {
      return { backgroundColor: "green", color: "white" };
    } else if (gmPercent >= 10) {
      return { backgroundColor: "yellow", color: "black" };
    } else if (gmPercent >= 5) {
      return { backgroundColor: "orange", color: "black" };
    } else {
      return { backgroundColor: "red", color: "white" };
    }
  };

  // Centralized Column Type for Consistency
  const columnTypes = useMemo(
    () => ({
      valueColumn: {
        minWidth: 100,
        editable: true,
        filter: "agNumberColumnFilter",
        /* eslint-disable @typescript-eslint/no-explicit-any */
        valueParser: (params: any) => Number(params.newValue || 0), 
        cellStyle: { textAlign: "center" },
      },
    }),
    []
  );

  // Column Definition with Value Getters
  const columnDefs = useMemo<ColDef[]>(() => [
    { headerName: "Store", field: "store", sortable: true, filter: true },
    { headerName: "SKU", field: "sku", sortable: true, filter: true },
    ...weeks.map((week) => ({
      headerName: `${week.month} - Week ${week.weekNumber}`,
      children: [
        {
          headerName: "Sales Units",
          field: `salesUnits_${week.weekNumber}`,
          type: "valueColumn", // Reuse valueColumn type
        },
        {
          headerName: "Sales Dollars",
          valueGetter: (params: any) => {
            const units = params.data[`salesUnits_${week.weekNumber}`] ?? 0;
            return `$${(units * params.data.price).toFixed(2)}`;
          },
          cellStyle: { textAlign: "center", backgroundColor: "#f0f0f0" },
        },
        {
          headerName: "GM Dollars",
          valueGetter: (params: any) => {
            const units = params.data[`salesUnits_${week.weekNumber}`] ?? 0;
            return `$${(units * (params.data.price - params.data.cost)).toFixed(
              2
            )}`;
          },
          cellStyle: { textAlign: "center", backgroundColor: "#f0f0f0" },
        },
        {
          headerName: "GM %",
          field: `gmPercent_${week.weekNumber}`, // Assign a field for computed values
          valueGetter: (params: any) => {
            const units = params.data[`salesUnits_${week.weekNumber}`] ?? 0;
            const salesDollars = units * params.data.price;
            const gmDollars = units * (params.data.price - params.data.cost);

            if (salesDollars === 0) return "0.00%";

            const gmPercent = (gmDollars / salesDollars) * 100;
            return `${gmPercent.toFixed(2)}%`;
          },
          cellStyle: getGMPercentStyle, // colored GM %
        },
      ],
    })),
  ], [weeks]);

  console.log(rowData, "rowData");

  return (
    <Box sx={{ height: 600, width: "100%" }} className="ag-theme-alpine">
      <AgGridReact
        ref={gridRef}
        rowData={rowData} // Use mutable state copy here
        columnDefs={columnDefs}
        columnTypes={columnTypes}
        rowSelection="single"
        onCellValueChanged={handleCellValueChanged} 
        pagination={true}
        paginationPageSize={10}
        animateRows={true}
        groupDefaultExpanded={1} 
        suppressAggFuncInHeader={true} 
      />
    </Box>
  );
};

export default PlanningTable;
