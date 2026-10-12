<template>
  <div class="background-section">
    <!-- srcset/sizes должны совпадать с preload в public/index.html -->
    <img class="background-image" :src="heroSrc" :srcset="heroSrcset" sizes="100vw" alt="" aria-hidden="true"
      fetchpriority="high" decoding="async" />
    <slot></slot>
    <!-- сюда можно вставлять любой контент поверх фона -->
  </div>
</template>

<script>
const heroPath = `${process.env.BASE_URL}img/hero/hero-`;

export default {
  name: "BackgroundSection",
  data() {
    return {
      heroSrc: `${heroPath}1600.webp`,
      heroSrcset: [960, 1600, 2560].map((w) => `${heroPath}${w}.webp ${w}w`).join(", "),
    };
  },
};
</script>

<style scoped>
.background-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: var(--main-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.background-section>.background-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  z-index: 0;
}

.background-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00152899;
  /* полупрозрачный наложенный слой */
  z-index: 1;
}

.background-section>*:not(.background-image) {
  position: relative;
  z-index: 2;
}

/* Мобильная версия */
@media (max-width: 480px) {
  .background-section {
    height: auto;
    justify-content: flex-start;
    padding-top: 141px;
  }

  .background-section>.background-image {
    object-position: top center;
  }
}
</style>
