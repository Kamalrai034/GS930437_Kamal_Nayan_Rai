import { Box } from "@mui/material";
import PlanningTable from "../components/PlanningTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, } from "react";
import { generatePlanningData } from "../utils/crossJoinUtils";
import { setPlanningData } from "../features/planning/planningSlice";

const Planning = () => {

    const dispatch = useDispatch();
    const planningData = useSelector((state: RootState) => state.planning);
    const stores = useSelector((state: RootState) => state.stores);
    const skus = useSelector((state: RootState) => state.skus);

    useEffect(() => {
        if (planningData.length === 0 && stores.length && skus.length) {
          console.log('No planning data found. Generating cross join...');
          const initialData = generatePlanningData(stores, skus);
    
          dispatch(setPlanningData(initialData));
        } else {
            
        //   Sort rows with Sales Units at the top when returning to the page
          const sortedData = [...planningData].sort((a, b) => {
            if (b.salesUnits && !a.salesUnits) return 1;
            if (!b.salesUnits && a.salesUnits) return -1;
            return 0;
          });
    
          dispatch(setPlanningData(sortedData));
        }
      }, []);
    return (
      <Box sx={{ padding: 2 }}>
        <PlanningTable />
      </Box>
    );
  };
  
  export default Planning;
  