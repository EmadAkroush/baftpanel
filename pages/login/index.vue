<template>
  <div class="login-page">
    <div class="bg-circle c1"></div>
    <div class="bg-circle c2"></div>

    <div class="login-card">
      <div class="logo">🧵</div>

      <h1>پنل مدیریت بافت</h1>
      <p class="subtitle">ورود مدیران با کد یکبار مصرف</p>

      <div v-if="step === 1">
        <InputText
          v-model="phone"
          class="custom-input w-full"
          placeholder="شماره موبایل"
        />
        <Button
          label="ارسال کد ورود"
          class="custom-btn w-full mt-4"
          @click="sendOtp"
        />
      </div>

      <div v-else>
        <p class="text-center mb-4" style="color: azure;" >کد ارسال شده به {{ phone }}</p>

        <InputOtp v-model="otp" :length="6" integerOnly class="otp-box" />

        <div class="flex justify-between mt-5">
          <button v-if="timer === 0" class="link-btn" @click="sendOtp">
            ارسال مجدد
          </button>
          <span v-else style="color: azure;" >{{ timer }}</span>
        </div>

        <Button
          label="ورود به پنل"
          class="custom-btn w-full mt-5"
          @click="verifyOtp"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import InputOtp from "primevue/inputotp";
const { authUser } = useAuth();

definePageMeta({
  layout: false,
  middleware: "guest",
});

const phone = ref("");
const otp = ref("");
const step = ref(1);
const timer = ref(120);
let interval;

function startTimer() {
  clearInterval(interval);
  timer.value = 120;
  interval = setInterval(() => {
    if (timer.value > 0) timer.value--;
    else clearInterval(interval);
  }, 1000);
}


const sendOtp = async () => {
  if (!phone.value) {
    return alert("شماره موبایل را وارد کنید");
  }



  try {
    await $fetch("api/auth/sendotp", {
      method: "POST",
      body: {
        phone: phone.value,
      },
    });


    // Set user in auth composable/store if available

   

    step.value = 2;
     
    startTimer();
  } catch (err) {
    console.error(err);

    alert(err?.data?.message || "خطا در ارسال کد");
  }


};


/* ===========================
      VERIFY OTP
=========================== */

const verifyOtp = async () => {
  if (!otp.value) {
    return alert("کد تایید را وارد کنید");
  }



  try {
    const res = await $fetch("api/auth/verifyotp", {
      method: "POST",
      body: {
        phone: phone.value,
        code: otp.value,
      },
    });
  
     authUser.value = res;

    await  navigateTo("/");
  } catch (err) {
    console.error(err);

    alert(err?.data?.message || "کد تایید اشتباه است");
  } finally {
  
    window.location.reload();
  }

 
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at top, #471396, #090040 70%, #05011e);
  position: relative;
  overflow: hidden;
  font-family: IRANSansX, Tahoma, sans-serif;
  color: #fff;
}
.login-card {
  width: 430px;
  padding: 40px;
  border-radius: 28px;
  background: rgba(19, 18, 54, 0.75);
  backdrop-filter: blur(18px);
  border: 1px solid rgba(177, 59, 255, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
  z-index: 2;
  color: #fff !important;
}
.logo {
  font-size: 48px;
  text-align: center;
}
h1 {
  text-align: center;
  color: #fff;
}
.subtitle {
  text-align: center;
  color: #bbb;
  margin-bottom: 30px;
}
.custom-input :deep(input) {
  height: 58px;
  background: #120b42;
  border-radius: 14px;
  color: #fff;
  border: 1px solid rgba(177, 59, 255, 0.35);
  text-align: center;
}
.custom-btn {
  height: 56px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #b13bff, #471396) !important;
}
.custom-btn:hover {
  background: linear-gradient(135deg, #ffd54a, #b13bff) !important;
}
.otp-box {
  display: flex;
  justify-content: center;
  gap: 12px;
  direction: ltr;
  margin-top: 20px;
}
.otp-box :deep(input) {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  background: #120b42;
  border: 1px solid rgba(177, 59, 255, 0.35);
  color: #fff;
  font-size: 24px;
  text-align: center;
}
.otp-box :deep(input:focus) {
  border-color: #ffd54a;
  box-shadow: 0 0 15px rgba(255, 213, 74, 0.35);
}
.link-btn {
  background: none;
  border: none;
  color: #ffd54a;
  cursor: pointer;
}
.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(120px);
}
.c1 {
  width: 350px;
  height: 350px;
  background: #b13bff55;
  top: -100px;
  right: -100px;
}
.c2 {
  width: 300px;
  height: 300px;
  background: #ffd54a22;
  bottom: -100px;
  left: -100px;
}
</style>
