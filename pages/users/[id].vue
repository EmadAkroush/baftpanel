<template>
  <div class="user-details-page p-6 max-w-5xl mx-auto">

    <!-- Toast -->
    <Toast />

    <!-- Back -->
    <Button
      label="Back to Users"
      icon="pi pi-arrow-left"
      class="mb-6 back-btn"
      @click="navigateTo('/users')"
    />

    <!-- HEADER -->
    <UserHeader :user="user" @toggleBlock="toggleBlock" />

    <!-- USER CARD -->
    <UserCard :user="user" />

    <!-- BALANCES -->
    <UserBalances :user="user" />

    <!-- FULL USER UPDATE FORM -->
    <div class="card mb-8">
      <h2 class="section-title">Update User Information</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div>
          <label class="label">First Name</label>
          <InputText v-model="form.firstName" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Last Name</label>
          <InputText v-model="form.lastName" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Email</label>
          <InputText v-model="form.email" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Phone</label>
          <InputText v-model="form.phone" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Avatar</label>
          <InputText v-model="form.avatar" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Wallet</label>
          <InputText v-model="form.wallet" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">VX Code</label>
          <InputText v-model="form.vxCode" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Active VX Code</label>
          <InputSwitch v-model="form.activeVxCode" />
        </div>

        <div>
          <label class="label">Account Capacity</label>
          <InputNumber v-model="form.accountCapacity" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">VX Cycle</label>
          <InputNumber v-model="form.vxCycle" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Referred By</label>
          <InputText v-model="form.referredBy" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Main Balance</label>
          <InputNumber v-model="form.mainBalance" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Max Cap Balance</label>
          <InputNumber v-model="form.maxCapBalance" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Withdrawal Total Balance</label>
          <InputNumber v-model="form.withdrawalTotalBalance" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Profit Balance</label>
          <InputNumber v-model="form.profitBalance" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Referral Balance</label>
          <InputNumber v-model="form.referralBalance" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Bonus Balance</label>
          <InputNumber v-model="form.bonusBalance" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Total Income</label>
          <InputNumber v-model="form.totalIncome" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Total Balance</label>
          <InputNumber v-model="form.totalBalance" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Left Volume</label>
          <InputNumber v-model="form.leftVolume" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Right Volume</label>
          <InputNumber v-model="form.rightVolume" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Binary Matched Left</label>
          <InputNumber v-model="form.binaryMatched.left" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Binary Matched Right</label>
          <InputNumber v-model="form.binaryMatched.right" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Role</label>
          <InputText v-model="form.role" class="custom-input w-full" />
        </div>

        <div>
          <label class="label">Is Active</label>
          <InputSwitch v-model="form.isActive" />
        </div>

        <div>
          <label class="label">Is Verified</label>
          <InputSwitch v-model="form.isVerified" />
        </div>

    

      </div>

      <div class="mt-6">
        <Button
          label="Save All Changes"
          icon="pi pi-save"
          class="action-btn info"
          @click="updateUserFull"
          :loading="loadingFullUpdate"
        />
      </div>
    </div>

    <!-- TRANSACTIONS -->
    <UserTransactions :transactions="transactions" />

  </div>
</template>

<script setup>
import UserHeader from "@/components/user/UserHeader.vue";
import UserCard from "@/components/user/UserCard.vue";
import UserBalances from "@/components/user/UserBalances.vue";
import UserTransactions from "@/components/user/UserTransactions.vue";

import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import InputSwitch from "primevue/inputswitch";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

import { ref, reactive, watch } from "vue";

definePageMeta({ middleware: "auth" });

const toast = useToast();

const route = useRoute();
const userId = route.params.id;

const { data: user } = await useFetch("/api/users/find", {
  method: "POST",
  body: { id: userId },
});

const { data: transactions } = await useFetch("/api/transactions/user", {
  method: "POST",
  body: { userId },
});

const newMainBalance = ref(user.value.mainBalance);
const loadingBalance = ref(false);

async function updateBalance() {
  loadingBalance.value = true;

  try {
    const updated = await $fetch("/api/users/update", {
      method: "POST",
      body: {
        userId,
        mainBalance: newMainBalance.value,
      },
    });

    user.value = updated;

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Main balance updated successfully",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update main balance",
      life: 3000,
    });
  }

  loadingBalance.value = false;
}

