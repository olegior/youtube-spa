import { useDispatch } from "react-redux";
import { AppDispatch } from "../types/store";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;