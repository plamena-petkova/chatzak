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
            state.allUsers = action.payload;
        }
    }
});

export const {  setUser, setAllUsers } = authSlice.actions;

export default authSlice.reducer;