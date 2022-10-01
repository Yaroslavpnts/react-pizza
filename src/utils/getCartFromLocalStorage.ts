import { CartItem } from "../redux/slices/cartSlice";
import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLocalStorage = () => {
    const data = localStorage.getItem('cart');

    const pizzas =  data ? JSON.parse(data) : []

        return {
            pizzas: pizzas as Array<CartItem>,
            totalPrice: calcTotalPrice(pizzas),
        }

}