// src/stores/userStore.js
import { defineStore } from "pinia";
import { register, login, logout, getUser } from "@/apis/auth";
import { changeUser } from "../../apis/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: getUser() || {},
    jwtToken: localStorage.getItem("jwtToken") || null,
  }),
  actions: {
    async registerUser({ email, username, password }) {
      const user = await register(email, username, password);
      this.user = user;
    },
    async loginUser({ email, password }) {
      const user = await login(email, password);
      this.user = user;
    },
    async updateUser(user) {
      const updatedUser = await changeUser(user);
      this.user = updatedUser;
    },
    logoutUser() {
      logout();
      this.user = {};
    },
  },
});
