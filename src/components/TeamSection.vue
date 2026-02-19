<template>
  <section class="team-section">
    <div class="team-header">
      <h2>Meet the Soul Behind Our Kitchen</h2>
      <p>
        Leading our kitchen is Chef Julien Moreau, whose expertise and vision elevate every dish on our menu. With over 15 years of experience in fine dining, Chef Julien draws inspiration from French countryside traditions while embracing modern culinary artistry.
      </p>
    </div>

    <div class="team-grid">
      <ChefCard
        v-for="chef in visibleChefs"
        :key="chef.id"
        :chef="chef"
        @open="openChef"
      />
    </div>

    <!-- Кнопка View All -->
    <div class="view-all" v-if="chefs.length > limit && !showAll.value">
      <button @click="showAllChefs">View All</button>
    </div>

    <ChefModal
      v-if="selectedChef"
      :chef="selectedChef"
      @close="selectedChef = null"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ChefCard from '@/components/ChefCard.vue'
import ChefModal from '@/components/ChefModal.vue'
import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

const limit = 8
const showAll = ref(false)        // реактивная
const selectedChef = ref(null)
const chefs = ref([])

// Загружаем шефов из Firestore
onMounted(async () => {
  const snapshot = await getDocs(collection(db, 'chefs'))
  chefs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
})

// Показываем только первые 8, если showAll = false
const visibleChefs = computed(() =>
  showAll.value ? chefs.value : chefs.value.slice(0, limit)
)

const openChef = (chef) => {
  selectedChef.value = chef
}

const showAllChefs = () => {
  showAll.value = true
}
</script>

<style scoped>
.team-section {
  padding: 100px 0;
  color: white;
  width: 85%;
  margin: 0 auto;
}

.team-header {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
}

.team-header h2 {
  font-family: 'Cormorant Garamond';
  font-size: 48px;
  font-weight: 400;
    margin: 0px;
}

.team-header p {
  font-family: 'Lora';
  font-size: 16px;
  line-height: 26px;
  opacity: 0.9;

}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  
}

.view-all {
  text-align: center;
  margin-top: 40px;
}

.view-all button {
  background: transparent;
  border: 1px solid #f4c73f;
  color: #f4c73f;
  padding: 14px 40px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.3s;
}

.view-all button:hover {
  background: #f4c73f;
  color: #0a0e17;
}
@media (max-width: 768px) {
  .team-header {
    grid-template-columns: 1fr; /* текст в один столбец */
    gap: 20px;
    text-align: center;
  }

  .team-grid {
    grid-template-columns: 1fr; /* карточки шефов вертикально */
    gap: 20px;
  }

  .team-section {
    width: 80%; /* немного меньше от края экрана */
    padding: 50px 0;
  }

  .team-header h2 {
    font-size: 32px;
    text-align: start;
  }

  .team-header p {
    font-size: 14px;
    line-height: 22px;
    text-align: start;
  }
}

</style>
