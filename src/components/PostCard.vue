<template>
  <router-link
    class="post-card"
    :to="`/post/${post.id}`"
  >
    <!-- Фото -->
    <div class="image" v-if="post.coverImage">
      <img :src="post.coverImage" alt="" />
    </div>

    <div class="content">
      <!-- Дата -->
      <span class="date">{{ formattedDate }}</span>
      
      <h3>{{ post.title }}</h3>
      
      <!-- Ограниченный текст -->
      <p v-if="post.intro">{{ truncatedText }}</p>
    </div>
  </router-link>
</template>

<script>
import { computed } from "vue";

export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const formattedDate = computed(() => {
  if (!props.post.date) return ""; 
  const date = props.post.date.toDate ? props.post.date.toDate() : new Date(props.post.date);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
});


    const truncatedText = computed(() => {
      const limit = 140;
      if (!props.post.intro) return "";
      return props.post.intro.length > limit
        ? props.post.intro.slice(0, limit) + "..."
        : props.post.intro;
    });

    return { formattedDate, truncatedText };
  },
};
</script>

<style scoped>
.post-card {
  width: 30%;
  background: #000000;
  border-radius: 12px;
  overflow: hidden;
  text-decoration: none;
  color: white;
}

.image {
  display: flex;          
  justify-content: center; 
  align-items: center; 
  padding-top: 10px;
  border-radius: 20px;    
}

.image img {
  width: 90%;             
  height: 200px;
  object-fit: cover;
}


.content {
  padding: 12px;
}

.date {
  font-size: 12px;
  color: gray;
  display: block;
  margin-bottom: 6px;
}

h3 {
  margin: 0 0 8px;
}

p {
  margin: 0;
  opacity: 0.7;
}
</style>
