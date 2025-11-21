<template>
  <section class="stories-section">
    <h2 class="stories-title">Истории с кухни</h2>

    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-else class="stories-grid">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getLatestPosts } from "@/firebase/posts";
import PostCard from "./PostCard.vue";

const posts = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    posts.value = await getLatestPosts();
  } catch (e) {
    console.error("Ошибка загрузки постов:", e);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.stories-section {
  background-color: #05131F;
  color: white;
  padding: 100px 16px;
  text-align: center;
}

.stories-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.8rem;
  margin-bottom: 40px;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  width: 90%;
  margin: 0 auto;
}

.loading {
  font-size: 1.2rem;
  opacity: 0.8;
}
</style>
