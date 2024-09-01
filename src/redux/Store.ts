import { configureStore } from "@reduxjs/toolkit";
import FavouriteFoodSlice from "./slices/FavouriteFoodSlice";
import ProfileSlice from "./slices/ProfileSlice";
import CurrentFoodSlice from "./slices/CurrentFoodSlice";
import AllFoodSlice from "./slices/AllFoodSlice";

export const Store = configureStore({
  reducer: {
    FavouriteFood: FavouriteFoodSlice,
    Profile: ProfileSlice,
    CurrentFood: CurrentFoodSlice,
    AllFood: AllFoodSlice,
  },
});

// Define the RootState type
export type AppDispatch = typeof Store.dispatch;
export type RootState = ReturnType<typeof Store.getState>;
