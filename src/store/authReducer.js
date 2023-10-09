import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  allUsersRoute,
  loginRoute,
  registerRoute,
  updateAvatarRoute,
} from "../utils/apiRoutes";
import axios from "axios";

const initialState = {
  user: {},
  allUsers: [],
  isLoading: false,
  error: null,
  avatarUrl: "",
};

export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const response = await axios.get(allUsersRoute);
  return response.data.users;
});

export const login = createAsyncThunk("user/register", async (data) => {
  const { username, password } = data;

  const response = await axios.post(loginRoute, {
    username,
    password,
  });

  return response.data.user;
});

export const register = createAsyncThunk("user/login", async (data) => {
  const { username, password, names, email } = data;

  const response = await axios.post(registerRoute, {
    username,
    password,
    names,
    email,
  });

  return response.data.user;
});

/*
export const createAvatar = createAsyncThunk("user/create-avatar", async (data) => {
try {
  const response = await axios.post(createAvatarRoute, data, {
    headers: {
      'Content-Type': `multipart/form-data`,
      'X-Token':'196b61b29bb442fc9fd97a7b187ea63e'
    },
  });
  console.log('response', response);

return response.data.face.url;
} catch (e) {
  console.error('Error', e);
}
  
});
*/
export const updateUsersAvatar = createAsyncThunk(
  "user/update-avatar",
  async (data) => {
    try {
      const { currentUser, avatar } = data;
      const userId = currentUser._id;

      const newData = { userId, avatar };

      const response = await axios.put(
        `${updateAvatarRoute}${userId}`,
        newData
      );

      console.log("Data", `${updateAvatarRoute}${userId}`, newData);

      console.log("Response", response);

      return response.data.user;
    } catch (e) {
      console.error("Error", e);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAvatar: (state, action) => {
      state.avatarUrl = action.payload;
    },
    logout: (state, action) => {
      state.allUsers = [];
      state.user = {};
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
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
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
    /*
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
    */
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
  },
});

export const { logout, setAvatar } = authSlice.actions;

export default authSlice.reducer;
