import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    name: null,
    avatar: null,
    stateChange: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        updateUser: (state, { payload }) => ({
            ...state,
            userId: payload.userId,
            name: payload.name,
            avatar: payload.avatar,
        }),
        stateChange: (state, { payload }) => ({
            ...state,
            stateChange: payload.stateChange,
        }),

        signOutChange: () => initialState,
    },
});

export const { updateUser, stateChange, signOutChange } = authSlice.actions;
export const authReducer = authSlice.reducer;
