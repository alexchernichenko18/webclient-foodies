import { userApi, User } from "./userApi";


export const profileApi = {
  getMyFollowers: async (): Promise<User[]> => {
    await userApi.getCurrentUserInfo();

    return [
      { id: "1", name: "John Doe", email: "john@example.com", avatar: "", isSubscribed: true },
      { id: "2", name: "Anna Smith", email: "anna@example.com", avatar: "", isSubscribed: true },
      { id: "3", name: "Mike Johnson", email: "mike@example.com", avatar: "", isSubscribed: false },
    ];
  },

  getMyFollowing: async (): Promise<User[]> => {
    await userApi.getCurrentUserInfo();

    return [
      { id: "10", name: "Chef Maria", email: "maria@example.com", avatar: "", isSubscribed: true },
      { id: "11", name: "Food Hunter", email: "hunter@example.com", avatar: "", isSubscribed: true },
    ];
  },
};
