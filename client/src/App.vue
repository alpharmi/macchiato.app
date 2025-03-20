<template>
  <header class="h-14 bg-[#00000020] backdrop-blur-lg drop-shadow-md flex items-center sm:pl-2 pl-10 gap-1 relative">
    <img @click="redirect('/')" class="logo h-3/5" src="/logo_small.webp" alt="logo">
    <p class="text-2xl"><span class="text-description">{{ currentRoute() }}</span></p>
    <button v-if="currentRoute()" @click="back()" class="h-full w-10 flex items-center justify-center"><img class="h-5 bg brightness-[0.7]" src="/return.webp"></button>
  </header>

  <main class="w-full h-max p-12 sm:p-3 !pt-12 min-h-[calc(100vh-3.5rem)]">
    <RouterView/>
  </main>

  <footer class="h-auto min-h-20 w-full p-3 text-center bg-[#0a0a0a] flex flex-col items-center justify-center text-description">
    <p>macchiato</p>
    <p>Girls' Frontline 2: Exilium and content are trademarks and copyright of SUNBORN Information or MicaTeam.</p>
    <div class="flex items-center gap-3 pt-1">
        <button @click="redirect('/privacy-policy')" class="text-highlight"><a>Privacy Policy</a></button>
        <div class="flex h-5">
            <a class="!border-none !pb-0" href="https://github.com/alpharmi/macchiato.app"><img class="h-full" src="/github.webp"></a>
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
        return (this.$router.currentRoute.value.path.length == 1) ? "": this.$router.currentRoute.value.path
      },
      back() {
        this.$router.back()
      },
      redirect(route) {
          this.$router.push({
              path: route
          })
      }
    }
  }
</script>