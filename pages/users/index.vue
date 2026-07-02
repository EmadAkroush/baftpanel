<template>
  <div class="users-page">
    <!-- ===== Header ===== -->
    <div class="page-header">
      <div>
        <h1 class="page-title">مدیریت کاربران</h1>

        <p class="page-subtitle">مشاهده و مدیریت کامل کاربران فروشگاه بافت</p>
      </div>

      <!-- Search -->
      <div class="search-box">
        <i class="mdi mdi-magnify"></i>

        <input v-model="search" type="text" placeholder="جستجو کاربران..." />
      </div>
    </div>

    <!-- ===== Table Card ===== -->
    <div class="table-card">
      <div class="table-responsive">
        <table class="users-table">
          <!-- Head -->
          <thead>
            <tr>
              <th>کاربر</th>
              <th>اطلاعات مالی</th>
              <th>وضعیت</th>
              <th>احراز هویت</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr v-if="loading">
              <td colspan="5">
                <div style="padding: 30px; text-align: center">
                  در حال دریافت اطلاعات...
                </div>
              </td>
            </tr>

            <tr v-else-if="error">
              <td colspan="5">
                <div style="padding: 30px; text-align: center; color: red">
                  {{ error }}
                </div>
              </td>
            </tr>

            <tr v-else-if="!filteredUsers.length">
              <td colspan="5">
                <div style="padding: 30px; text-align: center">
                  هیچ کاربری یافت نشد
                </div>
              </td>
            </tr>

            <tr v-for="user in filteredUsers" :key="user._id">
              <!-- User -->
              <td>
                <div class="user-box">
                  <div class="avatar">
                    {{
                      user.firstName?.charAt(0) || user.phone?.charAt(0) || "U"
                    }}
                  </div>

                  <div class="user-info">
                    <h4>
                      {{
                        `${user.firstName || ""}
              ${user.lastName || ""}`
                      }}
                    </h4>

                    <p>
                      {{ user.phone }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- Balances -->
              <td>
                <div class="balances-box">
                  <div class="balance-item">
                    <span>کیف پول:</span>

                    <strong>
                      {{ format(user.mainBalance) }}
                    </strong>
                  </div>

                  <div class="balance-item">
                    <span>درآمد کل:</span>

                    <strong class="profit">
                      {{ format(user.totalIncome) }}
                    </strong>
                  </div>

                  <div class="balance-item">
                    <span>رفرال:</span>

                    <strong class="referral">
                      {{ format(user.referralBalance) }}
                    </strong>
                  </div>
                </div>
              </td>

              <!-- Status -->
              <!-- <td>
                <div
                  class="status-badge"
                  :class="user.isActive ? 'active' : 'inactive'"
                >
                  <span></span>

                  {{ user.isActive ? "فعال" : "غیرفعال" }}
                </div>
              </td> -->

              <!-- Verify -->
              <td>
                <div
                  class="verify-badge"
                  :class="user.isVerified ? 'verified' : 'not-verified'"
                >
                  <i
                    :class="
                      user.isVerified
                        ? 'mdi mdi-check-decagram'
                        : 'mdi mdi-close-circle-outline'
                    "
                  ></i>

                  <span>
                    {{ user.isVerified ? "تایید شده" : "تایید نشده" }}
                  </span>
                </div>
              </td>

              <!-- Action -->
              <td>
                <button class="details-btn" @click="goToDetails(user._id)">
                  <span> مشاهده </span>

                  <i class="mdi mdi-arrow-left"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
definePageMeta({ middleware: "auth" });

/* ===== Search ===== */
const search = ref("");

/* ===== State ===== */
const users = ref([]);

const loading = ref(false);

const error = ref("");

/* ===== Get Users ===== */
async function fetchUsers() {
  try {
    loading.value = true;

    const response = await $fetch("/api/users");

    users.value = response || [];
  } catch (err) {
    console.error(err);

    error.value = "خطا در دریافت کاربران";
  } finally {
    loading.value = false;
  }
}

/* ===== Mounted ===== */
onMounted(() => {
  fetchUsers();
});

/* ===== Filter ===== */
const filteredUsers = computed(() => {
  if (!search.value) return users.value;

  return users.value.filter((user) => {
    const keyword = search.value.toLowerCase();

    return `
      ${user.firstName || ""}
      ${user.lastName || ""}
      ${user.username || ""}
      ${user.phone || ""}
      ${user.email || ""}
    `
      .toLowerCase()
      .includes(keyword);
  });
});

/* ===== Navigate ===== */
function goToDetails(id) {
  navigateTo(`/super-admin/users/${id}`);
}

/* ===== Format ===== */
const format = (val) => Number(val || 0).toLocaleString("fa-IR");
</script>

<style scoped>
/* ===== Page ===== */

.users-page {
  min-height: 100vh;
  padding: 32px;
  background: #f8f5f2;
  direction: rtl;
}

/* ===== Header ===== */

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 34px;
  font-weight: 800;
  color: #1f1f24;
}

