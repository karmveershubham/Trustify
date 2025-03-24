import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

//fetchUSer
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/api/profile`, { credentials: "include" });

    if (!res.ok) {
      throw new Error("Failed to fetch user.");
    }

    const data = await res.json();
    return data.user; 
  } catch (error) {
    return rejectWithValue(error.message || "User fetch failed.");
  }
});

//login
export const login = createAsyncThunk("auth/login", async (formData: { email: string; password: string }, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await res.json();
    if (data.status !== "success") {
      throw new Error(data.message || "Invalid credentials.");
    }

    return data.user; 
  } catch (error) {
    return rejectWithValue(error.message || "Login failed.");
  }
});

//logout
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const res = await fetch(`${API_URL}/api/logout`, { method: "POST", credentials: "include" });

    if (!res.ok) {
      throw new Error("Logout failed.");
    }

    return null;
  } catch (error) {
    return rejectWithValue("Logout failed. Please try again.");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // **Handle Fetch User**
      .addCase(fetchUser.pending, (state) => {
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.user = null;
      })

      // **Handle Login**
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
      })

      // **Handle Logout**
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
