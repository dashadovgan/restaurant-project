<template>
  <div class="admin-post-editor">
    <h2>{{ isEdit ? "Edit Post" : "Create Post" }}</h2>

    <!-- Cover image -->
    <div class="cover-upload">
      <label>
        Cover Image
        <input type="file" accept="image/*" @change="uploadCoverImage" />
      </label>

      <img v-if="coverImage" :src="coverImage" class="cover-preview" />
    </div>

    <!-- Title / Intro -->
    <input v-model="title" placeholder="Post title" />
    <textarea v-model="intro" placeholder="Intro text"></textarea>

    <!-- Content blocks -->
    <div v-for="(block, index) in contentBlocks" :key="index" class="block">
      <div class="block-header">
        <strong>{{ block.type }}</strong>
        <button class="delete" @click="removeBlock(index)">✖</button>
      </div>

      <!-- text -->
      <div v-if="block.type === 'text'" contenteditable="true" class="text-block"
        @input="block.content = $event.target.innerText">
        {{ block.content }}
      </div>

      <!-- highlight -->
      <textarea v-if="block.type === 'highlight'" v-model="block.content" class="highlight"
        placeholder="Highlighted text" />

      <!-- image -->
      <div v-if="block.type === 'image'" class="image-row">
        <div v-for="(url, i) in block.urls" :key="i" class="image-upload">
          <input type="file" accept="image/*" @change="uploadImage($event, index, i)" />
          <img v-if="url" :src="url" />
        </div>

        <button v-if="block.urls.length < 2" @click="addImageSlot(index)">
          ➕ add image
        </button>
      </div>
    </div>

    <!-- Add block -->
    <div class="add-block">
      <button @click="addBlock('text')">📝 Text</button>
      <button @click="addBlock('highlight')">🟨 Highlight</button>
      <button @click="addBlock('image')">🖼 Image</button>
    </div>

    <!-- Save -->
    <button class="publish" @click="savePost">
      {{ isEdit ? "Update Post" : "Publish Post" }}
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const route = useRoute();
const router = useRouter();
const storage = getStorage();

const isEdit = ref(false);
const postId = route.params.id;

const title = ref("");
const intro = ref("");
const coverImage = ref("");
const contentBlocks = ref([]);

onMounted(async () => {
  if (!postId) return;

  isEdit.value = true;
  const snap = await getDoc(doc(db, "posts", postId));

  if (snap.exists()) {
    const data = snap.data();
    title.value = data.title;
    intro.value = data.intro;
    coverImage.value = data.coverImage;
    contentBlocks.value = data.contentBlocks || [];
  }
});

const uploadCoverImage = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const path = `posts/${Date.now()}_${file.name}`;
  const refFile = storageRef(storage, path);
  await uploadBytes(refFile, file);
  coverImage.value = await getDownloadURL(refFile);
};


const addBlock = (type) => {
  if (type === "image") {
    contentBlocks.value.push({ type, urls: [""] });
  } else {
    contentBlocks.value.push({ type, content: "" });
  }
};

const removeBlock = (index) => {
  contentBlocks.value.splice(index, 1);
};

const addImageSlot = (index) => {
  contentBlocks.value[index].urls.push("");
};

const uploadImage = async (e, blockIndex, imgIndex) => {
  const file = e.target.files[0];
  if (!file) return;

  const path = `posts/${Date.now()}_${file.name}`;
  const refFile = storageRef(storage, path);
  await uploadBytes(refFile, file);

  const url = await getDownloadURL(refFile);
  contentBlocks.value[blockIndex].urls[imgIndex] = url;
};


const savePost = async () => {
  if (!title.value || !coverImage.value) {
    alert("Title and cover image required");
    return;
  }

  const payload = {
    title: title.value,
    intro: intro.value,
    coverImage: coverImage.value,
    contentBlocks: contentBlocks.value,
    date: serverTimestamp(),
  };

  if (isEdit.value) {
    await updateDoc(doc(db, "posts", postId), payload);
    alert("Post updated");
  } else {
    await addDoc(collection(db, "posts"), payload);
    alert("Post published");
  }

  router.push("/admin");
};
</script>

<style scoped>
.admin-post-editor {
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.text-block {
  min-height: 50px;
  padding: 10px;
  background: #bfbcb2;
  border-radius: 8px;
  white-space: pre-wrap;
  /* сохраняем переносы строк */
}

.cover-preview {
  width: 300px;
  border-radius: 10px;
}

.block {
  padding: 12px;
  border-radius: 10px;
}

.block-header {
  display: flex;
  justify-content: space-between;
}

.image-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-upload img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  border-radius: 8px;
}

.highlight {
  border-left: 6px solid gold;
  padding-left: 10px;
}

button.publish {
  background: #0f5132;
}

button.delete {
  background: crimson;
}
</style>
