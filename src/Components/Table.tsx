import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { DataGrid, GridColDef, GridCellParams  } from '@mui/x-data-grid';
import csvdata from '../utilities/data.csv';
import Papa from "papaparse";
import { useDispatch } from 'react-redux';
import { setData, setAllData } from '../features/chart/chartSlice';



interface Rows {
  id: string;
  No:  number;
  Insp_Date: string;
  RWT_mm:  number;
  Measurement_Status: string;
  LT_CR_mmpy:  number;
  ST_CR_mmpy: number;
  NWT_mm:  number;
  CONC_alert_mm: number;
  MAWT_anomaly_mm:  number;
  T1_yrs: number;
  T2_yrs: number;
  T3_yrs: number;
  T4_yrs: number;
  Report: string;
  TakenBy: string;
  Probe_Isotope: string,
  Inspection_Technique: string,
  Comments: string,
  isEdited?: boolean;
}


const MyComponent = () => {
  
  const [rows, setRows] =  useState<Rows[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const dispatch = useDispatch();

  const getRowId = (row: any) => row['No.'];
  const [gridKey, setGridKey] = useState(0);


  const storeCSVtoRedux = (data: Rows[]) => {
    return {
      InspDate: data.map((item: any) => item['Insp. Date']),
    };
  };
  

  useEffect(() => {
    Papa.parse(csvdata, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        setRows(results.data as Rows[])
        dispatch(setData( storeCSVtoRedux( results.data as Rows[] )))
        dispatch(setAllData( results.data as Rows[]))
        
      }, 
      error: (error) => {
        console.error(error);
      },
    });
  }, [])


  // To change the colour of negative value to red
  
  function renderNegativeCell(params: GridCellParams) {
    const value = params.value as number;
    const isNegative = value < 0;
    const cellClassName = isNegative ? 'negative-cell' : '';
    return <div className={cellClassName}>{value}</div>;
  }

  
  const columns: GridColDef[] =[
  { field: 'No.', headerName: 'No.', width : 70 ,  headerClassName: 'super-app-theme--header', headerAlign: 'center', sortable: true},
  { field: "Insp. Date", headerName: 'Insp. Date', width : 80, sortable: true, headerClassName: 'super-app-theme--header', editable: editMode  },
  { field: 'RWT mm', headerName: `RWT mm` , width : 100, sortable: true, headerClassName: 'super-app-theme--header', editable: editMode,  
    renderCell: (params: GridCellParams) => {
        const row = params.row;
        const value = params.value as string;     
        const currentValue = row['RWT mm']
        const cellValue = row['CONC/T-alert mm'];

        if (parseInt(currentValue) < parseInt(cellValue)) {
          return (
            <div style={{ backgroundColor: 'red', color: 'white', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {value}
            </div>
          );
        } else {
          return (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {value}
            </div>
          );
        }
      },
  },
  { field: 'Measurement Status', headerName: 'Measurement Status', width : 100, sortable: true, headerClassName: 'super-app-theme--header', editable: editMode },
  { field: "LT CR mmpy", headerName: 'LT CR mmpy' , sortable: true, headerClassName: 'super-app-theme--header', editable: editMode },
  { field: 'ST CR mmpy', headerName: 'ST CR mmpy', sortable: true, headerClassName: 'super-app-theme--header', editable: editMode  },
  { field: 'NWT mm', headerName: 'NWT mm', sortable: true, headerClassName: 'super-app-theme--header', editable: editMode },
  { field: "CONC/T-alert mm", headerName: 'CONC/T-alert mm', sortable: true, headerClassName: 'super-app-theme--header', editable: editMode  },
  { field: 'MAWT/T-anomaly mm', headerName: 'MAWT/T-anomaly mm', sortable: true, headerClassName: 'super-app-theme--header', editable: editMode },
  { field: 'T1 yrs', headerName: 'T1 yrs', width : 60, sortable: true, headerClassName: 'super-app-theme--header', editable: editMode, renderCell: renderNegativeCell},
  { field: "T2 yrs", headerName: 'T2 yrs', width : 60, sortable: true, headerClassName: 'super-app-theme--header', editable: editMode, renderCell: renderNegativeCell },
  { field: 'T3 yrs', headerName: 'T3 yrs', width : 60, sortable: true, headerClassName: 'super-app-theme--header', editable: editMode, renderCell: renderNegativeCell },
  { field: 'T4 yrs', headerName: 'T4 yrs', width : 60, sortable: true, headerClassName: 'super-app-theme--header', editable: editMode, renderCell: renderNegativeCell },
  { field: "Report", headerName: 'Report', headerClassName: 'super-app-theme--header', editable: editMode  },
  { field: 'Taken By', headerName: 'Inspector', headerClassName: 'super-app-theme--header', editable: editMode},
  { field: 'Comments', headerName: 'Comments', headerClassName: 'super-app-theme--header', editable: editMode, width: 560 },
  ]


  const handleEditClick=()=>{
    if (editMode){
      setEditMode(false);
    }
    else{
      setEditMode(true);
  }}


  const handleSaveClick = () => {
    dispatch(setData( storeCSVtoRedux(rows)))
    dispatch(setAllData(rows))
    setEditMode(false);
  };

  const handleEditCellChange = (updatedRows: Rows[], key: string) => {
    console.log(updatedRows, 'pppp');
    
    const index = rows.findIndex((row: any) => row['No.'] === key);
    const newRows = [...rows];
    newRows[index] = updatedRows[0]
    setRows(newRows);
    setGridKey((prevKey) => prevKey + 1);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          borderRadius: 1,
          '& .super-app-theme--header': {
            backgroundColor: 'rgba(255, 7, 0, 0.55)',
          },
          
        }}
      >
        <Typography sx={{ mx: 2, fontSize: 25 }}>History</Typography>
        <Box>
          {editMode ? <Button sx={{ mr: 2}} onClick={handleSaveClick} variant="contained">Save</Button>:
          <Button sx={{ mr: 2}} onClick={handleEditClick} variant="outlined">Edit</Button>}
        </Box>
      </Box>
      <Box sx={{
        height: 300,
        width: '100%',
        '& .super-app-theme--header': {
          backgroundColor: '#6666',
        },
      }}>
         <DataGrid sx={{ m: 2, fontSize: 12, height: 290 }} 
            getRowId={getRowId}
            key={gridKey}
            rows={rows}
            columns={columns}
            processRowUpdate  ={(params: any) => handleEditCellChange([params], params['No.'])}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 40, page: 0 },
            },
          }}
        />
      </Box>
      <style>
        {`
        .negative-cell {
          color: red;
        },
      `}
      </style>
    </>
  );
}

export default MyComponent;






