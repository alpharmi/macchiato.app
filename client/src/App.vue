<template>
  <!--<Analytics/>-->

  <header class="h-14 bg-[#00000020] backdrop-blur-lg drop-shadow-md flex items-center sm:pl-2 pl-10 gap-1">
    <img @click="redirect('/')" class="logo h-3/5" src="/logo.webp" alt="logo">
    <p class="text-2xl"><span class="text-description">{{ currentRoute() }}</span></p>
  </header>

  <main class="w-full h-max p-12 sm:p-3 !pt-12 min-h-[calc(100vh-3.5rem)]">
    <RouterView/>
  </main>

  <footer class="h-auto min-h-20 w-full p-3 text-center bg-[#0a0a0a] flex flex-col items-center justify-center text-description">
    <p>macchiato</p>
    <p>Girls' Frontline 2: Exilium and content are trademarks and copyright of SUNBORN Information or MicaTeam.</p>
  </footer>
</template>

<script setup>
  import { Analytics } from '@vercel/analytics/vue';
</script>

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
      redirect(route) {
          this.$router.push({
              path: route
          })
      }
    }
  }
</script>