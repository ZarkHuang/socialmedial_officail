<template>
    <div class="loginPage">
        <img src="../assets/play.png" alt="" class="phoneImage" />
        <div class="loginForm">
            <!-- <img src="../assets/logo.svg" alt="" /> -->
            <h1>Record</h1>
            <form @submit.prevent>
                <input type="email" placeholder="電子信箱" v-model="email" />
                <input v-if="!isLogin" type="text" placeholder="用戶名稱" v-model="username" />
                <input type="password" placeholder="密碼" v-model="password" />
                <button type="submit" class="loginButton" @click="isLogin ? login() : register()">
                    {{ isLogin ? "登入" : "註冊" }}
                </button>
                <p @click="isLogin = !isLogin" class="info">
                    {{ isLogin ? "還沒有帳號？點擊註冊" : "已有帳號？點擊登入" }}
                </p>
                <div v-if="!isLogin" class="agreement">
                    <input type="checkbox" v-model="agreementChecked" />勾選表示同意隱私權益使用規範
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/user/index.js'

const userStore = useUserStore();
const router = useRouter();

const isLogin = ref(true);
const email = ref('');
const username = ref('');
const password = ref('');
const agreementChecked = ref(false);

const login = async () => {
    try {
        await userStore.loginUser({ email: email.value, password: password.value });
        router.replace("/");
    } catch (error) {
        alert('登入失敗，請檢查您的的電子信箱和密碼是否正確');
    }
};

const register = async () => {
    if (!agreementChecked.value) {
        alert('請先閱讀並同意使用規範');
        return;
    }
    if (password.value.length < 6) {
        alert('密码至少需要 6 个字符');
        return;
    }
    try {
        await userStore.registerUser({ email: email.value, username: username.value, password: password.value });
        alert('註冊成功，返回登入頁面。');
        isLogin.value = true;
    } catch (error) {
        if (error.message.includes('Email or Username are already taken')) {
            alert('電子信箱或用戶名已被使用，請嘗試其他電子信箱或用戶名');
        } else {
            alert('註冊失敗，請稍後再試。');
        }
    }
};

</script>

<style scoped>
.loginPage {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 5vw;
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    background: #f8f9fb;

    padding: 0 10vw;
}

.phoneImage {
    max-width: 400px;
    position: relative;
    top: 36px;
    justify-self: end;
}

.loginForm {
    justify-self: start;
    box-shadow: 0px 4px 48px rgba(0, 0, 0, 0.06);
    border-radius: 32px;
    background: white;
    padding: 74px 60px;

    display: grid;
    place-items: center;
    row-gap: 52px;
    width: 380px;
}

.loginForm>form {
    display: grid;
    row-gap: 24px;
    width: 100%;
    height: 100%;
}

input {
    background: #fafafa;
    border-radius: 4px;
    border: none;
}

input::placeholder {
    color: #9e9e9e;
}

.loginButton {
    background: linear-gradient(89.93deg,
            #00c2ff 0.06%,
            #0047ff 105.68%);
    padding: 12px 0;
    color: white;
    border: none;
}

.info {
    color: #1da0ff;
    text-align: center;
    cursor: pointer;
}

.agreement {
    color: #a1a1a1;
    display: flex;
    align-items: center;
    gap: 6px;
}
</style>