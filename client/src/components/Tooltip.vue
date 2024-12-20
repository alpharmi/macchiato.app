<template>
    <div class="group flex gap-1">
        <p class="border border-highlight text-xs text-highlight cursor-pointer rounded-full ml-1 pt-0.5 px-[0.4rem]">?</p>
        <div class="relative">
            <div class="absolute main-container p-1 w-max h-max ml-2 bg-black z-50 opacity-0 group-hover:opacity-100 transition-opacity">
                <img v-if="src" :src="src">
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