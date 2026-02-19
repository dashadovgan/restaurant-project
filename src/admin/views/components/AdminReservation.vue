<template>
  <div class="admin-container">
    <h1>Reservations</h1>

    <table v-if="reservations.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Date</th>
          <th>Time</th>
          <th>Guests</th>
          <th>Request</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in reservations" :key="item.id">
          <td>{{ item.fullName }}</td>
          <td>{{ item.email }}</td>
          <td>{{ item.phone }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.guests }}</td>
          <td>{{ item.request || '—' }}</td>
        </tr>
      </tbody>
    </table>

    <p v-else>No reservations yet</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { db } from '@/firebase/firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const reservations = ref([]);

onMounted(async () => {
  try {
    const q = query(
      collection(db, 'reservations'),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(q);

    reservations.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (err) {
    console.error("Failed to fetch reservations:", err);
  }
});
</script>

<style scoped>
/* Стили таблицы оставляем твои */
</style>


<style scoped>
.admin-container {
  padding: 40px;
  color: black;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border-bottom: 1px solid #2d3748;
  padding: 12px;
  text-align: left;
}

th {
  color: #F4C73F;
  font-weight: 600;
}


</style>
