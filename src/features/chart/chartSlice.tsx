import { createSlice } from "@reduxjs/toolkit";

interface CsvDataState {
  InspDate:          number[];
  data:                 any[];

}

const initialState: CsvDataState = {
  InspDate:           [],
  data:               [],

};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    setData: (state, action) => {
        state.InspDate = action.payload.InspDate;
      },
      setAllData: (state, action) => {
        state.data = action.payload
      }
  },
  extraReducers: {},
});

export const { setData, setAllData } = chartSlice.actions;
export default chartSlice.reducer;
