<template>
  <background-section :style="{ minHeight: '70vh' }">
    <section class="welcome">
      <img src="@/assets/image/diadem-decor.png" alt="decor" />
      <h1>Discover Our Curated Culinary Selection</h1>
      <p>
        From timeless classics to signature creations, our menu is a celebration
        of fresh ingredients and refined craftsmanship.
      </p>
    </section>
  </background-section>
  <div class="menu-page">
    <div class="menu-header">
      <h1 class="menu-title">Today Menu</h1>

      <!-- Filters -->
      <div class="menu-filters">
        <!-- Desktop buttons -->
        <div class="desktop-filters">
          <button v-for="cat in categories" :key="cat" :class="{ active: selectedCategory === cat }"
            @click="selectedCategory = cat">
            {{ cat }}
          </button>
        </div>

        <!-- Mobile dropdown -->
        <div class="mobile-filters">
          <select v-model="selectedCategory">
            <option v-for="cat in categories" :key="cat" :value="cat">
              {{ cat }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Menu -->
    <div class="menu-list">
      <template v-for="(group, category) in filteredGroupedDishes" :key="category">
        <h2>{{ category }}</h2>

        <div class="menu-grid">
          <div v-for="dish in group" :key="dish.id" class="menu-item">
            <img :src="dish.image" alt="dish" />

            <div class="menu-info">
              <span class="category">{{ dish.category }}</span>

              <div class="menu-header">
                <h4>{{ dish.name }}</h4>
                <span class="line"></span>
                <span class="price">{{ dish.price }}$</span>
              </div>

              <p>{{ dish.description }}</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <section class="review">
    <ReviewsSection />
  </section>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import BackgroundSection from "@/components/BackgroundSection.vue";
import ReviewsSection from "@/components/ReviewsSection.vue";

export default {
  name: "MenuPage",
  components: {
    BackgroundSection,
    ReviewsSection,
  },

  setup() {
    const dishes = ref([]);
    const selectedCategory = ref("All");

    const categories = ["All", "Appetizer", "Main", "Dessert", "Drink"];

    const loadMenu = async () => {
      const snapshot = await getDocs(collection(db, "menuItems"));
      dishes.value = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    onMounted(loadMenu);

    const groupedDishes = computed(() => {
      const order = ["Appetizer", "Main", "Dessert", "Drink"];
      const groups = {};

      order.forEach((cat) => {
        groups[cat] = dishes.value.filter((d) => d.category === cat);
      });

      return groups;
    });

    const filteredGroupedDishes = computed(() => {
      if (selectedCategory.value === "All") {
        return groupedDishes.value;
      }

      return {
        [selectedCategory.value]: groupedDishes.value[selectedCategory.value],
      };
    });

    return {
      categories,
      selectedCategory,
      filteredGroupedDishes,
    };
  },
};
</script>

<style scoped>
.welcome {
  flex-direction: column;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 55%;
  padding-top: 0;
  margin-bottom: 30px;
}

.welcome img {
  width: 262.5px;
}

.welcome p {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  margin: 0 0 0 0;
}

.welcome h3 {
  font-family: "Cormorant Garamond", sans-serif;
  font-style: italic;
  line-height: 120%;
  font-weight: 400;
  font-size: 48px;
  color: #f9e68e;
  margin: 0 0 20px 0;
}

.welcome h1 {
  font-family: "Cormorant Garamond", sans-serif;
  font-size: 92px;
  font-weight: 500;
  line-height: 105%;
  height: 20%;
  margin: 0 0 32px 0;
}

.menu-page {
  background: var(--color-main);
  color: white;
  padding: 4% 6%;
}

/* Intro */
.menu-header {
  display: flex;
  align-items: center;
  /* выравнивание по одной линии */
  justify-content: space-between;
  margin-bottom: 0px;
}

.menu-title {
  font-size: 56px;
  font-family: "Cormorant Garamond", serif;
  margin: 0;
  margin-top: 10px;
}

/* Filters */
.menu-filters {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  gap: 12px;
  margin-bottom: 10px;
}

.menu-filters button {
  background: #1a1f2c;
  color: white;
  border: none;
  padding: 8px 22px;
  border-radius: 30px;
  cursor: pointer;
}

.menu-filters button.active {
  background: #f4c73f;
  color: black;
}

/* Category title */
.menu-list h2 {
  margin: 50px 0 30px;
  font-size: 36px;
  font-family: "Cormorant Garamond", serif;
}

/* GRID — ВАЖНО */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 40px;
}

/* Card */
.menu-item {
  display: flex;
  gap: 18px;
}

.menu-item img {
  width: 30%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}

/* Info */
.menu-info {
  flex: 1;
}

.category {
  display: inline-block;
  background: #1a1f2c;
  padding: 4px 14px;
  border-radius: 30px;
  font-size: 12px;
  margin-bottom: 6px;
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.menu-header h4 {
  white-space: nowrap;
}

.line {
  flex: 1;
  height: 1px;
  background: #555;
}

.price {
  font-weight: 600;
}

.menu-info p {
  font-size: 14px;
  color: #d7d7d7;
  margin-top: 6px;
}

.mobile-filters {
  display: none;
}

@media (max-width: 950px) {
  .welcome {
    padding-top: 15%;
  }
}

@media (max-width: 860px) {
  .menu-grid {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }


}

@media (max-width: 1024px) {

  .menu-page .menu-header {
    flex-wrap: wrap;
    gap: 20px;
    justify-content: flex-start;
  }

  .menu-title {
    flex: 0 0 100%;
    font-size: 48px;
  }

  .menu-filters {
    justify-content: flex-start;
    margin-top: 0;
  }
}

/* MOBILE */
@media (max-width: 480px) {
  .menu-info {
    height: 30%;
  }

  .menu-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .menu-item {
    flex-direction: column;
  }

  .menu-item img {
    width: 100%;
    height: auto;
  }

  .menu-header {
    flex-direction: row;
    gap: 24px;
    text-align: center;
    flex-wrap: wrap;
    margin-bottom: 0px;
  }

  .welcome p {
    font-family: "Lora", sans-serif;
    font-size: 18px;
    margin: 0 0 0 0;
    width: 140%;
  }

  .welcome h1 {
    font-family: "Cormorant Garamond", sans-serif;
    font-size: 40px;
    font-weight: 500;
    width: 130%;
    margin: 0 0 5px 0;
  }

  .desktop-filters {
    display: none;
  }

  .mobile-filters {
    display: block;
    width: 100%;
    margin-top: 20px;
  }

  .mobile-filters select {
    width: 250%;
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
    font-size: 16px;
    background: #1a1f2c;
    color: white;
    cursor: pointer;
    align-items: flex-start;
  }
}
</style>
