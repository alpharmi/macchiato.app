<template>
    <div class="w-full h-full flex flex-col items-center pt-10 gap-5">
        <div class="flex flex-wrap max-w-[60rem] gap-5 pl-5">
            <div v-for="[optionName, value] of Object.entries(options)" class="main-container flex flex-col gap-2 w-min">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl capitalize">{{ optionName.replaceAll("_", " ").replace("sr", "SR") }}</p>
                <div class="flex items-center px-3 mx-3 h-10 mb-2 bg-[#030303]">
                    <img :src="imageUrl(optionName)" class="h-3/4">
                    <input v-model="options[optionName]" v-if="typeof(value) == 'number' || typeof(value) == 'string'" type="number" min="0" @input="update" class="!bg-transparent input w-full !px-1" placeholder="0">
                    <div v-if="typeof(value) == 'boolean'" class="toggle">
                        <input v-model="options[optionName]" @change="update" type="checkbox" :checked='value'/>
                    </div>
                    <div v-if="typeof(value) == 'object'" class="flex items-center pl-2 mr-7">
                        <p class="capitalize">{{ value[1][value[0]] }}</p>
                        <div class="toggle">
                            <input v-model="options[optionName]" @change="update" type="checkbox" :checked='value[0]'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

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
                    refund_sr: true,
                    crystal_contract: false,
                    banner_type: [false, {false: "character", true: "weapon"}]
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
            update() {
                for (const [optionName, value] of Object.entries(this.options)) {
                    if (typeof(value) == "string") {
                        this.options[optionName] = Number(value)
                    }
                }

                //const collapsePiece =  this.options.credit_token + this.options.collapse_piece + (this.options.access_permission * 150)
            }
        }
    }
</script>