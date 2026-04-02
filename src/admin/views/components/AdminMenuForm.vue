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
import { ref, watch } from "vue"; 
import { MenuService } from "@/services/menu.service";
export default{
  name:"AdminMenuForm",
  props:{
    initialDish:Object,
  },
  setup(props, { emit }) { 
    const isEdit = ref(!!props.initialDish);
    const dish = ref({
      name: "",
      description: "",
      price: null,
      category: "",
      isFavorite: false,
      image: ""
    });
    if (props.initialDish){
      dish.value={...props.initialDish}
    }
    watch(
      ()=>props.initialDish,
      (newVal)=>{
        if(newVal){
          dish.value={...newVal};
        }else{
          dish.value={
            name:"",
            description:"",
            price: null,
            category:"",
            isFavorite:false,
            image:"",
          };
        }
        isEdit.value=!!newVal;
      }
    );
    const uploadImage=async(event)=>{
     const file=event.target.files[0];
     const url=await MenuService.uploadImage(file);
     dish.value.image=url;
    };
    const submitDish=async()=>{
      if(isEdit.value && dish.value.id){
        await MenuService.updateDish(dish.value);
      }else{
        await MenuService.addDish(dish.value);
      }
      emit("dish-saved");
      dish.value={
      name: "",
      description: "",
      price: null,
      category: "",
      isFavorite: false,
      image: "",
                 };
      isEdit.value=false;
    };
    return { dish, uploadImage, submitDish, isEdit };
  },
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
input,
textarea, 
select,
button { 
  width: 100%; 
  padding: 8px; 
  font-size: 16px; 
}
button { 
  background-color: #1b1b1b; 
  color: #fff; 
  border: none; 
  cursor: pointer; 
}
.preview { 
  margin-top: 10px; 
  max-width: 150px; 
  border-radius: 8px; 
  }
</style>