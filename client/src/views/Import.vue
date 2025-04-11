<template>
    <div class="flex w-full flex-col items-center justify-center gap-5">
        <p class="text-5xl font-black p-2 font-harmony text-center">Import Pulls</p>
        <div class="max-w-[58rem] w-full h-0.5 from-transparent via-[#1a1a1a] via-50% to-transparent brightness-150 bg-gradient-to-r ml-20 mr-14"/>
        <div class="flex flex-col gap-5 w-full max-w-[58rem]">
            <div class="flex gap-3 justify-start w-full mb:justify-center flex-wrap">
                <button v-for="methodName in ['PC 1', 'PC 2', 'IOS']" @click="method = methodName" :class="(methodName == method) ? 'bg-secondary !outline-none': ''" class="selectable !px-8 h-9">{{ methodName }}</button>
            </div>
            <div class="flex justify-start w-full max-w-max flex-col gap-3 pl-2 mb:pl-1">
                <div v-if="method == 'PC 1' || method == 'PC 2'" class="main-container max-w-max py-1 flex items-start">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">1</p>
                    <p class=" text-xl px-2">Open Girls' Frontline 2: Exilium on PC.</p>
                </div>
                <div v-if="method == 'PC 1' || method == 'PC 2'" class="main-container max-w-max py-1 flex items-start">
                    <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">2</p>
                    <p class="text-xl px-2">Open Access Records and wait for pulls to load.</p>
                </div>
                <div v-if="method == 'PC 1'" class="flex flex-col gap-3">
                    <div class="main-container h-auto flex w-full max-w-max pt-2">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">3</p>
                        <div class="flex flex-col gap-2 w-full pr-10">
                            <p class="text-xl">Open Windows Powershell and run the following command.</p>
                            <div class="flex gap-2 bg-text p-2">
                                <button @click="copyToClipboard" class="w-5 h-5 min-w-5">
                                    <svg v-if="!copied" viewBox="0 0 24 24" class="w-full h-full fill-main pt-1"><path id="copySvg" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
                                    <svg v-if="copied" viewBox="0 0 24 24" class="w-full h-full fill-main pt-1"><path id="copySvg" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"></path></svg>
                                </button>
                                <p class="text-md text-main break-words w-full mb:pr-8">{{ importCommand }}</p>
                            </div>
                            <a href="https://github.com/alpharmi/macchiato.app/blob/main/import.ps1" class="mb-3 text-sm">GitHub</a>
                        </div>
                    </div>
                    <div class="main-container h-auto flex w-full max-w-[40rem] pt-2">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">4</p>
                        <div class="flex flex-col gap-2 w-full pr-5">
                            <p class="text-xl">Paste the Gacha Data into the input below.</p>
                            <input ref="input" class="input mr-5 mb-3 w-full" type="text" name="input" placeholder="Gacha Data" >
                        </div>
                    </div>
                </div>
                <div v-if="method == 'PC 2'" class="flex flex-col gap-3">
                    <div class="main-container h-auto flex w-full max-w-max pt-2 pr-5">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">3</p>
                        <div class="flex flex-col w-full gap-2 mr-5 mb:pr-5">
                            <p class="text-xl">Open File Explorer and find the following file.</p>
                            <p class="text-md text-main bg-text p-2 w-full break-words"><span class="text-[#997708]">Drive:</span>\Users\<span class="text-[#997708]">Your User</span>\AppData\LocalLow\SunBorn\EXILIUM\Player.log</p>
                            <p class="text-sm text-description mb-3 flex">If you don't see AppData, that's because you have Hidden Items Disabled. <Tooltip src="/appdata.webp"><p class="border border-highlight text-xs text-highlight cursor-pointer rounded-full ml-1 pt-0.5 max-h-[1.4rem] px-[0.4rem]">?</p></Tooltip></p>
                        </div>
                    </div>
                    <div class="main-container h-auto flex w-full max-w-[40rem] pt-2">
                        <p class="font-bold bg-secondary px-3 -translate-x-3 text-xl h-min">4</p>
                        <div class="flex flex-col gap-2 w-[40rem] mb:pr-5">
                            <p class="text-xl">Drag & Drop or upload Player.log below.</p>
                            <div class="max-w-full h-32 bg-text mb-3 flex flex-col items-center justify-center gap-1 relative mr-5">
                                <svg class="w-8 fill-main" viewBox="0 0 99.09 122.88"><path d="M64.64,13,86.77,36.21H64.64V13ZM42.58,71.67a3.25,3.25,0,0,1-4.92-4.25l9.42-10.91a3.26,3.26,0,0,1,4.59-.33,5.14,5.14,0,0,1,.4.41l9.3,10.28a3.24,3.24,0,0,1-4.81,4.35L52.8,67.07V82.52a3.26,3.26,0,1,1-6.52,0V67.38l-3.7,4.29ZM24.22,85.42a3.26,3.26,0,1,1,6.52,0v7.46H68.36V85.42a3.26,3.26,0,1,1,6.51,0V96.14a3.26,3.26,0,0,1-3.26,3.26H27.48a3.26,3.26,0,0,1-3.26-3.26V85.42ZM99.08,39.19c.15-.57-1.18-2.07-2.68-3.56L63.8,1.36A3.63,3.63,0,0,0,61,0H6.62A6.62,6.62,0,0,0,0,6.62V116.26a6.62,6.62,0,0,0,6.62,6.62H92.46a6.62,6.62,0,0,0,6.62-6.62V39.19Zm-7.4,4.42v71.87H7.4V7.37H57.25V39.9A3.71,3.71,0,0,0,61,43.61Z"/></svg>
                                <p class="text-main text-xl text-bold">{{ (loading == "") ? "Drag & Drop or Upload": "Player.log" }}</p>
                                <input @change="importGacha" type="file" class="w-full h-full cursor-pointer absolute opacity-0">
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="method == 'IOS'" class="flex flex-col gap-3">
                    <Hint class="!justify-start" message="IOS Importing is still in testing.,If you find any issues please report them on <a href='https://github.com/alpharmi/macchiato.app'>GitHub</a>"/>
                    <div class="main-container max-w-max py-1 flex items-start">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">1</p>
                        <p class="text-xl px-2">Install <a href="https://apps.apple.com/us/app/stream-network-debug-tool/id1312141691">Stream - Network Debug Tool</a> from the AppStore.</p>
                    </div>
                    <div class="main-container max-w-max py-1 flex items-start">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">2</p>
                        <div class="flex flex-col gap-2 pr-3 mb-3 w-full h-80">
                            <p class="text-xl px-2">Follow the video tutorial on how to get Gacha Data.</p>
                            <iframe height="100%" src="https://www.youtube.com/embed/xzWmAHAYK2I?si=yp4XkDJUhW6ydh46" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>
                    </div>
                    <div class="main-container max-w-max py-1 flex items-start">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">3</p>
                        <p class="text-xl px-2">Please <span class="font-bold">make sure</span> you've stopped sniffing when finished. Otherwise it will keep running.</p>
                    </div>
                    <div class="main-container h-auto flex w-full max-w-[40rem] pt-2">
                        <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">4</p>
                        <div class="flex flex-col gap-2 w-full pr-5">
                            <p class="text-xl">Paste the Gacha Data into the input below.</p>
                            <input ref="inputIOS" class="input mr-5 mb-3 w-full" type="text" name="inputIOS" placeholder="Gacha Data" >
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
    import Hint from "../components/Hint.vue"
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
                method: "PC 1"
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
                try {
                    return await fetch(gachaLogUrl, {
                        "method": "POST",
                        "headers": headers,
                        "body": `type_id=${bannerId}&limit=20&next=${next}`
                    }).then(response => response.json())
                } catch {
                    return {code: -1}
                }
            },
            async importGacha(input) {
                var gachaData = {uid: undefined, accessToken: undefined, gachaRecordUrl: undefined, method: undefined}

                if (this.method == "PC 1") {
                    try {
                        gachaData = JSON.parse(this.$refs.input.value)
                    } catch {
                        this.error("Invalid Input.")
                    }
                } else if (this.method == "PC 2") {
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
                } else if (this.method == "IOS") {
                    const input = this.$refs.inputIOS.value

                    if (input && input.includes("Host: ") && input.includes("Authorization: ")) {
                        gachaData.gachaRecordUrl = `https://${input.split("Host: ")[1].split(" X-Unity-Version")[0]}/list`
                        gachaData.accessToken = input.split("Authorization: ")[1].split("Accept-Encoding")[0]
                        gachaData.uid = input.split("POST ")[1].split("&u=")[1].split(" HTTP")[0] || 0
                        gachaData.method = "IOS"
                    }
                }

                if (gachaData) {
                    if (this.loading == "") {
                        if (gachaData && gachaData.uid && gachaData.accessToken && gachaData.gachaRecordUrl) {
                            /*
                            const importGachaUrl = this.production? "https://macchiatogfl.vercel.app/api/importGacha?": "http://localhost:3000/api/importGacha?"
                            
                            const response = await fetch(importGachaUrl + new URLSearchParams({
                                accessToken: gachaData.accessToken
                            })).then(response => response.json()).catch(() => {
                                this.error("Server down. Please try again later.")
                            })
                            */
                            const cachedGacha = localStorage.getItem("gacha")
                            const gacha = cachedGacha ? JSON.parse(cachedGacha): {banners: {}, version: this.version}

                            const headers = new Headers()
                            headers.append("Authorization", gachaData.accessToken)
                            headers.append("Content-Type", "application/x-www-form-urlencoded")

                            var success = true

                            for (const banner of ongoing.banners) {
                                if (banner.id && success) {
                                    var next = ""
                                    var itteration = 1
                                    var latestPulls = []
                                    const lastPullDate = gacha.banners[banner.type] ? gacha.banners[banner.type].lastPullDate: 0

                                    while (true) {
                                        this.loading = `Importing ${this.capitalise(banner.name.replaceAll("_", " "))} banner [${itteration}]...`

                                        const response = await this.requestGacha(gachaData.gachaRecordUrl, banner.id, headers, next)

                                        if (response.code == -1) {
                                            this.error("GFL2 Server Down or Invalid / Expired Input.\nPlease try again later.")

                                            success = false

                                            break
                                        } else {
                                            if (!gacha.banners[banner.type]) {
                                                gacha.banners[banner.type] = {pulls: [], lastPullDate: 0}
                                            }

                                            const pulls = response.data.list.filter(pull => pull.time > lastPullDate).map(pull => [pull.item, pull.time])
                                            latestPulls = latestPulls.concat(pulls)

                                            /*
                                            for (const pull of latestPulls) {
                                                //gacha.banners[banner.type].pulls.push([pull.item, pull.time])
                                            }
                                            */

                                            if (response.data.next == "" || pulls.length == 0) {
                                                break
                                            } else {
                                                next = response.data.next
                                                itteration += 1
                                            }
                                        }
                                    }

                                    gacha.banners[banner.type].pulls = latestPulls.concat(gacha.banners[banner.type].pulls)
                                    gacha.banners[banner.type].lastPullDate = gacha.banners[banner.type].pulls[0] ? gacha.banners[banner.type].pulls[0][1] : 0
                                }
                            }

                            if (success) {
                                /*await fetch("https://macchiatogfl.vercel.app/api/logImport?" + new URLSearchParams({
                                    "uid": gachaData.uid,
                                    "method": gachaData.method
                                }))*/ //will probably go in the future, just want to log if things are working at the start.
                                /*setInterval(() => {
                                    this.redirect("/gacha")
                                }, 1000);*/

                                console.log(gacha)

                                localStorage.setItem("gacha", JSON.stringify(gacha))
                                this.loading = "Successfully imported banners."

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
