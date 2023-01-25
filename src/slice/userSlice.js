import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const token = window.localStorage.getItem("token");
let tokenData;

if (token) {
  tokenData = JSON.parse(token);
}

const initialState = {
  user: undefined,
  result: false,
};

export const authUser = createAsyncThunk("fetchUser", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_BASE_URL}/user/myProfile/test`,
    {
      headers: {
        Authorization: tokenData,
      },
    }
  );
  const data = await response.json();

  //   console.log(data);
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (user) => {
    user.addCase(authUser.pending, (state, action) => {});
    // When our request is fulfilled:
    // - store the 'fulfilled' state as the status for the corresponding pokemon name
    // - and store the received payload as the data for the corresponding pokemon name
    user.addCase(authUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.result = action.payload.result;
      state.user = action.payload.user;
      state.result = action.payload.message;
    });
    // When our request is rejected:
    // - store the 'rejected' state as the status for the corresponding pokemon name
    user.addCase(authUser.rejected, (state, action) => {});
  },
});

// export const
