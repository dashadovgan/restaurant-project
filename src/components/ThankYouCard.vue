<template>
  <div class="thank-you-card">
    <img :src="checkIcon" alt="success" class="success-icon" />
    <h2 class="thank-text">Thank you for your reservation</h2>
    <p class="thank-text">
      Your table has been successfully requested. We've received your
      reservation details along with your deposit proof. Our team will review
      and send a confirmation email shortly.
    </p>
    <hr class="divider" />
    <h3 class="text-detail">Detail Transaction</h3>

    <div class="transaction-box">
      <div class="transaction-left">
        <p>Transaction ID</p>
        <p>Date</p>
        <p>Type</p>
        <p>Services</p>
        <p class="total-label">Total</p>
      </div>

      <div class="transaction-right">
        <p>{{ transactionId }}</p>
        <p>{{ date }}</p>
        <p>Dine in</p>
        <p>Table reservation</p>
        <p class="total-price">${{ total.toFixed(2) }}</p>
      </div>
    </div>

    <div class="button-row">
      <button class="secondary-btn" @click="downloadPDF">
        Download receipt
      </button>
      <router-link to="/menu">
        <button class="primary-btn">Explore our menu</button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import jsPDF from "jspdf";

const props = defineProps({
  transactionId: String,
  date: String,
  total: Number,
  checkIcon: {
    type: String,
    default: require("@/assets/image/icon-ready.png"),
  },
});

// Функция для скачивания PDF
const downloadPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Thank you for your reservation", 20, 20);

  doc.setFontSize(14);
  doc.text("Detail Transaction:", 20, 40);

  doc.text(`Transaction ID: ${props.transactionId}`, 20, 50);
  doc.text(`Date: ${props.date}`, 20, 60);
  doc.text("Type: Dine in", 20, 70);
  doc.text("Services: Table reservation", 20, 80);
  doc.text(`Total: $${props.total.toFixed(2)}`, 20, 90);

  doc.save("reservation.pdf");
};
</script>

<style scoped>
.divider {
  border: none; /* убираем стандартную границу */
  height: 1px; /* толщина линии */
  background-color: white; /* цвет линии */
  margin: 20px 0; /* отступ сверху и снизу */
  opacity: 0.5; /* можно сделать полупрозрачной */
}

.thank-you-card {
  background-color: #050a14;

  border-radius: 12px;
  max-width: 70%;
  margin: auto;
  color: white;
  text-align: left;
}

.success-icon {
  width: 60px;
  margin-bottom: 20px;
}

.thank-text p {
  margin-bottom: 30px;
  line-height: 1.5;
  font-family: "Lora", sans-serif;
  font-size: 14px;
}

.transaction-box {
  display: flex;
  justify-content: space-between;
  background: #0a0e17;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 30px;
  gap: 20px;
  width: 100%; /* чтобы колонки тянулись на всю ширину контейнера */
  box-sizing: border-box;
  flex-direction: row;
}
.text-detail {
  align-items: center;
  font-family: "Lora", sans-serif;
  font-size: 16px;
}
.transaction-left,
.transaction-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.transaction-left {
  align-items: flex-start;
}

.transaction-right {
  align-items: flex-end;
}

.transaction-left p,
.transaction-right p {
  margin: 6px 0;
}

.total-price {
  font-weight: bold;
}

.button-row {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}
.thank-text h2 {
  font-size: 32px;
  font-family: "Cormorant Garamond", sans-serif;
}
.primary-btn {
  background: #f4c73f;
  color: #000;
  border: none;
  padding: 15px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
}

.secondary-btn {
  background: transparent;
  border: 2px solid #f4c73f;
  color: #f4c73f;
  padding: 15px 25px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: bold;
}

@media (max-width: 480px) {
  .transaction-box {
    flex-direction: row;
    text-align: left;
  }

  .button-row {
    flex-direction: column;
  }

  .button-row button {
    width: 100%;
  }
  .thank-you-card {
    max-width: 90% !important;
    padding: 0%;
  }
}
</style>
