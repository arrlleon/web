import { configureStore } from '@reduxjs/toolkit';
import dishReducer from '../features/dishSlice'
import orderSlice from '../features/orderSlice'

const store = configureStore({
  reducer: {
    dishes: dishReducer,
    orders: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
