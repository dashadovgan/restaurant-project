<template>
  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/Logo.png" alt="logo"/>
    </div>

<div v-if="isMenuOpen" class="menu-overlay"></div>



    <!-- Бургер -->
    <div class="burger" :class="{active:isMenuOpen}" @click="toggleMenu">
      <div></div>
      <div></div>
      <div></div>
    </div>

    <!-- Меню -->
    <ul :class="{'nav-links': true, 'active': isMenuOpen}">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/menu">Menu</router-link></li>
      <li><router-link to="/our-story">Our Story</router-link></li>
      <li><router-link to="/location">Location</router-link></li>
      <li><router-link to="/news">News</router-link></li>
      <li class="timeButton"><reserve-button></reserve-button></li> <!-- кнопка внутри меню -->
    </ul>

    <!-- Кнопка на десктопе -->
    <div class="action-button">
      <reserve-button></reserve-button>
    </div>
  </nav>
</template>

<script>
import ReserveButton from '@/components/ReserveButton.vue';

export default {
  name: 'AppNavbar',
  components: {
    'reserve-button': ReserveButton
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
</script>

<style scoped>

 .timeButton{
  display: none;
}
ul{
  padding: 0;
  margin: 0;
  
}
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  background-color: transparent;
  position: fixed;
  top:0;
  left:0;
  width: 100%;
  z-index: 1000;
}
.logo img {
  width: 125.83px;
  height: 40px;
  margin-left: 50px;
}
.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: #00000033;
  border-radius: 30px;
  padding: 15px  25px;
  
}

.nav-links li a {
  text-decoration: none;
  color: #D7D7D7;
  font-weight: 400;

}
.nav-links li a:hover{
  color:white;
  font-weight: 600;
}
.action-button {
  display: flex;
  margin-right: 50px;
  font-weight: 400;
  font-size:16px;
}
.action-button:hover{
  font-weight: 600;
}
.burger{
  display: none;
}
/* --- мобильная версия через media --- */
@media (max-width: 480px) {
  html, body{
    margin:0;
    padding:0;
    height: 100%;
    width: 100%;
  }
  .action-button{
    display: none;
  }
  .nav-links {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding:0;
    background-color:#010614;
    gap: 32px;
    display: none;
    z-index: 1000;
  }
  .nav-links li a {
    font-size: 30px;
    color: white;
  }
  .nav-links.active {
    display: flex;
    justify-content: flex-start;
    padding-top: 120px;
  }
  .timeButton{
    display: flex;
  }
  .burger {
    display: flex;
    flex-direction: column;
    gap: 5px;
    cursor: pointer;
    z-index: 1001;
  }
  .burger div {
    width: 30px;
    height: 4px;
    background-color: #fff;
    border-radius: 2px;
    transition: all 0.3s ease;
  transform-origin: center; 
  }
  .logo img{
    width: 125.83px;
    height: 40px;
    margin: 0;
    z-index: 1006;
    position: relative;
  }
  .burger.active div:nth-child(1) {
    transform: rotate(45deg) translate(7px, 7px);
  }
  .burger.active div:nth-child(2) {
    opacity: 0;
  }
  .burger.active div:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -5px);
  }


  .nav-links li reserve-button {
    width: 153px;
    display: flex;
    justify-content: flex-end;
  }
  .navbar{
    justify-content:space-between;
    display: flex;
    width: 100%;
    height: auto;
    align-items: center;
    padding:15px 20px ;
    z-index: 1005;
  }
  .menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;   /* занимает весь экран */
  background-color: #010614; /* темный фон */
  }
}
</style>