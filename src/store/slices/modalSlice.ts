import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
  signInOpen: boolean;
  signUpOpen: boolean;
  logOutOpen: boolean;
}

const initialState: ModalState = {
  signInOpen: false,
  signUpOpen: false,
  logOutOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSignInModal(state) {
      state.signInOpen = true;
    },
    closeSignInModal(state) {
      state.signInOpen = false;
    },
    openSignUpModal(state) {
      state.signUpOpen = true;
    },
    closeSignUpModal(state) {
      state.signUpOpen = false;
    },
    openLogOutModal(state) {
      state.logOutOpen = true;
    },
    closeLogOutModal(state) {
      state.logOutOpen = false;
    },
    closeAllModals(state) {
      state.signInOpen = false;
      state.signUpOpen = false;
      state.logOutOpen = false;
    },
  },
});

export const {
  openSignInModal,
  closeSignInModal,
  openSignUpModal,
  closeSignUpModal,
  openLogOutModal,
  closeLogOutModal,
  closeAllModals,
} = modalSlice.actions;

export default modalSlice.reducer;