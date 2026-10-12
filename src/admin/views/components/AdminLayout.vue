<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h1>Restaurant Admin Panel</h1>
      <button v-if="$route.name !== 'AdminLogin'" class="logout-button" @click="logout">
        Выйти
      </button>
    </header>
    <main class="admin-content">
      <slot></slot>
      <!-- сюда вставляются страницы админки -->
    </main>
  </div>
</template>

<script>
import { signOutAdmin } from "@/services/admin-auth.service";

export default {
  name: "AdminLayout",
  methods: {
    async logout() {
      await signOutAdmin();
      this.$router.replace({ name: "AdminLogin" });
    },
  },
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: sans-serif;
}

.admin-header {
  position: relative;
  background-color: #010614;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.logout-button {
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  padding: 8px 16px;
  border: 1px solid #fff;
  border-radius: 30px;
  background: transparent;
  color: #fff;
  cursor: pointer;
}

@media (max-width: 600px) {
  .logout-button {
    position: static;
    transform: none;
    margin-top: 10px;
  }
}

.admin-content {
  flex: 1;
  padding: 30px;
  background-color: #05131f;
}
</style>
