<template>
  <background-section :style="{ minHeight: '70vh' }">
    <section class="welcome">
      <img :src="require('@/assets/diademaDecor.png')" alt="decor" />
      <h1>Where Passion Meets the Plate</h1>
      <p>
        At Platieu, every dish begins with a story—crafted from heart, heritage, and honest ingredients.
      </p>
    </section>
  </background-section>
 <section class="ourStoryContainer">
  <section class="aboutUs">
   <div class="aboutUsContainer">
  <h3>A Culinary Journey Rooted in Tradition</h3>
  <div class="aboutUsContent">
    <div class="aboutUsText">
      <p>Founded in the heart of France, Platieu is more than just a restaurant—it’s a celebration of flavors, culture, and the joy of gathering. Our mission is simple: to bring soulful dining experiences that blend local ingredients with refined techniques, served with warmth and care.</p>
      <p>From humble beginnings to a thriving culinary destination, our story continues to evolve with each plate we serve and every guest we welcome.</p>
    </div>
    <experience-block :widthPercent="100" />
  </div>
</div>
  </section>
  <section class="team-container">
    <team-section />
  </section>
   <section class="cta-section">
  <div class="cta-container">
    <div class="cta-content">
      <h2>Let's create your next culinary memory.</h2>
      <p>
        Have a question, a special request, or just want to say hello? Our team would love to hear from you.
      </p>
      <router-link to="/contact" class="cta-button">Contact Us</router-link>
    </div>
    <div class="cta-empty"></div>
  </div>
</section>

  </section>
</template>

<script setup>
import BackgroundSection from '@/components/BackgroundSection.vue'
import ExperienceBlock from '@/components/ExperienceBlock.vue'
import TeamSection from '@/components/TeamSection.vue';
</script>

<style scoped>
.ourStoryContainer{
    background-color: #010614;
}
.welcome{
  flex-direction: column;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 55%;
  padding-top: 0;
}
.welcome img{
  width: 262.5px;
}
.welcome p{
  font-family: 'Lora', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  margin : 0 0 0 0;
}
.welcome h1{
  font-family: 'Cormorant Garamond', sans-serif;
  line-height: 120%;
  font-weight: 400;
  font-size: 48px;
  color: white;
  margin : 0 0 20px 0;
}
.aboutUs{
  background-color: #01101D;
  width: 100%;
  padding-top: 60px 0;
  display: flex;
  justify-content: center;
  padding-bottom: 30px;
}
.aboutUsContainer{
  padding-top: 30px;
  display:flex;
  flex-direction: row;
  gap:40px;
  width: 90%;
  align-items: flex-start;
}
.aboutUs h3{
  color: white;
  font-size: 48px;
  font-weight: 600;
  flex-shrink: 0;
  width: 25%;
  font-family: 'Cormorant Garamond', sans-serif;
  margin-top: 0;
}

  .aboutUsText{
    display: flex;
    gap:20px;
    flex-direction: column;
    justify-items: flex-end;
    width: 100%;
   
  }
  .aboutUsText p{
    color:white;
    font-size:18px;
    line-height: 1.6;
     font-family: 'Lora', sans-serif;
    font-weight: 400;
  }
  .aboutUsContent {
  display: flex;
  flex-direction: column; /* текст + компонент вертикально */
  width: 75%; /* чтобы оставалось рядом с заголовком */
  gap: 20px;
}
.cta-section {
  background-color: #05131F;
  padding: 60px 20px;
  display: flex;
  justify-content: center; /* центрируем блок по горизонтали */
}

.cta-container {
  background-color: #010614;
  width: 90%;      /* блок занимает 90% ширины секции */
  border-radius: 12px;
  color: white;
  display: flex;    /* горизонтальные колонки */
  flex-direction: row;
  padding: 40px;
}

.cta-content {
  width: 50%;  /* текст занимает только половину блока */
}

.cta-empty {
  width: 50%;  /* пустое пространство справа */
}

.cta-container h2 {
  font-size: 58px;
  font-weight: 600;
  margin: 0 0 20px 0;
  font-family: 'Cormorant Garamond', sans-serif;
}

.cta-container p {
  font-size: 16px;
  line-height: 22px;
  margin-bottom: 30px;
  font-family: 'Lora', sans-serif;
}

.cta-button {
  display: inline-block;
  background-color: #f4c73f;
  color: #0a0e17;
  padding: 12px 30px;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s;
}

.cta-button:hover {
  background-color: #e6b936;
}

/* Адаптив */
@media (max-width: 768px) {
  .cta-container {
    flex-direction: column; /* на мобиле колонки становятся вертикальными */
    padding: 30px;
  }

  .cta-content {
    width: 100%;
    height: 500px;
  }

  .cta-empty {
    display: none; /* пустое пространство скрываем */
  }

  .cta-container h2 {
    font-size: 24px;
  }

  .cta-container p {
    font-size: 13px;
    line-height: 20px;
  }

  .welcome p{
    font-family: 'Lora', sans-serif;
    font-size: 18px;
    margin : 0 0 0 0;
    width: 140%;
  }

  .welcome h1{
    font-family: 'Cormorant Garamond', sans-serif;
    font-size: 40px;
    font-weight: 500;
    width: 130%;
    margin : 0 0 5px 0;
  }
  .aboutUs{
    justify-content: center;
  }
  .aboutUsContainer h3{
    width: auto;
    margin: 0;
    padding: 0;
  }
 .aboutUsContainer{
  padding-top: 70px;
  display:flex;
  flex-direction: column;
  gap:20px;
  width: 90%;
  align-items: flex-start;
  text-align:left;
}
.aboutUsText{
  width: 100%;
  flex-direction: column;
  gap:10px;
}
.aboutUsContent{
    width: 100%;
  }
}
</style>
