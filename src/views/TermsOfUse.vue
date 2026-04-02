<template>
  <section class="terms-section">
    <div class="terms-content">
      <!-- Заголовок -->
      <h1 class="terms-title">Terms of Use</h1>
      <p class="terms-intro">
        These Terms of Use ("Terms") govern your use of the Platieu website and
        its related services. By accessing or using our website, you agree to be
        legally bound by these Terms.<br />
        <br />
        Update . effective Date: 30 May 2025. 10.45 PM
      </p>

      <hr class="terms-divider" />

      <!-- Раздел 1 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">1. Eligibility</h2>
        <p class="terms-section-desc">
          You must be at least 18 years old to make a reservation or interact
          with payment services through our website.
        </p>
      </div>

      <!-- Раздел 2 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">2. Reservation & Deposit Policy</h2>
        <p class="terms-section-desc">
          To confirm a reservation at Platieu, a non-refundable deposit of $25
          is required. This helps ensure seating availability and avoid
          last-minute cancellations.
        </p>
        <p class="terms-section-desc">
          Upload of deposit proof is mandatory and must clearly show the
          transaction reference. Reservations without confirmed deposits may be
          canceled.
        </p>
      </div>
      <!-- Раздел 3 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">3. Cancellation & Refund</h2>
        <ul class="terms-section-list">
          <li>
            Cancellations made at least 24 hours in advance are eligible for a
            refund..
          </li>
          <li>Late cancellations or no-shows will forfeit the deposit.</li>
        </ul>
      </div>
      <!-- Раздел 4 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">4. User Conduct</h2>
        <p class="terms-section-desc">Users agree to:</p>
        <ul class="terms-section-list">
          <li>Provide accurate, current, and complete information.</li>
          <li>Refrain from illegal or unauthorized use of the website.</li>
          <li>Not upload harmful, defamatory, or offensive content.</li>
        </ul>
      </div>
      <!-- Раздел 5 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">5. Intellectual Property</h2>
        <p class="terms-section-desc">
          All content on the Platieu website (text, logos, images, menu items,
          layouts, and branding) is protected by copyright laws and may not be
          reused without permission.
        </p>
      </div>
      <!-- Раздел 6 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">6. Website Availability</h2>
        <p class="terms-section-desc">
          We strive to keep our website available at all times, but we do not
          guarantee uninterrupted access. Maintenance, updates, or technical
          issues may cause temporary disruptions.
        </p>
      </div>
      <!-- Раздел 7 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">7. Limitation of Liability</h2>
        <p class="terms-section-desc">
          Platieu shall not be liable for any indirect, incidental, or
          consequential damages arising out of your use of our services. Our
          liability is limited to the amount you paid (if any) for services
          rendered.
        </p>
      </div>
      <!-- Раздел 8 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">8. Modifications to Terms</h2>
        <p class="terms-section-desc">
          We reserve the right to update or modify these Terms at any time.
          Changes will be posted on this page with an updated date. Continued
          use of the website after changes constitutes your acceptance of the
          new Terms.
        </p>
      </div>
      <!-- Раздел 9 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">9. Governing Law</h2>
        <p class="terms-section-desc">
          These Terms are governed by and construed under the laws of France.
        </p>
      </div>
      <!-- Раздел 10 -->
      <div class="terms-section-item">
        <h2 class="terms-section-title">Contact Us</h2>
        <p class="terms-section-desc">
          For any questions about these Terms, contact us: Platieu Legal
          Department <br />
          Email: <strong>legal@platieu.com</strong> <br />
          Address: <strong> Rue de Paris, 75001 Paris, France</strong>
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "TermsOfUse",
};
</script>

<style scoped>
.terms-section {
  width: 100%;
  background-color: #05131f;
}

.terms-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: "Lora", sans-serif;
  color: #d7d7d7;
}

.terms-title {
  text-align: center;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fdfdfd;
}

.terms-intro {
  text-align: center;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 40px;
  color: #d7d7d7;
}

.terms-divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 40px;
}

.terms-section-item {
  margin-bottom: 40px;
}

.terms-section-title {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #fdfdfd;
  font-family: "Cormorant Garamond", sans-serif;
}

.terms-section-desc {
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 10px;
  color: #d7d7d7;
  font-family: "Lora", sans-serif;
}

.terms-section-list {
  list-style: disc inside;
  padding-left: 0;
  margin: 0;
  color: #d7d7d7;
}

.terms-section-list li {
  margin-bottom: 6px;
  font-size: 18px;
  line-height: 20px;
  font-family: "Lora", sans-serif;
}
</style>
