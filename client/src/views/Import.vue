<template>
    <div class="flex w-full flex-col items-center justify-center gap-5">
        <p class="text-5xl font-bold p-2 px-10 text-hi">Import Pulls</p>
        <div class="w-[55rem] h-0.5 from-transparent via-[#1a1a1a] via-50% to-transparent brightness-150 bg-gradient-to-r ml-20 mr-14"/>
        <div class="flex flex-col gap-5 w-[55rem]">
            <div class="flex gap-3 justify-start w-full">
                <button v-for="i in [1, 2]" @click="method = i" :class="(i == method) ? 'bg-secondary !outline-none': ''" class="selectable !px-5">Method {{ i }}</button>
            </div>
            <div class="flex justify-start w-max flex-col gap-3 pl-2">
                <div class="main-container h-10 flex items-center w-max">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">1</p>
                    <p class="pr-5 text-xl">Open Girls' Frontline 2: Exilium on PC.</p>
                </div>
                <div class="main-container h-10 flex items-center w-max">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">2</p>
                    <p class="pr-5 text-xl">Open Access Records and wait for pulls to load.</p>
                </div>
                <div v-if="method == 1" class="flex flex-col gap-3">
                    <div class="main-container h-auto flex w-max pt-2">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">3</p>
                        <div class="flex flex-col gap-2">
                            <p class="text-xl">Open Windows Powershell and run the following command.</p>
                            <div class="flex gap-2 bg-text p-2 mr-5">
                                <button @click="copyToClipboard" class="w-5 h-5">
                                    <svg v-if="!copied" viewBox="0 0 24 24" class="w-full h-full fill-main pt-1"><path id="copySvg" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
                                    <svg v-if="copied" viewBox="0 0 24 24" class="w-full h-full fill-main pt-1"><path id="copySvg" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"></path></svg>
                                </button>
                                <p class="text-md text-main">{{ importCommand }}</p>
                            </div>
                            <a href="https://github.com/alpharmi/macchia.to/blob/main/import.ps1" class="mb-3 text-sm">GitHub</a>
                        </div>
                    </div>
                    <div class="main-container h-auto flex w-max pt-2">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">4</p>
                        <div class="flex flex-col gap-2">
                            <p class="text-xl">Paste the Gacha Data into the input below.</p>
                            <input ref="input" class="input mr-5 mb-3 w-[40rem]" type="text" name="input" placeholder="Gacha Data" >
                        </div>
                    </div>
                </div>
                <div v-if="method == 2" class="flex flex-col gap-3">
                    <div class="main-container h-auto flex w-max pt-2">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">3</p>
                        <div class="flex flex-col gap-2 mr-5">
                            <p class="text-xl">Open File Explorer and find the following file.</p>
                            <p class="text-md text-main bg-text p-2"><span class="text-[#997708]">Drive:</span>\Users\<span class="text-[#997708]">Your User</span>\AppData\LocalLow\SunBorn\EXILIUM\Player.log</p>
                            <p class="text-sm text-description mb-3 flex">If you don't see AppData, that's because you have Hidden Items Disabled. <Tooltip src="/appdata.webp"><p class="border border-highlight text-xs text-highlight cursor-pointer rounded-full ml-1 pt-0.5 px-[0.4rem]">?</p></Tooltip></p>
                        </div>
                    </div>
                    <div class="main-container h-auto flex w-max pt-2">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">4</p>
                        <div class="flex flex-col gap-2 mr-5">
                            <p class="text-xl">Drag & Drop or upload Player.log below.</p>
                            <div class="w-[30rem] h-32 bg-text mb-3 flex flex-col items-center justify-center gap-1 relative">
                                <svg class="w-8 fill-main" viewBox="0 0 99.09 122.88"><path d="M64.64,13,86.77,36.21H64.64V13ZM42.58,71.67a3.25,3.25,0,0,1-4.92-4.25l9.42-10.91a3.26,3.26,0,0,1,4.59-.33,5.14,5.14,0,0,1,.4.41l9.3,10.28a3.24,3.24,0,0,1-4.81,4.35L52.8,67.07V82.52a3.26,3.26,0,1,1-6.52,0V67.38l-3.7,4.29ZM24.22,85.42a3.26,3.26,0,1,1,6.52,0v7.46H68.36V85.42a3.26,3.26,0,1,1,6.51,0V96.14a3.26,3.26,0,0,1-3.26,3.26H27.48a3.26,3.26,0,0,1-3.26-3.26V85.42ZM99.08,39.19c.15-.57-1.18-2.07-2.68-3.56L63.8,1.36A3.63,3.63,0,0,0,61,0H6.62A6.62,6.62,0,0,0,0,6.62V116.26a6.62,6.62,0,0,0,6.62,6.62H92.46a6.62,6.62,0,0,0,6.62-6.62V39.19Zm-7.4,4.42v71.87H7.4V7.37H57.25V39.9A3.71,3.71,0,0,0,61,43.61Z"/></svg>
                                <p class="text-main text-xl text-bold">{{ (loading == "") ? "Drag & Drop or Upload": "Player.log" }}</p>
                                <input @change="importGacha" type="file" class="w-full h-full cursor-pointer absolute opacity-0">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="importGacha" class="button !px-10">Import</button>
        <div :class="(loading != '') ? 'opacity-100': 'opacity-0'" class="flex flex-col items-center pt-5 transition-opacity">
            <img class="h-24" src="/loading.gif">
            <p class="whitespace-pre-line text-center">{{ loading }}</p>
        </div>
    </div>
