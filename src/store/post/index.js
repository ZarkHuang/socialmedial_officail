import { defineStore } from "pinia";
import {
  createPost,
  loadPosts,
  loadPostsLikedOrFavoredByMe,
  likePost,
  favorPost,
} from "../../apis/post";

export const usePostStore = defineStore("post", {
  state: () => ({
    list: [],
    searchResult: [],
    currentId: null,
    likedPosts: [],
    favoredPosts: [],
  }),
  actions: {
    async uploadPost(image, description) {
      await createPost(image, description);
      this.loadAllPosts();
    },
    async loadAllPosts() {
      const posts = await loadPosts();
      this.list = posts;
    },
    async toggleLike(id) {
      const isLike = await likePost(id);
      const post = this.list.find((post) => post.id === id);
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1;
      } else {
        post.liked_bies--;
      }
      post.likedByMe = isLike;
    },
    async toggleFavor(id) {
      const isFavor = await favorPost(id);
      const post = this.list.find((post) => post.id === id);
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1;
      } else {
        post.favored_bies--;
      }
      post.favoredByMe = isFavor;
    },
    async loadLikedPosts() {
      this.liked = await loadPostsLikedOrFavoredByMe();
      console.log("Liked posts:", this.liked);
    },
    async loadFavoredPosts() {
      this.favored = await loadPostsLikedOrFavoredByMe("favors");
      console.log("Favored posts:", this.favored);
    },

    async loadLikedPosts() {
      this.likedPosts = await loadPostsLikedOrFavoredByMe();
    },
    async loadFavoredPosts() {
      this.favoredPosts = await loadPostsLikedOrFavoredByMe("favors");
    },

    setCurrentId(id) {
      this.currentId = id;
    },
    async searchPosts(term) {
      const posts = await loadPosts(`filters[description][$contains]=${term}`);
      this.searchResult = posts;
    },
  },
  getters: {
    postDetails: (state) =>
      state.list.find((post) => post.id === state.currentId),
  },
});
