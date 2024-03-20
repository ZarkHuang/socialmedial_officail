<template>
    <div>
        <div class="profileContainer">
            <TheAvatar :width="186" :height="186" :src="user.avatar" />
            <div class="profile">
                <p class="name">
                    <span>{{ user.name }}</span><router-link to="/profile/edit">編輯資料</router-link>
                </p>
                <p class="handle">@{{ user.username }}</p>
                <div class="description">
                    <pre>{{ user.intro }}</pre>
                </div>
                <p class="website">{{ user.website }}</p>
            </div>
        </div>
        <div class="tabs">
            <div v-for="(tab, index) in tabs" class="tab" :class="{ active: index === currentTab }" :key="index"
                @click="currentTab = index">
                <TheIcon :icon="tab.icon" />
                <p>{{ tab.label }}</p>
            </div>
        </div>
        <div class="tabContent">
            <p>{{ myPosts[currentTab].length }}</p>
            <div class="posts">
                <img v-for="post in myPosts[currentTab]" :src="post.image" :key="post.id" class="postImage" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import TheIcon from '../components/TheIcon.vue';
import TheAvatar from '../components/base/Avatar.vue';
import { useUserStore } from '@/store/user/index.js';
import { usePostStore } from '@/store/post/index.js';
import {
    loadPostsByMe,
    loadPostsLikedOrFavoredByMe,
} from "../apis/post.js";

const userStore = useUserStore();
const postStore = usePostStore();

const user = ref(userStore.user);

const tabs = ref([
    { label: 'List', icon: 'posts' },
    { label: 'Like', icon: 'like' },
    { label: 'Favor', icon: 'favorite' },
]);

const currentTab = ref(0);
const myPosts = ref({
    0: [],
    1: [],
    2: [],
});
watch(currentTab, async () => {
    switch (currentTab.value) {
        case 0:
            if (myPosts.value[0].length === 0) {
                myPosts.value[0] = await loadPostsByMe();
            }
            break;
        case 1:
            if (myPosts.value[1].length === 0) {
                myPosts.value[1] = await loadPostsLikedOrFavoredByMe();
                console.log("Liked posts:", myPosts.value[1]);
            }
            break;
        case 2:
            if (myPosts.value[2].length === 0) {
                myPosts.value[2] = await loadPostsLikedOrFavoredByMe("favors");
            }
            break;
        default:
            return;
    }
}, { immediate: true });

onMounted(async () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
        user.value = JSON.parse(storedUser);
        userStore.updateUser(user.value);
    }
    await postStore.loadAllPosts();
});
</script>

<style scoped>
.profileContainer {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10vw;
}

.avatar {
    justify-self: end;
}

.profile .name {
    display: flex;
    align-items: center;
}

.profile .name>span {
    font-size: 26px;
}

.profile .name>a {
    color: #1da0ff;
    text-decoration: none;
    margin-left: 26px;
}

.profile .handle {
    margin-top: 4px;
    color: #848484;
}

.profile .description {
    margin-top: 26px;
    margin-bottom: 22px;
}

.tabs {
    display: grid;
    grid-template-columns: repeat(3, 88px);
    column-gap: 4vw;
    justify-content: center;

    margin-top: 7vmin;
    margin-bottom: 20px;
}

.tab {
    text-align: center;
    padding: 12px 0;
    cursor: pointer;
}

.tab>svg {
    width: 32px;
    height: 32px;
    stroke: #8a9194;
    fill: #8a9194;
}

.tab.active {
    background: #f6f9fb;
    border-radius: 18px;
}

.tab.active>svg {
    stroke: #1787d9;
    fill: #1787d9;
}

.tab.active>p {
    color: #1787d9;
}

.tabContent>p {
    text-align: center;
    font-weight: 600;
    margin-bottom: 32px;
}

.posts {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 40px;
}

.postImage {
    width: 100%;
    height: 321px;
    background: #eee;
    object-fit: cover;
}
</style>