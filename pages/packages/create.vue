<template>
  <div class="create-package-page p-6 max-w-3xl mx-auto">

    <!-- TITLE -->
    <h1 class="text-2xl text-white font-bold mb-8">
      Create Investment Package
    </h1>

    <div class="card">

      <!-- GRID -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

        <!-- NAME -->
        <div class="field">
          <label>Package Name</label>
          <InputText v-model="form.name" class="input" placeholder="Starter Plan" />
          <small>Unique name for this package (must be different)</small>
        </div>

        <!-- RANGE -->
        <div class="field">
          <label>Range</label>
          <InputText v-model="form.range" class="input" placeholder="$100 - $1000" />
          <small>Display range for users (UI purpose only)</small>
        </div>

        <!-- MONTH RATE -->
        <div class="field">
          <label>Monthly Profit (%)</label>
          <InputNumber v-model="form.monthRate" class="input" />
          <small>Monthly ROI percentage (e.g. 10 = 10%)</small>
        </div>

        <!-- MIN DEPOSIT -->
        <div class="field">
          <label>Minimum Deposit</label>
          <InputNumber v-model="form.minDeposit" class="input" />
          <small>Minimum amount user can invest</small>
        </div>

        <!-- MAX CAP -->
        <div class="field">
          <label>Max Cap</label>
          <InputNumber v-model="form.maxCap" class="input" />
          <small>Maximum profit cap multiplier</small>
        </div>

        <!-- DESCRIPTION FULL WIDTH -->
        <div class="field md:col-span-2">
          <label>Description</label>
          <InputText v-model="form.description" class="input" placeholder="Short description..." />
          <small>Optional description shown in UI</small>
        </div>

      </div>

      <!-- ACTION -->
      <div class="mt-6 flex justify-end">
        <Button
          label="Create Package"
          icon="pi pi-check"
          class="submit-btn"
          :loading="loading"
          @click="createPackage"
        />
      </div>

    </div>

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

const loading = ref(false);

const form = reactive({
  name: "",
  range: "",
  monthRate: 0,
  minDeposit: 0,
  maxCap: 0,
  description: ""
});

async function createPackage() {
  try {
    loading.value = true;

    await $fetch("/api/packages/create", {
      method: "POST",
      body: form
    });

    navigateTo("/packages");
  } catch (err) {
    console.error(err);
    alert("Error creating package");
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>

/* PAGE BG */
.create-package-page {
  background: radial-gradient(circle at top, #1a0f5a, #090040);
  min-height: 100vh;
}

/* CARD */
.card {
  background: rgba(71, 19, 150, 0.25);
  border: 1px solid rgba(177, 59, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  backdrop-filter: blur(12px);
}

/* FIELD */
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field label {
  color: #e5e7eb;
  font-weight: 600;
  font-size: 14px;
}

.field small {
  color: #9ca3af;
  font-size: 12px;
}

/* INPUT */
.input :deep(input) {
  background: #140a5c;
  border: 1px solid rgba(177, 59, 255, 0.25);
  color: white;
  border-radius: 10px;
  height: 42px;
  padding: 0 12px;
  transition: all 0.25s ease;
}

.input :deep(input:focus) {
  border-color: #B13BFF;
  box-shadow: 0 0 0 2px rgba(177, 59, 255, 0.25),
              0 0 10px rgba(177, 59, 255, 0.4);
}

/* BUTTON */
.submit-btn {
  background: linear-gradient(135deg,#B13BFF,#471396) !important;
  border: none !important;
  border-radius: 10px;
  padding: 10px 20px;
  font-weight: 600;
  box-shadow: 0 0 10px rgba(177, 59, 255, 0.4);
}

.submit-btn:hover {
  transform: translateY(-1px);
}

</style>