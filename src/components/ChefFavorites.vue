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
      <div v-for="dish in favorites" :key="dish.id" class="favorite-item">
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
        <router-link to="/menu">
          <app-button width="auto">
            Explore Our Menu
          </app-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import AppButton from "./ui/AppButton.vue";
import { fetchFavoriteDishes } from "@/services/chefFavourites.service";

export default {
  name: "ChefFavorites",
  setup() {
    const favorites = ref([]);

    const loadFavorites = async () => {
      try {
        favorites.value = await fetchFavoriteDishes();
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };

    onMounted(loadFavorites);

    return { favorites };
  },
  components: {
    AppButton
  }
};
</script>

<style scoped>
.chef-favorites {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5% 1%;
  background-color: var(--main-color);
  padding: 4% 2%;
  justify-content: center;
}

.favorites-button {
  margin-top: 50px;
}

.favorite-item {
  display: flex;
  flex-direction: row;
  width: 45%;
  background-color: var(--main-color);
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
  background-color: var(--main-color);
  padding: 3% 0;
}

.topic {
  font-size: 58px;
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
  color: white;
  margin-bottom: 1%;
  line-height: 114.99999999999999%;
}

.after-topic {
  font-size: 18px;
  color: #d7d7d7;
  font-family: "Lora", sans-serif;
  margin: 0;
  font-weight: 400;
}



@media (max-width: 850px) {
  .favorite-item {
    border-radius: 14px;
  }

  .favorite-item img {
    border-radius: 14px;
  }

}

@media (max-width: 748px) {
  .chef-favorites {
    flex-direction: column;
    gap: 20px;
    padding: 40px 20px;
  }

  .favorite-item {
    flex-direction: column;
    width: 100%;
    padding: 20px;
    gap: 12px;
    border-radius: 10px;
    align-items: center;
    /* центрируем содержимое */
    text-align: center;
  }

  .favorite-item img {
    width: 70%;
    /* ключевое изменение */
    height: auto;
    border-radius: 10px;
    object-fit: cover;
  }

  .favorite-info {
    width: 100%;
    gap: 10px;
    text-align: center;
    align-items: center;
  }

  .favorite-header {
    justify-content: center;
    flex-wrap: wrap;
  }

  .line {
    flex-grow: 1;
  }

  .price {
    font-size: 16px;
  }

  .category {
    margin: 0 auto;
  }
}

/* мобильная версия до 480px */
@media (max-width: 480px) {
  .favorites-button {
    display: flex;
    justify-content: center;
  }

  .chef-favorites {
    flex-direction: column;
    gap: 20px;
    /* расстояние между карточками */
    padding: 30px 15px;
  }

  .favorite-item {
    flex-direction: column;
    /* картинка сверху */
    width: 100%;
    padding: 15px;
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
    flex-wrap: wrap;
    /* чтобы цена не налезала на название */
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
