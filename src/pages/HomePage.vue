<template>
    <div>
        <PostList>
            <PostItem v-for="post in posts" :post="post" :key="post.id" />
        </PostList>
        <PostDetails v-if="showPostDetails" />
        <PostUpload v-if="showPostUpload" />
    </div>
</template>


<script setup>
import { onMounted, computed } from 'vue'
import PostDetails from '../components/PostDetails.vue';
import PostUpload from '../components/PostUpload.vue';
import PostList from '../components/PostList.vue';
import PostItem from '../components/PostItem.vue';
import { useMainStore } from '../store/index.js'
import { usePostStore } from '../store/post/index.js'

const mainStore = useMainStore()
const postStore = usePostStore()
const showPostUpload = computed(() => mainStore.showPostUpload)
const showPostDetails = computed(() => mainStore.showPostDetails);
const posts = computed(() => postStore.list)

onMounted(async () => {
    console.log(posts.value)
    await postStore.loadAllPosts();
});
</script>

<style scoped></style>