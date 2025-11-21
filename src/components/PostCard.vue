<template>
  <div class="post-card" @click="$router.push(`/news/${post.id}`)">
    <img :src="post.image" alt="Post image" class="post-image" />
    <div class="post-info">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt }}</p>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.post-card {
  background-color: #0b1a25;
  color: white;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.post-card:hover {
  transform: translateY(-4px);
}

.post-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.post-info {
  padding: 16px;
}

.post-info h3 {
  font-size: 1.4rem;
  margin-bottom: 8px;
  font-family: 'Cormorant Garamond', serif;
}

.post-info p {
  font-size: 0.95rem;
  opacity: 0.8;
}
</style>
