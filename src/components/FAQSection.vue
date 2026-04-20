<template>
  <section class="faq-section">
    <!-- Заголовок с декоративными элементами -->
    <div class="faq-header">
      <img src="@/assets/image/right-torn.png" alt="decor" class="decor decor-left" />
      <div class="faq-title">
        <h2>What’s on Your Mind?</h2>
        <p>We’ve answered the questions you didn’t know you had.</p>
      </div>
      <img src="@/assets/image/left-torn.png" alt="decor" class="decor decor-right" />
    </div>

    <!-- Список вопросов -->
    <div class="faq-list">
      <div v-for="(item, index) in faqItems" :key="index" class="faq-item">
        <div class="faq-question" @click="toggle(index)">
          <h3>{{ item.question }}</h3>
          <span class="faq-toggle">{{
            activeIndex === index ? "−" : "+"
            }}</span>
        </div>

        <transition name="fade">
          <p v-if="activeIndex === index" class="faq-answer">
            {{ item.answer }}
          </p>
        </transition>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const activeIndex = ref(null);

const faqItems = [
  {
    question: "What are the restaurant’s hours of operation?",
    answer: "We are open every day from 10:00 AM to 10:00 PM.",
  },
  {
    question: "Do I need to make a reservation before coming?",
    answer: "Reservations are not required but recommended on weekends.",
  },
  {
    question: "Is there a vegetarian or vegan menu available?",
    answer: "Yes, we offer a full selection of vegetarian and vegan dishes.",
  },
  {
    question: "Does this restaurant offer delivery services?",
    answer:
      "Yes, we partner with major delivery apps and offer direct delivery.",
  },
  {
    question: "Can I host a private event at the restaurant?",
    answer: "Of course! We have a private room for events up to 40 guests.",
  },
  {
    question: "Is parking available?",
    answer: "Yes, we have a private parking area for guests.",
  },
];

const toggle = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
/* ---------- SECTION ---------- */
.faq-section {
  background-color: #05131f;
  color: #ffffff;
  text-align: center;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* ---------- HEADER ---------- */
.faq-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 80px;
  flex-wrap: wrap;
  width: 80%;
}

.decor {
  width: 130px;
  height: auto;
  opacity: 0.9;
}

.faq-title h2 {
  font-weight: 400;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
  font-size: 58px;
  font-family: "Cormorant Garamond", sans-serif;
}

.faq-title p {
  font-size: 18px;
  font-weight: 300;
  opacity: 0.8;
  margin: 0;
  font-family: "Lora", sans-serif;
}

/* ---------- LIST ---------- */
.faq-list {
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  text-align: left;
}

.faq-item {
  padding: 8px 0;
}

/* 🔹 убраны все линии (border) */
.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: color 0.3s ease;
}

.faq-question h3 {
  font-weight: 400;
  margin: 0;
  font-family: "Cormorant Garamond", sans-serif;
  font-size: 32px;
  padding-bottom: 20px;
}

.faq-question:hover h3 {
  color: #ff9900;
}

.faq-toggle {
  font-size: 29px;
  font-weight: 600;
  color: #ffffffcc;
  transition: transform 0.2s ease, color 0.3s ease;
  user-select: none;
}

.faq-question:hover .faq-toggle {
  transform: scale(1.2);
  color: #ff9900;
}

.faq-answer {
  margin-top: 12px;

  line-height: 1.6;
  opacity: 0.85;
  font-family: "Lora" sans-serif;
  font-size: 16px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 480px) {
  .faq-section {
    padding: 60px 12px;
  }

  .faq-header {
    gap: 12px;
  }

  .decor {
    width: 70px;
  }

  .faq-list {
    width: 90%;
  }

  .faq-title h2 {
    font-size: 40px;
  }

  .faq-title p {
    font-size: 16px;
  }

  .decor {
    display: none;
  }

  .faq-question h3 {
    font-size: 24px;
  }

  .faq-answer {
    font-size: 16px;
  }
}
</style>
