<template>
  <section class="privacy-policy-section">
    <div class="privacy-policy">
    <!-- Заголовок -->
    <h1 class="privacy-title">Privacy Policy</h1>
    <p class="privacy-intro">
      At Platieu, we are committed to protecting the privacy and security of our customers and website visitors. This Privacy Policy describes how we collect, use, and handle your personal information when you access our services, including through our website and any affiliated platforms. <br /> 
      <br />Update. Effective Date: 30 May 2025. 10.45 PM
    </p>

    <hr class="privacy-divider" />

    <!-- Раздел 1 -->
    <div class="privacy-section">
      <h2 class="section-title">1. Information We Collect</h2>
      <p class="section-desc">
        We collect several types of information to provide and improve our services:</p>
      <p class="section-desc">a. Personal Information:</p>
 <ul class="section-list">
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Reservation information (date, time, party size)</li>
        <li>Payment confirmation (upload of transfer receipt or deposit proof)</li>
         </ul>
        <p class="section-desc">b. Non-Personal Information:</p>
      <ul class="section-list">
        <li>Browser type and version</li>
        <li>IP address</li>
        <li>Device type</li>
        <li>Referral URLs and on-site interactions (pages visited, clicks, etc.)</li>
        <li>Date and time of access</li>
     </ul>
    </div>

    <!-- Раздел 2 -->
    <div class="privacy-section">
      <h2 class="section-title">2. How We Use Information</h2>
      <p class="section-desc">
        We use the information collected to:
      </p>
      <ul class="section-list">
        <li>Confirm and manage your table reservations.</li>
        <li>Process required deposits.</li>
        <li>Respond to customer support inquiries.</li>
        <li>Improve website functionality and user experience.</li>
        <li>Send marketing emails (only if you opt-in).</li>
        <li>Detect, prevent, and address technical issues or fraudulent activity.</li>
      </ul>
    </div>
    <!-- Раздел 3 -->
    <div class="privacy-section">
      <h2 class="section-title">3. Data Sharing and Disclosure</h2>
      <p class="section-desc">
        We do not sell, trade, or rent your personal data to third parties. However, we may share your information with:
  </p>
      <ul class="section-list">
        <li>Payment service providers (to process deposits securely).</li>
        <li>IT and hosting partners (to maintain and operate our website).</li>
        <li>Legal authorities when required by law or to defend against legal claims.</li>
      </ul>
    </div>
     <!-- Раздел 4 -->
    <div class="privacy-section">
      <h2 class="section-title">4. Data Storage and Security</h2>
      <p class="section-desc">
        We implement strong security measures, including:
      </p>
      <ul class="section-list">
        <li>Encrypted storage for sensitive data.</li>
        <li>Secure HTTPS protocol across our website.</li>
        <li>Limited access to your data, only by authorized personnel.</li>
      </ul>
        <p class="section-desc">
       Despite these measures, no digital system is 100% secure. Users should always protect their devices and logins.
        </p>
    </div>
    <!-- Раздел 5 -->
    <div class="privacy-section">
      <h2 class="section-title">5. Your Rights</h2>
      <p class="section-desc">
        As a user, you have the right to:

      </p>
      <ul class="section-list">
        <li>Access your personal data.</li>
        <li>Request correction of inaccurate data.</li>
        <li>Request deletion of your data.</li>
        <li>Withdraw consent (where applicable).</li>
      </ul>
        <p class="section-desc">
       To exercise these rights, contact us at <strong>privacy@platieu.com.</strong>
        </p>
    </div>
    <!-- Раздел 6 -->
    <div class="privacy-section">
      <h2 class="section-title">6. Cookies</h2>
      <p class="section-desc">
        We use cookies to:
      </p>
      <ul class="section-list">
        <li>Remember user preferences</li>
        <li>Analyze traffic and site performance</li>
        <li>Improve service delivery</li>
      </ul>
        <p class="section-desc">
        You can disable cookies in your browser settings, but this may affect your user experience.
        </p>
    </div>
    <!-- Раздел 7 -->
    <div class="privacy-section">
      <h2 class="section-title">7. Third-Party Links</h2>
      <p class="section-desc">
    Our website may contain links to external websites. We are not responsible for their content or privacy practices. Please review their policies separately.
      </p>
    </div>
      <!-- Раздел 8 -->
    <div class="privacy-section">
      <h2 class="section-title">8. Policy Updates</h2>
      <p class="section-desc">
    This Privacy Policy may be updated occasionally to reflect changes in law, technology, or our services. Updates will be posted on this page with an updated revision date.
      </p>
    </div>
    <!-- Раздел 9 -->
    <div class="privacy-section">
      <h2 class="section-title">Contact Us</h2>
      <p class="section-desc">
    If you have questions or concerns about this Privacy Policy, please contact us at: Platieu Customer Support <br />Email: <strong>contact@platieu.com</strong> <br /> Phone: <strong>+33 1 23 45 67 89</strong>
    </p>
    </div>
</div>
    <!-- Добавляй новые разделы по аналогии -->
  </section>
</template>

<script setup>
// Здесь пока ничего не нужно
</script>

<style scoped>
.privacy-policy-section {
  width: 100%;
    background-color: #05131F;
}
.privacy-policy{
    max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
  font-family: 'Lora', sans-serif;
  color: #D7D7D7;

}
.privacy-title {
  text-align: center;
  font-size: 48px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #FDFDFD;
}

.privacy-intro {
  text-align: center;
  font-size: 18px;
  line-height: 28px;
  margin-bottom: 40px;
  color: #D7D7D7;
}

.privacy-divider {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin-bottom: 40px;
}

.privacy-section {
  margin-bottom: 40px;
}

.section-title {
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #FDFDFD;
  font-family: 'Cormorant Garamond', sans-serif;
}

.section-desc {
  font-size: 18px;
  line-height: 22px;
  margin-bottom: 10px;
  color: #D7D7D7;
  font-family: 'Lora', sans-serif;
}

.section-list {
  list-style: disc inside;
  padding-left: 0; /* чтобы точки были прямо у текста */
  margin: 0;
  color: #D7D7D7;
}

.section-list li {
  margin-bottom: 6px;
  font-size: 18px;
  line-height: 20px;
    font-family: 'Lora', sans-serif;
}
</style>
