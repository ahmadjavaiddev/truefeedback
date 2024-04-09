import { createSlice } from "@reduxjs/toolkit";

const initialState = {
     user: null,
};

const userSlice = createSlice({
     name: "user",
     initialState,
     reducers: {
          setCurrentUser: (state, action) => {
               state.user = action.payload;
               localStorage.setItem("user", JSON.stringify(action.payload));
          },
          logOutUser: (state) => {
               state.user = null;
               localStorage.removeItem("user");
          },
     },
});

export const { setCurrentUser, logOutUser } = userSlice.actions;

export default userSlice.reducer;
