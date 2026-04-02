<template>
  <section class="location-section">
    <div class="container">
      <div class="content-header">
        <h2>Find Platieu Across France</h2>
        <p>
          Enjoy Platieu's taste at our locations nationwide. A memorable dining
          experience is always nearby.
        </p>
      </div>

      <div class="locations-grid">
        <div
          v-for="location in locations"
          :key="location.city"
          class="location-item"
        >
          <div class="location-title">
            <img src="@/assets/image/group.png" alt="pin" class="pin-icon" />
            <h3>{{ location.region }}</h3>
          </div>
          <div class="location-details">
            <p>{{ location.address }}</p>
            <p>{{ location.zip }} {{ location.city }}, France</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const locations = [
  {
    region: "Île-de-France",
    address: "12 Rue de Rivoli",
    zip: "75001",
    city: "Paris",
  },
  {
    region: "Auvergne-Rhône-Alpes",
    address: "22 Rue de la République",
    zip: "69002",
    city: "Lyon",
  },
  {
    region: "Provence-Alpes-Côte d'Azur",
    address: "45 Avenue Jean Médecin",
    zip: "06000",
    city: "Nice",
  },
  {
    region: "Occitanie",
    address: "10 Rue Alsace Lorraine",
    zip: "31000",
    city: "Toulouse",
  },
  {
    region: "Nouvelle-Aquitaine",
    address: "88 Cours Victor Hugo",
    zip: "33000",
    city: "Bordeaux",
  },
  {
    region: "Hauts-de-France",
    address: "19 Place Rihour",
    zip: "59800",
    city: "Lille",
  },
];
</script>

<style scoped>
.location-section {
  background-color: #05131f;
  color: #ffffff;
  padding: 80px 40px;
  font-family: "Georgia", serif;
}

.container {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  gap: 60px;
  width: 70%;
}

.content-header {
  flex: 1;
}

.content-header h2 {
  margin-bottom: 40px;
  font-size: 48px;
  font-family: "Cormorant Garamond" sans-serif;
}

.content-header p {
  color: #ccc;
  line-height: 1.6;
  max-width: 350px;
  font-weight: 26px;
  font-family: "Lora" sans-serif;
}

.locations-grid {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px 40px;
}

.location-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  font-family: "Lora" sans-serif;
  font-weight: 28px;
}

.pin-icon {
  width: 18px;
  height: auto;
}

.location-title h3 {
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
}

.location-details p {
  margin: 2px 0;
  color: #aaa;
  font-size: 0.95rem;
  padding-left: 28px;
}

/* Адаптивность для мобилок */
@media (max-width: 480px) {
  .container {
    flex-direction: column;
  }
  .locations-grid {
    grid-template-columns: 1fr;
  }
}
</style>
