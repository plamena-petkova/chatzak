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
            state.currentChat = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setClearMessages:  (state, action) => {
            state.messages = [];
            state.currentChat = {};
        }
    }
});

export const {  setCurrentChat, setMessages, setClearMessages } = chatSlice.actions;

export default chatSlice.reducer;