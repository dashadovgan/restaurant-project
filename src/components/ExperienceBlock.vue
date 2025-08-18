<template>
  <section class="experience-block" :style="{ width: widthPercent + '%' }">
    <div class="experience-content">
      <!-- текст -->
      <div class="experience-stats">
        <div class="stat">
          <div class="number">10+ years</div>
          <div class="description">of Culinary Excellence</div>
        </div>
        <div class="stat">
          <div class="number">5 awards</div>
          <div class="description">Winning chefs</div>
        </div>
        <div class="stat">
          <div class="number">4.9/5</div>
          <div class="description">Customers Rating on Average</div>
        </div>
      </div>

      <!-- картинки -->
      <div class="experience-images">
        <img :src="require('@/assets/exp1.png')" alt="Experience photo 1"/>
        <img :src="require('@/assets/exp2.png')" alt="Experience photo 2"/>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ExperienceBlock",
  props: {
    widthPercent: {
      type: Number,
      default: 100
    }
  }
};
</script>

<style scoped>
.experience-content{
  width: 100%;
  display:flex;
  flex-direction: column;
  align-items: flex-start;
}
.experience {
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  text-align: center;
}

.experience-stats {
  display: flex;
  justify-content: space-between;
  position: relative;
  width: 100%;
  margin: 0 auto 30px auto
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  flex:1;
}

.stat:not(:last-child)::after {
  content: "";
  position: absolute;
  top: 0;
  right:30px;
  width: 1px; /* тонкая полоска */
  height: 100%;
  background-color: #2c2c35; /* цвет полоски */
}
.number {
  font-family: 'Cormorant Garamond', serif;
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
  color:#F4C73F;
  white-space: nowrap;
}

.description {
  font-family: 'Lora', serif;
  font-size: 16px;
  line-height: 24px;
  color: #FDFDFD;
  white-space: nowrap;
}

.divider {
  width: 1px;
  background-color: #cccccc;
  height: 60px;
  align-self: center;
}

.experience-images {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}

.experience-images img:first-child {
  flex:0 0 55%;
  width: 55%;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
}
.experience-images img:last-child {
  flex: 0 0 43%;
  width: 43%;
  height: 50%;
  object-fit: cover;
  border-radius: 8px;
}

/* Мобильная версия */
@media(max-width:480px){
  
  .experience-stats {
    flex-direction: column;
    gap: 20px;
  }
  .divider {
    width: 60%;
    height: 1px;
    background-color: #cccccc;
    margin: 10px auto;
  }
  .experience-images {
    flex-direction: column;
    gap: 15px;
  }
  .experience-images img:first-child {
  flex:0 0 100%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
.experience-images img:last-child {
  flex: 0 0 100%;
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 8px;
}
/* Мобильная версия полосок */

  .stat:not(:last-child)::after {
    content: "";
    position: absolute;
    width: 95%;      /* длина горизонтальной полоски */
    height: 1px;     /* толщина */
    background-color: #2c2c35;
    top: 100%;       /* сразу под текстом */
    left: 50%;       /* центрируем по горизонтали */
    transform: translateX(-50%);
  }

}
</style>