<template>
  <div class="reservation-container">
    <!-- Форма -->
    <div v-if="!formSubmitted">
      <h2 class="form-title">Reservation Form</h2>
      <form @submit.prevent="handleSubmit" class="res-form">
        <div class="input-group full-width">
          <label>Full name</label>
          <input v-model="form.fullName" type="text" placeholder="Enter your full name." />
        </div>

        <div class="form-row">
          <div class="input-group">
            <label>Email</label>
            <input v-model="form.email" type="email" placeholder="We'll send your confirmation here." />
          </div>

          <div class="input-group phone-group">
            <div class="country-selector" @click="isDropdownOpen = !isDropdownOpen">
              <span class="selected-flag">{{ selectedCountry.flag }}</span>
              <span class="selected-code">{{ selectedCountry.code }}</span>
              <span class="chevron">▼</span>

              <div v-if="isDropdownOpen" class="country-dropdown" @click.stop>
                <input v-model="searchQuery" class="search-countries" placeholder="Search country..." />
                <ul class="country-list">
                  <li v-for="country in filteredCountries" :key="country.iso" @click="selectCountry(country)">
                    <span>{{ country.flag }}</span>
                    <span>{{ country.name }}</span>
                    <span class="code">({{ country.code }})</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div class="phone-input-stack">
              <label>Phone Number</label>
              <input v-model="form.phone" type="tel" placeholder="So we can reach you if needed." />
            </div>
          </div>
        </div>

        <!-- Остальные поля формы (дата, время, гости, спец. запрос) -->
        <div class="form-row">
          <div class="input-group has-icon" @click="triggerDatePicker">
            <label>Reservation Date</label>
            <input ref="dateInput" v-model="form.date" type="date" class="hidden-input" />
            <div class="display-text">{{ form.date || 'Select your date of visit' }}</div>
            <img src="@/assets/icon.png" class="field-icon" alt="calendar" />
          </div>

          <div class="input-group has-icon" @click="triggerTimePicker">
            <label>Reservation Time</label>
            <input ref="timeInput" v-model="form.time" type="time" class="hidden-input" min="10:00" max="21:00" />
            <div class="display-text">{{ form.time || 'Choose preferred time' }}</div>
            <img src="@/assets/icon.png" class="field-icon" alt="time" />
          </div>
        </div>

        <div class="input-group full-width">
          <label>Number of Guests</label>
          <input v-model="form.guests" type="number" placeholder="Let us know how many are dining." />
        </div>

        <div class="input-group full-width textarea-group">
          <label>Special Request</label>
          <textarea v-model="form.request" placeholder="Input text here"></textarea>
        </div>

        <div class="terms-row">
          <input type="checkbox" id="terms" v-model="form.agreed" />
          <label for="terms">
            By checking the box you agree to our <router-link to="/terms-of-use">Terms of Service</router-link> and <router-link to="/privasy-policy">Privacy Policy</router-link>.
          </label>
        </div>

        <button type="submit" class="submit-btn">Send Message</button>
      </form>
    </div>

    <!-- Thank You Card -->
    <div v-else class="thank-card-wrapper">
  <div class="overlay"></div>
  <ThankYouCard 
    :transaction-id="transactionId"
    :date="form.date"
    :total="totalPrice"
  />
</div>
  </div>
</template>


<script setup>
import { reactive, ref, computed, onMounted } from 'vue';
import ThankYouCard from './ThankYouCard.vue';
import { db } from '@/firebase/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
const dateInput = ref(null);
const timeInput = ref(null);

const form = reactive({
  fullName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: null,
  request: '',
  agreed: false
});


const formSubmitted = ref(false);

const pricePerGuest = 22.11;

const totalPrice = computed(() => {
  return (form.guests || 1) * pricePerGuest;
});

const transactionId = computed(() => {
  return 'TRX-' + Math.random().toString(36).substring(2, 10).toUpperCase();
});

const triggerDatePicker = () => { dateInput.value.showPicker(); };
const triggerTimePicker = () => { timeInput.value.showPicker(); };

const countries = ref([]);
const isDropdownOpen = ref(false);
const searchQuery = ref('');
const selectedCountry = ref({ flag: '🌐', code: '+', name: 'Select', iso: '' });

onMounted(async () => {
  try {
    const res = await fetch('https://restcountries.com/v3.1/all?fields=name,idd,cca2,flag');
    const data = await res.json();
    countries.value = data.map(c => ({
      name: c.name.common,
      flag: c.flag,
      iso: c.cca2,
      code: (c.idd.root || '') + (c.idd.suffixes ? c.idd.suffixes[0] : '')
    })).sort((a, b) => a.name.localeCompare(b.name));

    const defaultCountry = countries.value.find(c => c.iso === 'UA');
    if (defaultCountry) selectedCountry.value = defaultCountry;
  } catch (err) {
    console.error("Failed to load countries", err);
  }
});

const filteredCountries = computed(() => {
  return countries.value.filter(c => 
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
    c.code.includes(searchQuery.value)
  );
});

