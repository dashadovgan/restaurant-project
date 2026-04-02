<template>
  <div class="post-page" v-if="post">
    <!-- Hero section: основная картинка и заголовок -->
    <div
      class="hero"
      :style="{ backgroundImage: `url(${post.coverImage || firstImage})` }"
    >
      <!-- Overlay поверх фото -->
      <div class="overlay">
        <h1>{{ post.title }}</h1>
        <p>{{ post.intro }}</p>
      </div>
    </div>

    <!-- Content blocks -->
    <div class="content-blocks">
      <div
        v-for="(block, index) in post.contentBlocks"
        :key="index"
        class="block"
      >
        <!-- Текстовый блок -->
        <p v-if="block.type === 'text'">{{ block.content }}</p>

        <!-- Highlighted текст -->
        <p v-else-if="block.type === 'highlight'" class="highlight">
          {{ block.content }}
        </p>

        <!-- Фото блок -->
        <div v-else-if="block.type === 'image'">
          <div
            v-for="(url, i) in filteredUrls(block)"
            :key="i"
            class="image-wrapper"
          >
            <img :src="url" class="post-image" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="loading">Loading post...</div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default {
  name: "PostPage",
  setup() {
    const filteredUrls = (block) => {
      if (!block.urls || !Array.isArray(block.urls)) return [];
      return block.urls;
    };
    const post = ref(null);
    const route = useRoute();
    const postId = route.params.id;

    const loadPost = async () => {
      console.log("POST ID:", postId);
      if (!postId) return;

      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);

      console.log("EXISTS:", docSnap.exists());

      if (docSnap.exists()) {
        post.value = docSnap.data();
      }
    };

    onMounted(loadPost);

    const firstImage = computed(() => {
      if (!post.value) return "";
      const imageBlock = post.value.contentBlocks?.find(
        (b) => b.type === "image" && b.urls?.length
      );
      return imageBlock?.urls[0] || "";
    });

    return { post, firstImage, filteredUrls };
  },
};
</script>

<style scoped>
.post-page {
  font-family: "Lora", sans-serif;
  color: white;
  background-color: #05131f;
  padding-bottom: 100px;
}

/* Hero section */
.hero {
  position: relative;
  width: 100%;
  height: 50vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 21, 40, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px;
  color: white;
}

.overlay h1 {
  font-size: 48px;
  margin-bottom: 10px;
}

.overlay p {
  font-size: 20px;
}

.content-blocks {
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.block p {
  font-size: 18px;
  line-height: 1.6;
}

.block p.highlight {
  border-left: 6px solid #ae590f;
  padding-left: 12px;
  border-radius: 5px;
}

.image-block {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  border-radius: 20px;
}
.image-wrapper {
  width: 100%;
  max-width: 800px;
  height: 240px;
  border-radius: 20px;
  overflow: hidden;

  margin: 0 auto 20px;
}

.post-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.loading {
  text-align: center;
  margin-top: 100px;
  font-size: 24px;
}
@media (max-width: 480px) {
  .content-blocks {
    width: 80%;
  }
}
</style>
