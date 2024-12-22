<template>
    <Hint message="This page has yet to be optimised to all screen sizes.,This page still has features in progress, stay tuned."/>

    <div class="w-full h-full flex justify-center pt-10 gap-14">
        <div class="w-40 flex flex-col gap-2">
            <button @click="updateBanner(banner)" v-for="banner of banners" :class="(banner.name == bannerFocused.name) ? 'scale-110 translate-x-2 hover:scale-[1.12] hover:translate-x-2.5': 'hover:scale-105 hover:translate-x-1'" class="banner min-w-40 w-full h-20 relative group transition-transform">
                <div :class="(banner.name == bannerFocused.name) ? 'overflow-hidden': ''" class="absolute w-full bottom-0 h-[81%] rounded-md">
                    <img :class="(banner.name == bannerFocused.name) ? 'group-hover:scale-110 scale-105': ''" class="absolute w-full h-20 bottom-0 transition-transform" :src="`/banners/${(banner.name == bannerFocused.name) ? `${banner.name}_focused`: banner.name}.webp`">
                </div>
                <div :class="(banner.name == bannerFocused.name) ? 'outline-highlight': 'group-hover:outline-[#9b8d76]'" class="absolute bottom-0 outline outline-2 outline-description rounded-md -z-10 w-full h-[81%]"></div>
            </button>
        </div>

        <div class="min-w-0.5 h-auto from-transparent via-[#1a1a1a] via-50% to-transparent brightness-150 bg-gradient-to-b ml-2"/>

        <div v-if="gacha && gacha.banners[bannerFocused.type]" class="gacha-main flex flex-col gap-10 flex-wrap w-max">
            <div class="flex gap-3 items-center justify-between w-full">
                <div class="flex items-center gap-3 flex-wrap">
                    <p class="text-5xl font-black font-harmony-sans capitalize">{{ bannerFocused.name.replaceAll("_", " ") }}</p>
                    <div class="flex gap-3">
                        <p v-if="labels" class="bg-main-light text-xl text-description h-8 w-max px-3 rounded-md capitalize inline-image"><img v-if="!(Number(labels[0].length) < 5)" :src="`/roles/${labels[0]}.webp`"> {{ labels[0] }}</p>
                        <p v-if="labels" class="bg-main-light text-xl text-description flex items-center h-8 w-max px-3 rounded-md capitalize">{{ labels[1] }}</p>
                    </div>
                </div>
                <button @click="redirect('/gacha/import')" class="button w-44">Import Pulls</button>
            </div>

            <div class="flex flex-wrap gap-8">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="min-w-[19rem] h-[17.5rem] flex flex-col gap-5">
                        <div class="main-container h-20 relative">
                            <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl">Lifetime Pulls</p>
                            <p class="absolute w-20 text-center right-8 top-[1.5rem] font-bold text-4xl text-main z-10">{{ gacha.banners[bannerFocused.type].total }}</p>
                            <p class="absolute w-20 text-center left-2 top-8 text-xl text-description z-10 inline-image"><img src="/items/collapse_piece.webp"> {{ (gacha.banners[bannerFocused.type].total * 150).toLocaleString() }}</p>
                            <img class="h-24 absolute right-5 -top-2" src="/pull_background.webp">
                        </div>

                        <div class="main-container h-20 relative">
                            <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl"><span class="gradient-ssr px-2 text-main">SSR</span> Pity</p>
                            <p class="absolute w-20 text-center right-8 top-[1.5rem] font-bold text-4xl text-main z-10">{{ gacha.banners[bannerFocused.type].pity.ssr }}</p>
                            <p class="absolute w-max text-center left-2 top-8 text-md text-description z-10">Guaranteed at 80</p>
                            <img class="h-24 absolute right-5 -top-2" src="/pull_background.webp">
                        </div>

                        <div class="main-container h-20 relative">
                            <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl"><span class="gradient-sr px-2 text-main">SR</span> Pity</p>
                            <p class="absolute w-20 text-center right-8 top-[1.5rem] font-bold text-4xl text-main z-10">{{ gacha.banners[bannerFocused.type].pity.sr }}</p>
                            <p class="absolute w-max text-center left-2 top-8 text-md text-description z-10">Guaranteed at 10</p>
                            <img class="h-24 absolute right-5 -top-2" src="/pull_background.webp">
                        </div>
                    </div>

                    <div class="min-w-[19rem] h-[17.5rem] main-container flex flex-col">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl">Stats</p>
                        <div class="px-2 pt-2 flex justify-center gap-5">
                            <div>
                                <p class="font-bold gradient-ssr text-main px-2 w-min">SSR</p>
                                <p>Pity Average: <span class="text-text font-bold">{{ gacha.banners[bannerFocused.type].stats.ssrAverage }}</span></p>
                                <p>Winrate: <span class="text-text font-bold">{{ Math.floor(gacha.banners[bannerFocused.type].stats.ssrWinrate * 100) }}%</span></p>
                            </div>
                            <div>
                                <p class="font-bold gradient-sr text-main px-2 w-min">SR</p>
                                <p>Pity Average: <span class="text-text font-bold">{{ gacha.banners[bannerFocused.type].stats.srAverage }}</span></p>
                            </div>
                        </div>
                        <div class="w-[19rem] h-full px-4 pt-2 flex flex-wrap content-start overflow-y-auto mb-4">
                            <div v-for="pull in gacha.banners[bannerFocused.type].pulls.filter(pull => pull[4] == 'ssr')" class="w-[3.9rem] h-[3.9rem] relative overflow-hidden">
                                <img style="clip-path: polygon(10% 0, 100% 10%, 90% 100%, 0 85%)" :class="(pull[3] == 'weapon') ? 'pull-weapon !right-3': ''" class="absolute z-10 top-1 w-full scale-95 rounded-lg" :src="`/${pull[3]}s/${pull[1]}.webp`">
                                <img class="absolute" src="/pull_background.webp">
                                <p class="absolute right-0 top-10 z-10 font-bold bg-secondary w-5 text-center">{{ pull[5] }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="main-container h-auto min-w-[38rem] ox">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl">Pull History</p>

                    <div class="px-5 flex-col w-full flex justify-center items-center">
                        <div class="flex gap-3">
                            <button v-for="[rarity, enabled] in Object.entries(filters.rarities)" @click="updateRarityFilter(rarity)" :class="(enabled) ? `gradient-${rarity} text-main !outline-none`: ''" class="selectable">{{ rarity.toUpperCase() }}</button>
                        </div>

                        <div :class="(filters.amount > 20) ? 'overflow-y-scroll max-h-[59rem]': ''" class="w-[38rem] h-auto px-5 mt-5">
                            <table class="w-full">
                                <tr class="text-description text-left">
                                    <th class="pl-8">Date</th>
                                    <th class="text-center pr-2">Pity</th>
                                    <th>Name</th>
                                </tr>
                                <tr v-for="pull in gacha.banners[bannerFocused.type].pulls.filter(pull => filters.rarities[pull[4]]).slice(0, filters.amount)" :class="`pull-${pull[4]}`" class="h-10 border-t border-[#2c3038]">
                                    <th class="w-[12.5rem] pl-5 text-description">{{ pull[0] }}</th>
                                    <th><div class="flex justify-center">{{ pull[5] }}<Tooltip v-if="pull[6]" message="Guaranteed"><img class="w-2" src="/guaranteed.webp"></Tooltip></div></th>
                                    <th class="text-left pl-2 flex items-center capitalize"><img :class="`pull-${pull[3]}`" class="w-10 h-10 mr-2" :src="`/${pull[3]}s/${pull[1]}.webp`">{{ pull[2] }}</th>
                                </tr>
                            </table>
                        </div>

                        <button @click="updateAmountFilter()" class="pb-2 w-40 h-10 text-xl font-harmony">{{ (filters.amount == 10) ? '⌄': '^' }}</button>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="(gacha && !gacha.banners[bannerFocused.type]) || !gacha" class="flex flex-col justify-center items-center w-[61.5rem] h-[25rem]">
            <img class="h-24" src="/missing.gif">
            <p>Missing Gacha Data</p>
            <button @click="redirect('/gacha/import')" class="button w-44 mt-2">Import Pulls</button>
        </div>
    </div>
</template>

<script setup>
    import Hint from "../components/Hint.vue";
    import Tooltip from "../components/Tooltip.vue";
</script>

<script>
    import ongoing from "../data/ongoing.json"
    import attainablesLight from "../data/attainables_light.json"

    export default {
        data() {
            return {
                banners: ongoing.banners,
                bannerFocused: ongoing.banners[0],
                labels: this.getLabels(ongoing.banners[0]),
                gacha: null,
                filters: {rarities: {"ssr": true, "sr": true, "r": true}, amount: 10}
            }
        },
        methods: {
            findAttainableByName(name) {
                return attainablesLight.find(attainable => attainable.name === name) || undefined
            },
            findAttainableById(id) { // could be merged with name, but i'll keep seperate for now.
                return attainablesLight.find(attainable => attainable.id === id) || undefined
            },
            getLabels(banner) {
                const attainable = this.findAttainableByName(banner.name)

                if (attainable) {
                    if (attainable.item == "character") {
                        return [
                            attainable.role, 
                            attainable.roleDescriptions.join(" / ").replaceAll("_", " ")
                        ]
                    } else {
                        return [
                            attainable.type.toUpperCase(), 
                            `${{"smg": "light", "ar": "medium", "rf": "heavy", "hg": "light", "sg": "shotgum", "bld": "melee"}[attainable.type]} ammo`.replace("melee ammo", "melee")
                        ]
                    }
                } else {
                    return null
                }
            },
            updateBanner(banner) {
                if (banner.name != this.bannerFocused.name) {
                    this.filters.amount = 10
                    this.bannerFocused = banner
                    this.labels = this.getLabels(banner)
                }
            },
            updateRarityFilter(rarity) {
                this.filters.rarities[rarity] = !this.filters.rarities[rarity]
            },
            updateAmountFilter() {
                if (this.filters.amount == 10) {
                    this.filters.amount = 999
                } else {
                    this.filters.amount = 10
                }
            },
            redirect(route) {
                this.$router.push({
                    path: route
                })
            }
        },
        mounted() {
            const gacha = JSON.parse(localStorage.getItem("gacha"))

            if (gacha && gacha.banners) {
                const formatted = {}

                //var i = 1
                for (const [bannerType, banner] of Object.entries(gacha.banners)) {
                    formatted[bannerType] = {pulls: [], total: banner.pulls.length, pity: {ssr: 0, sr: 0}, stats: {ssrAverage: [], srAverage: [], ssrWinrate: []}}

                    const formattedBanner = formatted[bannerType]
                    var guaranteed = false

                    for (const pull of banner.pulls.reverse()) {
                        const attainable = this.findAttainableById(pull[0]) || {name: `unknown`, displayName: `Unknown-${pull[0]}`, item: "character", rarity: "r"}

                        const pullFormatted = [
                            new Date(pull[1] * 1000).toLocaleDateString([], { hour: "2-digit", minute: "2-digit" }).replace(",", " "),
                            attainable.name,
                            attainable.displayName || attainable.name.replaceAll("_", " "),
                            attainable.item,
                            attainable.rarity
                        ]

                        formattedBanner.pity.ssr += 1
                        formattedBanner.pity.sr += 1

                        if (attainable.rarity == "sr" || attainable.rarity == "ssr") {
                            const roll = formattedBanner.pity[attainable.rarity]

                            pullFormatted.push(roll)
                            formattedBanner.stats[`${attainable.rarity}Average`].push(roll)

                            formattedBanner.pity[attainable.rarity] = 0
                        }

                        if (attainable.rarity == "ssr") {
                            if (attainable.standard) {
                                guaranteed = true
                                formattedBanner.stats.ssrWinrate.push(0)
                            }

                            if (!attainable.standard && guaranteed) {
                                //formattedBanner.stats.ssrWinrate.push(0)
                                pullFormatted.push(true)
                                guaranteed = false
                            } else if (!attainable.standard && !guaranteed) {
                                formattedBanner.stats.ssrWinrate.push(1)
                            }

                            //formattedBanner.stats.ssrWinrate.push((guaranteed) ? 0: 1)
                        }

                        formattedBanner.pulls.push(pullFormatted)
                    }

                    formattedBanner.pulls.reverse()
                    formattedBanner.stats.srAverage = Math.floor(formattedBanner.stats.srAverage.reduce((a, b, _, pulls) => a + b / pulls.length, 0))
                    formattedBanner.stats.ssrAverage = Math.floor(formattedBanner.stats.ssrAverage.reduce((a, b, _, pulls) => a + b / pulls.length, 0))
                    formattedBanner.stats.ssrWinrate = formattedBanner.stats.ssrWinrate.reduce((a, b, _, pulls) => a + b / pulls.length, 0)
                    //formattedBanner.stats.srAverage = Math.floor(formattedBanner.pulls.filter(pull => pull[4] == "sr").map(pull => pull[5]).reduce((a, b, _, pulls) => a + b / pulls.length, 0))
                    //formattedBanner.stats.ssrAverage = Math.floor(formattedBanner.pulls.filter(pull => pull[4] == "ssr").map(pull => pull[5]).reduce((a, b, _, pulls) => a + b / pulls.length, 0))

                    //console.log(formattedBanner)
                }

                gacha.banners = formatted
                this.gacha = gacha
                this.updateBanner(this.bannerFocused)
            }
        }
    }
</script>