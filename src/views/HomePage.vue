<template>
  <background-section>
  <section class="welcome">
<img :src="require('@/assets/diademaDecor.png')" alt="decor"/>
<h3>Welcome to the restourant</h3>
<p>Savor exquisite culinary creations prepared with fresh, local ingredients. Each dish celebrates vibrant flavors, presented in an ambiance of sophistication. Join us for an unforgettable dining experience where every bite tells a story.</p>
  <h1>A Symphony of Flavors in Every Bite</h1>
<div class="offersbtn">
  <router-link to="/menu" class="ourMenu">
    Our Menu
  </router-link>

  <reserve-button></reserve-button>
</div>
</section>
  </background-section>
  <section class="aboutUs">
   <div class="aboutUsContainer">
  <h3>Our Company</h3>
  <div class="aboutUsContent">
    <div class="aboutUsText">
      <p>Since its opening, the Restaurant has become a place where taste, quality, and dining experience unite in harmony. We are here with a passion for serving delicious food made from the finest fresh ingredients, combined with a touch of love and creativity from our kitchen.</p>
      <p>We believe that food is not just a means to fill the stomach, but a part of the story, happiness, and togetherness. That’s why every dish at the Restaurant is prepared with great care, to create special moments for you and your loved ones.</p>
    </div>
    <experience-block :widthPercent="100" />
  </div>
</div>

  </section>
 <ChefFavorites />
 <reviews-section />
 <section class="contact-section">
  <div class="contact-container">
  <ContactUs />
  <InfoContact />
  </div>
 </section>
<section class="mapsection">
<MapLocation />
</section>
<section class="FAQ-container">
  <FAQSection />
</section>
<section class="news-section">
  <div class="stories-wrapper">
    <StoriesBlock :maxPosts="3" />
  </div>
  <div class="news-button">
    <router-link to="/news">
      View All
    </router-link>
  </div>
</section>




</template>

<script>
import ReserveButton from '@/components/ReserveButton.vue';
import BackgroundSection from '@/components/BackgroundSection.vue';
import ExperienceBlock from '@/components/ExperienceBlock.vue';
import ChefFavorites from '@/components/ChefFavorites.vue';
import ReviewsSection from '@/components/ReviewsSection.vue';
import ContactUs from '@/components/ContactUs.vue';
import InfoContact from '@/components/InfoContact.vue';
import MapLocation from '@/components/MapLocation.vue';
import FAQSection from '@/components/FAQSection.vue';
import StoriesBlock from '@/components/StoriesBlock.vue';

export default {
  name: 'HomePage',
  components: {
    'reserve-button': ReserveButton,BackgroundSection,ExperienceBlock, ChefFavorites, ReviewsSection, ContactUs, InfoContact, MapLocation, FAQSection, StoriesBlock
  }
  
}
</script>   

