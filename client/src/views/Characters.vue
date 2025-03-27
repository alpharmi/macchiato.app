<template>
    <Hint message="CN characters will be coming very soon.,Characters are gradually being added."/>

    <div class="w-full h-full flex flex-col items-center jus pt-10 gap-10 sm:px-0 px-20 gacha-main">
        <div class="w-full flex gap-2 flex-wrap">
            <div class="main-container w-max p-1 mr-3 flex-grow">
                <input v-model="search" @input="updateSearch()" class="input !bg-description !placeholder-neutral-700 min-w-72 w-full text-black" placeholder="Search Characters">
            </div>
            <div v-for="[title, filter] of Object.entries(filters)" class="main-container w-max p-1 px-3 flex items-center gap-1 mr-3 flex-wrap flex-grow">
                <button @click="resetFilter(title)" :class="filter[0] ? 'bg-secondary !outline-none': ''" class="min-w-20 min-h-9 text-xl selectable sm:min-w-10"><p class="translate-y-1">*</p></button>
                <button v-if="title == 'rarities'" v-for="[rarity, enabled] in Object.entries(filter[1])" @click="updateFilter(title, rarity)" :class="enabled && !filter[0] ? `gradient-${rarity} !outline-none text-main`: ''" class="selectable flex-grow">{{ rarity.toUpperCase() }}</button>
                <button v-if="title == 'elements'" v-for="[element, enabled] in Object.entries(filter[1])" @click="updateFilter(title, element)" :class="enabled && !filter[0] ? `element-${element} !outline-none text-main`: ''" class="selectable capitalize inline-image flex-grow flex justify-center max-w-52"><img :src="`/icons/${element}.webp`" alt=""><p class="sm:hidden">{{ element }}</p></button>
                <button v-if="title == 'roles'" v-for="[role, enabled] in Object.entries(filter[1])" @click="updateFilter(title, role)" :class="enabled && !filter[0] ? `bg-secondary !outline-none`: ''" class="selectable capitalize inline-image flex-grow flex justify-center max-w-52"><img class="py-0.5" :src="`/icons/${role}.webp`" alt=""><p class="sm:hidden">{{ role }}</p></button>
                <button v-if="title == 'weapons'" v-for="[weapon, enabled] in Object.entries(filter[1])" @click="updateFilter(title, weapon)" :class="enabled && !filter[0] ? `bg-secondary !outline-none`: ''" class="selectable flex-grow sm:max-w-20">{{ weapon.toUpperCase() }}</button>
            </div>
            <button @click="resetAll()" class="button h-9 mt-1.5 !px-10">Reset</button>
        </div>

        <div class="grid grid-cols-[repeat(auto-fill,_9rem)] gap-3 w-full justify-between sm:justify-center">
            <div v-for="character in displayed" @click="redirect(`/characters/${character.name}`)" :class="!completed.includes(character.name) ? 'brightness-[30%] pointer-events-none': ''">
                <div :class="character.rarity == 'ssr' ? 'from-[#ffd9a1]' : 'from-purple-300'" class="h-52 hover:brightness-105 transition-all duration-300 to-bg bg-gradient-to-b overflow-hidden relative group">
                    <div class="absolute bottom-0 h-10 w-full z-10 flex items-center justify-center text-lg bg-[#111111f3] backdrop-blur-md capitalize"><p>{{ character.name }}</p></div>
                    <img class="absolute brightness-90 rounded-sm w-6 p-0.5 left-2 top-1 bg-main z-10" :src="`/icons/${character.role}.webp`" :alt="character.role">
                    <img class="absolute brightness-90 rounded-sm w-6 p-0.5 left-2 top-8 bg-main z-10" :src="`/icons/${character.element || 'melee'}.webp`" :alt="character.element || 'melee'">
                    <p v-if="character.id == -1" class="absolute z-10 right-0 bg-red-500 px-2 top-1">CN</p>
                    <img loading="lazy" class="absolute h-full object-cover scale-105 gradient-transparent hover:scale-110 duration-300 transition-transform" :src="`/charactersFull/${character.name}_small.webp`" :alt="character.name">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import Hint from "../components/Hint.vue";
</script>

<script>
    import attainablesLight from "../data/attainables_light.json"

    export default {
        data() {
            return {
                completed: ["makiatto", "klukai"],
                characters: [],
                displayed: [],
                search: "",
                filters: {
                    rarities: [true, {"ssr": true, "sr": true}],
                    elements: [true, {"burn": true, "hydro": true, "freeze": true, "electric": true, "corrosion": true}],
                    roles: [true, {"vanguard": true, "sentinel": true, "bulwark": true, "support": true}],
                    weapons: [true, {"ar": true, "rf": true, "sg": true, "smg": true, "mg": true, "hg": true, "bld": true}]
                }
            }
        },
        methods: {
            updateCharacters() {
                this.displayed = this.characters
                    .filter(character => character.name.startsWith(this.search.toLowerCase()))
                    .filter(character => this.filters.rarities[1][character.rarity] && (this.filters.elements[1][character.element] || this.filters.elements[0] && !character.element) && this.filters.roles[1][character.role] && this.filters.weapons[1][character.weapon])
            },
            updateFilters(filter, exception, value) {
                for (const title of Object.keys(this.filters[filter][1])) {
                    if (exception) {
                        if (title == exception) {
                            this.filters[filter][1][title] = true
                        } else {
                            this.filters[filter][1][title] = false
                        }
                    } else {
                        this.filters[filter][1][title] = value
                    }
                }
            },
            updateSearch() {
                this.updateCharacters()
            },
            updateFilter(filter, input) {
                this.filters[filter][0] = false

                this.updateFilters(filter, input)
                this.updateCharacters()
            },
            resetFilter(filter) {
                this.filters[filter][0] = true

                this.updateFilters(filter, false, true)
                this.updateCharacters()
            },
            resetAll() {
                for (const filter of Object.keys(this.filters)) {
                    this.resetFilter(filter)
                }

                this.updateCharacters()
            },
            redirect(route) {
                this.$router.push({
                    path: route
                })
            }
        },
        mounted() {
            this.characters = attainablesLight.filter(attainable => attainable.item == "character").sort((a, b) => a.name.localeCompare(b.name))

            this.updateCharacters()
        }
    }
</script>