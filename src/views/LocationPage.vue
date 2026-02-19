<template>
   <background-section :style="{ minHeight: '70vh' }">
  <section class="welcome">
<img :src="require('@/assets/diademaDecor.png')" alt="decor"/>
  <h1>We’d Love to Hear From You</h1>
<p>Whether you have a question, special request, or simply want to say hello, our team is here to help.</p>
</section>
  </background-section>
  <div class="location-page">
  <section class="contact-section">
  <div class="contact-container">
  <ContactUs />
  <InfoContact />
  </div>
 </section>
 <section class="mapsection">
<MapLocation />
</section>
<section class="AllLocationInfo">
  <LocationInfo />
</section>
  </div>
</template>

<script>
import BackgroundSection from '@/components/BackgroundSection.vue';
import ContactUs from '@/components/ContactUs.vue';
import InfoContact from '@/components/InfoContact.vue';
import LocationInfo from '@/components/LocationInfo.vue';
import MapLocation from '@/components/MapLocation.vue';

export default {
  name: 'LocationPage',
  components:{
    BackgroundSection, ContactUs, InfoContact, MapLocation, LocationInfo
  }
}
</script>

<style scoped>
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
.location-page{
  background-color: #01101d ;
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
.contact-section {
  background-color: #05131F; /* темный фон */
  padding: 5% 5%; /* отступы в процентах */
  display: flex;
  justify-content: center;
  width: 100%;
}
.contact-container > * {
  flex: 1 1 0; /* колонки одинаковой ширины, растягиваются */
  min-width: 40%; /* минимальная ширина для каждой колонки */
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
.AllLocationInfo{
  display: flex;
  justify-content: center;
  margin-left: 120px;
  
}
@media (max-width: 768px) {

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
.contact-container {
    flex-direction: column !important ;
    gap: 30px;
  }
}

  



</style>