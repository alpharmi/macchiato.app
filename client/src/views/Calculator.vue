<template>
    <div class="w-full h-full flex flex-col items-center jus pt-10 gap-20 gacha-main">
        <div class="flex flex-wrap max-w-[60rem] gap-5 items-center justify-center">
            <div v-for="[optionName, value] of Object.entries(options)" class="main-container flex flex-col gap-2 w-min flex-grow">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl capitalize">{{ optionName.replaceAll("_", " ") }}</p>
                <div class="flex items-center px-3 mx-3 h-10 mb-2 bg-[#030303]">
                    <img :src="imageUrl(optionName)" class="h-3/4">
                    <input v-model="options[optionName]" v-if="typeof(value) == 'number' || typeof(value) == 'string'" :name="optionName" type="number" min="0" @input="update" class="!bg-transparent input w-full !px-1" placeholder="0">
                    <div v-if="typeof(value) == 'boolean'" class="toggle">
                        <input v-model="options[optionName]" :name="optionName" @change="update" type="checkbox" :checked='value'/>
                    </div>
                    <div v-if="typeof(value) == 'object'" class="flex items-center mr-7 min-w-32">
                        <div class="toggle">
                            <input v-model="options[optionName][0]" :name="optionName" @change="update" type="checkbox" :checked='value[0]'/>
                        </div>
                        <p class="capitalize pl-2">{{ value[1][value[0]] }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex gap-8 flex-wrap justify-center">
            <div v-for="[displayGroup, displays] in Object.entries(display).slice(1)" class="main-container relative pb-2">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl capitalize">{{ displayGroup.replaceAll("_", " ") }}</p>
                <div class="relative w-72 mx-2 h-20 -z-0 flex items-center justify-center">
                    <img class="w-10" :src="imageUrl(displayGroup)">
                    <p class="text-4xl text-main z-20 font-bold text-center">{{ displays.total.toLocaleString() }}</p>
                    <img class="h-20 absolute left-0 top-0 -z-10" src="/calculated_background.webp">
                </div>
                <div class="pl-1 pt-2">
                    <p v-for="[display, value] in Object.entries(displays).splice(1)" class="capitalize"><span class="text-highlight font-bold">+</span> <span class="bg-secondary px-1 font-bold">{{ value.toLocaleString() }}</span> {{ display.replaceAll("_", " ") }}</p>
                </div>
            </div>
            <div class="min-w-80 min-h-52 main-container relative">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl capitalize">Stats</p>
                <Tooltip message="Some stats may be slightly innacurate due to a lack of data." class="absolute right-2 top-2"><p class="border border-highlight text-xs text-highlight cursor-pointer rounded-full ml-1 pt-0.5 px-[0.4rem]">?</p></Tooltip>
                <div class="flex items-center justify-center pt-2 flex-col gap-5">
                    <div class="flex flex-col gap-1">
                        <p><span class="bg-secondary px-1">{{ display.stats.nextPull }}%</span> Chance of <span class="gradient-ssr text-main font-bold px-1">SSR</span> in next pull.</p>
                        <p><span class="bg-secondary px-1">{{ display.stats.next10Pull }}%</span> Chance of <span class="gradient-ssr text-main font-bold px-1">SSR</span> in next <span class="font-bold">10</span> pull.</p>
                    </div>
                    <div class="flex gap-5">
                        <p>Soft Pity <span class="bg-secondary px-1">{{ display.stats.softPity }}</span></p>
                        <p>Hard Pity <span class="bg-secondary px-1">{{ display.stats.hardPity }}</span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Tooltip from '../components/Tooltip.vue';
</script>

<script>
    export default {
        data() {
            return {
                options: {
                    access_permission: 0,
                    collapse_piece: 0,
                    credit_token: 0,
                    withdrawal_receipts: 0,
                    current_pity: 0,
                    days_until_pull: 0,
                    //refund_rares: true,
                    crystal_contract: false,
                    banner_type: [false, {false: "character", true: "weapon"}]
                },
                display: {
                    stats: {
                        nextPull: "0.60",
                        next10Pull: "5.84",
                        softPity: "0.00",
                        hardPity: "0.00",
                    },
                    collapse_piece: {
                        total: 0,
                        owned: 0,
                        credit_token_exchange: 0,
                        commisions: 0,
                        crystal_contract: 0
                    },
                    access_permission: {
                        total: 0,
                        owned: 0,
                        previous_pulls: 0,
                        collapse_piece_exchange: 0,
                        withdrawal_receipts_exchange: 0,
                        //rare_refunds: 0
                    }
                }
            }
        },
        methods: {
            imageUrl(optionName) {
                const items = ["access_permission", "collapse_piece", "credit_token", "withdrawal_receipts"]

                if (items.includes(optionName)) {
                    return `/items/${optionName.replace("access_permission", "targeted_access_permission")}.webp`
                } else {
                    return `/${optionName}.webp`
                }
            },
            calculateChance(pity, pullAmount, baseChance, pityChance) {
                if (pity > 79) {
                    pity = 79
                }

                const basePulls = pity < (58 - pullAmount) ? pullAmount : (pity < 58 ? 58 - pity : 0)
                const pityPulls = pullAmount - basePulls
                const pullsAboveSoftcap = pity > 58 ? pity - 58 : 0

                var chance = 1

                for (let i = 1; i <= basePulls; i++) {
                    chance *= (1 - baseChance)
                }

                for (let i = pullsAboveSoftcap + 1; i <= pityPulls + pullsAboveSoftcap; i++) {
                    chance *= (1 - (i * pityChance + baseChance))
                }
                
                return (100 * (1 - chance))
            },
            update() {
                for (const [optionName, value] of Object.entries(this.options)) {
                    if (typeof(value) == "string") {
                        this.options[optionName] = Number(value)
                    }

                    if (typeof(value) == "number") {
                        this.options[optionName] = Math.max(0, Math.min(Number(value), 999999)) || 0
                    }

                    if (optionName == "days_until_pull") {
                        this.options[optionName] = Math.max(0, Math.min(Number(value), 9999)) || 0
                    }
                }

                this.display.collapse_piece.owned = this.options.collapse_piece
                this.display.collapse_piece.credit_token_exchange = this.options.credit_token
                this.display.collapse_piece.commisions = 60 * this.options.days_until_pull
                this.display.collapse_piece.crystal_contract = (this.options.crystal_contract) ? (80 * this.options.days_until_pull): 0
                this.display.collapse_piece.total = Object.values(this.display.collapse_piece).slice(1).reduce((a, b) => a + b)

                this.display.access_permission.owned = this.options.access_permission
                this.display.access_permission.previous_pulls = this.options.current_pity
                this.display.access_permission.collapse_piece_exchange = Math.floor(this.display.collapse_piece.total / 150)
                this.display.access_permission.withdrawal_receipts_exchange = (1 + Math.floor(this.options.days_until_pull / 7)) * Math.min(Math.floor(this.options.withdrawal_receipts / 20), 5)
                this.display.access_permission.total = Object.values(this.display.access_permission).slice(1).reduce((a, b) => a + b)
                //const total = Object.values(this.display.access_permission).slice(1).reduce((a, b) => a + b)
                //this.display.access_permission.rare_refunds = Math.floor((total * 1.7) / 20)
                //this.display.access_permission.total = total + this.display.access_permission.rare_refunds

                const accessPermissions = this.display.access_permission.total

                if (this.options.banner_type[0]) {
                    this.display.stats.nextPull = this.calculateChance(accessPermissions, 1, 0.007, 0.04518).toFixed(2)
                    this.display.stats.next10Pull = this.calculateChance(accessPermissions, 10, 0.007, 0.04518).toFixed(2)
                } else {
                    this.display.stats.nextPull = this.calculateChance(accessPermissions, 1, 0.006, 0.04518).toFixed(2)
                    this.display.stats.next10Pull = this.calculateChance(accessPermissions, 10, 0.006, 0.04518).toFixed(2)
                }

                this.display.stats.softPity = (1 - ((58 - accessPermissions) / 58)).toFixed(2)
                this.display.stats.hardPity = (1 - ((80 - accessPermissions) / 80)).toFixed(2)
            }
        }
    }
</script>