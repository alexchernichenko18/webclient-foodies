import api from "./client";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isSubscribed: boolean;
  [key: string]: any;
}

export const userApi = {
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('img', file);

    return api.patch<{ avatar: string }>('/users/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  getCurrentUserInfo: () => {
    return api.get<User>(`/users/me`);
  },
  getUserById: (id: string) => {
    return api.get<User>(`/users/${id}`);
  },
};