import { configureStore } from '@reduxjs/toolkit'
import chartSlice from './features/chart/chartSlice'


export const store = configureStore({
  reducer: {
    Chart : chartSlice
  },
})