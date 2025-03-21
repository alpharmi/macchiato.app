<template>
    <div class="relative flex h-auto flex-col mb-20">
        <div class="w-full h-full flex flex-wrap justify-center gap-5 mb-32 sm:-mb-10 fade-in">
            <div class="flex flex-col gap-5">
                <div class="main-container max-w-[28rem] min-h-[9rem] flex flex-col p-2 relative">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl">Welcome</p>
                    <p><span class="text-highlight z-10">macchiato.app</span> currently includes a Gacha Counter, Gacha Calculator, and general game information for Girls' Frontline 2. Constantly kept up to date and new content added frequently.</p>
                    <p class="absolute font-black right-0 bottom-0 text-7xl opacity-[0.02]">WELCOME</p>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <div class="main-container max-w-[28rem] min-h-[9rem] flex flex-col p-2 relative pt-8 gap-1">
                    <p>Import your Pull History to view your latest and previous pulls for Characters and Weapons on all banners.</p>
                    <button @click="redirect('/gacha')" class="button w-max inline-image"><img src="/items/targeted_access_permission.webp" alt="item"> Gacha Tracker</button>
                    <p class="absolute font-black right-0 bottom-0 text-7xl opacity-[0.02]">GACHA</p>
                </div>
                <div class="main-container max-w-[28rem] min-h-[9rem] flex flex-col p-2 relative pt-4 gap-1">
                    <p>Calculate the chance of getting a SSR in your next pull, how far you are from soft pity, how much you earn from dailies, and much more.</p>
                    <button @click="redirect('/calculator')" class="button w-max inline-image"><img src="/items/collapse_piece.webp" alt="item"> Gacha Calculator</button>
                    <p class="absolute font-black right-0 bottom-0 text-7xl opacity-[0.02]">CALC</p>
                </div>
            </div>
        </div>

        <div class="relative h-96 -z-10">
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