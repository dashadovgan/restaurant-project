<template>
  <AdminLayout>
    <div class="admin-menu-manager">
      <h2>Управление меню</h2>
      <AdminMenuForm @dish-saved="loadMenu" />
      
      <h3>Все блюда</h3>
      <table>
        <thead>
          <tr>
            <th>Фото</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Категория</th>
            <th>Любимое</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in menu" :key="item.id">
            <td>
              <img v-if="item.image" :src="item.image" class="dish-img" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.price }}$</td>
            <td>{{ item.category }}</td>
            <td>{{ item.isFavorite ? "✔" : "" }}</td>
            <td>
              <button @click="editDish(item)">Редактировать</button>
              <button @click="deleteDish(item)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>

      <AdminMenuForm v-if="editingDish" :initialDish="editingDish" @dish-saved="onEditSaved" />
      <AdminUserList />
    </div>                                        
  </AdminLayout>
  <section class="story-container">
<AdminPostsStories />
  </section>
</template>

<script>
import AdminLayout from './components/AdminLayout.vue';
import AdminMenuForm from './components/AdminMenuForm.vue';
import AdminUserList from './components/AdminUserList.vue';
import { ref, onMounted } from "vue";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from "@/firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import AdminPostsStories from './components/AdminPostsStories.vue';

export default {
  name: "AdminMenuManager",
  components: { AdminLayout, AdminMenuForm, AdminUserList, AdminPostsStories},
  setup() {
    const menu = ref([]);
    const editingDish = ref(null);

    const loadMenu = async () => {
      const querySnapshot = await getDocs(collection(db, "menuItems"));
      menu.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    };

    const deleteDish = async (dish) => {
      // Удаление только из Firestore, картинку удалять будем позже
      const dishRef = doc(db, "menuItems", dish.id);
      await deleteDoc(dishRef);
      loadMenu();
    };

    const editDish = (dish) => {
      editingDish.value = { ...dish };
    };

    const onEditSaved = () => {
      editingDish.value = null;
      loadMenu();
    };

    onMounted(loadMenu);

    return { menu, loadMenu, editingDish, editDish, onEditSaved, deleteDish };
  }
};
</script>

<style scoped>
.admin-menu-manager {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}
.dish-img {
  max-width: 100px;
  border-radius: 6px;
}
button {
  padding: 5px 10px;
  cursor: pointer;
}
</style>