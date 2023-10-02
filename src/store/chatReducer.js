import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentChat: {},
    messages: [],
   
}

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers:{
        setCurrentChat: (state, action) => {
            console.log('Action payload', action.payload);
            state.currentChat = action.payload;
        },
        setMessages: (state, action) => {
            console.log('Action messages', action.payload);
            state.messages = action.payload;
        }
    }
});

export const {  setCurrentChat, setMessages } = chatSlice.actions;

export default chatSlice.reducer;