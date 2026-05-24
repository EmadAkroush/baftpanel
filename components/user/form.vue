<template>
  <div class="details-card">

    <div class="section-header">
      <div>
        <h2>
          اطلاعات کامل کاربر
        </h2>

        <p>
          مدیریت کامل اطلاعات حساب کاربری
        </p>
      </div>
    </div>

    <div class="form-grid">

      <div
        v-for="field in fields"
        :key="field.key"
        class="form-group"
      >
        <label>{{ field.label }}</label>

        <input
          v-model="form[field.key]"
          :type="field.type"
        />
      </div>

    </div>

  </div>
</template>

<script setup>
defineProps({
  form: Object
})

const fields = [
  { key: "firstName", label: "نام", type: "text" },
  { key: "lastName", label: "نام خانوادگی", type: "text" },
  { key: "email", label: "ایمیل", type: "email" },
  { key: "phone", label: "تلفن", type: "text" },
  { key: "wallet", label: "شماره شبا", type: "text" },
  { key: "vxCode", label: "کد نتورک", type: "text" },
  { key: "mainBalance", label: "بالانس اصلی", type: "number" },
  { key: "profitBalance", label: "بالانس سود", type: "number" },
  { key: "referralBalance", label: "بالانس رفرال", type: "number" },
  { key: "bonusBalance", label: "بالانس بونوس", type: "number" },
  { key: "totalIncome", label: "کل درآمد", type: "number" },
  { key: "withdrawalTotalBalance", label: "کل برداشت", type: "number" },
  { key: "leftVolume", label: "Left Volume", type: "number" },
  { key: "rightVolume", label: "Right Volume", type: "number" }
]
</script>

<style scoped>
.details-card {
  background: white;
  border-radius: 30px;
  padding: 30px;
  margin-bottom: 24px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 26px;
  color: #1F1F24;
  font-weight: 800;
}

.section-header p {
  margin-top: 8px;
  color: #8B5E74;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #5B2A4A;
  font-weight: 700;
}

.form-group input {
  width: 100%;
  height: 54px;
  border-radius: 16px;
  border: 1px solid rgba(217,165,179,.25);
  background: #F8F5F2;
  padding: 0 16px;
}

@media (max-width:768px){
  .form-grid{
    grid-template-columns:1fr;
  }
}
</style>