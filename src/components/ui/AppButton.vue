<template>
    <button class="app-button app-button--yellow" :style="{ width: width }" :type="type">
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
            default: "button",
            validator(value) {
                return ['button', 'submit', 'reset'].includes(value)// validator это функция  которая принимает значение пропса, includes способ проверки вхождения строки в массив разрешенных слов
            }
        }
    }
};
</script>

<style scoped>
.app-button {
    border: none;
    padding: 8px 16px;
    border-radius: 30px;
    cursor: pointer;
    font-family: "Lora", sans-serif;
    line-height: 24px;
    height: 48px;
    font-weight: 600;
    font-size: 16px;
    max-width: 100%;
}

.app-button--yellow {
    background-color: var(--main-accent-color);
    color: var(--main-color);

}

.app-button--yellow:hover {
    background-color: #c7980c;
}
</style>
