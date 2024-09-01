// src/redux/CurrentFoodSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for a food item (replace 'any' with an appropriate type if needed)
interface Food {
  _id: string;
  title: string;
  images: string[];
  price: string;
  // Add other properties as necessary
}

// Define a type for the slice state
interface CurrentFoodState {
  currentFood: Food[];
}

// Define the initial state using that type
const initialState: CurrentFoodState = {
  currentFood: [],
};

const CurrentFoodSlice = createSlice({
  name: "CurrentFood",
  initialState,
  reducers: {
    addCurrentFood: (state, action: PayloadAction<Food>) => {
      state.currentFood.push(action.payload);
    },
    removeCurrentFood: (state) => {
      state.currentFood = [];
    },
  },
});

export const { addCurrentFood, removeCurrentFood } = CurrentFoodSlice.actions;
export default CurrentFoodSlice.reducer;
