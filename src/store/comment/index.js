import { defineStore } from "pinia";
import { createComment, loadComments } from "../../apis/comment";

export const useCommentStore = defineStore("comment", {
  state: () => ({
    list: [],
  }),
  actions: {
    async addComment(content, postId) {
      await createComment(content, postId);
      await this.loadAllComments(postId);
    },
    async loadAllComments(postId) {
      const comments = await loadComments(postId);
      this.list = comments;
    },
  },
});
