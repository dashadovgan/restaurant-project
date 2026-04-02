<template>
  <div>
    <!-- Вступительный блок -->
    <div class="introduse-favorite">
      <h1 class="topic">Chef’s Favorites</h1>
      <p class="after-topic">
        The dishes our chef can’t stop thinking about, and neither will you.
      </p>
    </div>

    <!-- Секция избранных блюд -->
    <div class="chef-favorites">
      <div
        v-for="dish in favorites"
        :key="dish.id"
        class="favorite-item"
      >
        <img :src="dish.image" alt="dish image" />
        <div class="favorite-info">
          <div class="category">{{ dish.category }}</div>
          <div class="favorite-header">
            <h4>{{ dish.name }}</h4>
            <div class="line"></div>
            <div class="price">{{ dish.price }}$</div>
          </div>
          <p>{{ dish.description }}</p>
        </div>
      </div>
        <div class="favorites-button">
         <router-link to="/menu" class="our-menu">
    Explore Our Menu
  </router-link>
    </div>
    </div>
  
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";

export default {
  name: "ChefFavorites",
  setup() {
    const favorites = ref([]);

    const loadFavorites = async () => {
      try {
        const q = query(
          collection(db, "menuItems"),
          where("isFavorite", "==", true)
        );
        const snapshot = await getDocs(q);
        favorites.value = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    onMounted(loadFavorites);

    return { favorites };
  },
};
</script>

<style scoped>
.chef-favorites {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5% 1%;
  background-color: #01101d;
  padding: 4% 2%;
  justify-content: center;
}

.favorite-item {
  display: flex;
  flex-direction: row;
  width: 45%;
  background-color: #01101d;
  padding: 0.5%;
  border-radius: 1%;
  gap: 2%;
  color: white;
  box-sizing: border-box;
}

.favorite-item img {
  width: 30%;
  height: auto;
  object-fit: cover;
  border-radius: 1%;
  flex-shrink: 0;
}

.favorite-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8%;
  width: 65%;
}

/* категория сверху */
.category {
  display: inline-flex;
  background-color: #1a1f2c;
  color: white;
  border-radius: 70px;
  padding: 0.5% 4%;
  font-size: 14px;
  font-weight: 400;
  width: fit-content;
  justify-content: center;
  align-items: center;
  margin-bottom: 0.5%;
  font-family: "Lora", sans-serif;
}

/* заголовок и ценник */
.favorite-header {
  display: flex;
  align-items: center;
  gap: 0.5%;
  margin-bottom: 0.5%;
  position: relative;
}

.favorite-header h4 {
  font-size: 20px;
  font-family: "Lora", sans-serif;
  font-weight: 500;
  margin: 2% 0;
  white-space: nowrap;
}

.line {
  flex-grow: 1;
  height: 1px;
  background-color: #555;
  margin: 0 1%;
}

.price {
  font-weight: 600;
  font-size: 1vw;
  white-space: nowrap;
}

.favorite-info p {
  font-size: 14px;
  line-height: 22px;
  margin: 0;
  font-family: "Lora", sans-serif;
  font-weight: 400;
  color: #d7d7d7;
}

.introduse-favorite {
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #01101d;
  padding: 3% 0;
}

.topic {
  font-size: 58px;
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
  color: white;
  margin-bottom: 1%;
  line-height: 114.99999999999999%
}

.after-topic {
  font-size: 18px;
  color: #d7d7d7;
  font-family: "Lora", sans-serif;
  margin: 0;
  font-weight: 400;
}
.our-menu {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 20px;
  background-color: #F4C73F; 
  color: black;
  border: none;
  border-radius: 50px;
  padding: 12px 28px;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Lora', sans-serif;
  font-weight: 500;
  transition: 0.3s ease;
  text-decoration: none; 
}

.our-menu:hover {
  background-color: #c7980c; /* подсветка при наведении */
}

/* мобильная версия до 480px */
@media (max-width: 480px) {
  .favorites-button button {
    width: 50%;
    padding: 0;
    font-size: 18px;
    border-radius: 30px;
    font-family: 'Lora', sans-serif;
    font-weight: 500;
  }

  .chef-favorites {
    flex-direction: column;
    gap: 20px; /* расстояние между карточками */
    padding: 6% 4%;
  }

  .favorite-item {
    flex-direction: column; /* картинка сверху */
    width: 100%;
    padding: 4%;
    gap: 12px;
    border-radius: 8px;
  }

  .favorite-item img {
    width: 100%;
    height: auto;
    border-radius: 8px;
  }

  .favorite-info {
    width: 100%;
    gap: 10px;
    text-align: left;
  }

  .favorite-header {
    flex-direction: row;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap; /* чтобы цена не налезала на название */
  }

  .favorite-header h4 {
    font-size: 18px;
    margin: 0;
  }

  .line {
    flex-grow: 1;
    height: 1px;
    background: #ccc;
    margin: 0 8px;
  }

  .price {
    font-size: 16px;
  }

  .favorite-info p {
    font-size: 14px;
    line-height: 20px;
  }

  .category {
    font-size: 12px;
    padding: 4px 10px;
  }

  .topic h1 {
    font-size: 22px;
  }

  .topic p {
    font-size: 14px;
  }
}
</style>