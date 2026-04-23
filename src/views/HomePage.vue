<template>
  <background-section>
    <section class="welcome">
      <img src="@/assets/image/diadem-decor.png" alt="decor" />
      <h3>Welcome to the restaurant</h3>
      <p>
        Savor exquisite culinary creations prepared with fresh, local
        ingredients. Each dish celebrates vibrant flavors, presented in an
        ambiance of sophistication. Join us for an unforgettable dining
        experience where every bite tells a story.
      </p>
      <h1>A Symphony of Flavors in Every Bite</h1>
      <div class="offers-btn">
        <router-link to="/menu" class="our-menu"> Our Menu </router-link>
        <router-link to="/reservation">
          <AppButton>Reserve a Seat</AppButton>
        </router-link>
      </div>
    </section>
  </background-section>
  <section class="about-us">
    <div class="about-us-container">
      <h3>Our Company</h3>
      <div class="about-us-content">
        <div class="about-us-text">
          <p>
            Since its opening, the Restaurant has become a place where taste,
            quality, and dining experience unite in harmony. We are here with a
            passion for serving delicious food made from the finest fresh
            ingredients, combined with a touch of love and creativity from our
            kitchen.
          </p>
          <p>
            We believe that food is not just a means to fill the stomach, but a
            part of the story, happiness, and togetherness. That’s why every
            dish at the Restaurant is prepared with great care, to create
            special moments for you and your loved ones.
          </p>
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
  <section class="map-section">
    <MapLocation />
  </section>
  <section class="faq-container">
    <FAQSection />
  </section>
  <section class="news-section">
    <div class="stories-wrapper">
      <StoriesBlock :maxPosts="3" />
    </div>
    <div class="news-button">
      <router-link to="/news">
        <AppButton>View News</AppButton>
      </router-link>
    </div>
  </section>
</template>

<script>
import AppButton from "@/components/ui/AppButton.vue";
import BackgroundSection from "@/components/BackgroundSection.vue";
import ExperienceBlock from "@/components/ExperienceBlock.vue";
import ChefFavorites from "@/components/ChefFavorites.vue";
import ReviewsSection from "@/components/ReviewsSection.vue";
import ContactUs from "@/components/ContactUs.vue";
import InfoContact from "@/components/InfoContact.vue";
import MapLocation from "@/components/MapLocation.vue";
import FAQSection from "@/components/FAQSection.vue";
import StoriesBlock from "@/components/StoriesBlock.vue";

export default {
  name: "HomePage",
  components: {
    AppButton,
    BackgroundSection,
    ExperienceBlock,
    ChefFavorites,
    ReviewsSection,
    ContactUs,
    InfoContact,
    MapLocation,
    FAQSection,
    StoriesBlock,
  },
};
</script>

<style scoped>
.news-container {
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 100%;
  align-items: flex-start;
  background-color: var(--main-color);
}

.news-section {
  background-color: #05131f;
}

.stories-wrapper {
  display: flex;
  flex-direction: row;
  /* карточки в ряд */
  flex-wrap: wrap;
  /* переход на новую строку при необходимости */
  justify-content: center;
  gap: 20px;
  width: 100%;
}

.news-button {
  display: flex;
  justify-content: center;
  /* кнопка по центру под карточками */

  width: 100%;
}

.offers-btn {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  max-width: 400px;
  margin: 20px auto 0 auto;
}

.offers-btn .our-menu {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: black;
  border: none;
  padding: 8px 16px;
  border-radius: 30px;
  color: white;
  cursor: pointer;

  font-family: "Lora", sans-serif;
  line-height: 24px;
  width: 153px;
  height: 48px;
  font-weight: 400;
  font-size: 16px;


  text-decoration: none;
  /* важно для router-link */
}

.offers-btn .our-menu:hover {
  font-weight: 600;
}

.welcome {
  flex-direction: column;
  text-align: center;
  justify-content: center;
  width: 55%;
  padding-top: 0;
  margin-bottom: 15px;
}

