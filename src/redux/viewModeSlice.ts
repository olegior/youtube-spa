import { createSlice } from "@reduxjs/toolkit"

type ViewModeType = 'grid' | 'list';

const initialState: ViewModeType = 'list';

const viewModeSlice = createSlice({
    name: 'mode',
    initialState: initialState,
    reducers: {
        changeMode: (_, action) => action.payload
    }
})

export const { changeMode } = viewModeSlice.actions
export const viewModeReducer = viewModeSlice.reducer