// src/redux/FavouriteFoodSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for a food item
interface FoodItem {
  _id: string;
  title: string;
  images: string[];
  price: string;
  // Add other properties as necessary
}

// Define a type for the slice state
interface FavouriteFoodState {
  favouriteFood: FoodItem[];
}

// Define the initial state using that type
const initialState: FavouriteFoodState = {
  favouriteFood: [],
};

const FavouriteFoodSlice = createSlice({
  name: "FavouriteFood",
  initialState,
  reducers: {
    addFood: (state, action: PayloadAction<FoodItem>) => {
      state.favouriteFood.push(action.payload);
    },
    removeFood: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      state.favouriteFood = state.favouriteFood.filter(
        (item) => item._id !== itemId
      );
    },
  },
});

export const { addFood, removeFood } = FavouriteFoodSlice.actions;
export default FavouriteFoodSlice.reducer;
