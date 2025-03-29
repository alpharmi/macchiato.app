<template>
  <header class="h-14 bg-[#00000020] backdrop-blur-lg drop-shadow-md flex justify-between items-center relative">
    <div class="flex gap-1 items-center pl-10 sm:pl-2">
        <img @click="redirect('/')" class="logo min-w-3 h-3/5" src="/logo_small.webp" alt="logo">
        <p class="text-2xl pl-1 sm:hidden"><span class="text-description">{{ currentRoute() }}</span></p>
        <button v-if="currentRoute()" @click="back()" class="h-full w-10 flex items-center justify-center"><img class="h-5 bg brightness-[0.7]" src="/return.webp" alt="back"></button>
    </div>
    <a href="https://ko-fi.com/alpharmi" class="bg-secondary !p-2 !px-5 brightness-150 mr-5 sm:mr-2 flex inline-image group !text-text !border-none"><img class="group-hover:scale-110 transition-transform" src="/kofi.webp"><p>Buy us a Ko-Fi</p></a>
  </header>

  <main class="w-full h-max p-12 sm:p-3 sm:px-4 !pt-12 min-h-[calc(100vh-3.5rem)]">
    <RouterView/>
  </main>

  <footer class="h-auto min-h-20 w-full p-3 text-center bg-[#0a0a0a] flex flex-col items-center justify-center text-description">
    <p>macchiato.app</p>
    <p>Girls' Frontline 2: Exilium and content are trademarks and copyright of SUNBORN Information or MicaTeam.</p>
    <div class="flex items-center gap-3 pt-1">
        <button @click="redirect('/privacy-policy')" class="text-highlight link">Privacy Policy</button>
        <div class="flex h-5">
            <a class="!border-none !pb-0" href="https://github.com/alpharmi/macchiato.app"><img class="h-full" src="/github.webp" alt="github"></a>
        </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    methods: {
      currentRoute() {
        return (this.$router.currentRoute.value.path.length == 1) ? "": this.$router.currentRoute.value.path.replaceAll("/", " • ")
      },
      back() {
        if (window.history.state.back) {
            this.$router.back()
        } else {
            this.redirect("/")
        }
      },
      redirect(route) {
          this.$router.push({
              path: route
          })
      }
    }
  }
</script>