.welcome img {
  width: 262.5px;
}

.welcome p {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  margin: 0 0 0 0;
}

.welcome h3 {
  font-family: "Cormorant Garamond", sans-serif;
  font-style: italic;
  line-height: 120%;
  font-weight: 400;
  font-size: 48px;
  color: #f9e68e;
  margin: 0 0 20px 0;
}

.welcome h1 {
  font-family: "Cormorant Garamond", sans-serif;
  font-size: 92px;
  font-weight: 500;
  line-height: 105%;
  height: 25%;
  margin: 0 0 10px 0;
}

.about-us {
  background-color: var(--main-color);
  width: 100%;
  padding-top: 60px 0;
  display: flex;
  justify-content: center;
}

.about-us-container {
  padding-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 40px;
  width: 90%;
  align-items: flex-start;
  flex-wrap: wrap;
}

.about-us h3 {
  color: white;
  font-size: 48px;
  font-weight: 600;
  flex-shrink: 0;
  width: auto;
  font-family: "Cormorant Garamond", sans-serif;
  margin: 0;
  flex: 0 0 50px;
}

.about-us-text {
  display: flex;
  gap: 20px;
  flex-direction: column;
  justify-items: flex-end;
  width: 100%;
}

.about-us-text p {
  color: white;
  font-size: 18px;
  line-height: 1.6;
  font-family: "Lora", sans-serif;
  font-weight: 400;
}

.about-us-content {
  display: flex;
  flex-direction: column;
  width: 75%;
  gap: 20px;
  min-width: 300px;
  margin: auto;
}

.contact-section {
  background-color: #05131f;
  padding: 5% 5%;
  display: flex;
  justify-content: center;
  width: 100%;
}

.faq-container {
  background-color: #05131f;
  padding: 5% 5%;
  display: flex;
  justify-content: center;
  width: 100%;
}

.contact-container {
  display: flex;
  width: 100%;
  max-width: 1200px;
  gap: 5%;
  flex-wrap: nowrap;
  align-items: stretch;
  flex-direction: row !important;
}

.contact-container>* {
  flex: 1 1 0;
  min-width: 40%;
}

.map-section {
  display: flex;
  justify-content: center;
  background-color: #05131f;
  width: 100%;
  padding: 60px 60px;
}

.map-section #map {
  width: 80% !important;
  height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

@media (max-width: 480px) {
  .mapsection #map {
    width: 100% !important;
    height: 900px;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .map-section {
    display: flex;
    justify-content: center;
    background-color: #05131f;
    width: 100%;
    padding: 20px;
  }

  .home {
    width: 100%;
    height: auto;
    background-image: url("@/assets/image/background.webp");
    background-size: cover;
    background-position: top center;
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

  .welcome {
    gap: 16px;
    margin-top: 50px;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    width: 95%;
    max-width: 80%;
    height: auto;
  }

  .welcome h1 {
    font-size: 48px;
    line-height: 1.3;
    max-width: 90%;
    height: 20%;
    justify-content: center;
    text-align: center;
    margin: 0 auto 10px auto;
  }

  .welcome h3 {
    font-size: 24px;
    font-style: normal;
    margin-bottom: 20px;
  }

  .welcome p {
    font-family: "Lora", sans-serif;
    font-weight: 300;
    font-style: normal;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 0;
    text-align: center;
  }

  .offers-btn {
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .offers-btn .ourMenu,
  .offers-btn reserve-button {
    width: 180px;
    margin-right: 0;
  }

  .about-us {
    justify-content: center;
  }

  .about-us-container h3 {
    width: auto;
    margin: 0;
    padding: 0;
  }

  .about-us-container {
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 90%;
    align-items: flex-start;
    text-align: left;
  }

  .about-us-text {
    width: 100%;
    flex-direction: column;
    gap: 10px;
  }

  .about-us-content {
    width: 100%;
  }

  .contact-container {
    flex-direction: column !important;
    gap: 30px;
  }
}
</style>
