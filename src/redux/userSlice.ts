import { createSlice } from '@reduxjs/toolkit'
import { getLocalStorage } from '../utils/localstorage';
import { UserType } from '../types';

const localUser = JSON.parse(getLocalStorage('user'));

const initialState: UserType = {
    token: localUser.token || '',
    isAuth: localUser.isAuth || false,
    user: localUser.user || ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout: (state) => {
            state.isAuth = false;
            state.token = '';
            state.user = '';
        },
    }
})

export const { login, logout } = userSlice.actions
export const userReducer = userSlice.reducer;