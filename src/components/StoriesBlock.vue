<template>
  <section class="stories-block">
    <div class="stories-block-container">
      <div class="textContainer">
        <h2>From Our Kitchen to Your Screen</h2>
        <p>Dive into recipes, behind the scenes, and tasty tales.</p>
      </div>

      <div class="stories-container">
        <PostCard v-for="post in posts" :key="post.id" :post="post" />
      </div>

      <!-- Показываем кнопку только если нет лимита -->
      <div class="all-news-button" v-if="!maxPosts">
        <router-link to="/news"> View All News </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import PostCard from "@/components/PostCard.vue";

export default {
  name: "StoriesBlock",
  components: { PostCard },
  props: {
    maxPosts: {
      type: Number,
      default: null,
    },
  },
  setup(props) {
    const posts = ref([]);

    const loadPosts = async () => {
      let q;
      if (props.maxPosts) {
        q = query(
          collection(db, "posts"),
          orderBy("date", "desc"),
          limit(props.maxPosts)
        );
      } else {
        q = query(collection(db, "posts"), orderBy("date", "desc"));
      }

      const snapshot = await getDocs(q);
      posts.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    onMounted(loadPosts);

    return { posts };
  },
};
</script>

<style scoped>
.stories-block {
  width: 100%;
  min-height: auto;
  background-color: #05131f;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
  box-sizing: border-box;
}

.stories-block h2 {
  color: white;
  font-size: 56px;
  margin-bottom: 10px;
  font-family: "Sneaky" sans-serif;
}

.textContainer {
  text-align: start;
  padding: 0 10px;
}

.stories-block-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.stories-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
  padding: 0 10px;
}

.all-news-button {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
  padding-top: 20px;
}

.all-news-button a {
  display: inline-block;
  padding: 12px 28px;
  background-color: #f4c73f;
  color: black;
  font-weight: bold;
  text-decoration: none;
  border-radius: 20px;
  transition: background 0.3s;
}

.all-news-button a:hover {
  background-color: #ae8e2c;
}

.stories-block p {
  color: #d7d7d7;
  font-size: 18px;
  margin: 0 0 30px 0;
  font-family: "Lora" sans-serif;
}

@media (max-width: 480px) {
  .stories-container {
    flex-direction: column;
    align-items: center;
  }

  .stories-container > * {
    width: 100%;
    max-width: 400px;
  }
}
</style>
