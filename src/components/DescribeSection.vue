<template>
  <section class="email-subscription">
    <!-- Оверлей поверх фона -->
    <div class="overlay">
      <div class="content">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get the latest updates, recipes, and exclusive offers straight to your inbox.</p>
        <form @submit.prevent="subscribe">
          <input
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
        <p v-if="message" class="message">{{ message }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";

export default {
  name: "DescribeSection",
  setup() {
    const email = ref("");
    const message = ref("");

    const subscribe = () => {
      if (email.value) {
        // Здесь можно добавить API вызов или Firebase подписку
        message.value = `Thank you for subscribing, ${email.value}!`;
        email.value = "";
      }
    };

    return { email, message, subscribe };
  },
};
</script>

<style scoped>
.email-subscription {
  position: relative;
  width: 100%;
  height: 400px; /* можно менять */
  background-image: url('@/assets/describe.jpg'); /* твоя картинка */
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(1, 16, 29, 0.48);
 /* полупрозрачный синий */
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  text-align: center;
  color: white;
  max-width: 500px;
  padding: 20px;
}

.content h2 {
  font-size: 32px;
  margin-bottom: 10px;
}

.content p {
  font-size: 16px;
  margin-bottom: 20px;
}

form {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

input[type="email"] {
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  outline: none;
  min-width: 200px;
  font-size: 16px;
  background-color: black;
}

button {
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  background-color: #F4C73F;
  color: black;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #ae8e2c;
}

.message {
  margin-top: 15px;
  font-size: 14px;
  color: #FFD966;
}
</style>
