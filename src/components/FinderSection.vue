<template>
  <input
    type="text"
    class="finder-input"
    placeholder="Search..."
    v-model="query"
    @input="onInput"
  />
</template>

<script>
import { ref } from "vue";

export default {
  name: "FinderSection",
  emits: ["filter"],

  setup(props, { emit }) {
    const query = ref("");

    const onInput = () => {
      emit("filter", query.value);
    };

    return {
      query,
      onInput,
    };
  },
};
</script>

<style scoped>
.finder-input {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #000; /* черный фон */
  color: #fff; /* белый текст */
  font-size: 14px;
}
</style>
