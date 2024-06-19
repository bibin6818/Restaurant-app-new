import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slice/productSlice";

const productStore = configureStore({
  reducer: {
    productReducer: productSlice,
  },
});

export default productStore;