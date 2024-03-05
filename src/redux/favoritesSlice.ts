import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit/react";
import { AddChangeFavorite, FavoritesType } from "../types";
import { deleteDocumentDB, getDocumentsDB, setDocumentDB } from "../firebase/document";

type FavoritesSlice = {
    isLoading: boolean,
    favorites: FavoritesType[],
    error: string | undefined
}

const initialState: FavoritesSlice = {
    isLoading: false,
    favorites: [],
    error: ''
}

export const getFavorites = createAsyncThunk(
    'favorites/get',
    async (user: string) => {
        return await getDocumentsDB(user)
    }
)

export const updateFavorite = createAsyncThunk('favorites/update', async ({ user, favorite }: AddChangeFavorite) => {
    setDocumentDB(user, favorite);
    return favorite
})

export const deleteFavorite = createAsyncThunk('favorites/delete', async (id: string) => {
    deleteDocumentDB(id)
    return id
})


const favorites = createSlice({
    name: 'favorites',
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(getFavorites.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(getFavorites.fulfilled, (state, action) => {
            state.favorites = action.payload
            state.isLoading = false;
        })
        .addCase(getFavorites.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
        .addCase(updateFavorite.fulfilled, (state, action) => {
            const id = state.favorites.findIndex(e => e.id === action.payload.id)
            state.favorites[id] = action.payload
        })
        .addCase(deleteFavorite.fulfilled, (state, action) => {
            state.favorites = state.favorites.filter(e => e.id !== action.payload)
        }),
    selectors: {
        selectFavorite: createSelector(
            [(state) => state, (_, id) => id],
            (favorites, id) => {
                return favorites.find((el: FavoritesType) => el.id === id)
            }
        ),
    }
})

export const { selectFavorite } = favorites.selectors;
export const favoritesReducer = favorites.reducer;