import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteMessageRoute, getAllMessagesRoute, getLastMessagesRoute } from "../utils/apiRoutes";
import axios from "axios";

const initialState = {
  currentChat: {},
  messages: [],
  lastMessage:{},
  isLoading: false,
  isLoadingMessages:false,
  isLoadingDeleteEditMessage:false,
  error: null,
  newMessageIndicator: {},
};

export const getAllMessages = createAsyncThunk(
  "chat/messages",
  async (data) => {
    const response = await axios.post(getAllMessagesRoute, data);
    return response.data;
  }
);

export const getLastMessages = createAsyncThunk(
  "chat/last-message",
  async (data) => {
    const response = await axios.post(getLastMessagesRoute, data);
    return response.data;
  }
);

export const deleteMessage = createAsyncThunk(
  "chat/delete-message",
  async (messageId) => {
    
    const response = await axios.patch(`${deleteMessageRoute}${messageId}`);
    return response.data;
  }
);

export const editMessage =  createAsyncThunk(
  "chat/edit-message",
  async ({messageId, newMessage}) => {
    const response = await axios.put(`${deleteMessageRoute}${messageId}`, {newMessage});
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
    setNewMessageIndicator: (state, action) => {
      if (action.payload) {
        const chatId = action.payload.chatId;

        if (chatId) {
          state.newMessageIndicator[chatId] = action.payload;
        }
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(getAllMessages.pending, (state, action) => {
      state.isLoadingMessages = true;
    });
    builder.addCase(getAllMessages.fulfilled, (state, action) => {
      state.isLoadingMessages = false;
      state.messages = action.payload;
    });
    builder.addCase(getAllMessages.rejected, (state, action) => {
      state.isLoadingMessages = false;
      state.error = action.error;
    }); 
    builder.addCase(getLastMessages.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getLastMessages.fulfilled, (state, action) => {
      state.isLoading = false;
      state.lastMessage = action.payload;
    });
    builder.addCase(getLastMessages.rejected, (state, action) => {
      state.isLoadingDeleteEditMessage = false;
      state.error = action.error;
    }); 
    builder.addCase(deleteMessage.pending, (state, action) => {
      state.isLoadingDeleteEditMessage = true;
    });
    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      state.isLoadingDeleteEditMessage = false;

      const { id, text } = action.payload.message.message;
      
      const index = state.messages.findIndex(msg => msg.id === id);
      
      if (index !== -1) {
        state.messages[index] = {
          ...state.messages[index],
          text: text,
        };
    }
  });
    builder.addCase(deleteMessage.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(editMessage.pending, (state, action) => {
      state.isLoadingDeleteEditMessage = true;
    });
    builder.addCase(editMessage.fulfilled, (state, action) => {
      state.isLoadingDeleteEditMessage = false;

      const { id, text } = action.payload.message.message;
      
      const index = state.messages.findIndex(msg => msg.id === id);
      
      if (index !== -1) {
        state.messages[index] = {
          ...state.messages[index],
          text: text,
        };
    }
     
    });
    builder.addCase(editMessage.rejected, (state, action) => {
      state.isLoadingDeleteEditMessage = false;
      state.error = action.error;
    });
  },
});

export const { setCurrentChat, setMessages, setClearMessages, setNewMessageIndicator, setLastMessage } =
  chatSlice.actions;

export default chatSlice.reducer;
