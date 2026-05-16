<template>
  <div class="transactions-page p-6 min-h-screen">
    <!-- Toast -->
    <Toast />

    <!-- HEADER -->
    <div class="flex flex-wrap justify-between items-center gap-4 mb-8">
      <h1 class="text-2xl font-bold text-white">Transactions</h1>

      <div class="flex flex-wrap gap-3">
        <IconField class="w-72 custom-input">
          <InputIcon>
            <i class="pi pi-search text-purple-300" />
          </InputIcon>

          <InputText v-model="search" placeholder="Search..." class="w-full" />
        </IconField>

        <Dropdown
          v-model="filterType"
          :options="transactionTypes"
          class="w-40 custom-input"
        />

        <Dropdown
          v-model="filterStatus"
          :options="statuses"
          class="w-40 custom-input"
        />

        <Calendar v-model="filterDate" showIcon class="w-40 custom-input" />
      </div>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <DataTable
        :value="filteredTransactions"
        paginator
        :rows="10"
        responsiveLayout="scroll"
      >
        <Column header="Email">
          <template #body="{ data }">
            <span class="text-gray-200">
              {{ data.userId?.email }}
            </span>
          </template>
        </Column>

        <Column field="type" header="Type" />
        <Column field="amount" header="Amount" />
        <Column field="status" header="Status" />
        <Column field="createdAt" header="Date" />

        <Column header="Details">
          <template #body="{ data }">
            <Button label="View" @click="openPopup(data)" />
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- POPUP -->
    <Dialog
      v-model:visible="showModal"
      class="my-dark-dialog"
      modal
      header="Transaction Details"
    >
      <div v-if="selectedTx" class="text-gray-200 space-y-4">
        <p><b>Email:</b> {{ selectedTx.userId?.email }}</p>
        <p><b>wallet:</b> {{ selectedTx.userId?.wallet }}</p>

        <Button
          label="Copy Wallet"
          @click="copyWallet(selectedTx.userId?.wallet)"
        />

        <p><b>Type:</b> {{ selectedTx.type }}</p>
        <p><b>Status:</b> {{ selectedTx.status }}</p>
        <p><b>Amount:</b> ${{ selectedTx.amount }}</p>

        <p>
          <b>Date:</b>
          {{ new Date(selectedTx.createdAt).toLocaleString() }}
        </p>

        <!-- فقط برای Withdraw -->
        <div
          v-if="selectedTx.type === 'withdraw'"
          class="pt-4 border-t border-purple-700"
        >
          <p class="mb-3 font-semibold">Update Transaction Status</p>

          <div class="flex gap-3 items-center">
            <Dropdown
              v-model="newStatus"
              :options="statuses"
              class="w-full custom-input"
            />

            <Button
              label="Update"
              @click="updateTransactionStatus"
              :loading="loadingStatus"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <Button label="Close" @click="showModal = false" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import DataTable from "primevue/datatable";
import Column from "primevue/column";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

definePageMeta({ middleware: "auth" });

const toast = useToast();

const search = ref("");
const filterType = ref(null);
const filterStatus = ref(null);
const filterDate = ref(null);

const showModal = ref(false);
const selectedTx = ref(null);

const allTransactions = ref([]);

const newStatus = ref(null);
const loadingStatus = ref(false);

const transactionTypes = [
  "deposit",
  "withdraw",
  "investment",
  "profit",
  "binary-profit",
  "bonus",
];

const statuses = ["pending", "completed", "failed"];

onMounted(async () => {
  allTransactions.value = await $fetch("/api/transactions/all");
});

const filteredTransactions = computed(() => {
  return allTransactions.value.filter((tx) => {
    const s = search.value.toLowerCase();

    return (
      (tx.userId?.email?.toLowerCase().includes(s) ||
        tx.type?.toLowerCase().includes(s)) &&
      (!filterType.value || tx.type === filterType.value) &&
      (!filterStatus.value || tx.status === filterStatus.value) &&
      (!filterDate.value ||
        new Date(tx.createdAt) >= new Date(filterDate.value))
    );
  });
});

function openPopup(data) {
  selectedTx.value = data;
  newStatus.value = data.status;
  showModal.value = true;
}

function copyWallet(wallet) {
  navigator.clipboard.writeText(wallet);

  toast.add({
    severity: "success",
    summary: "Copied",
    detail: "Wallet address copied successfully",
    life: 3000,
  });
}

async function updateTransactionStatus() {
  if (!selectedTx.value) return;

  try {
    loadingStatus.value = true;

    const updated = await $fetch("/api/transactions/updatestatus", {
      method: "POST",
      body: {
        id: selectedTx.value._id,
        status: newStatus.value,
      },
    });

    selectedTx.value.status = updated.status;

    const index = allTransactions.value.findIndex(
      (tx) => tx._id === selectedTx.value._id,
    );

    if (index !== -1) {
      allTransactions.value[index].status = updated.status;
    }

    toast.add({
      severity: "success",
      summary: "Updated",
      detail: "Transaction status updated successfully",
      life: 3000,
    });
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update transaction status",
      life: 3000,
    });
  } finally {
    loadingStatus.value = false;
  }
}
</script>

<style scoped>
.transactions-page {
  background: #090040;
}

.table-wrapper {
  background: #0f0a3a;
  border-radius: 16px;
  padding: 10px;
}

:deep(.p-datatable),
:deep(.p-datatable-wrapper),
:deep(.p-datatable-table),
:deep(.p-datatable-scrollable-body),
:deep(.p-datatable-scrollable-header) {
  background: transparent !important;
  color: white !important;
}

:deep(.p-datatable-thead > tr > th) {
  background: #140a5c !important;
  color: #aaa !important;
  border: none !important;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
}

:deep(.p-datatable-tbody > tr > td) {
  color: #eee !important;
  border: none !important;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(177, 59, 255, 0.15) !important;
}

:deep(.p-paginator) {
  background: transparent !important;
  color: white !important;
}

:deep(.p-dialog) {
  background: #140a5c !important;
  color: white !important;
}

:deep(.p-dialog-header) {
  background: #1a0f5a !important;
  color: white !important;
}

:deep(.p-dialog-content) {
  background: #140a5c !important;
}

:deep(.p-dialog-footer) {
  background: #140a5c !important;
}

.custom-input :deep(input) {
  background: #140a5c;
  border: 1px solid rgba(177, 59, 255, 0.3);
  color: white;
}
</style>

<style>
.my-dark-dialog {
  background: #140a5c !important;
  color: white !important;
  width: 400px !important;
}
</style>
