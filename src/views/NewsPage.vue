<template>
  <section class="post-page" v-if="post">
    <img :src="post.image" class="post-banner" />
    <div class="post-content">
      <h1>{{ post.title }}</h1>
      <p>{{ post.content }}</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPostById } from "@/firebase/posts";

const route = useRoute();
const post = ref(null);

onMounted(async () => {
  post.value = await getPostById(route.params.id);
});
</script>

<style scoped>
.post-page {
  background-color: #05131F;
  color: white;
  padding: 60px 16px;
}

.post-banner {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 40px;
}

.post-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
}

.post-content h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2.5rem;
  margin-bottom: 24px;
}

.post-content p {
  font-size: 1.05rem;
  line-height: 1.8;
}
</style>
