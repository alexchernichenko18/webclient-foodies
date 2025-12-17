import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCurrentUser, uploadAvatar} from './operations';
import {User} from "../../api/authApi";
import {RootState} from "../index";

interface UserState {
    user: User | null;
    error: string | null;
}

const initialState: UserState = {
    user: null,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.error = (action.payload as string) || 'Unknown error';
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                    if (state.user) {
                        state.user.avatar = action.payload;
                    }
                });
    },
});

export const selectUserInfo = (state: RootState) => state.user.user;
export const userReducer = userSlice.reducer;