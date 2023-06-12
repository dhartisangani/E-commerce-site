import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  _id: any;
  id: any;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  totalQuantity: number;
}

const initialState: CartState = {
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems") as any)
    : [],
  totalAmount: 0,
  totalQuantity: 0,
};

// useEffect(() => {
//   localStorage.setItem("newItem", JSON.stringify(cartItems));
// }, []);

const CartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          _id: newItem._id,
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) + Number(newItem.price);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      // console.log(state.totalQuantity);
      console.log(state.cartItems);
      console.log(newItem);
    },
    getTotals(state, action) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, quantity } = cartItem;
          const itemTotal = price * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.totalQuantity = quantity;
      state.totalAmount = total;
    },
    deleteItem: (state, action: PayloadAction<CartItem>) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeItem: (state, action: PayloadAction<CartItem>) => {
      const id = action.payload.id;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        } else {
          existingItem.quantity--;
          existingItem.totalPrice =
            Number(existingItem.totalPrice) - Number(existingItem.price);
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        state.totalQuantity--;
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      localStorage.removeItem("cartItems");
    },
  },
});

export const cartActions = CartSlice.actions;

export default CartSlice.reducer;