async function toggleBlock() {
  try {
    const updated = await $fetch("/api/users/update", {
      method: "POST",
      body: {
        userId,
        isActive: !user.value.isActive,
      },
    });

    user.value = updated;

    toast.add({
      severity: "warn",
      summary: "Status Updated",
      detail: "User status changed successfully",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update user status",
      life: 3000,
    });
  }
}

const newWallet = ref(user.value.wallet || "");
const loadingWallet = ref(false);

async function updateWallet() {
  loadingWallet.value = true;

  try {
    const updated = await $fetch("/api/users/update", {
      method: "POST",
      body: {
        userId,
        wallet: newWallet.value,
      },
    });

    user.value = updated;

    toast.add({
      severity: "success",
      summary: "Wallet Updated",
      detail: "Wallet updated successfully",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update wallet",
      life: 3000,
    });
  }

  loadingWallet.value = false;
}

/* FULL FORM */
const loadingFullUpdate = ref(false);

const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  avatar: "",
  wallet: "",
  vxCode: "",
  activeVxCode: false,
  accountCapacity: 0,
  vxCycle: 0,
  referredBy: "",
  mainBalance: 0,
  maxCapBalance: 0,
  withdrawalTotalBalance: 0,
  profitBalance: 0,
  referralBalance: 0,
  bonusBalance: 0,
  totalIncome: 0,
  totalBalance: 0,
  leftVolume: 0,
  rightVolume: 0,
  binaryMatched: {
    left: 0,
    right: 0,
  },
  role: "user",
  isActive: true,
  isVerified: true,
  twoFAEnabled: false,
});

watch(
  user,
  (val) => {
    if (!val) return;

    Object.assign(form, {
      ...val,
      binaryMatched: {
        left: val.binaryMatched?.left || 0,
        right: val.binaryMatched?.right || 0,
      },
    });
  },
  { immediate: true }
);

async function updateUserFull() {
  loadingFullUpdate.value = true;

  try {
    const updated = await $fetch("/api/users/update", {
      method: "POST",
      body: {
        userId,
        ...form,
      },
    });

    user.value = updated;

    toast.add({
      severity: "success",
      summary: "Saved",
      detail: "All user information updated successfully",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update user information",
      life: 3000,
    });
  }

  loadingFullUpdate.value = false;
}
</script>

<style>
.user-details-page {
  background: radial-gradient(circle at top, #1a0f5a, #090040);
}

.card {
  background: rgba(71, 19, 150, 0.35);
  border: 1px solid rgba(177, 59, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
}

.section-title {
  color: white;
  font-weight: bold;
  margin-bottom: 15px;
}

.label {
  color: #aaa;
  font-weight: 600;
  display: block;
  margin-bottom: 8px;
}

.avatar-large {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(135deg, #B13BFF, #471396);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.status-badge {
  display: inline-block;
  margin-top: 8px;
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
}

.status-badge.active {
  background: rgba(34,197,94,0.2);
  color: #22c55e;
}

.status-badge.inactive {
  background: rgba(239,68,68,0.2);
  color: #ef4444;
}

.balance-card {
  background: rgba(0,0,0,0.2);
  padding: 14px;
  border-radius: 12px;
}

.balance-card p {
  color: #aaa;
  font-size: 13px;
}

.balance-card h3 {
  color: white;
  font-size: 20px;
  font-weight: bold;
}

.action-btn {
  border-radius: 10px !important;
  border: none !important;
}

.action-btn.success {
  background: linear-gradient(135deg, #22c55e, #16a34a) !important;
}

.action-btn.danger {
  background: linear-gradient(135deg, #ef4444, #b91c1c) !important;
}

.action-btn.info {
  background: linear-gradient(135deg, #B13BFF, #471396) !important;
}

.back-btn {
  color: #ccc !important;
}

.custom-input :deep(input) {
  background: #140a5c;
  border: 1px solid rgba(177, 59, 255, 0.3);
  color: white;
  border-radius: 10px;
}

:deep(.p-datatable) {
  background: transparent;
  color: white;
}

:deep(.p-datatable-thead > tr > th) {
  color: #aaa;
  background: transparent;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(177, 59, 255, 0.1);
}
</style>