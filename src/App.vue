<template>
  <div id="app">
    <AppNavbar v-if="!isAdminRoute" />
    <router-view />
    <AppFooter />
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppNavbar from "@/components/Navbar.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    AppNavbar,
    AppFooter,
  },
  setup() {
    const route = useRoute();

    // NavBar показываем только если путь не начинается с /admin
    const isAdminRoute = computed(() => route.path.startsWith("/admin"));

    return { isAdminRoute };
  },
};
</script>
