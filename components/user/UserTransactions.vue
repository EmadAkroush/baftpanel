<template>
  <div class="card">
    <h2 class="section-title">Transaction History</h2>

    <Dropdown
      v-model="transactionType"
      :options="transactionTypes"
      optionLabel="label"
      optionValue="value"
      placeholder="Filter by type"
      class="custom-input mb-4 w-full sm:w-64"
    />

    <DataTable
      :value="filteredTransactions"
      paginator
      :rows="10"
      class="custom-table"
    >
      <Column field="createdAt" header="Date">
        <template #body="{ data }">
          {{ new Date(data.createdAt).toLocaleString() }}
        </template>
      </Column>

      <Column field="type" header="Type">
        <template #body="{ data }">
          <span class="type-badge">{{ data.type }}</span>
        </template>
      </Column>

      <Column field="amount" header="Amount">
        <template #body="{ data }">
          <span class="amount">${{ data.amount }}</span>
        </template>
      </Column>

      <Column field="status" header="Status">
        <template #body="{ data }">
          <span
            class="status-badge"
            :class="{
              completed: data.status === 'completed',
              pending: data.status === 'pending',
              failed: data.status === 'failed',
            }"
          >
            {{ data.status }}
          </span>
        </template>
      </Column>

      <Column field="note" header="Note" />
    </DataTable>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps(["transactions"]);

const transactionType = ref("all");

const transactionTypes = [
  { label: "All", value: "all" },
  { label: "Deposit", value: "deposit" },
  { label: "Withdraw", value: "withdraw" },
  { label: "Investment", value: "investment" },
  { label: "Profit", value: "profit" },
  { label: "Binary Profit", value: "binary-profit" },
  { label: "Bonus", value: "bonus" },
];

const filteredTransactions = computed(() => {
  if (transactionType.value === "all") return props.transactions;
  return props.transactions.filter((t) => t.type === transactionType.value);
});
</script>

<style scoped>
/* CARD همون قبلی */
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

/* INPUT */
.custom-input :deep(input) {
  background: #140a5c;
  border: 1px solid rgba(177, 59, 255, 0.3);
  color: white;
  border-radius: 10px;
}

/* 🔥 TABLE FIX کامل */
:deep(.p-datatable),
:deep(.p-datatable-wrapper),
:deep(.p-datatable-table) {
  background: transparent !important;
  color: white !important;
}

/* HEADER */
:deep(.p-datatable-thead > tr > th) {
  background: #140a5c !important;
  color: #aaa !important;
  border: none !important;
}

/* BODY */
:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: 0.2s;
}

:deep(.p-datatable-tbody > tr > td) {
  border: none !important;
  color: #e5e5e5 !important;
}

/* HOVER */
:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(177, 59, 255, 0.12) !important;
}

/* PAGINATOR */
:deep(.p-paginator) {
  background: transparent !important;
  color: white !important;
}

/* BADGES */
.type-badge {
  color: #b13bff;
  font-weight: 600;
}

.amount {
  color: #fff;
  font-weight: bold;
}

.status-badge {
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
}

.status-badge.completed {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.status-badge.pending {
  background: rgba(255, 204, 0, 0.2);
  color: #ffcc00;
}

.status-badge.failed {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}
</style>
