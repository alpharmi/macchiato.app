<template>
    <div class="w-full flex items-center justify-center">
        <div class="main-container py-2 min-h-20 w-auto whitespace-pre-line flex items-center gap-3 px-5 text-description">
            <img class="w-14" src="/macchiato_sticker.webp" alt="macchiato_sticker">
            <p v-html="`• ${message.replace(',', '\n• ')}`"></p>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            message: String
        }
    }
</script>