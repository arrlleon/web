import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { axiosClient } from '../helpers/axiosClient';

export interface Dish {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface DishState {
  items: Dish[];
  loading: boolean;
  error: string | null;
}

const initialState: DishState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchDishes = createAsyncThunk<Dish[]>('dishes/fetchList', async () => {
  try {
    const response = await axiosClient.get('/dishes.json');
    const data = response.data;
    return Object.keys(data).map((key) => ({ id: key, ...data[key] }));
  } catch (error) {
    console.error("Ошибка загрузки блюд:", error);
    throw error;
  }
});

export const addDish = createAsyncThunk<Dish, Omit<Dish, 'id'>>('dishes/add', async (newDish) => {
  const response = await axiosClient.post('/dishes.json', newDish);
  return { id: response.data.name, ...newDish };
});

export const editDish = createAsyncThunk<Dish, Dish>('dishes/edit', async (updatedDish) => {
  await axiosClient.put(`/dishes/${updatedDish.id}.json`, updatedDish);
  return updatedDish;
});

export const deleteDish = createAsyncThunk<string, string>('dishes/delete', async (dishId) => {
  await axiosClient.delete(`/dishes/${dishId}.json`);
  return dishId;
});

const dishSlice = createSlice({
  name: 'dishes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDishes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDishes.fulfilled, (state, action: PayloadAction<Dish[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchDishes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки блюд';
      })
      .addCase(addDish.fulfilled, (state, action: PayloadAction<Dish>) => {
        state.items.push(action.payload);
      })
      .addCase(editDish.fulfilled, (state, action: PayloadAction<Dish>) => {
        const index = state.items.findIndex(dish => dish.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteDish.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(dish => dish.id !== action.payload);
      });
  },
});

export default dishSlice.reducer;
