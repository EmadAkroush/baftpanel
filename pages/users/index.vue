<template>
  <div class="users-page p-6 min-h-screen">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
      <h1 class="text-2xl font-bold text-white">Users</h1>

      <!-- Search -->
      <IconField class="w-full sm:w-72 custom-search">
        <InputIcon>
          <i class="pi pi-search text-purple-300"></i>
        </InputIcon>

        <InputText 
          v-model="search" 
          placeholder="Search users..." 
          class="w-full"
        />
      </IconField>
    </div>

    <!-- TABLE -->
    <div class="table-wrapper">
      <DataTable 
        :value="filteredUsers"
        paginator 
        :rows="10"
        responsiveLayout="scroll"
        class="custom-table"
      >

        <!-- USER -->
        <Column header="User">
          <template #body="{ data }">
            <div class="flex items-center gap-3">

              <div class="avatar">
                <i class="pi pi-user"></i>
              </div>

              <div>
                <p class="font-semibold text-white">{{ data.username }}</p>
                <p class="text-xs text-gray-400">{{ data.email }}</p>
              </div>

            </div>
          </template>
        </Column>

        <!-- BALANCE -->
        <Column header="Balances">
          <template #body="{ data }">
            <div class="space-y-1 text-sm text-gray-300">
              <p>Main: <span class="text-white font-semibold">${{ data.mainBalance }}</span></p>
              <p>Profit: <span class="text-purple-300 font-semibold">${{ data.profitBalance }}</span></p>
              <p>Referral: <span class="text-yellow-300 font-semibold">${{ data.referralBalance }}</span></p>
            </div>
          </template>
        </Column>

        <!-- STATUS -->
        <Column header="Status">
          <template #body="{ data }">
            <span
              class="status-badge"
              :class="data.isActive ? 'active' : 'inactive'"
            >
              {{ data.isActive ? 'Active' : 'Inactive' }}
            </span>
          </template>
        </Column>

        <!-- VERIFIED -->
        <Column header="Verified">
          <template #body="{ data }">
            <i 
              v-if="data.isVerified" 
              class="pi pi-check-circle text-purple-400 text-lg"
            ></i>
            <i 
              v-else
              class="pi pi-times-circle text-gray-500 text-lg"
            ></i>
          </template>
        </Column>

        <!-- ACTION -->
        <Column header="Details">
          <template #body="{ data }">
            <Button
              label="View"
              icon="pi pi-arrow-right"
              class="custom-btn"
              @click="goToDetails(data._id)"
            />
          </template>
        </Column>

      </DataTable>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

definePageMeta({
  middleware: "auth",
});

const search = ref("");
const users = ref([]);

const { data: usersData } = await useFetch("/api/users/all", { method: "POST" });

users.value = usersData.value || [];

const filteredUsers = computed(() => {
  if (!search.value) return users.value;

  return users.value.filter((u) =>
    `${u.username} ${u.email}`.toLowerCase().includes(search.value.toLowerCase())
  );
});

function goToDetails(id) {
  navigateTo(`/users/${id}`);
}
</script>

<style scoped>

/* PAGE BG */
.users-page {
  background: radial-gradient(circle at top, #1a0f5a, #090040);
}

/* SEARCH */
.custom-search :deep(input) {
  background: #140a5c;
  border: 1px solid rgba(177, 59, 255, 0.3);
  color: white;
  border-radius: 12px;
  padding-left: 2.5rem;
}

.custom-search :deep(input:focus) {
  border-color: #B13BFF;
  box-shadow: 0 0 10px rgba(177, 59, 255, 0.4);
}

/* TABLE WRAPPER */
.table-wrapper {
  background: rgba(71, 19, 150, 0.35);
  border: 1px solid rgba(177, 59, 255, 0.2);
  border-radius: 16px;
  padding: 10px;
  backdrop-filter: blur(10px);
}

/* PRIME TABLE OVERRIDE */
:deep(.p-datatable) {
  background: transparent;
  color: white;
}

:deep(.p-datatable-thead > tr > th) {
  background: transparent;
  color: #aaa;
  border: none;
}

:deep(.p-datatable-tbody > tr) {
  background: transparent;
  transition: 0.2s;
}

:deep(.p-datatable-tbody > tr:hover) {
  background: rgba(177, 59, 255, 0.1);
}

:deep(.p-datatable-tbody > tr > td) {
  border: none;
}

/* AVATAR */
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #B13BFF, #471396);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

/* STATUS */
.status-badge {
  padding: 4px 10px;
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

/* BUTTON */
.custom-btn {
  background: linear-gradient(135deg, #B13BFF, #471396) !important;
  border: none !important;
  border-radius: 10px;
  font-size: 12px;
}

.custom-btn:hover {
  background: linear-gradient(135deg, #FFCC00, #B13BFF) !important;
}

</style>