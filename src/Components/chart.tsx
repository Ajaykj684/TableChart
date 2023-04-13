import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';




const Chart = () =>{

  const csvData = useSelector((state: any) => state.Chart); 
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedData, setSelectedData] = useState<any>([]);
  
  
  useEffect(() => {
    if(csvData.data.length > 0 ){
      const selectedInitialValue = csvData?.['data']?.[0]['Insp. Date']
      setSelectedValue(selectedInitialValue)
    }
  }, [csvData]);
    

  useEffect(() => {
    if(csvData.data.length > 0 ){
        const selectedObject = csvData['data'].find((obj: any) => obj['Insp. Date'] === selectedValue);
        setSelectedData(selectedObject)
    }
  }, [selectedValue, csvData])
  

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {    
    setSelectedValue(event.target.value);
  };


  const options: Highcharts.Options = {
    chart: {
      height: 320
  },

    title: {
      text: "",
    },
    xAxis: {
      categories: ['2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032', '2033', '2034', '2035', '2036', '2037', '2038', '2039', '2040', '2041', '2042', '2043', '2044', '2045', '2046'],
      min: 0,
      max: 24,
    },
    yAxis: {
      title: {
        text: 'Wall thickness (mm)'
      },
      min: 0,
      max: 10, 
      tickInterval: 2 
    },
    legend: {
      verticalAlign: 'top',
      align: 'center',
      y: 10,
      layout: 'horizontal',
    },

    series: [
      {
      type: 'line',
      name: 'CONC/T-alert',
      data: [{x: 0, y: parseFloat(selectedData?.['CONC/T-alert mm']) }, 
             {x: 24, y: parseFloat(selectedData?.['CONC/T-alert mm'])}],
      color: 'orange',
      
    },
    {
      type: 'line',
      name: 'MAWT/T-anomaly',
      data: [{x: 0, y: parseFloat(selectedData?.['MAWT/T-anomaly mm']) }, 
             {x: 24, y: parseFloat(selectedData?.['MAWT/T-anomaly mm'])}],
      color: 'red',
    },
    // {
    //   type: 'line',
    //   name: 'RWT',
    //   data: [{x: 1, y: parseFloat(selectedData?.['RWT mm']) }, 
    //          {x: 24, y: parseFloat(selectedData?.['RWT mm'])}],
    //   color: 'blue'
    // },
    {
      type: 'line',
      name: 'ST',
      data: [{x: 0, y: parseFloat(selectedData?.['ST CR mmpy']) }, 
             {x: 24, y: parseFloat(selectedData?.['ST CR mmpy'])}],
      color: '#8085e9'
    },{
      type: 'line',
      name: 'LT',
      data: [{x: 0, y: parseFloat(selectedData?.['RWT mm']) }, 
             {x: 24, y: parseFloat(selectedData?.['LT CR mmpy'])}],
      color: '#72bcd4'
    },
    // T1, T2, T3, T4 values are hardcoded, need to clarify the equation behind the value 
    {
      type: 'line',                                       
      name: 'T1',
      dashStyle: 'Dash',
      data: [ { x: 3, y:0 },
              { x: 3, y: parseFloat(selectedData?.['CONC/T-alert mm']) },],
      color: '#f4c400'
    },{
      type: 'line',
      name: 'T2',
      dashStyle: 'Dash',
      data: [ { x: 10, y:0 },
              { x: 10, y: parseFloat(selectedData?.['CONC/T-alert mm']) },],
      color: '#f4c400'
    },{
      type: 'line',
      name: 'T3',
      dashStyle: 'Dash',
      data: [ { x: 2, y:0 },
              { x: 2, y: parseFloat(selectedData?.['MAWT/T-anomaly mm']) },],
      color: 'red'
    },{
      type: 'line',
      name: 'T4',
      dashStyle: 'Dash',
      data: [ { x: 13, y:0 },
              { x: 13, y: parseFloat(selectedData?.['MAWT/T-anomaly mm']) },],
      color: 'red'
    },
  ]
  };

  return (
  <>
  <Box sx={{ border: '1px solid', borderColor: '#D3D3D3', m:1}}>
    <Box sx={{display: 'flex', justifyContent: 'space-between', bgcolor: 'background.paper', borderRadius: 1, p:1, border: '1px solid', borderColor: '#D3D3D3', backgroundColor: "#6666", height: 20}}>
      <Typography sx={{fontSize: 12}}>Remaining Wall Thickness and Corrosion Rates</Typography>
      <select value={selectedValue} onChange={handleDropdownChange}>
        {csvData.InspDate.map((chart: any) => (
          <option key={chart} value={chart}>
            {chart}
          </option>
        ))}
      </select>
    </Box>
    <Typography sx={{fontSize: 10, p:1 }}>T1: Time to reach CONC based on short term corrosion rate   |  T2: Time to reach CONC based on long term corrosion rate  |  T3: Time to reach MAWT based on short term corrosion rate  |  T1: Time to reach MAWT based on long term corrosion rate</Typography>
    <Box sx={{ fontSize: 10, mt:2 }}>
     {selectedData && <HighchartsReact highcharts={Highcharts} options={options}  />}
    </Box>
  </Box>
 </>
  )
}

export default Chart