const selectCountry = (country) => {
  selectedCountry.value = country;
  isDropdownOpen.value = false;
  searchQuery.value = '';
};

// 🔹 Сохранение бронирования в Firebase
const handleSubmit = async () => {
  if (!form.time) { alert('Please choose a time'); return; }
  if (!form.agreed) { alert('You must agree to Terms'); return; }
  if (form.time < '10:00' || form.time > '21:00') { alert('Reservations are available only from 10:00 to 21:00'); return; }

  try {
    await addDoc(collection(db, 'reservations'), {
      fullName: form.fullName,
      email: form.email,
      phone: selectedCountry.value.code + form.phone,
      date: form.date,
      time: form.time,
      guests: form.guests,
      request: form.request,
      createdAt: serverTimestamp()
    });

    formSubmitted.value = true;
    console.log("Reservation saved!");
  } catch (err) {
    console.error("Error saving reservation:", err);
    alert("Something went wrong. Try again!");
  }
};


</script>

<style scoped>
.reservation-container {
  background-color: #050a14;
  padding: 40px;
  border-radius: 12px;
  max-width: 800px;
  margin: auto;
  color: white;
}

.form-title {
  font-size: 28px;
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  gap: 20px;
  margin-bottom: 20px; /* Отступ между строками */
}

/* Общий стиль группы ввода */
.input-group {
  flex: 1;
  border: 1px solid #2d3748;
  border-radius: 12px;
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #0a0e17;
  margin-bottom: 20px; /* ОТСТУП, ЧТОБЫ ПОЛЯ НЕ СКЛЕИВАЛИСЬ */
}

.full-width {
  width: 100%;
}

.input-group label {
  font-size: 12px;
  color: #718096;
  margin-bottom: 6px;
}

.input-group input, .input-group textarea {
  background: transparent;
  border: none;
  color: white;
  outline: none;
  font-size: 15px;
}

/* Стили для иконок-фотографий */
.field-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px; /* Отрегулируй под свои фото */
  height: auto;
  cursor: pointer;
  pointer-events: none;
}

.hidden-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.display-text {
  font-size: 14px;
  color: #fff;
  min-height: 21px;
}

.phone-group {
  flex-direction: row;
  padding-left: 0;
}

.country-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 15px;
  border-right: 1px solid #2d3748;
  cursor: pointer;
}
.terms-row a{
  color:#F4C73F;
}
.phone-input-stack {
  display: flex;
  flex-direction: column;
  padding-left: 15px;
  flex: 1;
}

.country-dropdown {
  position: absolute;
  top: 75px;
  left: 0;
  width: 100%;
  min-width: 250px;
  background: #1a202c;
  border: 1px solid #4a5568;
  z-index: 1000;
  border-radius: 8px;
}

.search-countries {
  width: 100%;
  padding: 12px;
  background: #2d3748;
  border: none;
  color: white;
  border-bottom: 1px solid #4a5568;
}

.country-list {
  max-height: 250px;
  overflow-y: auto;
  list-style: none;
  padding: 0;
  margin: 0;
}
.thank-card-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(5, 10, 20, 0.85); /* тёмный полупрозрачный фон */
  border-radius: 12px;
  z-index: 1;
}

.thank-you-card {
  position: relative;
  z-index: 2; /* чтобы карточка была выше overlay */
  width: 100%;
  background-color: #0a0e17; /* можно чуть светлее, чем overlay */
  border-radius: 12px;
  color: white;
  text-align: center;
}

.country-list li {
  padding: 12px;
  display: flex;
  gap: 12px;
  cursor: pointer;
}

.country-list li:hover {
  background: #4a5568;
}

.textarea-group textarea {
  height: 100px;
  resize: none;
}

.submit-btn {
  width: 100%;
  background: #F4C73F;
  color: #000;
  padding: 18px;
  border-radius: 35px;
  font-weight: bold;
  font-size: 16px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  transition: opacity 0.3s;
}

.submit-btn:hover {
  opacity: 0.9;
}

.terms-row {
  display: flex;
  gap: 12px;
  font-size: 13px;
  color: #718096;
  margin-bottom: 10px;
  align-items: center;
}
/* ===== 📱 MOBILE FORM FIX ===== */
@media (max-width: 768px) {
  .reservation-container {
    width: 90%;
    padding: 24px 20px;
  }

  .form-row {
    flex-direction: column;
    gap: 0;
  }

  .input-group {
    width: 100%;
  }

  

  .country-selector {
    border-right: none;
    border-bottom: 1px solid #2d3748;
    padding: 12px 16px;
  }

  .phone-input-stack {
    padding-left: 0;
    padding-top: 10px;
  }

  .country-dropdown {
    position: fixed;
    top: 15%;
    left: 5%;
    width: 90%;
    max-height: 70vh;
  }

  .form-title {
    text-align: center;
    font-size: 24px;
  }

  .terms-row {
    align-items: flex-start;
  }
}

</style>
