import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchMe = createAsyncThunk(
  'auth/fetchMe',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get('/api/auth/me');
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Unauthorized');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/login', data);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post('/api/auth/register', data);
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Registration failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/api/auth/logout');
      return null;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.message || 'Logout failed');
    }
  }
);

const initialState = {
  user: null,
  loading: true, // initial loading until fetchMe resolves
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchMe
      .addCase(fetchMe.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchMe.rejected, (state, action) => {
        state.user = null;
        state.loading = false;
        state.error = action.payload || 'Unauthorized';
      })
      // login
      .addCase(login.pending, (state) => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload || 'Login failed';
      })
      // register
      .addCase(register.pending, (state) => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload || 'Registration failed';
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;

