import  { useMemo, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { generateCalendarWeeks } from "../utils/calendarUtils";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";

const weeks = generateCalendarWeeks();

const ChartPage = () => {
  const data = useSelector((state: RootState) => state.planning);

  // State to store selected store
  const [selectedStore, setSelectedStore] = useState<string>("");

  // Get unique store names for the dropdown
  const storeOptions = useMemo(
    () => Array.from(new Set(data.map((row) => row.store))),
    [data]
  );

  useEffect(() => {
    if (storeOptions.length > 0) {
      setSelectedStore(storeOptions[0]);
    }
  }, [storeOptions]);

  const handleStoreChange = (event: SelectChangeEvent) => {
    setSelectedStore(event.target.value);
  };

  // Prepare chart data based on selected store
  const chartData = useMemo(() => {
    if (!selectedStore) return [];

    return weeks.map((week) => {
      const salesUnitsKey = `salesUnits_${week.weekNumber}`;

      //Aggregate GM Dollars and Sales Dollars across SKUs for the selected store
      let totalSalesDollars = 0;
      let totalGMDollars = 0;

      data.forEach((row) => {
        if (row.store === selectedStore) {
          const units = row[salesUnitsKey] ?? 0;
          totalSalesDollars += units * row.price;
          totalGMDollars += units * (row.price - row.cost);
        }
      });

      const gmPercent =
        totalSalesDollars > 0
          ? parseFloat(((totalGMDollars / totalSalesDollars) * 100).toFixed(2))
          : 0;

      return {
        week: `W${week.weekNumber}`,
        salesDollars: totalSalesDollars,
        gmDollars: totalGMDollars,
        gmPercent,
      };
    });
  }, [selectedStore, data]);

  // Get max GM % for dynamic scaling
  const maxGMPercent = useMemo(
    () =>
      Math.max(
        ...chartData.map((d) =>
          d.gmPercent !== undefined ? d.gmPercent : 0
        )
      ),
    [chartData]
  );

  return (
    <Box sx={{ padding: 2, backgroundColor: "#1e1e1e", color: "#fff" }}>
      {/* Store Selector */}
      <FormControl sx={{ minWidth: 300, marginBottom: 2 }}>
        <InputLabel sx={{ color: "#fff" }}>Select Store</InputLabel>
        <Select
          value={selectedStore}
          onChange={handleStoreChange}
          sx={{
            color: "#fff",
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#ccc" },
            "& .MuiSvgIcon-root": { color: "#fff" },
          }}
        >
          {storeOptions.map((store) => (
            <MenuItem key={store} value={store}>
              {store}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* ✅ Dual-Axis Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid stroke="#444" strokeDasharray="3 3" />
          <XAxis dataKey="week" stroke="#ccc" />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#ccc"
            tickFormatter={(value) =>
              `$${new Intl.NumberFormat().format(value)}`
            }
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#ccc"
            tickFormatter={(value) => `${value}%`}
            domain={[0, maxGMPercent * 1.1]} // Dynamic scaling with padding
          />
          <Tooltip
            formatter={(value, name) => {
              if (typeof value === 'number') {
                return name === "GM %"
                  ? `${(value as number).toFixed(2)}%`
                  : `$${new Intl.NumberFormat().format(value as number)}`;
              }
              return value;
            }}
            contentStyle={{
              backgroundColor: "#333",
              color: "#fff",
              borderRadius: "5px",
              border: "none",
            }}
          />
          <Legend />

          {/* ✅ GM Dollars as Bar */}
          <Bar
            yAxisId="left"
            dataKey="gmDollars"
            name="GM Dollars"
            fill="#4b8ef1"
            barSize={20}
          />
          {/* ✅ GM % as Line */}
          <Line
            yAxisId="right"
            dataKey="gmPercent"
            name="GM %"
            type="monotone"
            stroke="#ff7300"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            connectNulls={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ChartPage;
