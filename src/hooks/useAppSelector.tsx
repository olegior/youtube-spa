import { TypedUseSelectorHook, useSelector } from 'react-redux'
import type { RootState } from '../types/store'


export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector