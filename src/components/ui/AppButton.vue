<template>
    <button class="yellow-button" :style="{ width: width }" :type="type">
        <slot />
    </button>
</template>

<script>
export default {
    name: "AppButton",
    props: {
        width: {
            type: String,
            default: "auto"
        },
        type: {
            type: String,
            default: "button"
        }
    }
};
</script>

<style scoped>
.yellow-button {
    background-color: #f4c73f;
    border: none;
    padding: 8px 16px;
    border-radius: 30px;
    color: black;
    cursor: pointer;
    font-family: "Lora", sans-serif;
    line-height: 24px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    max-width: 100%;
}

.yellow-button:hover {
    background-color: #c7980c;
}
</style>
