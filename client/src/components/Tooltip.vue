<template>
    <div class="group flex gap-1">
        <slot></slot>
        <div class="relative">
            <div class="absolute main-container p-1 w-max h-max ml-2 bg-black z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <img v-if="src" :src="src">
                <p v-if="message">{{ message }}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: String,
            src: String
        }
    }
</script>