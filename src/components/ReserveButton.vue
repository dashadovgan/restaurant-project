<template>
  <router-link to="/reservation">
    <button class="reserve-button">Reserve a Seat</button>
  </router-link>
</template>

<script>
export default {
  name: "ReserveButton",
};
</script>

<style scoped>
.reserve-button {
  background-color: #f4c73f;
  border: none;
  padding: 8px 16px;
  border-radius: 30px;
  color: black;
  cursor: pointer;
  font-family: "Lora", sans-serif;
  line-height: 24px;
  width: 153px;
  height: 48px;
  font-weight: 400;
  font-size: 16px;
}

.reserve-button:hover {
  font-weight: 600;
  border: black;
}
</style>
