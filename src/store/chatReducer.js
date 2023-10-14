import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteMessageRoute, getAllMessagesRoute } from "../utils/apiRoutes";
import axios from "axios";

const initialState = {
  currentChat: {},
  messages: [],
  isLoading: false,
  error: null,
};

export const getAllMessages = createAsyncThunk(
  "chat/messages",
  async (data) => {
    const response = await axios.post(getAllMessagesRoute, data);
    return response.data;
  }
);

export const deleteMessage = createAsyncThunk(
  "chat/delete-message",
  async (messageId) => {
    
    const response = await axios.put(`${deleteMessageRoute}${messageId}`);
    return response.data;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setClearMessages: (state, action) => {
      state.messages = [];
      state.currentChat = {};
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload;
    });
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteMessage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.messages = action.payload.message;
     
    });
    builder.addCase(deleteMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { setCurrentChat, setMessages, setClearMessages } =
  chatSlice.actions;

export default chatSlice.reducer;
