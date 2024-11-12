import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosClient } from "../helpers/axiosClient";

interface Order {
    [dishId: string]: number;
  }
  
  interface OrderState {
    items: Order[];
    loading: boolean;
    error: string | null;
  }
  
  const initialState: OrderState = {
    items: [],
    loading: false,
    error: null,
  };
  
  export const fetchOrders = createAsyncThunk<Order[]>('orders/fetchList', async () => {
    try {
      const response = await axiosClient.get('/orders.json');
      const data = response.data;
      return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
    } catch (error) {
      console.error("Ошибка загрузки заказов:", error);
      throw error;
    }
  });
  
  export const deleteOrder = createAsyncThunk<string, string>('orders/complete', async (orderId) => {
    await axiosClient.delete(`/orders/${orderId}.json`);
    return orderId;
  });
  
  const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchOrders.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchOrders.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Ошибка загрузки заказов';
        })
        .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(order => order.id.toString() !== action.payload);
          });          
    },
  });
  
  export default orderSlice.reducer;
  