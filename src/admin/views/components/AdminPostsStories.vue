<template>
  <div class="admin-posts">
    <h2>Create Post</h2>

    <div class="cover-image-upload">
      <label>
        Main Cover Image
        <input type="file" accept="image/*" @change="uploadCoverImage" />
      </label>
      <div v-if="coverImage" class="cover-preview">
        <img :src="coverImage" alt="Cover Image Preview" />
      </div>
    </div>

    <form @submit.prevent="savePost" class="post-form">
      <input v-model="title" placeholder="Post title" required />
      <textarea v-model="intro" placeholder="Intro (optional)"></textarea>

      <div
        v-for="(block, index) in contentBlocks"
        :key="index"
        class="content-block"
      >
        <div class="block-header">
          <span>{{ block.typeLabel }}</span>
          <button type="button" class="delete" @click="removeBlock(index)">
            ✖
          </button>
        </div>
        <div v-if="block.type === 'text'">
          <textarea
            v-model="block.content"
            placeholder="Enter text..."
          ></textarea>
        </div>
        <div v-else-if="block.type === 'highlight'">
          <textarea
            v-model="block.content"
            placeholder="Highlighted text..."
            class="highlight-text"
          ></textarea>
        </div>
        <div v-else-if="block.type === 'image'" class="image-row">
          <label v-for="(url, i) in block.urls" :key="i" class="image-upload">
            <input
              type="file"
              accept="image/*"
              @change="uploadImage($event, index, i)"
            />
            <img v-if="url" :src="url" class="preview-img" />
          </label>
          <button
            v-if="block.urls.length < 2"
            type="button"
            class="add-photo-btn"
            @click="addImageSlot(index)"
          >
            ➕ Add second photo
          </button>
        </div>
        <hr />
      </div>

      <!-- Добавление блока -->
      <div class="add-block">
        <button type="button" @click="showBlockMenu = !showBlockMenu">
          ➕ Add block
        </button>
        <div v-if="showBlockMenu" class="block-menu">
          <button type="button" @click="addBlock('text')">📝 Text</button>
          <button type="button" @click="addBlock('highlight')">
            🟨 Highlighted text
          </button>
          <button type="button" @click="addBlock('image')">🖼 Image</button>
        </div>
      </div>

      <!-- Публикация поста -->
      <button type="submit" class="publish-btn">Publish Post</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { db } from "@/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default {
  name: "AdminPostsStories",
  setup() {
    const title = ref("");
    const intro = ref("");
    const coverImage = ref(""); // новое поле для основной фотографии
    const showBlockMenu = ref(false);
    const contentBlocks = ref([]);

    const storage = getStorage();

    // Загрузка основной фотографии
    const uploadCoverImage = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      const path = `postImages/${Date.now()}_${file.name}`;
      const refFile = storageRef(storage, path);
      await uploadBytes(refFile, file);
      coverImage.value = await getDownloadURL(refFile);
    };

    // Добавление блока
    const addBlock = (type) => {
      const newBlock =
        type === "text"
          ? { type, typeLabel: "Text block", content: "" }
          : type === "highlight"
          ? { type, typeLabel: "Highlighted text", content: "" }
          : { type, typeLabel: "Image block", urls: [""] };
      contentBlocks.value.push(newBlock);
      showBlockMenu.value = false;
    };

    const removeBlock = (index) => {
      contentBlocks.value.splice(index, 1);
    };

    const addImageSlot = (index) => {
      contentBlocks.value[index].urls.push("");
    };

    const uploadImage = async (event, blockIndex, urlIndex) => {
      const file = event.target.files[0];
      if (!file) return;
      const path = `postImages/${Date.now()}_${file.name}`;
      const refFile = storageRef(storage, path);
      await uploadBytes(refFile, file);
      const url = await getDownloadURL(refFile);
      contentBlocks.value[blockIndex].urls[urlIndex] = url;
    };

    const savePost = async () => {
      if (!coverImage.value) {
        alert("Please upload a main cover image.");
        return;
      }

      const filledBlocks = contentBlocks.value.filter(
        (b) =>
          (b.type === "text" && b.content.trim() !== "") ||
          (b.type === "image" && b.urls.some((u) => u.trim() !== ""))
      );

      if (filledBlocks.length < 4) {
        alert("Please add at least 4 content blocks.");
        return;
      }

      await addDoc(collection(db, "posts"), {
        title: title.value,
        intro: intro.value,
        coverImage: coverImage.value, // сохраняем coverImage
        contentBlocks: contentBlocks.value,
        date: serverTimestamp(),
      });

      // сброс формы
      title.value = "";
      intro.value = "";
      coverImage.value = "";
      contentBlocks.value = [];
      alert("Post published!");
    };

    return {
      title,
      intro,
      coverImage,
      showBlockMenu,
      contentBlocks,
      uploadCoverImage,
      addBlock,
      removeBlock,
      addImageSlot,
      uploadImage,
      savePost,
    };
  },
};
</script>

<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 800px;
}

textarea,
input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
}

button {
  cursor: pointer;
  border: none;
  padding: 8px 14px;
  background-color: #1b1b1b;
  color: white;
  border-radius: 6px;
}

button.delete {
  background: crimson;
}

button.publish-btn {
  background: #0f5132;
}

/* cover image */
.cover-image-upload {
  margin-bottom: 20px;
}

.cover-image-upload input {
  margin-top: 5px;
}

.cover-preview img {
  margin-top: 10px;
  width: 300px;
  height: auto;
  border-radius: 10px;
}

/* content blocks */
.image-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.image-upload input {
  display: none;
}

.image-upload {
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.preview-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.block-menu {
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: #f1f1f1;
  padding: 10px;
  border-radius: 6px;
  margin-top: 8px;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.highlight-text {
  border-left: 6px solid gold;
  padding-left: 10px;
}
</style>
