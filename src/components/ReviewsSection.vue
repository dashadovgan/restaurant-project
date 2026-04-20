<template>
  <section class="reviews">
    <h2 class="reviews-title">Real talk from real foodies</h2>
    <p class="reviews-subtitle">
      Exceptional dining experiences shared by those who've tasted the
      difference
    </p>

    <swiper @swiper="onSwiper" :modules="[Pagination]" :slides-per-view="slidesPerView" :space-between="20" :loop="true"
      :pagination="paginationOptions">
      <swiper-slide v-for="(review, index) in reviews" :key="index" class="review-card">
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
        <img src="@/assets/image/left.png" alt="prev" @click="prevSlide" />
        <img src="@/assets/image/right.png" alt="next" @click="nextSlide" />
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default {
  name: "ReviewsSection",
  components: { Swiper, SwiperSlide },
  setup() {
    const slidesPerView = ref(window.innerWidth <= 480 ? 1 : window.innerWidth <= 860 ? 2 : 3);
    const paginationOptions = {
      el: ".custom-pagination",
      type: "progressbar",
    };

    const updateSlides = () => {
      if (window.innerWidth <= 480) {
        slidesPerView.value = 1;
      } else if (window.innerWidth <= 860) {
        slidesPerView.value = 2;
      } else {
        slidesPerView.value = 3;
      }
    };

    const swiperInstance = ref(null);

    const onSwiper = (swiper) => {
      swiperInstance.value = swiper;
    };

    const nextSlide = () => {
      swiperInstance.value?.slideNext();
    };

    const prevSlide = () => {
      swiperInstance.value?.slidePrev();
    };

    onMounted(() => {
      window.addEventListener("resize", updateSlides);
    });

    const reviews = [
      {
        image: require("@/assets/image/review1.webp"),
        text: "The Wagyu Steak was juicy. The ambiance made it ideal for a memorable evening.",
        name: "James Tortellini",
        role: "Food Blogger",
      },
      {
        image: require("@/assets/image/review2.webp"),
        text: "The cappuccino was rich and smooth. Perfect for a relaxing afternoon with a book.",
        name: "Maria Espresso",
        role: "Coffee Enthusiast",
      },
      {
        image: require("@/assets/image/review3.webp"),
        text: "The roller coasters were exhilarating! The staff was friendly and the atmosphere was electric.",
        name: "Tommy Thrill",
        role: "Adventure Blogger",
      },
      {
        image: require("@/assets/image/review3.webp"),
        text: "The roller coasters were exhilarating! The staff was friendly and the atmosphere was electric.",
        name: "Tommy Thrill",
        role: "Adventure Blogger",
      },
    ];

    return {
      Pagination,
      slidesPerView,
      paginationOptions,
      nextSlide,
      prevSlide,
      reviews,
      onSwiper,
    };
  },
};
</script>

<style scoped>
.reviews {
  text-align: center;
  padding: 40px 20px;
  color: white;
  background-color: var(--color-main);
}

.reviews-title {
  font-size: 58px;
  margin-bottom: 10px;
  color: #fdfdfd;
  font-family: "Cormorant Garamond", sans-serif;
  font-weight: 600;
}

.reviews-subtitle {
  font-size: 18px;
  margin-bottom: 30px;
  color: #ededed;
  font-family: "Lora", sans-serif;
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

.review-text * {
  margin: 0;
  padding: 0;
}

.review-text p {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  font-size: 14px;
}

.review-text h4 {
  margin: 3px 0;
  font-family: "Lora", sans-serif;
  font-weight: 600;
  font-size: 14px;
}

.review-text span {
  font-size: 12px;
  color: #777;
  font-family: "Lora", sans-serif;
  font-weight: 400;
}

.slider-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
}

/* Контейнер */
.custom-pagination {
  position: relative;
  width: 70%;
  height: 4px;
  background: #333;
  border-radius: 2px;
  overflow: hidden;
}

/* Сам "живой" рычажок */
:deep(.swiper-pagination-progressbar-fill) {
  background: #888;
  /* или любой серый */
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
  .review-text {
    width: 90%;
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

  .review-card {
    flex-direction: column;
  }
}
</style>
