// src/redux/codeSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the food item
interface Food {
  _id: string;
  images: string[]; // Array of image URLs
  title: string;
  price: string;
  // Add other properties as needed
}

// Define a type for the slice state
interface FoodState {
  allFoods: Food[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define the initial state using that type
const initialState: FoodState = {
  allFoods: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch the foods from the server
export const fetchFoods = createAsyncThunk<Food[], void>(
  "foods/fetchFoods",
  async () => {
    const response = await axios.get(`${process.env.REACT_APP_GET_ALL_FOODS}`);
    let data = await response.data;
    let allFoods = data.food;

    return allFoods;
  }
);

const allFoodSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFoods.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFoods.fulfilled, (state, action: PayloadAction<Food[]>) => {
        state.status = "succeeded";
        state.allFoods = action.payload;
      })
      .addCase(fetchFoods.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export default allFoodSlice.reducer;
