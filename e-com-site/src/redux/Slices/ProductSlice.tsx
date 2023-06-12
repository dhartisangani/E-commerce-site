import axios from "axios";
import { Product } from "../../type";
import { PayloadAction } from "@reduxjs/toolkit";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});
interface ProductsState {
  data: Product[];
  status: string | null;
}
const initialState: ProductsState = {
  data: [],
  status: null,
};

// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch: any) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await axios.get(
//         "http://localhost:4000/product/getproductList"
//       );
//       const data = res.data;
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
export const fetchProducts = createAsyncThunk(
  "products/productsFetch",
  async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/product/getproductList"
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // setProducts(state: ProductsState, action: PayloadAction<Product[]>) {
    //   state.data = action.payload;
    // },
    // setStatus(state: ProductsState, action: PayloadAction<string>) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder:any) => {
      builder
          .addCase(fetchProducts.pending, (state:any) => {
              state.status = STATUSES.LOADING;
          })
          .addCase(fetchProducts.fulfilled, (state:any, action:any) => {
              state.data = action.payload;
              state.status = STATUSES.IDLE;
          })
          .addCase(fetchProducts.rejected, (state:any) => {
              state.status = STATUSES.ERROR;
          });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

// Thunks
// export const fetchProducts = createAsyncThunk('product/fetch', async () => {
//     const res = await axios.get('http://localhost:4000/product/getproductList');
//     const data = await res.data;
//     return data;
// });

