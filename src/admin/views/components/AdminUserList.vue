<template>
  <div class="admin-user-list">
    <h2>Список зарегистрированных пользователей</h2>
    <table>
      <thead>
        <tr>
          <th>Имя</th>
          <th>Email</th>
          <th>Телефон</th>
          <th>Дата регистрации</th>
          <th>Перезвонили?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>{{ formatDate(user.createdAt) }}</td>
          <td>
            <input type="checkbox" v-model="user.called" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default {
  name: "AdminUserList",
  setup() {
    const users = ref([]);

    const loadUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "contacts")); // берем данные из contacts
      users.value = querySnapshot.docs.map(doc => ({
        id: doc.id,
        called: false, // чекбокс по умолчанию false
        ...doc.data()
      }));
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return "";
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    };

    onMounted(loadUsers);

    return { users, formatDate };
  }
};
</script>

<style scoped>
.admin-user-list {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 15px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}
</style>
