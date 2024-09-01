// src/redux/ProfileSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the profile object (replace 'any' with specific fields as necessary)
interface Profile {
  id: number;
  name: string;
  email: string;
  token: string;
  image: string;
  // Add other properties as necessary
}

// Define a type for the slice state
type ProfileState = Profile[];

// Define the initial state using that type
const initialState: ProfileState = [];

const ProfileSlice = createSlice({
  name: "Profile",
  initialState,
  reducers: {
    addProfile: (state, action: PayloadAction<Profile>) => {
      state.push(action.payload);
    },
    removeProfile: () => {
      return [];
    },
  },
});

export const { addProfile, removeProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
