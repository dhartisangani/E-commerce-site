import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import CartSlice from "./Slices/CartSlice";
import WishListSlice from "./Slices/WishListSlice";
import ProductSlice from "./Slices/ProductSlice";

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    products: ProductSlice,
    cart: CartSlice,
    wishlist: WishListSlice,
  },
});

// export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

// export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
