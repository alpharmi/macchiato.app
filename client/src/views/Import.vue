<template>
    <div class="flex w-full flex-col items-center justify-center px-96 gap-5">
        <p class="text-5xl font-bold p-2 px-10 text-hi">Import Pulls</p>
        <div class="w-full h-0.5 from-transparent via-[#1a1a1a] via-50% to-transparent brightness-150 bg-gradient-to-r ml-20 mr-14"/>
        <div class="flex gap-3 justify-start w-full">
            <button class="button !px-5">Method 1</button>
            <button class="button !px-5">Method 2</button>
        </div>
        <div class="flex justify-start w-full flex-col gap-3">
            <div class="main-container h-10 flex items-center w-max">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">1</p>
                <p class="pr-5 text-xl">Open Girls' Frontline 2: Exilium on PC.</p>
            </div>
            <div class="main-container h-10 flex items-center w-max">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">2</p>
                <p class="pr-5 text-xl">Open Access Records and wait for pulls to load.</p>
            </div>
            <div class="main-container h-auto flex w-max pt-2">
                <p class="font-bold bg-secondary w-max px-3 -translate-x-3 text-xl h-min">3</p>
                <div class="flex flex-col gap-2">
                    <p class="text-xl">Open Windows Powershell and run the following command.</p>
                    <div class="flex gap-2 bg-text p-2 mr-5">
                        <svg v-if="!copied" viewBox="0 0 24 24" class="w-5 h-5 fill-main pt-1"><path id="copySvg" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path></svg>
                        <svg v-if="copied" viewBox="0 0 24 24" class="w-5 h-5 fill-main pt-1"><path id="copySvg" d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"></path></svg>
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
        <button @click="importGacha" class="button !px-10">Import</button>
        <div :class="(loading != '') ? 'opacity-100': 'opacity-0'" class="flex flex-col items-center pt-5 transition-opacity">
            <img class="h-24" src="/loading.gif">
            <p class="whitespace-pre-line text-center">{{ loading }}</p>
        </div>
    </div>
</template>

<script>
    import ongoing from "../data/ongoing.json"

    export default {
        data() {
            return {
                importCommand: 'iwr -useb "https://raw.githubusercontent.com/alpharmi/macchia.to/refs/heads/main/import.ps1" | iex',
                copied: false,
                loading: "",
                production: false,
                version: 1,
            }
        },
        methods: {
            redirect(route) {
                this.$router.push({
                    path: route
                })
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
            async importGacha() {
                try {
                    const gacha = {banners: {}, version: this.version}
                    const gachaData = JSON.parse(this.$refs.input.value)

                    if (gachaData && gachaData.uid && gachaData.accessToken && gachaData.gachaRecordUrl) {
                        /*
                        const importGachaUrl = this.production? "https://macchiatogfl.vercel.app/api/importGacha?": "http://localhost:3000/api/importGacha?"
                        
                        const response = await fetch(importGachaUrl + new URLSearchParams({
                            accessToken: gachaData.accessToken
                        })).then(response => response.json()).catch(() => {
                            this.error("Server down. Please try again later.")
                        })
                        */
                       const headers = new Headers()
                       headers.append("Authorization", gachaData.accessToken)
                       headers.append("Content-Type", "application/x-www-form-urlencoded")

                       var success = true

                        for (const banner of ongoing.banners) {
                            if (banner.id && success) {
                                var next = ""
                                var itteration = 1

                                while (true) {
                                    this.loading = `Importing ${this.capitalise(banner.name)} banner [${itteration}]...`

                                    const response = await this.requestGacha(gachaData.gachaRecordUrl, banner.id, headers, next)

                                    if (response.code == -1) {
                                        this.error("GFL2 Server Down or Invalid Input.\nPlease try again later.")

                                        success = false

                                        break
                                    } else {
                                        if (!gacha.banners[banner.type]) {
                                            gacha.banners[banner.type] = {pulls: [], lastPullDate: response.data.list[0].time}
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
                            /*
                            await fetch("https://macchiatogfl.vercel.app/api/logImport?" + new URLSearchParams({
                                "uid": gachaData.uid,
                                "method": gachaData.method
                            }))*/
                            /*setInterval(() => {
                                this.redirect("/gacha")
                            }, 1000);*/

                            localStorage.setItem("gacha", JSON.stringify(gacha))
                            this.loading = "Successfully imported banners."

                            this.redirect("/gacha")
                        }
                    } else {
                        this.error("Invalid Input.")
                    }
                } catch {
                    this.error("Invalid Input.")
                }
            }
        }
    }
</script>