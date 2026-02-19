<template>
  <background-section :style="{ minHeight: '70vh' }">
    <section class="welcome">
      <img :src="require('@/assets/diademaDecor.png')" alt="decor"/>
      <h1>Stories from the Kitchen & Beyond</h1>
      <p>Stay inspired with the latest from Platieu — from seasonal menu launches and chef spotlights to behind-the-scenes stories and culinary insights.</p>
    </section>
  </background-section>

  <section class="stories-block">
    <div class="stories-block-container">
      <!-- Контейнер с текстом и поиском -->
      <div class="prePostContainer">
        <div class="textContainer">
          <h2>Fresh Stories from the Kitchen</h2>
          <p>Discover the stories behind our kitchen, culinary tips, and flavor inspirations that we pour into every dish. This blog is a place where we share more than just food — we share experiences.</p>
        </div>

        <!-- поиск справа -->
        <div class="finderWrapper">
          <FinderSection @filter="applyFilter" />

        </div>
      </div>

      <!-- Посты -->
      <div class="stories-container">
        <PostCard
          v-for="post in displayedPosts"
          :key="post.id"
          :post="post"
        />
      </div>

      <!-- Кнопка Показать ещё -->
      <div class="all-news-button" v-if="showLoadMoreButton">
        <button @click="loadMorePosts">View more</button>
      </div>
    </div>
    <div class="subscribe-container">
    <DescribeSection />
    </div>
  </section>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { db } from "@/firebase/firebase";
import { collection, query, orderBy, limit, startAfter, getDocs } from "firebase/firestore";
import PostCard from "@/components/PostCard.vue";
import BackgroundSection from "@/components/BackgroundSection.vue";
import FinderSection from "@/components/FinderSection.vue";
import DescribeSection from "@/components/DescribeSection.vue";

export default {
  name: "OurStoryPage",
  components: { PostCard, BackgroundSection, FinderSection, DescribeSection },
  setup() {
    const posts = ref([]); // все загруженные посты
    const displayedPosts = ref([]); // посты, которые показываются
    const lastVisible = ref(null);
    const hasMore = ref(true);
    const POSTS_LIMIT = 10;
    const INITIAL_SHOW = 9;
    const searchQuery = ref("");

    const loadPosts = async () => {
      let q;
      if (lastVisible.value) {
        q = query(
          collection(db, "posts"),
          orderBy("date", "desc"),
          startAfter(lastVisible.value),
          limit(POSTS_LIMIT)
        );
      } else {
        q = query(
          collection(db, "posts"),
          orderBy("date", "desc"),
          limit(POSTS_LIMIT)
        );
      }

      const snapshot = await getDocs(q);
      const loadedPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      if (loadedPosts.length < POSTS_LIMIT) hasMore.value = false;
      if (snapshot.docs.length > 0) lastVisible.value = snapshot.docs[snapshot.docs.length - 1];

      posts.value.push(...loadedPosts);
      applyFilter(searchQuery.value);
    };

    const applyFilter = (query) => {
      searchQuery.value = query.toLowerCase();
      let filtered = posts.value.filter(post =>
        !query ||
        post.title.toLowerCase().includes(query) ||
        (post.intro && post.intro.toLowerCase().includes(query))
      );

      // показываем только 9 первых постов, остальные по кнопке
      displayedPosts.value = filtered.slice(0, INITIAL_SHOW);
    };

    const loadMorePosts = () => {
      const filtered = posts.value.filter(post =>
        !searchQuery.value ||
        post.title.toLowerCase().includes(searchQuery.value) ||
        (post.intro && post.intro.toLowerCase().includes(searchQuery.value))
      );
      // добавляем ещё посты после уже показанных
      const nextPosts = filtered.slice(displayedPosts.value.length, displayedPosts.value.length + POSTS_LIMIT);
      displayedPosts.value.push(...nextPosts);
    };

    const showLoadMoreButton = computed(() => {
      const filtered = posts.value.filter(post =>
        !searchQuery.value ||
        post.title.toLowerCase().includes(searchQuery.value) ||
        (post.intro && post.intro.toLowerCase().includes(searchQuery.value))
      );
      return displayedPosts.value.length < filtered.length;
    });

    onMounted(loadPosts);

    return {
      posts,
      displayedPosts,
      searchQuery,
      loadMorePosts,
      applyFilter,
      showLoadMoreButton
    };
  },
};
</script>


<style scoped>
.subscribe-container{
  padding-top: 20px;
}
.stories-block {
  width: 100%;
  min-height: 100vh;
  background-color: #05131F;
  display: flex;
  flex-direction: column;
  padding: 40px 0;
}

.stories-block-container {
  width: 80%;
  margin: 0 auto;
}

.stories-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.all-news-button {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.all-news-button button {
  padding: 12px 28px;
  background-color: #F4C73F;
  color: black;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  border: none;
  transition: background 0.3s;
}

.all-news-button button:hover {
  background-color: #ae8e2c;
}

/* Контейнер с текстом и поиском по центру */
.prePostContainer {
  display: flex;
  justify-content: center; /* центрируем весь блок */
  align-items: flex-start;
  gap: 20px;
  flex-wrap: wrap;
  width: 90%;
  margin: 0 auto;
}

/* Поле поиска справа */
.finderWrapper {
  flex: 0 0 200px;
}

.finderWrapper input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #000;
  color: #fff;
  font-size: 14px;
}

/* Текст слева */
.textContainer {
  text-align: start;
  padding: 0;
  margin-bottom: 20px;
  flex: 1 1 60%;
}

.textContainer h2 {
  color: white;
  font-size: 58px;
  margin: 0;
  font-family: 'Cormorant Garamond', sans-serif;
}

.textContainer p {
  color: #D7D7D7;
  font-size: 18px;
  font-family: 'Lora', sans-serif;
  margin-bottom: 0;
}

/* Welcome секция */
.welcome {
  flex-direction: column;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 55%;
  padding-top: 0;
}

.welcome img {
  width: 262.5px;
}

.welcome p {
  font-family: 'Lora', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  margin: 0;
}

.welcome h1 {
  font-family: 'Cormorant Garamond', sans-serif;
  
  line-height: 120%;
  font-weight: 400;
  font-size: 48px;
  color: white;
  margin: 0 0 20px 0;
}

@media (max-width: 768px) {
  .welcome p {
    font-size: 18px;
    width: 140%;
  }

  .welcome h1 {
    font-size: 40px;
    width: 130%;
    margin: 0 0 5px 0;
  }

  .prePostContainer {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .finderWrapper {
    margin-top: 20px;
  }

  .textContainer {
    width: 100%;
  }
  .stories-block-container {
    width: 95%;
  }

  .stories-container {
    flex-direction: column;
    align-items: center;
  }
  .prePostContainer {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }

  .textContainer {
    flex: unset;
  }

  .textContainer h2 {
    font-size: 36px;
    text-align: center;
  }

  .textContainer p {
    text-align: center;
    font-size: 16px;
  }

  .finderWrapper {
    width: 100%;
  }
  .stories-container > * {
    width: 100%;
    max-width: 95%;
  }
  .all-news-button button {
    width: 100%;
    max-width: 240px;
  }
}
</style>
