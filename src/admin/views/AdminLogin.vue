<template>
  <AdminLayout>
    <div class="admin-login">
      <h2>Вход в админку</h2>
      <p>Доступ только через разрешённый Google-аккаунт.</p>
      <AppButton :disabled="loading" @click="login">
        {{ loading ? "Входим..." : "Войти через Google" }}
      </AppButton>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </AdminLayout>
</template>

<script>
import AdminLayout from "./components/AdminLayout.vue";
import AppButton from "@/components/ui/AppButton.vue";
import { signInWithGoogle } from "@/services/admin-auth.service";

const ERROR_MESSAGES = {
  "admin/no-access": "У этого Google-аккаунта нет доступа к админке.",
  "auth/popup-closed-by-user": "Окно входа было закрыто.",
  "auth/popup-blocked": "Браузер заблокировал окно входа. Разрешите всплывающие окна для сайта.",
  "auth/unauthorized-domain": "Домен сайта не добавлен в Firebase Authentication → Settings → Authorized domains.",
  "auth/operation-not-allowed": "Вход через Google не включён в Firebase Authentication.",
};

export default {
  name: "AdminLogin",
  components: { AdminLayout, AppButton },
  data() {
    return { loading: false, error: "" };
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = "";
      try {
        await signInWithGoogle();
        const redirect = this.$route.query.redirect;
        this.$router.replace(typeof redirect === "string" && redirect.startsWith("/admin") ? redirect : "/admin");
      } catch (error) {
        console.error(error);
        this.error = ERROR_MESSAGES[error.code] || "Не удалось войти. Попробуйте ещё раз.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.admin-login {
  max-width: 400px;
  margin: 60px auto;
  text-align: center;
  color: #fff;
}

.admin-login p {
  font-family: var(--main-font);
}

.error {
  color: #ff8a8a;
}
</style>
