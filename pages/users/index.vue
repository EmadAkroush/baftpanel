<template>
  <div class="users-page">

    <!-- ===== Header ===== -->
    <div class="page-header">

      <div>
        <h1 class="page-title">
          مدیریت کاربران
        </h1>

        <p class="page-subtitle">
          مشاهده و مدیریت کامل کاربران فروشگاه بافت
        </p>
      </div>

      <!-- Search -->
      <div class="search-box">

        <i class="mdi mdi-magnify"></i>

        <input
          v-model="search"
          type="text"
          placeholder="جستجو کاربران..."
        />

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

            <tr
              v-for="user in filteredUsers"
              :key="user._id"
            >

              <!-- User -->
              <td>

                <div class="user-box">

                  <div class="avatar">
                    {{ user.username?.charAt(0) }}
                  </div>

                  <div class="user-info">

                    <h4>
                      {{ user.username }}
                    </h4>

                    <p>
                      {{ user.email }}
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
                      ${{ format(user.mainBalance) }}
                    </strong>
                  </div>

                  <div class="balance-item">
                    <span>سود:</span>

                    <strong class="profit">
                      ${{ format(user.profitBalance) }}
                    </strong>
                  </div>

                  <div class="balance-item">
                    <span>رفرال:</span>

                    <strong class="referral">
                      ${{ format(user.referralBalance) }}
                    </strong>
                  </div>

                </div>

              </td>

              <!-- Status -->
              <td>

                <div
                  class="status-badge"
                  :class="
                    user.isActive
                      ? 'active'
                      : 'inactive'
                  "
                >
                  <span></span>

                  {{
                    user.isActive
                      ? 'فعال'
                      : 'غیرفعال'
                  }}
                </div>

              </td>

              <!-- Verify -->
              <td>

                <div
                  class="verify-badge"
                  :class="
                    user.isVerified
                      ? 'verified'
                      : 'not-verified'
                  "
                >

                  <i
                    :class="
                      user.isVerified
                        ? 'mdi mdi-check-decagram'
                        : 'mdi mdi-close-circle-outline'
                    "
                  ></i>

                  <span>
                    {{
                      user.isVerified
                        ? 'تایید شده'
                        : 'تایید نشده'
                    }}
                  </span>

                </div>

              </td>

              <!-- Action -->
              <td>

                <button
                  class="details-btn"
                  @click="goToDetails(user._id)"
                >

                  <span>
                    مشاهده
                  </span>

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
import { ref, computed } from "vue";

/* ===== Search ===== */
const search = ref("");

/* ===== Fake Users ===== */
const users = ref([
  {
    _id: 1,
    username: "نگار محمدی",
    email: "negar@gmail.com",
    mainBalance: 2850,
    profitBalance: 430,
    referralBalance: 180,
    isActive: true,
    isVerified: true
  },

  {
    _id: 2,
    username: "پارسا احمدی",
    email: "parsa@gmail.com",
    mainBalance: 1240,
    profitBalance: 220,
    referralBalance: 90,
    isActive: true,
    isVerified: false
  },

  {
    _id: 3,
    username: "ترانه عزیزی",
    email: "tarane@gmail.com",
    mainBalance: 7420,
    profitBalance: 980,
    referralBalance: 520,
    isActive: false,
    isVerified: true
  },

  {
    _id: 4,
    username: "آراد کریمی",
    email: "arad@gmail.com",
    mainBalance: 3250,
    profitBalance: 640,
    referralBalance: 310,
    isActive: true,
    isVerified: true
  },

  {
    _id: 5,
    username: "مهسا رضایی",
    email: "mahsa@gmail.com",
    mainBalance: 910,
    profitBalance: 140,
    referralBalance: 55,
    isActive: false,
    isVerified: false
  }
]);

/* ===== Filter ===== */
const filteredUsers = computed(() => {

  if (!search.value)
    return users.value;

  return users.value.filter((u) =>
    `${u.username} ${u.email}`
      .toLowerCase()
      .includes(search.value.toLowerCase())
  );

});

/* ===== Navigate ===== */
function goToDetails(id) {
  navigateTo(`/users/${id}`);
}

/* ===== Format ===== */
const format = (val) =>
  Number(val || 0).toLocaleString("fa-IR");
</script>

<style scoped>

/* ===== Page ===== */

.users-page {
  min-height: 100vh;
  padding: 32px;
  background: #F8F5F2;
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
  color: #1F1F24;
}

.page-subtitle {
  margin-top: 8px;
  color: #5B2A4A;
  font-size: 15px;
}

/* ===== Search ===== */

.search-box {
  width: 340px;
  height: 58px;

  background: white;

  border-radius: 20px;

  border: 1px solid rgba(217,165,179,.22);

  display: flex;
  align-items: center;

  padding: 0 18px;

  transition: .25s ease;
}

.search-box:focus-within {
  border-color: #C8A96B;

  box-shadow:
    0 0 0 4px rgba(200,169,107,.10);
}

.search-box i {
  font-size: 22px;
  color: #5B2A4A;
  margin-left: 12px;
}

.search-box input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;

  font-size: 14px;
  color: #1F1F24;
}

.search-box input::placeholder {
  color: #9F7788;
}

.search-box input:focus {
  outline: none;
}

/* ===== Card ===== */

.table-card {
  background: white;
  border-radius: 30px;

  border: 1px solid rgba(217,165,179,.18);

  box-shadow:
    0 10px 30px rgba(91,42,74,.05);

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
  background:
    linear-gradient(
      135deg,
      rgba(91,42,74,.04),
      rgba(200,169,107,.06)
    );
}

.users-table th {
  text-align: right;
  padding: 22px 24px;

  color: #5B2A4A;
  font-size: 14px;
  font-weight: 800;

  white-space: nowrap;
}

.users-table td {
  padding: 22px 24px;

  border-top:
    1px solid rgba(217,165,179,.12);

  vertical-align: middle;
}

.users-table tbody tr {
  transition: .25s ease;
}

.users-table tbody tr:hover {
  background: rgba(217,165,179,.06);
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

  background:
    linear-gradient(
      135deg,
      #5B2A4A,
      #C8A96B
    );

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
  color: #1F1F24;
}

.user-info p {
  margin-top: 6px;
  color: #8B5E74;
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
  color: #5B2A4A;
}

.balance-item strong {
  color: #1F1F24;
}

.balance-item .profit {
  color: #16A34A;
}

.balance-item .referral {
  color: #C8A96B;
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
  background: rgba(34,197,94,.12);
  color: #16A34A;
}

.status-badge.active span {
  background: #16A34A;
}

.status-badge.inactive {
  background: rgba(239,68,68,.12);
  color: #DC2626;
}

.status-badge.inactive span {
  background: #DC2626;
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
  color: #16A34A;
}

.not-verified {
  color: #9CA3AF;
}

/* ===== Button ===== */

.details-btn {
  height: 46px;
  padding: 0 18px;

  border: none;
  border-radius: 16px;

  background:
    linear-gradient(
      135deg,
      #5B2A4A,
      #C8A96B
    );

  color: white;

  display: flex;
  align-items: center;
  gap: 8px;

  font-weight: 700;
  cursor: pointer;

  transition: .25s ease;
}

.details-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 12px 24px rgba(91,42,74,.16);
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