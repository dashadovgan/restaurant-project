<template>
    <background-section :style="{ minHeight: '70vh' }">
    <section class="welcome">
      <img :src="require('@/assets/diademaDecor.png')" alt="decor"/>
      <h1>Reserve Your Table at Platieu</h1>
      <p>We’re excited to host you! Kindly fill out the reservation form below to secure your table. To confirm your booking, a deposit of $25 is required. Please upload proof of payment at the end of the form.</p>
    </section>
  </background-section>
  <div class="ReservationForm-container">
    <ReservationForm />
  </div>
</template>

<script>
import BackgroundSection from '@/components/BackgroundSection.vue';
import ReservationForm from '@/components/ReservationForm.vue';

export default {
  name: 'ReservationPage',
  components:{ReservationForm, BackgroundSection}
}
</script>

<style scoped>
.ReservationForm-container{
  background-color:#05131F;
  padding-top: 50px;
  padding-bottom: 50px;
}
.welcome {
  flex-direction: column;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  width: 55%;
  padding-top: 0;
}

.welcome img {
  width: 262.5px;
}

.welcome p {
  font-family: 'Lora', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  margin: 0;
}

.welcome h1 {
  font-family: 'Cormorant Garamond', sans-serif;
  
  line-height: 120%;
  font-weight: 400;
  font-size: 58px;
  color: white;
  margin: 0 0 20px 0;
}

@media (max-width: 768px) {
  .welcome p {
    font-size: 18px;
    width: 140%;
  }

  .welcome h1 {
    font-size: 40px;
    width: 130%;
    margin: 0 0 5px 0;
  }

}
</style>