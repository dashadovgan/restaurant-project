<template>
  <div class="chef-card" v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0 }" :delay="100"
    @click="$emit('open', chef)">
    <img :src="chef.imageUrl" :alt="chef.name" />

    <h3>{{ chef.name }}</h3>
    <span>{{ chef.role }}</span>

    <p>{{ shortText }}</p>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  chef: Object,
});

const shortText = computed(() =>
  props.chef.description.length > 100
    ? props.chef.description.slice(0, 100) + "..."
    : props.chef.description
);
</script>

<style scoped>
.chef-card {
  cursor: pointer;
}

.chef-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 16px;
  margin-bottom: 20px;
}

.chef-card h3 {
  font-family: "Cormorant Garamond";
  font-size: 22px;
  margin-bottom: 4px;
}

.chef-card span {
  font-size: 13px;
  text-transform: uppercase;
  opacity: 0.6;
}

.chef-card p {
  margin-top: 12px;
  font-size: 14px;
  line-height: 22px;
  opacity: 0.8;
}

@media (max-width: 480px) {
  .chef-card img {
    width: 100%;
    height: 400px;
  }
}
</style>
