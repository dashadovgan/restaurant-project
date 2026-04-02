<template>
  <section class="contact-info">
    <div class="text">
      <h3>Craving Something Delicious?</h3>
      <p>From savory bites to sweet delights, your cravings end here.</p>
    </div>
    <!-- Первая строка: Локация и Телефон -->
    <div class="info-row">
      <div class="info-item">
        <h3 class="title">Our Location</h3>
        <div class="info-content">
          <i class="fas fa-map-marker-alt"></i>
          <img
            src="@/assets/image/location.png"
            alt="location icon"
            class="icon-img"
          />
          <a
            href="https://www.google.com/maps?q=21+Rue+des+Lilas+75001+Paris"
            target="_blank"
          >
            21 Rue des Lilas 75001 Paris, France
          </a>
        </div>
      </div>
      <div class="info-item">
        <h3 class="title">Phone Number</h3>
        <div class="info-content">
          <i class="fas fa-phone-alt"></i>
          <img src="@/assets/image/call.png" alt="call icon" class="icon-img" />
          <a href="tel:+33612345678">+33 6 12 34 56 78</a>
        </div>
      </div>
    </div>

    <!-- Вторая строка: Email и Open Door -->
    <div class="info-row">
      <div class="info-item">
        <h3 class="title">Email Address</h3>
        <div class="info-content">
          <i class="fas fa-envelope"></i>
          <img src="@/assets/image/sms.png" alt="cmc icon" class="icon-img" />
          <a href="mailto:hello@platieu.com">hello@platieu.com</a>
        </div>
      </div>
      <div class="info-item">
        <h3 class="title">Opening Hours</h3>
        <div class="info-content">
          <i class="fas fa-clock"></i>
          <div class="hours">
            <div class="hour-row">
              <img
                src="@/assets/image/clock.png"
                alt="clock icon"
                class="icon-img"
              />
              <p>Monday - Friday: 12:00 PM - 2:30 PM & 7:00 PM - 10:30 PM</p>
            </div>
            <div class="hour-row">
              <img
                src="@/assets/image/clock.png"
                alt="clock icon"
                class="icon-img"
              />
              <p>Saturday: 7:00 PM - 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ContactInfo",
};
</script>

<style scoped>
.contact-info {
  background-color: transparent;
  color: #ededed;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.info-item {
  display: flex;
  flex-direction: column;
  flex: 1 1 45%;
  min-width: 200px;
  gap: 8px;
}

.title {
  font-size: 16px;
  font-weight: 500;
  margin: 0;
  color: #ededed;
  font-family: "Cormorant Garamond", sans-serif;
  font-weight: 600;
  font-size: 24px;
}

.info-content {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-wrap: wrap;
}

.info-content i {
  color: #ffd600;
  font-size: 20px;
  margin-top: 2px;
}

.info-content a {
  color: #fff;
  text-decoration: none;
  font-family: "Lora", sans-serif;
  font-size: 16px;
  font-weight: 400;
}

.info-content a:hover {
  text-decoration: underline;
}

.hours p {
  margin: 0;
}
.text {
  flex-direction: column;
}
.text h3 {
  font-family: "Cormorant Garamond", sans-serif;
  font-weight: 600;
  font-size: 58px;
  margin: 0%;
}
.text p {
  font-family: "Lora", sans-serif;
  font-weight: 400;
  font-size: 18px;
}
.icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  margin-right: 8px;
  vertical-align: middle;
}
.hour-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}
</style>
