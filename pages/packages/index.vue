<template>
  <div class="p-6 packages-page">
    <!-- HEADER -->
    <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
      <h1 class="text-2xl font-bold text-white">Packages</h1>

      <Button
        label="Create Package"
        icon="pi pi-plus"
        class="create-btn"
        @click="navigateTo('/packages/create')"
      />
    </div>

    <!-- TABLE CARD -->
    <div class="table-wrapper">
      <DataTable
        :value="packages"
        paginator
        :rows="10"
        responsive-layout="scroll"
        class="custom-table"
      >
        <Column field="name" header="Name" />
        <Column field="range" header="Range" />
        <Column field="monthRate" header="Monthly %" />
        <Column field="minDeposit" header="Min Deposit" />
        <Column field="maxCap" header="Max Cap" />

        <!-- STATUS -->
        <Column header="Status">
          <template #body="{ data }">
            <span
              class="status-badge"
              :class="data.isActive ? 'active' : 'inactive'"
            >
              {{ data.isActive ? "Active" : "Inactive" }}
            </span>
          </template>
        </Column>

        <!-- ACTIONS -->
        <Column header="Actions">
          <template #body="{ data }">
            <div class="flex gap-2">
              <!-- EDIT -->
              <Button
                icon="pi pi-pencil"
                class="action-btn edit"
                @click="navigateTo(`/packages/${data._id}`)"
              />

              <!-- DELETE -->
              <Button
                icon="pi pi-trash"
                class="action-btn delete"
                @click="deletePackage(data._id)"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

definePageMeta({ middleware: "auth" });

const packages = ref([]);

onMounted(async () => {
  packages.value = await $fetch("/api/packages");
});

async function deletePackage(id) {
  if (!confirm("Delete this package?")) return;
  await $fetch(`/api/packages/delete`, {
    method: "DELETE",
    query: { url: `${id}` },
  });
  packages.value = packages.value.filter((p) => p._id !== id);
}
</script>

<style scoped>
/* PAGE BG */
.packages-page {
  background: radial-gradient(circle at top, #1a0f5a, #090040);
  min-height: 100vh;
}

/* TABLE WRAPPER (GLASS) */
.table-wrapper {
  background: rgba(71, 19, 150, 0.25);
  border: 1px solid rgba(177, 59, 255, 0.2);
  border-radius: 16px;
  padding: 10px;
  backdrop-filter: blur(14px);
}

/* 🔥 MAIN TABLE FIX */
:deep(.p-datatable) {
  background: transparent !important;
  color: white;
}

/* HEADER */
:deep(.p-datatable-thead > tr > th) {
  background: rgba(20, 10, 92, 0.9) !important;
  color: #a1a1aa !important;
  border: none !important;
  font-weight: 500;
}

/* BODY ROW */
:deep(.p-datatable-tbody > tr) {
  background: transparent !important;
  transition: all 0.25s ease;
}

/* CELLS */
:deep(.p-datatable-tbody > tr > td) {
  background: transparent !important;
  border-bottom: 1px solid rgba(177, 59, 255, 0.1);
  color: #e5e7eb;
}

/* HOVER */
:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(177, 59, 255, 0.15) !important;
}

/* PAGINATOR */
:deep(.p-paginator) {
  background: transparent;
  border: none;
  color: #aaa;
}

/* STATUS */
.status-badge {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

.active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.inactive {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

/* CREATE BUTTON */
.create-btn {
  background: linear-gradient(135deg, #b13bff, #471396) !important;
  border: none !important;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(177, 59, 255, 0.4);
}

/* ACTION BUTTONS */
.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: none;
}

/* EDIT */
.action-btn.edit {
  background: rgba(177, 59, 255, 0.2);
  color: #c084fc;
}

.action-btn.edit:hover {
  background: #b13bff;
  color: white;
}

/* DELETE */
.action-btn.delete {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.action-btn.delete:hover {
  background: #ef4444;
  color: white;
}
</style>
