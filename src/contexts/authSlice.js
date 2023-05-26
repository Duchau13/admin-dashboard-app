import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState:{
        login:{
            currentUser:null,
            isFetching:false,
            error:false,
        },
        logout:{
            isFetching:false,
            error:false,
        }
    },
    reducers:{
        loginStart:(state) => {
            state.login.isFetching = true;
        },
        loginSuccess:(state,action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed:(state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        logoutSuccess:(state,action) => {
            state.logout.isFetching = false;
            state.login.currentUser = null;
            state.logout.error = false;
        },
        logoutFailed:(state) => {
            state.logout.isFetching = false;
            state.logout.error = true;
        },
        logoutStart:(state) => {
            state.logout.isFetching = true;
        }
    }
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess
} = authSlice.actions;

export default authSlice.reducer;