<template>
  <footer class="site-footer">
    <!-- Верхняя часть футера -->
    <div class="footer-top">
      <!-- Левая колонка: текст + кнопка -->
      <div class="footer-col footer-left">
        <h2>Explore our French <br />Inspired Dishes</h2>
        <router-link to="/menu" class="menu-button">
          <AppButton>See Menu</AppButton>
        </router-link>
      </div>

      <!-- Средняя колонка: навигация -->
      <div class="footer-col footer-nav-col">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/menu">Menu</router-link></li>
          <li><router-link to="/our-story">Our Story</router-link></li>
          <li><router-link to="/reservation">Reservation</router-link></li>
          <li><router-link to="/news">News</router-link></li>
        </ul>
      </div>

      <!-- Правая колонка: соцсети -->
      <div class="footer-col footer-social-col">
        <span>Connect us</span>
        <div class="social-icons">
          <!-- Используем картинки вместо иконок FontAwesome -->
          <a href="#"><img src="@/assets//image/facebook-icon.png" alt="Facebook" /></a>
          <a href="#"><img src="@/assets/image/instagram-icon.png" alt="Instagram" /></a>
          <a href="#"><img src="@/assets/image/x-com.png" alt="Twitter" /></a>
          <a href="#"><img src="@/assets/image/whatsapp-icon.png" alt="WhatsApp" /></a>
        </div>
      </div>
    </div>

    <!-- Средняя полоса -->
    <div class="footer-middle">
      <span class="left">PlatiEU 2025 All Rights Reserved</span>
      <span class="right">
        <router-link to="/privasy-policy" class="privacy-button">
          Privacy Policy </router-link>,
        <router-link to="/terms-of-use" class="terms-button">Terms of Service</router-link>
      </span>
    </div>

    <!-- Нижняя часть с фото и синим фоном -->
    <div class="footer-bottom">
      <div class="image-container">
        <div class="blue-background"></div>
        <img src="@/assets/image/logo-text.webp" alt="Footer Photo" />
      </div>
    </div>
  </footer>
</template>

<script>
import AppButton from './ui/AppButton.vue';
export default {
  name: "FooterComponent",
  components: { AppButton }
};
</script>

<style scoped>
.site-footer {
  width: 100%;
  background-color: #05131f;
  color: white;
  font-family: "Lora", sans-serif;
}

/* Верхняя часть */
.footer-top {
  display: flex;
  justify-content: space-between;
  padding: 40px 10%;
  gap: 20px;
  /* расстояние между колонками */
}

/* Общий класс для колонок */
.footer-col {
  display: flex;
  flex-direction: column;
}

/* Левая колонка */
.footer-left {
  width: 50%;
}

.footer-left h2 {
  font-size: 48px;
  line-height: 1.2;
  margin: 0 0 15px 0;
  font-family: "Cormorant Garamond", serif;
  font-weight: 600;
}

/* Средняя колонка */
.footer-nav-col {
  width: 25%;
}

.footer-nav-col ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-nav-col li {
  margin-bottom: 8px;
}

.footer-nav-col a {
  color: #d7d7d7;
  text-decoration: none;
}

.footer-nav-col a:hover {
  text-decoration: underline;
}

/* Правая колонка */
.footer-social-col {
  width: 25%;
}

.footer-social-col span {
  margin-bottom: 8px;
  font-weight: 600;
}

.social-icons a {
  margin-right: 10px;
  color: white;
  font-size: 18px;
}

.social-icons img {
  width: 10%;
  align-items: center;
}

/* Средняя полоса футера */
.footer-middle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #555;
  padding: 10px 10%;
  font-size: 14px;
}

.footer-middle a {
  color: white;
  text-decoration: underline;
}

/* Нижняя часть футера с фото */
.footer-bottom .image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: auto;
}

/* Синий фон */
.blue-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-main);
  z-index: 1;
}

/* Фото поверх синего фона */
.footer-bottom img {
  position: relative;
  width: 90%;
  height: auto;
  object-fit: contain;
  /* сохраняем пропорции */
  z-index: 2;
  display: flex;
  justify-self: center;
}

/* Адаптив */
@media (max-width: 480px) {
  .footer-top {
    flex-direction: column;
    gap: 30px;
  }

  .social-icons {
    display: flex !important;
    flex-direction: row !important;
    justify-content: center;
    gap: 15px;
    flex-wrap: nowrap;
  }

  .social-icons a {
    display: inline-block;
  }

  .social-icons img {
    width: 40px;
    height: 40px;
    object-fit: contain;
    /* сохраняем пропорции */
    display: inline-block;
  }

  .footer-top h2 {
    font-size: 32px;
    text-align: center;
  }

  .footer-left,
  .footer-nav-col,
  .footer-social-col {
    width: 100%;
    align-items: center;
    text-align: center;
  }

  .footer-left button {
    width: 40%;
    margin-top: 20px;
  }

  .footer-bottom img {
    width: 80%;
    display: flex;
    justify-self: center;
  }
}
</style>
