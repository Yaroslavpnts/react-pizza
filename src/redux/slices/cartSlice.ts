import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';
import { RootState } from '../store';

export type CartItem = { 
  id: string
  title: string
  price: number
  imageUrl: string
  type: string
  size: number
  count: number
}

interface CartSliceState  {
  totalPrice: number
  pizzas: Array<CartItem>
}

const {pizzas, totalPrice} = getCartFromLocalStorage()

const initialState: CartSliceState = {
  totalPrice,
  pizzas,
};

export const cartSlice = createSlice({
  name: '@@cart',
  initialState,
  reducers: {
    addPizza: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.pizzas.find(obj => obj.id === action.payload.id);

      if (findItem) {
        findItem.count += 1;
      } else {
        state.pizzas.push({
          ...action.payload,
          count: 1,
        });
      }
      

      state.totalPrice = calcTotalPrice(state.pizzas);
    },

    addPizzaFromCart: (state, action: PayloadAction<string>) => {
      const findItem = state.pizzas.find(obj => obj.id === action.payload);
      if (findItem) {
        findItem.count += 1;
      }
    },

    decreaseCount: (state, action: PayloadAction<string>) => {
      const findItem = state.pizzas.find(obj => obj.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
    removePizza: (state, action: PayloadAction<string>) => {
      state.pizzas = state.pizzas.filter(pizza => pizza.id !== action.payload);
    },
    clearPizzas: state => {
      state.pizzas = [];
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState ) => state.cart;

export const selectCartItemById = (id: string) => (state: RootState) => state.cart.pizzas.find(obj => obj.id === id);

// Action creators are generated for each case reducer function
export const { addPizza, addPizzaFromCart, decreaseCount, removePizza, clearPizzas } = cartSlice.actions;

export default cartSlice.reducer;
