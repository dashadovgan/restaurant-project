<template>
  <div class="admin-menu-form">
    <h2>{{ isEdit ? "Редактировать блюдо" : "Добавить блюдо" }}</h2>
    <form @submit.prevent="submitDish">
      <input v-model="dish.name" placeholder="Название блюда" required />
      <textarea v-model="dish.description" placeholder="Описание блюда"></textarea>
      <input v-model.number="dish.price" type="number" placeholder="Цена" required />

      <select v-model="dish.category" required>
        <option disabled value="">Выбери категорию</option>
        <option>Appetizer</option>
        <option>Main</option>
        <option>Dessert</option>
        <option>Drink</option>
      </select>

      <label>
        <input type="checkbox" v-model="dish.isFavorite" />
        Chef’s Favorite
      </label>

      <label>
        Фото блюда:
        <input type="file" @change="uploadImage" accept="image/*" />
      </label>
      <div v-if="dish.image">
        <img :src="dish.image" alt="preview" class="preview"/>
      </div>

      <button type="submit">{{ isEdit ? "Сохранить изменения" : "Добавить блюдо" }}</button>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue"; // реактивность и наблюдение
import { db } from "@/firebase/firebase"; // подключение Firestore
import { collection, addDoc, updateDoc, doc } from "firebase/firestore"; // функции для работы с документами
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage"; // функции для работы с файлами

export default {
  name: "AdminMenuForm",
  
  // props — данные от родителя
  props: { initialDish: Object },

  setup(props, { emit }) { // setup — основная логика компонента
    const isEdit = ref(!!props.initialDish);

    // объект блюда
    const dish = ref({
      name: "",
      description: "",
      price: null,
      category: "",
      isFavorite: false,
      image: ""
    });

    // если родитель прислал блюдо для редактирования, копируем его
    if (props.initialDish) dish.value = { ...props.initialDish };

    // наблюдаем за props.initialDish, если изменится от родителя — обновляем форму
    watch(() => props.initialDish, (newVal) => {
      if (newVal) dish.value = { ...newVal };
      isEdit.value = !!newVal; // включаем/выключаем режим редактирования
    });

    // подключение к Firebase Storage
    const storage = getStorage();

    // загрузка изображения
    const uploadImage = async (event) => {
      const file = event.target.files[0]; // берём первый выбранный файл
      if (!file) return;

      // создаём уникальное имя файла
      const path = `menuImages/${Date.now()}_${file.name}`;
      const storageReference = storageRef(storage, path);

      // загружаем файл и ждём завершения
      await uploadBytes(storageReference, file);

      // получаем ссылку на файл
      const url = await getDownloadURL(storageReference);
      dish.value.image = url; // сохраняем ссылку в объект блюда
    };

    // сохранение блюда в Firestore
    const submitDish = async () => {
      if (isEdit.value && dish.value.id) {
        // если редактируем — обновляем документ
        const dishRef = doc(db, "menuItems", dish.value.id);
        await updateDoc(dishRef, { ...dish.value });
      } else {
        // если добавляем новое — создаём документ
        await addDoc(collection(db, "menuItems"), { ...dish.value });
      }

      // сообщаем родителю, что блюдо сохранено
      emit("dish-saved");

      // очищаем форму
      dish.value = { name: "", description: "", price: null, category: "", isFavorite: false, image: "" };
      isEdit.value = false; // выключаем режим редактирования
    };

    // возвращаем переменные и функции для шаблона
    return { dish, uploadImage, submitDish, isEdit };
  }
};
</script>

<style scoped>
.admin-menu-form {
  max-width: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
input, textarea, select, button { width: 100%; padding: 8px; font-size: 16px; }
button { background-color: #1b1b1b; color: #fff; border: none; cursor: pointer; }
.preview { margin-top: 10px; max-width: 150px; border-radius: 8px; }
</style>