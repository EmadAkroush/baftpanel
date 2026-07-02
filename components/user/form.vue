<template>
  <div class="details-card">
    <div class="section-header">
      <div>
        <h2>اطلاعات کامل کاربر</h2>
        <p>مدیریت اطلاعات حساب کاربری</p>
      </div>

      <Button
        label="ذخیره تغییرات"
        icon="pi pi-check"
        class="save-btn"
        @click="save"
      />
    </div>

    <div class="form-grid">
      <div class="form-group">
        <label>نام</label>
        <InputText v-model="form.name" />
      </div>

      <div class="form-group">
        <label>نام خانوادگی</label>
        <InputText v-model="form.family" />
      </div>

      <div class="form-group">
        <label>شماره موبایل</label>
        <InputText v-model="form.phone" disabled />
      </div>

      <div class="form-group">
        <label>کد نتورک</label>
        <InputText v-model="form.referralCode" disabled />
      </div>

   
      <div class="form-group">
        <label>سطح</label>
        <InputText v-model="form.level" />
      </div>
       <div class="form-group">
        <label>رول</label>
        <InputText v-model="form.role" />
      </div>

      <div class="form-group">
        <label>بالانس اصلی</label>
        <InputNumber v-model="form.mainBalance" fluid />
      </div>

      <div class="form-group">
        <label>بالانس رفرال</label>
        <InputNumber v-model="form.referralBalance" fluid />
      </div>

      <div class="form-group">
        <label>بالانس بونوس</label>
        <InputNumber v-model="form.bonusBalance" fluid />
      </div>

      <div class="form-group">
        <label>کل درآمد</label>
        <InputNumber v-model="form.totalIncome" fluid />
      </div>

      <div class="form-group">
        <label>کل برداشت</label>
        <InputNumber v-model="form.withdrawalTotalBalance" fluid />
      </div>

      <div class="form-group">
        <label>موجودی کل</label>
        <InputNumber v-model="form.totalBalance" fluid />
      </div>

      <div class="form-group">
        <label>Left Volume</label>
        <InputNumber v-model="form.leftVolume" fluid />
      </div>

      <div class="form-group">
        <label>Right Volume</label>
        <InputNumber v-model="form.rightVolume" fluid />
      </div>

      <div class="form-group">
        <label>Team Orders</label>
        <InputNumber v-model="form.teamOrders" fluid />
      </div>

      <div class="form-group">
        <label>Orders</label>
        <InputNumber v-model="form.orders" fluid />
      </div>

      <div class="form-group">
        <label>Max Cap</label>
        <InputNumber v-model="form.maxCapBalance" fluid />
      </div>

      <div class="form-group">
        <label>Max Week Earning</label>
        <InputNumber v-model="form.maxEarningInWeek" fluid />
      </div>

      <div class="form-group switch">
        <label>فعال</label>

        <InputSwitch v-model="form.active" />
      </div>

      <div class="form-group switch">
        <label>احراز هویت</label>

        <InputSwitch v-model="form.isVerified" />
      </div>

      <div class="form-group switch">
        <label>Authentication</label>

        <InputSwitch v-model="form.authentication" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch, onMounted } from "vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

const toast = useToast();

const route = useRoute();
const userId = route.params.id;

const form = reactive({});

// watch(
//   () => props.form,
//   (value) => {
//     if (!value) return
//     Object.assign(form, structuredClone(value))
//   },
//   {
//     immediate: true,
//   }
// )

/* -----------------------
   دریافت اطلاعات کاربر
----------------------- */

async function fetchUser() {
  try {
    const data = await $fetch("/api/users/details", {
      query: {
        id: userId,
      },
    });
    console.log("USER => uuuuu", data);

    Object.assign(form, data);
  } catch (err) {
    console.error(err);

    toast.add({
      severity: "error",
      summary: "خطا",
      detail: "دریافت اطلاعات کاربر انجام نشد",
      life: 3000,
    });
  }
}

/* -----------------------
   ذخیره اطلاعات
----------------------- */

async function save() {

  try {
    await $fetch("/api/users/update", {
      method: "PATCH",
      query: {
        id: userId,
      },
      body: form,
    });

    toast.add({
      severity: "success",
      summary: "موفق",
      detail: "اطلاعات کاربر بروزرسانی شد",
      life: 2500,
    });

    await fetchUser();
  } catch (err) {
    console.error(err);

    toast.add({
      severity: "error",
      summary: "خطا",
      detail: "ذخیره اطلاعات انجام نشد",
      life: 3000,
    });
  }
}

onMounted(() => {
  fetchUser();
});
</script>
<style scoped>
.details-card {
  background: #fff;
  border-radius: 24px;
  padding: 30px;
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 26px;
  font-weight: 800;
  color: #222;
}

.section-header p {
  margin-top: 6px;
  color: #888;
}

.save-btn {
  background: #5b2a4a;
  border: none;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
}

.form-group :deep(.p-inputtext),
.form-group :deep(.p-inputnumber-input) {
  width: 100%;
}

.switch {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 18px;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>
