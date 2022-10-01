import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { CartItem } from './cartSlice';
import { SortItem } from './filterSlice';

// type FetchPizzasArgs = {
//   category: string
//   sortBy: string
//   order: string
//   search: string
//   currentPage : string
// }

/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  Чтобы не писать что все ключи строки и значения строки, юзаю Record
*/
// type FetchPizzasArgs = Record<string, string>

type PizzaItem = {
  id: string
  title: string
  price: number
  imageUrl: string
  sizes: Array<number>
  types: Array<number>
  rating: number
}

export type SearchPizzaParams = {
  category: string
  sortBy: string
  order: string
  search: string
  currentPage: string
}

export const fetchPizzas = createAsyncThunk<Array<PizzaItem>,SearchPizzaParams>(
  '@@pizzas/fetchPizzasData',
  async (params: SearchPizzaParams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<Array<PizzaItem>>(
      `https://632b1d361090510116d1aeb1.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    );

    // if (data.length === 0) {
    //   thunkApi.rejectWithValue('Пицц нет');
    // }

    // return thunkApi.fulfillWithValue(data);
    return data;
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

interface PizzasSliceState{
  items: Array<PizzaItem>
  status: Status
}

const initialState: PizzasSliceState = {
  items: [],
  status: Status.LOADING, // loading | success | error
};

export const pizzasSlice = createSlice({
  name: '@@pizzas',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Array<PizzaItem>>) => {
      state.items = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    })
    .addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    })
    .addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    })
  },

  // extraReducers: {
  //   [fetchPizzas.pending]: state => {
  //     state.status = 'loading';
  //     state.items = [];
  //   },
  //   [fetchPizzas.fulfilled]: (state, action) => {
  //     console.log(action);
  //     state.items = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected]: (state, action) => {
  //     console.log(action);
  //     state.status = 'error';
  //     state.items = [];
  //   },
  // },
});

export const selectPizzas = (state: RootState) => state.pizzas;

// Action creators are generated for each case reducer function
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
