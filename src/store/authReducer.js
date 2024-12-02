import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  allUsersRoute,
  blockUserByIdRoute,
  createAvatarRoute,
  deleteUserByIdRoute,
  editUserByIdRoute,
  getUserByIdRoute,
  invitationRoute,
  loginRoute,
  refreshTokenRoute,
  registerRoute,
  unblockUserByIdRoute,
  updateAvatarRoute,
} from "../utils/apiRoutes";
import axios from "axios";

const initialState = {
  user: {},
  allUsers: [],
  contacts: [],
  isLoading: false,
  error: null,
  avatarUrl: "",
  onlineUsers:{},
  accessToken:"",
  jitsiAccessToken:'',
  blockAlert:{},
  emailHomePage:''
};

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { username, password } = data;
  const response = await axios.post(loginRoute, {
    username,
    password,
  });

  return response.data.sessionUser;
 
});

export const register = createAsyncThunk("user/register", async (data) => {
  const { username, password, names, email } = data;

  const response = await axios.post(registerRoute, {
    username,
    password,
    names,
    email,
  });

  return response.data.sessionUser;
});

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(allUsersRoute);
  return response.data.users;
});

export const createAvatar = createAsyncThunk("user/create-avatar", async ({currentUser}) => {

    
  const userId = currentUser._id;
 
  const avatar = `${createAvatarRoute}${currentUser.username}`;

  const newData = { userId, avatar };

  const response = await axios.put(`${updateAvatarRoute}${userId}`, newData);

  return response.data.user;
  }

);

export const updateUsersAvatar = createAsyncThunk(
  "user/update-avatar",
  async ({currentUser, randomNumber}) => {

    const userId = currentUser._id;
    const avatar = `${createAvatarRoute}${randomNumber}`;

    const newData = { userId, avatar };

    const response = await axios.put(`${updateAvatarRoute}${userId}`, newData);

    return response.data.user;
  }
);

export const getUserById = createAsyncThunk("user/get-user", async (userId) => {
  const response = await axios.get(`${getUserByIdRoute}${userId}`);
  return response.data.user;
});

export const editUserById = createAsyncThunk("user/edit-user", async (data) => {

  const userId = data.currentUser._id;
  const newData = data.updatedField;

  const response = await axios.put(`${editUserByIdRoute}${userId}`, newData);

  return response.data.user;
});

export const deleteUserById = createAsyncThunk("user/delete-user", async (userId) => {

  const response = await axios.delete(`${deleteUserByIdRoute}${userId}`);

  return response.status;
});

export const blockUserById = createAsyncThunk(
  "user/block-user",
  async ({user, blockedUser}) => {

    const userId = user._id;

    const userForBlock = {"blockedUser":blockedUser._id}

    const response = await axios.put(`${blockUserByIdRoute}${userId}`, userForBlock);

    return response.data.user;
  }
);

export const unblockUserById = createAsyncThunk(
  "user/unblock-user",
  async ({user, blockedUser}) => {

    const userId = user._id;

    const userForUnblock = {"blockedUser":blockedUser._id}

    const response = await axios.put(`${unblockUserByIdRoute}${userId}`, userForUnblock);

    return response.data.user;
  }
);

export const sendEmailInvite = createAsyncThunk("user/send-invitation", async (data) => {

  const response = await axios.post(`${invitationRoute}`, data);

  return response;
});

export const refreshJitsiAccessToken = createAsyncThunk("user/refresh-jitsi-access-token", async (data) => {

  const response = await axios.post(`${refreshTokenRoute}`, data);

  return response.data;
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setBlockAlert: (state, action) => {
      state.blockAlert = action.payload.blockedUser;
    },
    setEmailHomePage: (state, action) => {
      state.emailHomePage = action.payload;
    },
    logout: (state, action) => {
      state.allUsers = [];
      state.user = {};
      state.contacts = {};
      state.isLoading = false;
      state.avatarUrl = "";
      state.error = null;
      state.onlineUsers = {};
      state.accessToken = "";
      state.jitsiAccessToken = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      state.jitsiAccessToken = action.payload.jitsiAccessToken;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.jitsiAccessToken = action.payload.jitsiAccessToken;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      if (current(state.user)._id) {
        state.allUsers = action.payload.filter(
          (contact) => contact._id !== current(state.user)._id
        );
      }
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

  
    builder.addCase(createAvatar.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.avatarUrl = action.payload;
    });
    builder.addCase(createAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    
    builder.addCase(updateUsersAvatar.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUsersAvatar.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(updateUsersAvatar.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(getUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(editUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(editUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(deleteUserById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteUserById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(deleteUserById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(sendEmailInvite.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendEmailInvite.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendEmailInvite.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(refreshJitsiAccessToken.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(refreshJitsiAccessToken.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log('Data', action.payload)
      state.jitsiAccessToken = action.payload;
    });
    builder.addCase(refreshJitsiAccessToken.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { logout, setAvatar, setContacts, setErrorClear, setOnlineUsers, setBlockAlert, setEmailHomePage} = authSlice.actions;

export default authSlice.reducer;
