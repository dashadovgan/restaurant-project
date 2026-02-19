<template>
  
    <div class="posts-list">
      <h2>All Posts</h2>

      <div
        v-for="post in posts"
        :key="post.id"
        class="post-row"
      >
        <img :src="post.coverImage" />
        <div class="info">
          <h3>{{ post.title }}</h3>
          <small>{{ formatDate(post.date) }}</small>
        </div>

        <div class="actions">
          <button @click="editPost(post)">✏️</button>
          <button class="delete" @click="deletePost(post.id)">🗑</button>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { db } from "@/firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useRouter } from "vue-router";

const posts = ref([]);
const router = useRouter();

const loadPosts = async () => {
  const snap = await getDocs(collection(db, "posts"));
  posts.value = snap.docs.map(d => ({
    id: d.id,
    ...d.data()
  }));
};

const deletePost = async (id) => {
  if (!confirm("Delete this post?")) return;
  await deleteDoc(doc(db, "posts", id));
  posts.value = posts.value.filter(p => p.id !== id);
};

const editPost = (post) => {
  router.push(`/admin/posts/edit/${post.id}`);
};

const formatDate = (date) =>
  date?.toDate().toLocaleDateString() || "";

onMounted(loadPosts);
</script>
<style scoped>
.post-row {
  display: flex;
  align-items: center;
  gap: 20px;
 
  padding: 12px;
  border-radius: 10px;
}

.post-row img {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}

.actions {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

button.delete {
  background: crimson;
}
</style>