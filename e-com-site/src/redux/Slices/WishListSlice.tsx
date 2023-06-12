import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishListItem {
  id: any;
  productName: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

interface WishListState {
  wishlistItems: WishListItem[];
  totalWishlistItems: number;
  totalWishlistQuantity: number;
}

const initialState: WishListState = {
  wishlistItems: localStorage.getItem("WishListItems")
    ? JSON.parse(localStorage.getItem("WishListItems") as any)
    : [],
  totalWishlistItems: 0,
  totalWishlistQuantity: 0,
};

// useEffect(() => {
//   localStorage.setItem("newItem", JSON.stringify(cartItems));
// }, []);

const WishListSlice = createSlice({
  name: "WishList",
  initialState,
  reducers: {
    getTotals(state, action) {
      let { total, quantity } = state.wishlistItems.reduce(
        (cartTotal, wishlistItem) => {
          cartTotal.quantity += wishlistItem.quantity;
          cartTotal.total += wishlistItem.totalPrice;
          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      state.totalWishlistQuantity = quantity;
      state.totalWishlistItems = total;
    },

    addToWishlist: (state, action: PayloadAction<WishListItem>) => {
      const newItem = action.payload;
      const existingItem = state.wishlistItems.find(
        (item) => item.id === newItem.id
      );
      state.totalWishlistQuantity++;
      if (!existingItem) {
        state.wishlistItems.push({
          id: newItem.id,
          productName: newItem.productName,
          image: newItem.image,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      localStorage.setItem(
        "WishListItems",
        JSON.stringify(state.wishlistItems)
      );
      // console.log(state.totalWishlistQuantity);
      // console.log(state.wishlistItems);
      // console.log(newItem);
    },
    deleteWishListItem: (state, action: PayloadAction<WishListItem>) => {
      const id = action.payload;
      const existingItem = state.wishlistItems.find((item) => item.id === id);
      if (existingItem) {
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== id
        );
        state.totalWishlistQuantity =
          state.totalWishlistQuantity - existingItem.quantity;
      }
      localStorage.setItem(
        "WishListItems",
        JSON.stringify(state.wishlistItems)
      );
    },
  },
});

export const WishListAction = WishListSlice.actions;

export default WishListSlice.reducer;
