<template>
  <div class="overlay" @click.self="$emit('close')">
    <div
      class="modal"
      v-motion
      :initial="{ scale: 0.9, opacity: 0 }"
      :enter="{ scale: 1, opacity: 1 }"
    >
      <button class="close" @click="$emit('close')">×</button>

      <img :src="chef.imageUrl" />

      <h2>{{ chef.name }}</h2>
      <span>{{ chef.role }}</span>

      <p>{{ chef.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  chef: Object,
});
</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(5, 10, 20, 0.9);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: #0a0e17;
  max-width: 400px;
  width: 70%;
  padding: 40px;
  border-radius: 20px;
  position: relative;
  color: white;
}

.modal img {
  width: 100%;
  height: 330px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 30px;
}

.close {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 26px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