</template>

<script setup>
    import Tooltip from "../components/Tooltip.vue";
</script>

<script>
    import ongoing from "../data/ongoing.json"

    export default {
        data() {
            return {
                importCommand: 'iwr -useb "https://raw.githubusercontent.com/alpharmi/macchiato.app/refs/heads/main/import.ps1" | iex',
                copied: false,
                loading: "",
                //production: false,
                version: 1,
                method: 1
            }
        },
        methods: {
            redirect(route) {
                this.$router.push({
                    path: route
                })
            },
            copyToClipboard() {
                navigator.clipboard.writeText(this.importCommand)

                this.copied = true
                setInterval(() => {
                    this.copied = false
                }, 1000)
            },
            error(message) {
                setTimeout(() => {
                        this.loading = ""
                    }, 3000)
                this.loading = message
            },
            capitalise(string) {
                return string.replace(/(^\w{1})|(\s{1}\w{1})/g, match => match.toUpperCase())
            },
            /*
            findbyId(id) {
                return charactersLight.find(character => character.name === id) || weaponsLight.find(weapon => weapon.name === id)
            },
            */
            async requestGacha(gachaLogUrl, bannerId, headers, next) {
                return await fetch(gachaLogUrl, {
                    "method": "POST",
                    "headers": headers,
                    "body": `type_id=${bannerId}&limit=20&next=${next}`
                }).then(response => response.json())
            },
            async importGacha(input) {
                var gachaData = {uid: undefined, accessToken: undefined, gachaRecordUrl: undefined, method: undefined}

                if (this.method == 1) {
                    try {
                        gachaData = JSON.parse(this.$refs.input.value)
                    } catch {
                        this.error("Invalid Input.")
                    }
                } else {
                    const playerLog = input.target.files[0]

                    if (playerLog && playerLog.name == "Player.log") {
                        const lines = (await playerLog.text()).split("\n")

                        for (const line of lines) {
                            if (line.startsWith("Response = ")) {
                                if (line.includes("access_token")) {
                                    const response = JSON.parse(line.replace("Response =", ""))

                                    gachaData.accessToken = response.data.access_token
                                    gachaData.uid = response.data.uid
                                } else if (line.includes("gacha_record_url")) {
                                    gachaData.gachaRecordUrl = line.replace("Response = ", "").split("gacha_record_url")[1].split('"}')[0].substring(7)
                                }
                            }
                        }

                        gachaData.method = "upload"
                    } else {
                        this.error("Invalid Input.")
                    }
                }

                if (gachaData) {
                    if (this.loading == "") {
                        const gacha = {banners: {}, version: this.version}

                        if (gachaData && gachaData.uid && gachaData.accessToken && gachaData.gachaRecordUrl) {
                            /*
                            const importGachaUrl = this.production? "https://macchiatogfl.vercel.app/api/importGacha?": "http://localhost:3000/api/importGacha?"
                            
                            const response = await fetch(importGachaUrl + new URLSearchParams({
                                accessToken: gachaData.accessToken
                            })).then(response => response.json()).catch(() => {
                                this.error("Server down. Please try again later.")
                            })
                            */
                            var success = true

                            const headers = new Headers()
                            headers.append("Authorization", gachaData.accessToken)
                            headers.append("Content-Type", "application/x-www-form-urlencoded")

                            for (const banner of ongoing.banners) {
                                if (banner.id && success) {
                                    var next = ""
                                    var itteration = 1

                                    while (true) {
                                        this.loading = `Importing ${this.capitalise(banner.name.replaceAll("_", " "))} banner [${itteration}]...`

                                        const response = await this.requestGacha(gachaData.gachaRecordUrl, banner.id, headers, next)

                                        if (response.code == -1) {
                                            this.error("GFL2 Server Down or Invalid Input.\nPlease try again later.")

                                            success = false

                                            break
                                        } else {
                                            if (!gacha.banners[banner.type] && response.data.list.length > 0) {
                                                gacha.banners[banner.type] = {pulls: [], lastPullDate: response.data.list[0].time || 0}
                                            }

                                            for (const pull of response.data.list) {
                                                gacha.banners[banner.type].pulls.push([pull.item, pull.time])
                                            }

                                            if (response.data.next == "") {
                                                break
                                            } else {
                                                next = response.data.next
                                                itteration += 1
                                            }
                                        }
                                    }
                                }
                            }

                            if (success) {
                                await fetch("https://macchiatogfl.vercel.app/api/logImport?" + new URLSearchParams({
                                    "uid": gachaData.uid,
                                    "method": gachaData.method
                                })) //will probably go in the future, just want to log if things are working at the start.
                                /*setInterval(() => {
                                    this.redirect("/gacha")
                                }, 1000);*/

                                localStorage.setItem("gacha", JSON.stringify(gacha))
                                //this.loading = "Successfully imported banners."

                                this.redirect("/gacha")
                            }
                        } else {
                            this.error("Invalid Input.")
                        }
                    }
                } else {
                    this.error("Invalid Input.")
                }
            }
        }
    }
</script>