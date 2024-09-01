// hooks.ts
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./Store"; // Adjust the path based on your folder structure

export const useAppDispatch: () => AppDispatch = useDispatch;
