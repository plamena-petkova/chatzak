import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentChat: '',
   
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        setCurrentChat: (state, action) => {
            console.log('Action', action.payload)
            state.currentChat = action?.payload;
        },
    }
});

export const {  setCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;