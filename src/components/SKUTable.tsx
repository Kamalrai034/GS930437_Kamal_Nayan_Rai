import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
} from 'ag-grid-community';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteSKU, setSKUs } from '../features/skus/skuSlice';
import { useMemo } from 'react';
import { Box, IconButton } from '@mui/material';
import { Delete, Edit, DragIndicator } from '@mui/icons-material';
import { SKU } from '../features/skus/skuTypes';

ModuleRegistry.registerModules([AllCommunityModule]);

interface SKUTableProps {
  onEdit: (data: SKU) => void;
}

const SKUTable: React.FC<SKUTableProps> = ({ onEdit }) => {
  const skus = useSelector((state: RootState) => state.skus);
  const dispatch = useDispatch();

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: '',
        width: 50,
        rowDrag: true,
        cellRenderer: () => <DragIndicator />,
      },
      {
        headerName: 'SKU',
        field: 'name',
        sortable: true,
        filter: true,
      },
      {
        headerName: 'Price',
        field: 'price',
        sortable: true,
        filter: true,
        valueFormatter: (params) => `$ ${params.value.toFixed(2)}`,
      },
      {
        headerName: 'Cost',
        field: 'cost',
        sortable: true,
        filter: true,
        valueFormatter: (params) => `$ ${params.value.toFixed(2)}`,
      },
      {
        headerName: 'Actions',
        cellRenderer: (params:any) => (
          <>
            <IconButton onClick={() => onEdit(params.data)} size="small">
              <Edit />
            </IconButton>
            <IconButton onClick={() => dispatch(deleteSKU(params.data.id))} size="small">
              <Delete />
            </IconButton>
          </>
        ),
      },
    ],
    [dispatch, onEdit]
  );

  const onRowDragEnd = (event: any) => {
      const newData = [...skus];
      const movingNode = event.node.data;
  
      const fromIndex = newData.findIndex((row) => row.id === movingNode.id);
      newData.splice(fromIndex, 1);
  
      const toIndex = event.overIndex;
      newData.splice(toIndex, 0, movingNode);
  
      dispatch(setSKUs(newData));
    };

  return (
    <Box sx={{ height: 500, width: '100%' }} className="ag-theme-alpine">
      <AgGridReact
        rowData={skus}
        columnDefs={columnDefs}
        rowDragManaged={true}
        animateRows={true}
        onRowDragEnd={onRowDragEnd}
        rowSelection="single"
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
      />
    </Box>
  );
};

export default SKUTable;
