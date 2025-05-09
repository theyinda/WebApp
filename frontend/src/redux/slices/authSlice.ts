import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    user: null | {
        email: string;
        role: string;
        token: string;
        name: string,
        id: string,
    };
}

const initialState: AuthState = {
    user: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{
            email: string, id: string,
            name: string,
            role: string,
            token: string,
        }>) => {
            state.user = action.payload;
            // state.isAuthenticated = true;
        },
        login: (state, action: PayloadAction<AuthState["user"]>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, login, logout } = authSlice.actions;
export default authSlice.reducer;
