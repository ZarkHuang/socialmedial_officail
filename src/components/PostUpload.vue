<template>
    <TheModal @close="closeModal">
        <div class="postUpload">
            <label class="upload">
                <img v-if="imageObjUrl" :src="imageObjUrl" class="preview" />
                <img v-else src="../assets/imageIcon.svg" class="preview" alt="" />
                <!-- <TheIcon v-else icon="posts" /> -->
                <input type="file" accept="image/*" class="fileChooser" @change="handleImageUpload" />
            </label>
            <div class="postContent">
                <textarea placeholder="say something....." class="postContentInput" v-model="description"></textarea>
                <TheButton class="pubBtn" @click="publishPost">確定</TheButton>
            </div>
        </div>
    </TheModal>
</template>

<script setup>
import { ref } from 'vue';
import TheModal from "./TheModal.vue";
import TheIcon from "./TheIcon.vue";
import TheButton from "./TheButton.vue";
import { useMainStore } from '../store/index';
import { usePostStore } from '../store/post/index.js';

const mainStore = useMainStore();
const postStore = usePostStore();
const imageObjUrl = ref('');
const description = ref('');
const image = ref(null);

const closeModal = () => {
    mainStore.changeShowPostUpload(false);
}

const handleImageUpload = (e) => {
    const imageFile = e.target.files[0];
    if (imageFile) {
        imageObjUrl.value = URL.createObjectURL(imageFile);
        image.value = imageFile;
    }
};

const publishPost = async () => {
    if (!image.value || description.value.trim() === '') {
        alert('Please add an image and a description.');
        return;
    }

    try {
        await postStore.uploadPost(image.value, description.value);
        alert('發文成功！');
        closeModal();
    } catch (error) {
        console.error('Failed to publish the post:', error);
        alert('Failed to publish the post. Please try again.');
    }
};

</script>

<style scoped>
.postUpload {
    width: 50vw;
    height: 70vh;
    display: grid;
    grid-template-rows: 4fr 1fr;
}

.preview {
    width: 50%;
    height: 50%;
    object-fit: cover;
    min-height: 0;
}

.upload {
    display: grid;
    place-items: center;
    cursor: pointer;
    min-height: 0;
}

.upload>svg {
    width: 254px;
    height: 316px;
}

.fileChooser {
    opacity: 0;
    position: absolute;
}

.postContent {
    display: grid;
}

.postContentInput {
    border-bottom: none;
    resize: none;
    padding: 12px 24px;
}

.postContentInput::placeholder {
    color: #757575;
}

.pubBtn {
    align-self: end;
    justify-self: end;
    position: relative;
    right: 24px;
    bottom: 32px;
}
</style>
