<template>
  <section class="admin">
    <h1>Add New Chef</h1>

    <!-- Форма добавления -->
    <input v-model="name" placeholder="Name" />
    <input v-model="role" placeholder="Role" />
    <textarea v-model="description" placeholder="Full description"></textarea>
    <input type="file" @change="handleFile" />
    <button @click="saveChef" :disabled="loading">
      {{ loading ? "Saving..." : "Save Chef" }}
    </button>

    <hr />

    <!-- Таблица существующих шефов -->
    <h2>Existing Chefs</h2>
    <table>
      <thead>
        <tr>
          <th>Photo</th>
          <th>Name</th>
          <th>Role</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="chef in chefs" :key="chef.id">
          <td>
            <img :src="chef.imageUrl" alt="" class="thumb" />
          </td>
          <td>{{ chef.name }}</td>
          <td>{{ chef.role }}</td>
          <td>
            {{
              chef.description.slice(0, 50) +
              (chef.description.length > 50 ? "..." : "")
            }}
          </td>
          <td>
            <button @click="editChef(chef)">Edit</button>
            <button @click="deleteChef(chef)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Модальное окно редактирования -->
    <div
      v-if="editingChef"
      class="modal-overlay"
      @click.self="editingChef = null"
    >
      <div class="modal">
        <h3>Edit Chef</h3>
        <input v-model="editingChef.name" placeholder="Name" />
        <input v-model="editingChef.role" placeholder="Role" />
        <textarea
          v-model="editingChef.description"
          placeholder="Full description"
        ></textarea>
        <input type="file" @change="handleEditFile" />
        <button @click="saveEditChef" :disabled="loading">
          {{ loading ? "Saving..." : "Save Changes" }}
        </button>
        <button @click="editingChef = null">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { db, storage } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

const name = ref("");
const role = ref("");
const description = ref("");
const file = ref(null);
const loading = ref(false);
const chefs = ref([]);

const editingChef = ref(null);
const editFile = ref(null);

const handleFile = (e) => (file.value = e.target.files[0]);
const handleEditFile = (e) => (editFile.value = e.target.files[0]);

// Загрузка существующих шефов
const loadChefs = async () => {
  const snapshot = await getDocs(collection(db, "chefs"));
  chefs.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Добавление нового шефа
const saveChef = async () => {
  if (!file.value) {
    alert("Upload image");
    return;
  }
  try {
    loading.value = true;
    const imageRef = storageRef(
      storage,
      `chefs/${Date.now()}-${file.value.name}`
    );
    await uploadBytes(imageRef, file.value);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "chefs"), {
      name: name.value,
      role: role.value,
      description: description.value,
      imageUrl,
      createdAt: serverTimestamp(),
    });

    name.value = "";
    role.value = "";
    description.value = "";
    file.value = null;

    await loadChefs();
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    loading.value = false;
  }
};

// Редактирование шефа
const editChef = (chef) => {
  editingChef.value = { ...chef };
  editFile.value = null;
};

const saveEditChef = async () => {
  if (!editingChef.value) return;
  try {
    loading.value = true;
    let imageUrl = editingChef.value.imageUrl;

    // Если загружен новый файл, удаляем старый и добавляем новый
    if (editFile.value) {
      // Удаляем старую картинку
      if (editingChef.value.imageUrl) {
        try {
          const oldRef = storageRef(storage, editingChef.value.imageUrl);
          await deleteObject(oldRef);
        } catch (err) {
          console.warn("Failed to delete old image:", err);
        }
      }
      // Загружаем новый файл
      const imageRef = storageRef(
        storage,
        `chefs/${Date.now()}-${editFile.value.name}`
      );
      await uploadBytes(imageRef, editFile.value);
      imageUrl = await getDownloadURL(imageRef);
    }

    const chefRef = doc(db, "chefs", editingChef.value.id);
    await updateDoc(chefRef, {
      name: editingChef.value.name,
      role: editingChef.value.role,
      description: editingChef.value.description,
      imageUrl,
    });

    editingChef.value = null;
    editFile.value = null;
    await loadChefs();
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    loading.value = false;
  }
};

// Удаление шефа
const deleteChef = async (chef) => {
  if (!confirm("Are you sure you want to delete this chef?")) return;
  try {
    // Удаляем картинку из Storage
    if (chef.imageUrl) {
      try {
        const imageRef = storageRef(storage, chef.imageUrl);
        await deleteObject(imageRef);
      } catch (err) {
        console.warn("Failed to delete image:", err);
      }
    }

    // Удаляем документ
    const chefRef = doc(db, "chefs", chef.id);
    await deleteDoc(chefRef);

    chefs.value = chefs.value.filter((c) => c.id !== chef.id);
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  }
};

onMounted(loadChefs);
</script>

<style scoped>
.admin {
  max-width: 800px;
  margin: 50px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
input,
textarea,
button {
  padding: 12px;
  font-size: 14px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th,
td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: left;
}
.thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
}
button {
  cursor: pointer;
}
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
}
.modal {
  background: #0a0e17;
  padding: 30px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
  width: 400px;
}
</style>