<style scoped>
.news-container{
  display:flex;
  flex-direction: row;
  gap:40px;
  width: 100%;
  align-items: flex-start;
    background-color: #01101D;
}
.news-section{
  background-color: #05131F;
}
.stories-wrapper {
  display: flex;
  flex-direction: row; /* карточки в ряд */
  flex-wrap: wrap;     /* переход на новую строку при необходимости */
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.news-button {
  display: flex;
  justify-content: center; /* кнопка по центру под карточками */

  width: 100%;
}

.news-button a {
  background-color: #F4C73F;
  color: black;
  border: none;
  border-radius: 50px;
  padding: 12px 28px;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Lora', sans-serif;
  font-weight: 500;
  text-decoration: none;
  transition: 0.3s ease;
}

.news-button a:hover {
  background-color: #c7980c;
}


.offersbtn{
  display: flex;
  margin-top: 20px;
  justify-content:center;
  
}
.offersbtn .ourMenu {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 30px;
  color: white;
  cursor: pointer;

  font-family: 'Lora', sans-serif;
  line-height: 24px;
  width: 153px;
  height: 48px;
  font-weight: 400;
  font-size: 16px;

  margin-right: 50px;
  text-decoration: none; /* важно для router-link */
}

.offersbtn .ourMenu:hover {
  font-weight: 600;
}


.welcome{
  flex-direction: column;
  text-align: center;
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
.welcome h3{
  font-family: 'Cormorant Garamond', sans-serif;
  font-style: italic;
  line-height: 120%;
  font-weight: 400;
  font-size: 48px;
  color: #F9E68E;
   margin : 0 0 20px 0;
}
.welcome h1{
font-family: 'Cormorant Garamond', sans-serif;
font-size: 92px;
font-weight: 500;
line-height: 105%;
height: 194px;
 margin : 0 0 32px 0;
}
.aboutUs{
  background-color: #01101D;
  width: 100%;
  padding-top: 60px 0;
  display: flex;
  justify-content: center;
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

.contact-section {
  background-color: #05131F; /* темный фон */
  padding: 5% 5%; /* отступы в процентах */
  display: flex;
  justify-content: center;
  width: 100%;
}
.FAQ-container {
 background-color: #05131F; /* темный фон */
  padding: 5% 5%; /* отступы в процентах */
  display: flex;
  justify-content: center;
  width: 100%;
}
.contact-container {
  display: flex;
  width: 100%;
  max-width: 1200px; /* ограничение по ширине */
  gap: 5%; /* расстояние между колонками в процентах */
  flex-wrap: nowrap; /* держим колонки в строке */
  align-items: stretch; /* равная высота колонок */
  flex-direction: row !important ;  
}

.contact-container > * {
  flex: 1 1 0; /* колонки одинаковой ширины, растягиваются */
  min-width: 40%; /* минимальная ширина для каждой колонки */
}
.mapsection{
  display: flex;
   justify-content: center;
    background-color: #05131F;
  width: 100%;
  padding: 60px 60px;
}
.mapsection #map{
  
   width: 80% !important;                 /* карта занимает 80% ширины */
  height: 400px;              /* высота карты */
  border-radius: 12px;        /* скруглённые края для красоты */
  box-shadow: 0 4px 15px rgba(0,0,0,0.2); /* тень */
 
}


@media(max-width:480px){
  .mapsection #map{
  
   width: 100% !important;                 /* карта занимает 80% ширины */
  height: 900px;              /* высота карты */
  border-radius: 12px;        /* скруглённые края для красоты */
  box-shadow: 0 4px 15px rgba(0,0,0,0.2); /* тень */
 
}
.mapsection{
  
  display: flex;
  justify-content: center;
  background-color: #05131F;
  width: 100%;
  padding: 20px; /* можно уменьшить сверху/снизу на мобилке */
}


  .home {
  width: 100%;
  height: auto;
  background-image: url('@/assets/Background.png');
  background-size: cover;
  background-position: top center; /* верх изображения виден */
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
  margin: 0;
  padding-top: 141px;
}
.welcome{
  gap:16px;
  margin-top:50px;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 95%;
  max-width: 80%;
  height: auto;
}
.welcome h1{
  font-size: 48px;
  line-height: 1.3;
  max-width: 90%;
  height: 165px;
  justify-content: center;
  text-align: center;
  margin:0 auto 32px auto;
}
.welcome h3{
  font-size: 24px;
  font-style: normal;
  margin-bottom: 20px;
}


  .welcome p {
   font-family: 'Lora', sans-serif;
font-weight: 300; /* Regular */
font-style: normal;
font-size: 18px;
line-height: 26px;
letter-spacing: 0;
text-align: center;
  }


  .offersbtn {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .offersbtn .ourMenu,
  .offersbtn reserve-button {
    width: 180px; /* равная ширина кнопок */
    margin-right: 0;
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
  .contact-container {
    flex-direction: column !important ;
    gap: 30px;
  }
}

</style>