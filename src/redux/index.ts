import { configureStore } from "@reduxjs/toolkit";
import { searchReducer } from "./searchSlice";
import { favoritesReducer } from "./favoritesSlice";
import { userReducer } from "./userSlice";
import { viewModeReducer } from "./viewModeSlice";

export const store = configureStore({
    reducer: {
        search: searchReducer,
        favorites: favoritesReducer,
        user: userReducer,
        viewMode: viewModeReducer
    },
    devTools: process.env.NODE_ENV !== 'production'
})