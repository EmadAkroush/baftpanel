<template>
  <div class="min-h-screen bg-main flex items-center justify-center p-4">

    <div class="w-full max-w-md bg-card shadow-2xl rounded-2xl p-8 border border-purple-900/40 backdrop-blur-sm">

      <!-- Logo -->
      <div class="flex justify-center mb-8">
        <img src="" class="w-28 opacity-80" alt="Logo" />
      </div>

      <!-- Title -->
      <h2 class="text-2xl font-bold text-center text-white mb-2">
        Welcome Back
      </h2>
      <p class="text-center text-gray-400 mb-6 text-sm">
        Please sign in to your admin dashboard
      </p>

      <!-- Form -->
      <form @submit.prevent="login" class="space-y-5">
        
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">
            Email
          </label>
          <InputText 
            v-model="formData.email"
            placeholder="Enter email"
            class="w-full custom-input"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-1">
            Password
          </label>
          <Password
            v-model="formData.password"
            placeholder="Enter password"
            :feedback="false"
            toggle-mask
            class="w-full custom-input"
          />
        </div>

        <!-- Recaptcha -->
        <div id="recaptcha-login" class="flex justify-center mt-2"></div>

        <!-- Errors -->
        <div 
          v-if="errors.length" 
          class="bg-red-900/30 border border-red-500/30 text-red-400 text-sm p-3 rounded-lg"
        >
          <ul>
            <li v-for="e in errors" :key="e">{{ e }}</li>
          </ul>
        </div>

        <!-- Button -->
        <Button
          type="submit"
          :loading="loading"
          label="Sign In"
          class="w-full custom-btn"
        />

      </form>

    </div>

    <Toast />
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Password from "primevue/password";
import { useToast } from "primevue/usetoast";

const recaptchaWidgetId = ref(null);
const recaptchaToken = ref("");

definePageMeta({
  layout: false,
  middleware: "guest",
});

const toast = useToast();
const loading = ref(false);
const errors = ref([]);

onMounted(() => {
  const SITE_KEY = "6Lcq2XksAAAAAC7Oh8J6tBiqvT23twQYSaOxSyoF";

  const tryRender1 = () => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      if (recaptchaWidgetId.value !== null) return;

      try {
        recaptchaWidgetId.value = window.grecaptcha.render(
          "recaptcha-login",
          {
            sitekey: SITE_KEY,
            callback: (token) => {
              recaptchaToken.value = token;
            },
            "expired-callback": () => {
              recaptchaToken.value = "";
            },
            "error-callback": () => {
              recaptchaToken.value = "";
            },
          }
        );
      } catch (e) {
        console.warn("reCAPTCHA render error:", e);
      }
    } else {
      setTimeout(tryRender1, 500);
    }
  };

  tryRender1();
});

const formData = reactive({
  email: "",
  password: "",
});

function validateForm() {
  errors.value = [];

  if (!formData.email) errors.value.push("email is required.");
  if (!formData.password || formData.password.length < 6)
    errors.value.push("Password must be at least 6 characters.");

  return errors.value.length === 0;
}

async function login() {
  if (!validateForm()) return;

  if (!recaptchaToken.value) {
    errors.value.push("Please complete the reCAPTCHA to continue.");
    return;
  }

  try {
    loading.value = true;

    const user = await $fetch("/api/auth/login", {
      method: "POST",
      body: { ...formData, recaptchaToken: recaptchaToken.value },
    });

    toast.add({
      severity: "success",
      summary: "Login Successful",
      detail: "Welcome to your dashboard",
      life: 3000,
    });

    const { authUser } = useAuth();
    authUser.value = user;

    return navigateTo("/");
  } catch (e) {
    errors.value = Object.values(e.data?.data || { error: "Login failed" }).flat();
  } finally {
    loading.value = false;
  }
}
</script>

<style>
/* Background */
.bg-main {
  background: radial-gradient(circle at top, #1a0f5a, #090040);
}

/* Card */
.bg-card {
  background: rgba(71, 19, 150, 0.6);
}

/* Inputs */
.custom-input :deep(input) {
  background: #0f0a3a;
  border: 1px solid rgba(177, 59, 255, 0.3);
  color: white;
  border-radius: 10px;
  transition: all 0.25s ease;
}

.custom-input :deep(input::placeholder) {
  color: #9ca3af;
}

.custom-input :deep(input:focus) {
  border-color: #B13BFF;
  box-shadow: 0 0 0 2px rgba(177, 59, 255, 0.3),
              0 0 12px rgba(177, 59, 255, 0.4);
}

/* Button */
.custom-btn {
  background: linear-gradient(135deg, #B13BFF, #471396);
  border: none;
  border-radius: 12px;
  padding: 0.7rem;
  font-weight: 600;
  color: white;
  transition: all 0.3s ease;
  box-shadow: 0 0 12px rgba(177, 59, 255, 0.4);
}

.custom-btn:hover {
  background: linear-gradient(135deg, #FFCC00, #B13BFF);
  box-shadow: 0 0 16px rgba(255, 204, 0, 0.6);
  transform: translateY(-1px);
}

/* Password */
.p-password {
  width: 100%;
}
.custom-btn {
  background: linear-gradient(135deg, #B13BFF, #471396) !important;
  border: none !important;
  color: white !important;
}
.custom-btn:hover {
  background: linear-gradient(135deg, #FFCC00, #B13BFF) !important;
}
</style>