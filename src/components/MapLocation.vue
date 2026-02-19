<template>
  <div class="map-wrapper">
    <!-- Карта -->
    <div class="map-container" ref="map"></div>

    <!-- Оверлейный блок -->
    <div class="map-overlay">
      <div class="overlay-info">
        <div>
          <h3>Platieu Restaurant</h3>
          <p>📍 21 Rue des Lilas, 75001 Paris, France</p>
          <p>📞 +33 6 12 34 56 78</p>
          <p class="rating">
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span class="star">★</span>
            <span>(1,662)</span>
          </p>
        </div>

        <!-- Кнопка сбоку с иконкой -->
        <button class="route-button" @click="openGoogleMaps">
          <img src="@/assets/Group.png" alt="Route Icon" />
          Route to restaurant
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  mounted() {
    const map = new window.google.maps.Map(this.$refs.map, {
      center: { lat: 48.8696, lng: 2.3426 },
      zoom: 15,
    });

    new window.google.maps.Marker({
      position: { lat: 48.8696, lng: 2.3426 },
      map,
      title: "21 Rue des Lilas, Paris",
    });
  },
  methods: {
    openGoogleMaps() {
      window.open(
        "https://www.google.com/maps/dir/?api=1&destination=21+Rue+des+Lilas,+Paris",
        "_blank"
      );
    },
  },
};
</script>

<style scoped>
.map-wrapper {
  position: relative;
  width: 90%;
  max-width: 1100px;
  margin: 0 auto;
}

.map-container {
  width: 100%;
  height: 600px;
  border-radius: 16px;
  overflow: hidden;
}

/* 🔹 Оверлейный блок */
.map-overlay {
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: #0d0d0d;
  color: #fff;
  padding: 20px 24px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: 45%;
}

/* 🔹 Контейнер для текста + кнопки сбоку */
.overlay-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overlay-info div {
  flex: 1;
}

.map-overlay h3 {
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 600;
}

.map-overlay p {
  margin: 4px 0;
  font-size: 14px;
}

/* 🔹 Рейтинг с иконками */
.rating .star {
  color: #ffa500; /* оранжевый */
  margin-right: 2px;
  font-size: 16px;
}

/* 🔹 Кнопка Route */
.route-button {
  display: flex;
  align-items: center;
  gap: 8px; /* расстояние между иконкой и текстом */
  background: #000;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  font-family: 'Lora', sans-serif;
}

.route-button img {
  width: 20px;
  height: 20px;
}

/* 🔹 Мобильная адаптация */
@media (max-width: 768px) {
  .map-container {
    width: 95%;      /* почти весь экран по ширине */
    height: 90vh;    /* 90% высоты экрана */
    border-radius: 12px;
    margin: 0 auto;  /* центрируем */
  }

  .map-overlay {
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;      /* почти вся ширина карты */
    max-width: none;
    text-align: center;
    border-radius: 12px;
    padding: 16px;
  }

  .overlay-info {
    flex-direction: column;
    gap: 12px;
    align-items: center;
  }

  .route-button {
    width: 100%;
    justify-content: center;
  }
}

</style>