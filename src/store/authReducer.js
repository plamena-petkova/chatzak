import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
    allUsers: [],
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setAllUsers: (state, action) => {
            state.allUsers = action.payload.filter((users) => users._id !== state.user._id);
        },
        logout: (state, action) => {
            state.allUsers = [];
            state.user = {};
        },
    },
});

export const {  setUser, setAllUsers, logout } = authSlice.actions;

export default authSlice.reducer;