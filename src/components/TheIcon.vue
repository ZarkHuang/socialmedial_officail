<template>
    <svg>
        <use :href="`${sprite}#icon-${icon}`"></use>
    </svg>
</template>

<script setup lang="ts">
import sprite from '../assets/icons/sprite.svg'

defineProps({
    icon: String,
})
</script>