.page-subtitle {
  margin-top: 8px;
  color: #5b2a4a;
  font-size: 15px;
}

/* ===== Search ===== */

.search-box {
  width: 340px;
  height: 58px;

  background: white;

  border-radius: 20px;

  border: 1px solid rgba(217, 165, 179, 0.22);

  display: flex;
  align-items: center;

  padding: 0 18px;

  transition: 0.25s ease;
}

.search-box:focus-within {
  border-color: #c8a96b;

  box-shadow: 0 0 0 4px rgba(200, 169, 107, 0.1);
}

.search-box i {
  font-size: 22px;
  color: #5b2a4a;
  margin-left: 12px;
}

.search-box input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;

  font-size: 14px;
  color: #1f1f24;
}

.search-box input::placeholder {
  color: #9f7788;
}

.search-box input:focus {
  outline: none;
}

/* ===== Card ===== */

.table-card {
  background: white;
  border-radius: 30px;

  border: 1px solid rgba(217, 165, 179, 0.18);

  box-shadow: 0 10px 30px rgba(91, 42, 74, 0.05);

  overflow: hidden;
}

.table-responsive {
  width: 100%;
  overflow-x: auto;
}

/* ===== Table ===== */

.users-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 900px;
}

.users-table thead {
  background: linear-gradient(
    135deg,
    rgba(91, 42, 74, 0.04),
    rgba(200, 169, 107, 0.06)
  );
}

.users-table th {
  text-align: right;
  padding: 22px 24px;

  color: #5b2a4a;
  font-size: 14px;
  font-weight: 800;

  white-space: nowrap;
}

.users-table td {
  padding: 22px 24px;

  border-top: 1px solid rgba(217, 165, 179, 0.12);

  vertical-align: middle;
}

.users-table tbody tr {
  transition: 0.25s ease;
}

.users-table tbody tr:hover {
  background: rgba(217, 165, 179, 0.06);
}

/* ===== User ===== */

.user-box {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  width: 54px;
  height: 54px;

  border-radius: 18px;

  background: linear-gradient(135deg, #5b2a4a, #c8a96b);

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;

  font-weight: 800;
  font-size: 18px;

  flex-shrink: 0;
}

.user-info h4 {
  font-size: 15px;
  font-weight: 800;
  color: #1f1f24;
}

.user-info p {
  margin-top: 6px;
  color: #8b5e74;
  font-size: 13px;
}

/* ===== Balances ===== */

.balances-box {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.balance-item {
  display: flex;
  align-items: center;
  gap: 8px;

  font-size: 13px;
}

.balance-item span {
  color: #5b2a4a;
}

.balance-item strong {
  color: #1f1f24;
}

.balance-item .profit {
  color: #16a34a;
}

.balance-item .referral {
  color: #c8a96b;
}

/* ===== Status ===== */

.status-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  height: 38px;
  padding: 0 14px;

  border-radius: 999px;

  font-size: 13px;
  font-weight: 700;
}

.status-badge span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.status-badge.active span {
  background: #16a34a;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.status-badge.inactive span {
  background: #dc2626;
}

/* ===== Verify ===== */

.verify-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;

  font-size: 14px;
  font-weight: 700;
}

.verify-badge i {
  font-size: 22px;
}

.verified {
  color: #16a34a;
}

.not-verified {
  color: #9ca3af;
}

/* ===== Button ===== */

.details-btn {
  height: 46px;
  padding: 0 18px;

  border: none;
  border-radius: 16px;

  background: linear-gradient(135deg, #5b2a4a, #c8a96b);

  color: white;

  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 700;
  cursor: pointer;

  transition: 0.25s ease;
}

.details-btn:hover {
  transform: translateY(-2px);

  box-shadow: 0 12px 24px rgba(91, 42, 74, 0.16);
}

/* ===== Responsive ===== */

@media (max-width: 992px) {
  .users-page {
    padding: 18px;
  }

  .page-title {
    font-size: 28px;
  }

  .search-box {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: stretch;
  }

  .table-card {
    border-radius: 22px;
  }

  .users-table th,
  .users-table td {
    padding: 18px;
  }
}
</style>
