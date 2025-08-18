<template>
  <div class="background-section">
    <slot></slot> <!-- сюда можно вставлять любой контент поверх фона -->
  </div>
</template>

<script>
export default {
  name: "BackgroundSection"
};
</script>

<style scoped>
.background-section {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-image: url('@/assets/Background.png');
  background-size: cover; /* изображение покрывает весь блок */
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

.background-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #00152899; /* полупрозрачный наложенный слой */
  z-index: 1;
}

.background-section > * {
  position: relative;
  z-index: 2; /* контент над наложением */
}

/* Мобильная версия */
@media(max-width:480px){
  .background-section {
    height: auto;
    background-size: cover;
    background-position: top center;
    justify-content: flex-start;
    padding-top: 141px;
  }
}
</style>