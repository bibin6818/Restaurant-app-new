import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const result = await axios.get(
      "https://restaurant-app-server-kqi1.onrender.com/restaurants"
    );
    localStorage.setItem("allProducts", JSON.stringify(result.data));
    return result.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    allProducts: [],
    allProductsDummy: [],
    loading: false,
    error: "",
  },
  reducers: {
    searchProducts: (state, action) => {
      state.allProducts = state.allProductsDummy.filter((item) =>
        item.neighborhood.toLowerCase().includes(action.payload)
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.allProducts = action.payload;
      state.allProductsDummy = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.allProducts = [];
      state.allProductsDummy = [];
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.allProducts = [];
      state.allProductsDummy = [];
      state.loading = false;
      state.error = "API call failed... please try after sometime";
    });
  },
});

export const { searchProducts } = productSlice.actions;

export default productSlice.reducer;