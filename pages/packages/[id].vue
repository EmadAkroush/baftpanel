<template>
  <div class="wrapper">
    <!-- TITLE -->
    <div class="header">
      <h1>Update Package</h1>
      <p>Edit your investment package details</p>
    </div>

    <!-- CARD -->
    <div class="card">
      <!-- NAME -->
      <div class="field">
        <label>Name</label>
        <InputText v-model="form.name" class="input" />
      </div>

      <!-- RANGE -->
      <div class="field">
        <label>Range</label>
        <InputText v-model="form.range" class="input" />
      </div>

      <!-- MONTH RATE -->
      <div class="field">
        <label>Monthly Rate (%)</label>
        <InputNumber v-model="form.monthRate" class="input" />
      </div>

      <!-- MIN -->
      <div class="field">
        <label>Min Deposit</label>
        <InputNumber v-model="form.minDeposit" class="input" />
      </div>

      <!-- MAX -->
      <div class="field">
        <label>Max Cap</label>
        <InputNumber v-model="form.maxCap" class="input" />
      </div>

      <!-- DESCRIPTION -->
      <div class="field">
        <label>Description</label>
        <InputText v-model="form.description" class="input" />
      </div>

      <!-- ACTIONS -->
      <div class="actions">
        <Button
          label="Cancel"
          severity="secondary"
          class="cancel"
          @click="navigateTo('/packages')"
        />

        <Button
          :label="loading ? 'Updating...' : 'Update Package'"
          :disabled="loading || !isValid"
          class="submit"
          @click="updatePackage"
        />
      </div>

      <!-- ERROR -->
      <p v-if="error" class="error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute, navigateTo } from "#app";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";

const route = useRoute();
const id = route.params.id;

// STATE
const form = reactive({
  name: "",
  range: "",
  monthRate: null,
  minDeposit: null,
  maxCap: null,
  description: "",
});

const loading = ref(false);
const error = ref("");

// VALIDATION
const isValid = computed(() => {
  return (
    form.name &&
    form.range &&
    form.monthRate > 0 &&
    form.minDeposit >= 0 &&
    form.maxCap >= form.minDeposit
  );
});

// FETCH DATA
onMounted(async () => {
  try {
    loading.value = true;

    const data = await $fetch("/api/packages/details", {
      query: { id },
    });

    Object.assign(form, data);
  } catch (err) {
    error.value = "Failed to load package";
  } finally {
    loading.value = false;
  }
});

// UPDATE
async function updatePackage() {
  try {
    loading.value = true;
    error.value = "";

    await $fetch(`/api/packages/update`, {
      query: { id },
      method: "patch",
      body: { ...form },
    });

    navigateTo("/packages");
  } catch (err) {
    error.value = "Update failed. Try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped lang="scss">
$primary: #450693;
$secondary: #8c00ff;
$accent: #ff3f7f;
$dark: #0f0f1a;

.wrapper {
  padding: 60px 20px;
  max-width: 600px;
  margin: auto;
  color: white;
}

// HEADER
.header {
  text-align: center;
  margin-bottom: 30px;

  h1 {
    font-size: 2rem;
    font-weight: 800;
    background: linear-gradient(90deg, $secondary, $accent);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    color: #9ca3af;
    font-size: 0.9rem;
  }
}

// CARD
.card {
  background: rgba(71, 19, 150, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 25px;
  border-radius: 18px;
  backdrop-filter: blur(12px);
  box-shadow: 0 0 40px rgba(140, 0, 255, 0.2);
}

// FIELD
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;

  label {
    font-size: 0.85rem;
    color: #9ca3af;
    margin-bottom: 5px;
  }
}

// INPUT
.input :deep(input) {
  background: #140a5c;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 10px;
}

// ACTIONS
.actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

// BUTTONS
.submit {
  background: linear-gradient(135deg, $secondary, $accent);
  border: none;
  box-shadow: 0 0 20px rgba(140, 0, 255, 0.5);

  &:hover {
    transform: scale(1.05);
  }
}

.cancel {
  background: rgba(255, 255, 255, 0.1);
}

// ERROR
.error {
  margin-top: 10px;
  color: #ff4d4f;
  font-size: 0.85rem;
}
</style>
