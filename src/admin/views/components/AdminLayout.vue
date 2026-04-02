<template>
  <div class="admin-layout">
    <header class="admin-header">
      <h1>Restaurant Admin Panel</h1>
    </header>
    <main class="admin-content">
      <slot></slot> <!-- сюда вставляются страницы админки -->
    </main>
  </div>
</template>

<script>
export default {
  name: "AdminLayout"
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
  background-color: #010614;
  color: #fff;
  padding: 20px;
  text-align: center;
}

.admin-content {
  flex: 1;
  padding: 30px;
  background-color: #05131F;
}
</style>