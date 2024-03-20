<template>
    <div>
        <h2 class="title">搜索结果：{{ term }}</h2>
        <PostList>
            <PostItem v-for="post in searchResult" :key="post.id" :post="post" />
        </PostList>
    </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import { usePostStore } from "@/store/post/index.js";
import { useRoute } from "vue-router";
import { computed } from "vue";

const postStore = usePostStore();
const searchResult = computed(() => postStore.searchResult);

const route = useRoute();
const term = computed(() => route.params.term);
</script>

<style scoped>
.title {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 44px;
}
</style>
