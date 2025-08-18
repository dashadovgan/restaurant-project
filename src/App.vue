<template>
  <div id="app">
    <AppNavbar />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/Navbar.vue'
import AppFooter from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    AppNavbar,
    AppFooter
  }
}
</script>
<style scoped>

</style>