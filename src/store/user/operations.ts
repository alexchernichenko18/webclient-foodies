import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { userApi, User } from '../../api/userApi';

export const uploadAvatar = createAsyncThunk<
    string,
    { file: File },
    { rejectValue: string }
>(
    'auth/uploadAvatar',
    async ({ file }, { rejectWithValue }) => {
        try {
            const response = await userApi.uploadAvatar(file);
            return response.data.avatar;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data?.message || 'Error uploading avatar');
            }
            return rejectWithValue('Unknown error uploading avatar');
        }
    }
);

export const getCurrentUser = createAsyncThunk<
    User,
    void,
    { rejectValue: string }
>(
    'user/info',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userApi.getCurrentUserInfo();
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return rejectWithValue(error.response.data?.message || 'Error fetching user');
            }
            return rejectWithValue('Unknown error fetching user');
        }
    }
);