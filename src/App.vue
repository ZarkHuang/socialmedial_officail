<template>
    <template v-if="$route.name !== 'login'">
        <header>
            <Navbar />
        </header>
        <TheLayout>
            <router-view></router-view>
        </TheLayout>
    </template>
    <template v-else>
        <router-view></router-view>
    </template>

    <footer class="footer" :class="{ inside: $route.name === 'login' }">
        &copy;Zark Huang. All Rights Reserved.
    </footer>


</template>

<script setup lang="ts">
import './assets/base.css'
import Navbar from './components/base/Navbar.vue';
import TheLayout from '@/components/TheLayout.vue';

console.log(import.meta.env.VITE_API_BASE_URL);
</script>

<style scoped>
.header {
    text-align: center;
    padding: 38px 0;
    color: #828282;
}

.footer {
    text-align: center;
    padding: 38px 0;
    color: #828282;
    width: 100%;
    font-size: 12px;
}

.footer.inside {
    position: absolute;
    bottom: 0;
    width: 100%;
}
</style>
