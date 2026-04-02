<template>
  <div class="contact-form">
    <h1>Contact Us</h1>
    <form @submit.prevent="submitForm">

      <!-- Full name -->
      <div class="form-group field">
        <input
          id="fullName"
          v-model="fullName"
          placeholder="Input Text Here"
          required
        />
        <label for="fullName">Full Name</label>
      </div>

      <!-- Phone number (vue-tel-input) -->
      <div class="form-group field tel-group">
        <vue-tel-input
          v-model="phoneNumber"
          default-country="ua"
          :preferred-countries="['us','gb','ua']"
          :placeholder="'+380 67 123 4567'"
          @country-changed="onCountryChanged"
          required
        />
        <label>Phone Number</label>
      </div>

      <!-- Email -->
      <div class="form-group field">
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Input Text Here"
          required
        />
        <label for="email">Email</label>
      </div>

      <!-- Special request (big textarea) -->
      <div class="form-group field">
        <textarea
          id="request"
          v-model="request"
          placeholder="Input Text Here"
          rows="6"
        ></textarea>
        <label for="request">Special Request</label>
      </div>

      <!-- Checkbox -->
      <div class="form-group checkbox-group">
        <input type="checkbox" v-model="agree" id="terms"/>
        <label for="terms">
          By checking the box you agree to our
          <a href="#" target="_blank">Terms of Service</a> and
          <a href="#" target="_blank">Privacy Policy</a>.
        </label>
      </div>

      <button type="submit" :disabled="!agree">Send Message</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import { db } from '@/firebase/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default {
  name: "ContactUs",
  setup() {
    const fullName = ref('')
    const phoneNumber = ref('') 
    const email = ref('')
    const request = ref('')
    const agree = ref(false)
    const message = ref('')
    const selectedCountry=ref('ua')
    const phonePlaceholder= ref('+380 67 123 4567')

    const onCountryChanged= (country) =>{
      selectedCountry.value=country.iso2
      phonePlaceholder.value= `+${country.dialCode} 123 456 7890`
      phoneNumber.value= `+${country.dialCode}`
    }

    const submitForm = async () => {
      if (!agree.value) {
        message.value = "You must agree to the terms."
        return
      }
      try {
        await addDoc(collection(db, "contacts"), {
          fullName: fullName.value,
          phoneNumber: phoneNumber.value,
          email: email.value,
          request: request.value,
          createdAt: serverTimestamp()
        })
        message.value = "Thank you! Your message has been sent."
        fullName.value = ''
        phoneNumber.value = ''
        email.value = ''
        request.value = ''
        agree.value = false
      } catch(error) {
        console.error("Error adding document: ", error)
        message.value = "Something went wrong. Please try again."
      }
    }

    return { fullName, phoneNumber, email, request, agree, message, submitForm, selectedCountry, phonePlaceholder, onCountryChanged }
  }
}
</script>

<style scoped>
.contact-form {
  max-width: 500px;
  margin: 0px auto;
  background: #010614;
  padding: 28px;
  border-radius: 16px;
  color: #fff;
}

.contact-form form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.field {
  position: relative;
  display: block;
}

/* Общий стиль input и textarea */
.field input,
.field textarea {
  width: 100%;
  box-sizing: border-box;
  background: #010614;
  color: #FDFDFD;
  border: 1px solid #444444;
  border-radius: 12px;
  padding: 28px 14px 12px 14px;
  font-size: 14px;
  outline: none;
}

.field input::placeholder,
.field textarea::placeholder {
  color: #FDFDFD;
  font-family: 'Lora', sans-serif;
  font-size: 14px;
  font-weight: 500;
}

.field textarea {
  min-height: 140px;
  resize: vertical;
}

/* Метка сверху */
.field label {
  position: absolute;
  top: 6px;
  left: 14px;
  font-size: 12px;
  color: #D7D7D7;
  pointer-events: none;
  transition: color .12s, transform .12s;
  font-family: 'Lora', sans-serif;
  font-weight: 400;
}

.field input:focus + label,
.field textarea:focus + label {
  color: #FFD600;
}

/* --- Стилизация vue-tel-input --- */

/* Поле ввода */
.tel-group >>> .vti__input {
  background-color: #010614 !important;
  color: #fff !important;
  width: 100% !important;
  border: 1px solid rgba(255,255,255,0.12) !important;
  border-radius: 12px !important;
  outline: none !important;
  padding-top: 28px !important;
  padding-bottom: 12px !important;
  padding-left: 15px !important; /* место под флаг */
  font-size: 14px !important;
}

.tel-group >>> .vti__input::placeholder {
  color: rgba(255,255,255,0.6) !important;
  font-size: 14px !important;
}

/* Метка */
.tel-group label {
  position: absolute;
  top: 6px;
  left: 75px;
  font-size: 12px;
  color: rgba(255,255,255,0.65);
  pointer-events: none;
  font-family: 'Lora', sans-serif;
}

/* Флаг */
.tel-group >>> .vti__selected-flag {
  position: absolute !important;
  left: 14px !important;
  top: 50% !important;
  transform: translateY(-50%);
  width: 28px !important;
  height: 20px !important;
  border-radius: 4px !important;
  z-index: 10 !important;
  background: transparent !important;
}

/* Дропдаун */
.tel-group >>> .vti__dropdown {
  background-color: #0b0f1f !important;
  color: #fff !important;
  border-radius: 12px !important;
  border: 1px solid #444 !important;
  margin-top: 4px !important;
}

.tel-group >>> .vti__dropdown-item {
  padding: 6px 10px !important;
  background-color: #010614;
}

.tel-group >>> .vti__dropdown-item:hover {
  background: #FFD600 !important;
  color: #111 !important;
}

/* Hover & Focus */
.tel-group >>> .vti__input:hover,
.tel-group >>> .vti__input:focus {
  background-color: #0b0f1f !important;
  border-color: #FFD600 !important;
}

/* Кнопка */
button {
  margin-top: 6px;
  padding: 14px;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  background: #FFD600;
  color: #111;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: opacity 0.2s ease;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Чекбокс */
.checkbox-group {
  display: flex;
  gap: 10px;
  align-items: center;
}
.checkbox-group a {
  color: #FFA500;
  text-decoration: underline;
}

p {
  color: #FDFDFD;
  font-weight: bold;
  margin-top: 6px;
}
/* Фон списка */


</style>
