<template>
    <div v-if="character" class="gacha-main flex items-center justify-center pt-10 px-[4%] sm:px-0">
        <div class="flex flex-wrap gap-8 w-full sm:justify-center">
            <div class="flex sm:w-full gap-8 sm:flex-col">
                <div class="character-container sm:w-full min-w-64 w-64 flex justify-center">
                    <div class="absolute z-10 top-2 sm:-translate-x-1/2 sm:left-1/2 sm:!top-[90%] translate-x-3/4 w-72 h-14">
                        <div class="capitalize w-full h-full absolute flex z-10 justify-center items-center gap-1">
                            <p :class="`gradient-${character.rarity}`" class="text-main font-bold text-2xl translate-y-0.5 !text-[1.6rem] px-3">{{ character.rarity.toUpperCase() }}</p>
                            <p class="text-main font-harmony font-black text-4xl h-min">{{ character.name }}</p>
                        </div>
                        <img :class="character.name.length > 8 ? 'scale-x-125' : ''" class="absolute w-full h-full drop-shadow-lg" src="/calculated_background.webp" alt="">
                    </div>
                    <img class="px-5 h-full object-cover" :src="`/charactersFull/${character.name}_small.webp`" :alt="character.name">
                </div>
                <div class="flex flex-col sm:w-full gap-2 pt-[4.7rem] sm:pt-0">
                    <div class="flex gap-2 flex-wrap sm:justify-center">
                        <p v-for="title of ['role', 'element', 'weapon', 'affiliation']" :class="character[title] ? '' : 'invisible !p-0'" class="bg-secondary p-1 w-max px-2 capitalize inline-image"><img v-if="!(title == 'affiliation' || title == 'weapon')" :src="`/icons/${character[title]}.webp`" alt="">{{ title == 'weapon' ? character[title].toUpperCase() : character[title] }}</p>
                    </div>
                    <div class="main-container sm:max-w-none max-w-[33.4rem] sm:w-full min-h-[5.3rem] p-2 h-auto flex items-center"><p>{{ character.description }}</p></div>
                    <div class="main-container sm:max-w-none max-w-[33.4rem] sm:w-full flex-col">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3">Voice Actors</p>
                        <div class="flex gap-5 pl-2 py-2">
                            <div v-for="[language, name] of Object.entries(character.voiceActors)" class="flex flex-col">
                                <div class="flex items-center gap-1">
                                    <p class="text-description text-sm">{{ language.toUpperCase() }}</p>
                                    <p class="text-description text-sm">{{ name[0] }}</p>
                                </div>
                                <p class="-translate-y-1">{{ name[1] }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap sm:w-full gap-8 self-end">
                <div class="main-container sm:w-full w-[15.7rem] flex flex-col">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3">Best Weapons</p>
                    <div class="flex flex-col w-full p-2 gap-1">
                        <div class="w-full gradient-ssr h-20 flex justify-center relative mb-3">
                            <p class="absolute z-30 bottom-3 left-[1rem] brightness-75 text-sm font-bold text-description">Best In Slot</p>
                            <p class="absolute z-30 -bottom-2 left-[1rem] text-main font-bold capitalize w-48">{{ character.signature.replaceAll("_", " ") }}</p>
                            <img class="absolute z-10 -bottom-3 left-1 w-48" src="/calculated_background.webp" alt="">
                            <img class="h-full scale-[130%] pl-5 -translate-y-2 rotate-[5deg] z-20" :src="`/weapons/${character.signature}.webp`" :alt="character.signature">
                        </div>
                        <div v-for="[i, weapon] in Object.entries(character.weapons)" class="w-full h-10 flex">
                            <img :class="[ i == 0 ? 'gradient-ssr' : 'gradient-sr' ]" class="h-full w-16 object-contain" :src="`/weapons/${typeof(weapon) == 'string' ? weapon : weapon[0]}.webp`" :alt="weapon">
                            <p class="h-full bg-main-light font-bold py-1 text-center w-full capitalize">{{ typeof(weapon) == "string" ? weapon.replaceAll("_", " ") : weapon[1] }}</p>
                        </div>
                    </div>
                </div>
                <div class="main-container sm:w-full w-[15.7rem] pb-2 flex flex-col">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 mb-1">Best Attachment Sets</p>
                    <div class="flex flex-col sm:flex-row justify-center">
                        <div v-for="[i, set] in Object.entries(character.attachments.sets)" class="flex bg-main-light w-max ml-2 mt-1">
                            <p class="px-3 bg-secondary pt-1">{{ Number(i) + 1 }}</p>
                            <p class="capitalize p-1 px-2">{{ set.replaceAll("_", " ") }}</p>
                        </div>
                    </div>
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 mt-2">Best Attachment Sub-Stats</p>
                    <div class="flex flex-wrap gap-1 content-center justify-center bg-main-light mx-2 min-h-[4.2rem] h-full mt-2">
                        <p class="w-max" v-for="[i, subStat] in Object.entries(character.attachments.subStats)">{{ subStat }}<span v-if="!(i == character.attachments.subStats.length - 1)" class="text-description pl-1">></span></p>
                    </div>
                </div>
            </div>
            <div class="main-container w-full">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 mt-2">Skills</p>
                <div class="flex gap-2 p-2 flex-wrap">
                    <div v-for="[type, skill] of Object.entries(character.skills)" class="w-[33.5rem] bg-main-light p-2 flex flex-grow relative">
                        <div class="min-w-16 max-w-16 sm:max-w-10 sm:min-w-10 sm:h-10 flex flex-col gap-2">
                            <img class="border border-description h-16" :src="`/skills/${skill.image_overwrite || skill.name}.webp`" :alt="skill.name">
                            <span class="text-description text-center capitalize text-sm sm:text-xs">{{ type.replaceAll("_", " ") }}</span>
                        </div>
                        <div class="pl-3 flex flex-col">
                            <p class="capitalize font-bold max-w-[calc(100%-5.2rem)]">{{ skill.name.replaceAll("_", " ") }}</p>
                            <div :class="Object.values(skill.stats).reduce((total, stat) => total + stat) > 0 ? 'mb-2' : ''" class="flex mt-1 gap-2 flex-wrap sm:text-sm">
                                <div v-for="[title, stat] of Object.entries(skill.stats)" :class="stat > 0 ? '' : 'hidden'" class="bg-main flex capitalize pr-1"><p class="bg-secondary px-2 mr-1">{{ stat }}</p><p>{{ title.replace("cooldown", "turn_cooldown").replaceAll("_", " ") }}</p></div>
                            </div>
                            <p class="sm:text-sm" v-html="formatDescription(skill.description)"></p>
                            <p v-if="skill.levels" class="text-sm pt-1 text-blue-100">{{ skill.levels[levels[type]].description }}</p>
                            <p class="text-sm text-description pt-1">"{{ skill.quote }}"</p>
                        </div>
                        <div v-if="skill.levels"  class="!absolute right-2 w-max flex flex-col items-end bg-main-light">
                            <button @click="(openLevels == skill.name) ? openLevels = '' : openLevels = skill.name" class="button min-w-20 h-7 !p-0 !px-2 !text-sm">Level {{ Number(levels[type]) + 1 }}</button>
                            <div v-if="openLevels == skill.name" class="main-container flex flex-col mx-2 p-1 translate-x-1.5">
                                <button v-for="[i, level] of Object.entries(skill.levels)" @click="levels[type] = i; openLevels = ''">Level {{ Number(i) + 1 }} <span class="text-description">(V{{ level.fortification }})</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-container w-full">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 mt-2">Keys</p>
                <div class="flex gap-2 p-2 flex-wrap">
                    <div v-for="node in character.nodes" class="w-[30rem] bg-main-light p-2 flex flex-col gap-1 relative flex-grow">
                        <div v-for="[i, key] of Object.entries(node.keys)">
                            <p class="font-bold"><span :class="key.type == 'fixed' ? 'text-description' : 'text-highlight'" class="capitalize pr-1">{{ key.type }} Key</span>{{ key.name }}</p>
                            <p class="pt-1" v-html="formatDescription(key.description)"></p>
                            <div v-if="i == 0 && key.type == 'fixed'" class="w-full h-0.5 bg-main mt-2"/>
                        </div>
                        <div class="bg-secondary absolute right-0 font-bold px-2 translate-x-2">Level {{ node.level }}</div>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-end mb-3">
                <div class="flex items-center justify-center gap-2">
                    <img class="w-12" src="/macchiato_sticker.webp" alt="macchiato_sticker">
                    <div class="flex flex-col">
                        <p>Want to help add characters?</p>
                        <p>Contribute on <a href="https://github.com/alpharmi/macchiato.app/blob/main/contributingCharacters.md">GitHub</a></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*
    for (const character of Object.values(characters)) {
        for (const skill of Object.values(character.skills)) {
            if (skill.levels) {
                skill.levels.unshift({ 'fortification': 0 })
            }
        }
    }
    */

    export default {
        data() {
            return {
                openLevels: "",
                levels : {"basic_attack": 0, "skill_1": 0, "skill_2": 0, "ultimate": 0, "passive": 0},
                character: undefined
            }
        },
        methods: {
            formatDescription(description) {
                description = description
                    .replace(/<(hl*)\b[^>]*>(.*?)<\/\1>/g, '<span class="text-highlight">$2</span>')
                    .replace(/<el\s+(\w+)[^>]*>(.*?)<\/el>/g, '<span class="relative" style="color: var(--$1)">$2</span>')
                    .replace(/<(ef*)\b[^>]*>(.*?)<\/\1>/g, '<span class="text-blue-300">$2</span>')
                    .replaceAll("\n", "<br/>")
                    //.replace(/<el\s+(\w+)[^>]*>(.*?)<\/el>/g, '<span class="relative" style="color: var(--$1)"><img class="absolute top-0 left-0 min-w-5 h-5 translate-y-0.5" src="/icons/$1.webp"><span class="pl-5">$2</span></span>')

                return description
            }
        },
        async mounted() {
            const characters = await fetch("/data/characters.json").then(response => response.json())
            
            const characterName = this.$route.params.name

            if (characterName && characters[characterName]) {
                this.character = characters[characterName]
            } else {
                this.$router.push({ path: "/characters" })
            }
        }
    }
</script>