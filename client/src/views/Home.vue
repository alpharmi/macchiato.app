<template>
    <div class="relative flex h-auto flex-col mb-20">
        <div class="w-full h-full flex flex-wrap justify-center gap-5 mb-32 sm:-mb-10 fade-in">
            <div class="flex flex-col gap-5">
                <div class="main-container max-w-[28rem] min-h-[9rem] flex flex-col p-2 relative">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl">Welcome</p>
                    <p><span class="text-highlight z-10">macchiato.app</span> currently includes a Gacha Counter, Gacha Calculator, Character Guides & Builds, and general game information for Girls' Frontline 2. Constantly kept up to date and new content added frequently.</p>
                    <p class="absolute font-black right-0 bottom-0 text-7xl opacity-[0.02]">WELCOME</p>
                </div>
                <div class="main-container max-w-[28rem] min-h-[9rem] flex flex-col p-2 relative">
                    <div class="w-full h-full relative overflow-hidden">
                        <div class="absolute left-0 -top-2 overflow-hidden">
                            <div ref="events" class="flex" :style="{ 'width': `${events.length * 27}rem` }">
                                <img fetchpriority="low" loading="lazy" class="w-[27rem]" alt="event" v-for="event of events" :src="event">
                            </div>
                        </div>
                    </div>
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
            <div class="flex flex-col items-start gap-5 homeWrap:min-w-[28rem] sm:min-w-max">
                <div class="main-container w-[14rem] min-h-[9rem] relative">
                    <img class="absolute z-20 w-36 -top-7 pointer-events-none" src="/characters_overlay.webp" alt="klukai">
                    <img class="absolute w-[11rem] -top-8 -right-11 pointer-events-none" src="/characters_background.webp" alt="makkiato">
                    <button @click="redirect('/characters')" class="button !absolute left-10 bottom-5 w-max inline-image !pl-10 shadow-lg">Characters</button>
                </div>
            </div>
        </div>
    </div>

    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[30rem] translate-y-[calc(20vh-10vw)] -z-10 overflow-hidden">
        <img class="debris" src="/debris.webp" alt="debris">
        <img class="splash" src="/splash.webp" alt="macchiato render">
    </div>
</template>

<script>
    import { reactive } from 'vue'

    var events = reactive([])

    export default {
        data() {
            return {
                events: events
            }
        },
        methods: {
            redirect(route) {
                this.$router.push({
                    path: route
                })
            }
        },
        async mounted() {
            if (events.length == 0) {
                const response = await fetch("https://gf2-zoneinfo-intl.haoplay.com/banner?game_channel_id=10001&type_id=3&language=en").then(response => response.json())

                if (response && response.data) {
                    events = response.data.map(event => event.pic_url)
                    this.events = events
                }
            }

            const [eventsWidth, eventsLength] = [100 / events.length, events.length]
            const keyframes = []

            for (const [i, event] of Object.entries(events)) {
                keyframes.push({ transform: `translateX(-${eventsWidth * i}%)`, offset: Number(String(i / eventsLength)) })
                keyframes.push({ transform: `translateX(-${eventsWidth * i}%)`, offset: Number(String((i / eventsLength) + 0.135)) })
            }

            if (this.$refs.events) {
                this.$refs.events.animate(keyframes, { duration: 50000, iterations: Infinity })
            }
        }
    }
</script>