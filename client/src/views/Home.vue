<template>
    <div class="relative flex h-auto flex-col mb-20">
        <div class="w-full h-full flex flex-wrap justify-center gap-5 mb-32 sm:-mb-10">
            <div class="flex flex-col gap-5">
                <div class="main-container w-[28rem] h-[9rem] flex flex-col p-2 relative">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl">Welcome</p>
                    <p><span class="text-highlight z-10">macchiato</span> currently includes a Gacha Counter, and general game information for Girls' Frontline 2. Please note the site is still in development and some features may not work as expected.</p>
                    <p class="absolute font-black right-0 bottom-0 text-7xl opacity-[0.02]">WELCOME</p>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <div class="main-container w-[28rem] h-[9rem] flex flex-col p-2 relative pt-8 gap-1">
                    <p>Import your Pull History to view your latest and previous pulls for Characters and Weapons on all banners.</p>
                    <button @click="redirect('/gacha')" class="button w-max inline-image"><img src="/items/targeted_access_permission.webp" alt="item"> Gacha Tracker</button>
                    <p class="absolute font-black right-0 bottom-0 text-7xl opacity-[0.02]">GACHA</p>
                </div>
            </div>
        </div>

        <div class="relative h-96">
            <img class="debris" src="/debris.webp" alt="debris">
            <img class="splash" src="/splash.webp" alt="macchiato render">
        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            redirect(route) {
                this.$router.push({
                    path: route
                })
            }
        }
    }
</script>