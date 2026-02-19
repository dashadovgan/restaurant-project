<template>
  <section class="reviews">
    <h2 class="reviews-title">Real talk from real foodies</h2>
    <p class="reviews-subtitle">
      Exceptional dining experiences shared by those who've tasted the difference
    </p>

    <swiper
      ref="swiperRef"
      :slides-per-view="slidesPerView"
      :space-between="20"
      :loop="true"
      :pagination="paginationOptions"
      class="reviews-slider"
    >
      <swiper-slide
        v-for="(review, index) in reviews"
        :key="index"
        class="review-card"
      >
        <img :src="review.image" :alt="'Review ' + (index + 1)" />
        <div class="review-text">
          <p>{{ review.text }}</p>
          <h4>{{ review.name }}</h4>
          <span>{{ review.role }}</span>
        </div>
      </swiper-slide>
    </swiper>

    <!-- Нижняя панель -->
    <div class="slider-controls">
      <div class="custom-pagination"></div>
      <div class="custom-buttons">
        <img src="@/assets/left.png" alt="prev" @click="prevSlide" />
        <img src="@/assets/right.png" alt="next" @click="nextSlide" />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import SwiperCore, { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";

SwiperCore.use([Pagination]);

export default {
  name: "ReviewsSection",
  components: { Swiper, SwiperSlide },
  setup() {
    const swiperRef = ref(null);
    const slidesPerView = ref(window.innerWidth <= 480 ? 1 : 3);
    const paginationOptions = { el: ".custom-pagination", clickable: true };

    

    const updateSlides = () => {
      slidesPerView.value = window.innerWidth <= 480 ? 1 : 3;
    };

    const nextSlide = () => {
      if (swiperRef.value && swiperRef.value.swiper) swiperRef.value.swiper.slideNext();
    };

    const prevSlide = () => {
      if (swiperRef.value && swiperRef.value.swiper) swiperRef.value.swiper.slidePrev();
    };

    onMounted(() => {
      window.addEventListener("resize", updateSlides);
    });

    const reviews = [
      {
        image: require("@/assets/review1.png"),
        text: "The Wagyu Steak was juicy. The ambiance made it ideal for a memorable evening.",
        name: "James Tortellini",
        role: "Food Blogger"
      },
      {
        image: require("@/assets/review2.png"),
        text: "The cappuccino was rich and smooth. Perfect for a relaxing afternoon with a book.",
        name: "Maria Espresso",
        role: "Coffee Enthusiast"
      },
      {
        image: require("@/assets/review3.png"),
        text: "The roller coasters were exhilarating! The staff was friendly and the atmosphere was electric.",
        name: "Tommy Thrill",
        role: "Adventure Blogger"
      }
    ];

    return {
      swiperRef,
      slidesPerView,
      paginationOptions,
      nextSlide,
      prevSlide,
      reviews
    };
  }
};
</script>

<style scoped>
.reviews {
  text-align: center;
  padding: 40px 20px;
  color: white;
  background-color: #01101D;
}

.reviews-title {
  font-size: 58px;
  margin-bottom: 10px;
  color: #FDFDFD;
  font-family: 'Cormorant Garamond', sans-serif;
  font-weight: 600;
}

.reviews-subtitle {
  font-size: 18px;
  margin-bottom: 30px;
  color: #EDEDED;
  font-family: 'Lora', sans-serif;
  font-weight: 400;
}

.review-card {
  position: relative;
}

.review-card img {
  width: 100%;
  border-radius: 8px;
}

.review-text {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 12px 20px;
  border-radius: 20px;
  color: black;
  text-align: left;
  width: 80%;
  box-sizing: border-box;
}

.review-text * { margin: 0; padding: 0; }

.review-text p { font-family: 'Lora', sans-serif; font-weight: 400; font-size: 14px; }
.review-text h4 { margin: 3px 0; font-family: 'Lora', sans-serif; font-weight: 600; font-size: 14px; }
.review-text span { font-size: 12px; color: #777; font-family: 'Lora', sans-serif; font-weight: 400; }

.slider-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

.custom-pagination {
  width: 70%;
  height: 4px;
  background: #333;
  border-radius: 2px;
}

.custom-buttons img {
  width: 30px;
  height: 30px;
  cursor: pointer;
  margin-left: 10px;
}

/* Мобильная версия */
@media (max-width: 480px) {
  .review-text 
  { width: 90%; 
    padding: 10px 15px; 
    bottom: 15px; 
    border-radius: 15px; 
  }
  .review-text h4 { 
    font-size: 11px; 
  }
  .review-text span { 
    font-size: 10px; 
  }

  .slider-controls { 
    flex-direction: column; 
    align-items: center; 
  }
  .custom-pagination { 
    width: 60%; 
    margin-bottom: 10px; 
  }
  .custom-buttons { 
    width: 100%; 
    display: flex; 
    justify-content: space-between; 
  }
  .review-card{
    flex-direction: column;
  }
}
</style>