import { AgGridReact } from 'ag-grid-react';
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
} from 'ag-grid-community';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { deleteStore, setStores } from '../features/stores/storeSlice';
import { Store } from '../features/stores/storeTypes';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Button, IconButton, Snackbar } from '@mui/material';
import { Delete, Edit, DragIndicator } from '@mui/icons-material';
import { importExcelData } from '../utils/excelUtils';


ModuleRegistry.registerModules([AllCommunityModule]);

interface StoreTableProps {
  onEdit: (data: Store) => void;
}

const StoreTable: React.FC<StoreTableProps> = ({ onEdit }) => {
  const stores = useSelector((state: RootState) => state.stores);
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [rowData, setRowData] = useState<Store[]>([]);

  useEffect(() => {
    setRowData([...stores]);
  }, [stores]);


  const handleDelete = (id: number) => {
    dispatch(deleteStore(id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      importExcelData(file, (data) => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        const newData = data.map((item: any, index: number) => ({
          id: Date.now() + index,
          name: item['Store'] || item['Label'] || '',
          city: item['City'] || '',
          state: item['State'] || '',
        }));
        dispatch(setStores([...stores, ...newData]));
        setSnackbarMessage('Excel data imported successfully!');
        setSnackbarOpen(true);
      });
    }
  };

  const columnDefs = useMemo<ColDef[]>(
    () => [
      {
        headerName: '',
        width: 50,
        rowDrag: true,
        cellRenderer: () => <DragIndicator 
        sx={{ cursor: 'grab' }}
        className="drag-handle"
        />,
        sortable: false,
        filter: false,
      },
      {
        headerName: 'S.No',
        valueGetter: (params) =>
          params.node?.rowIndex != null ? params.node.rowIndex + 1 : '',
        width: 90,
        cellClass: 'serial-cell',
        sortable: false,
      },
      {
        headerName: 'Store',
        field: 'name',
        // editable: true,
        sortable: true,
        filter: true,
        cellClass: 'editable-cell',
      },
      {
        headerName: 'City',
        field: 'city',
        // editable: true,
        sortable: true,
        filter: true,
        cellClass: 'editable-cell',
      },
      {
        headerName: 'State',
        field: 'state',
        // editable: true,
        sortable: true,
        filter: true,
        cellClass: 'editable-cell',
      },
      {
        headerName: 'Actions',
        width: 120,
        /* eslint-disable @typescript-eslint/no-explicit-any */
        cellRenderer: (params: any) =>
          params.data ? (
            <>
              <IconButton onClick={() => onEdit(params.data)} size="small">
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(params.data.id)} size="small">
                <Delete />
              </IconButton>
            </>
          ) : null,
      },
    ],
    [dispatch, onEdit]
  );

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onRowDragEnd = (event: any) => {
    const newData = [...rowData];
    const movingNode = event.node.data;

    const fromIndex = newData.findIndex((row) => row.id === movingNode.id);
    newData.splice(fromIndex, 1);

    const toIndex = event.overIndex;
    newData.splice(toIndex, 0, movingNode);

    setRowData(newData);
    dispatch(setStores(newData));
  };

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
      }}
      className="ag-theme-alpine"
    >
      {/* Upload Button */}
      <Box display="flex" justifyContent="space-between" marginBottom={2}>
        <Button
          variant="contained"
          onClick={() => fileInputRef.current?.click()}
        >
          Import Excel
        </Button>
        <input
          type="file"
          accept=".xlsx, .xls"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
      </Box>

      {/* AG-Grid Table */}
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        rowDragManaged={true}
        animateRows={true}
        // onCellValueChanged={onCellValueChanged}
        // onRowDoubleClicked={(params) => onEdit(params.data)}
        onRowDragEnd={onRowDragEnd}
        // rowSelection="multiple"
        // suppressRowClickSelection={true}
        // suppressMoveWhenRowDragging={false} 
        
      />

      {/* Snackbar for Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default StoreTable;
