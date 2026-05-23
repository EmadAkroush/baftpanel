<template>
  <div class="transactions-page">
    <!-- ===== HEADER ===== -->
    <div class="page-header">
      <div>
        <h1 class="page-title">مدیریت تراکنش‌ها</h1>

        <p class="page-subtitle">مشاهده و مدیریت تراکنش‌های کاربران نئو فرکت</p>
      </div>

      <div class="header-actions">
        <button class="export-btn">
          <i class="mdi mdi-export-variant"></i>
          خروجی اکسل
        </button>
      </div>
    </div>

    <!-- ===== STATS ===== -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple">
          <i class="mdi mdi-swap-horizontal"></i>
        </div>

        <div>
          <span>کل تراکنش‌ها</span>
          <strong>{{ transactions.length }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <i class="mdi mdi-check-circle-outline"></i>
        </div>

        <div>
          <span>تراکنش موفق</span>
          <strong>{{ completedCount }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="mdi mdi-timer-sand"></i>
        </div>

        <div>
          <span>در انتظار</span>
          <strong>{{ pendingCount }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="mdi mdi-cash-multiple"></i>
        </div>

        <div>
          <span>مجموع تراکنش‌ها</span>
          <strong>${{ format(totalAmount) }}</strong>
        </div>
      </div>
    </div>

    <!-- ===== FILTERS ===== -->
    <div class="filters-card">
      <div class="search-box">
        <i class="mdi mdi-magnify"></i>

        <input
          v-model="search"
          type="text"
          placeholder="جستجو ایمیل یا نوع تراکنش..."
        />
      </div>

      <select v-model="filterType">
        <option value="">همه نوع‌ها</option>

        <option v-for="item in transactionTypes" :key="item" :value="item">
          {{ item }}
        </option>
      </select>

      <select v-model="filterStatus">
        <option value="">همه وضعیت‌ها</option>

        <option v-for="item in statuses" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>

    <!-- ===== TABLE ===== -->
    <div class="table-card">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>کاربر</th>
              <th>نوع تراکنش</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>تاریخ</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="tx in paginatedTransactions" :key="tx.id">
              <!-- USER -->
              <td>
                <div class="user-info">
                  <div class="avatar">
                    {{ tx.email.charAt(0).toUpperCase() }}
                  </div>

                  <div>
                    <h4>
                      {{ tx.email }}
                    </h4>

                    <p>
                      {{ tx.wallet }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- TYPE -->
              <td>
                <span class="type-badge">
                  {{ tx.type }}
                </span>
              </td>

              <!-- AMOUNT -->
              <td class="amount">${{ format(tx.amount) }}</td>

              <!-- STATUS -->
              <td>
                <span class="status-badge" :class="tx.status">
                  {{ tx.status }}
                </span>
              </td>

              <!-- DATE -->
              <td>
                {{ tx.date }}
              </td>

              <!-- ACTION -->
              <td>
                <div class="actions">
                  <button class="action-btn view" @click="openModal(tx)">
                    <i class="mdi mdi-eye-outline"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- ===== PAGINATION ===== -->
      <div class="pagination">
        <button @click="prevPage" :disabled="page === 1">قبلی</button>

        <div class="pages">
          <button
            v-for="p in totalPages"
            :key="p"
            :class="{ active: page === p }"
            @click="page = p"
          >
            {{ p }}
          </button>
        </div>

        <button @click="nextPage" :disabled="page === totalPages">بعدی</button>
      </div>
    </div>

    <!-- ===== MODAL ===== -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="showModal = false"
      >
        <div class="modal-box">
          <div class="modal-header">
            <h3>جزئیات تراکنش</h3>

            <button class="close-btn" @click="showModal = false">
              <i class="mdi mdi-close"></i>
            </button>
          </div>

          <div v-if="selectedTransaction" class="modal-content">
            <div class="detail-item">
              <span>ایمیل</span>

              <strong>
                {{ selectedTransaction.email }}
              </strong>
            </div>

            <div class="detail-item">
              <span>کیف پول</span>

              <strong class="wallet-text">
                {{ selectedTransaction.wallet }}
              </strong>
            </div>

            <div class="detail-item">
              <span>نوع تراکنش</span>

              <strong>
                {{ selectedTransaction.type }}
              </strong>
            </div>

            <div class="detail-item">
              <span>مبلغ</span>

              <strong class="green">
                ${{ format(selectedTransaction.amount) }}
              </strong>
            </div>

            <div class="detail-item">
              <span>وضعیت</span>

              <strong>
                {{ selectedTransaction.status }}
              </strong>
            </div>

            <div class="detail-item">
              <span>تاریخ</span>

              <strong>
                {{ selectedTransaction.date }}
              </strong>
            </div>

            <!-- TRACKING CODE FOR WITHDRAW -->
            <div
              v-if="selectedTransaction.type === 'withdraw'"
              class="detail-item"
            >
              <span>شماره رهگیری بانک</span>

              <strong>
                {{ selectedTransaction.bankTrackingCode || "ثبت نشده" }}
              </strong>
            </div>

            <!-- UPDATE -->
            <div class="update-box">
              <h4>بروزرسانی وضعیت</h4>

              <select v-model="newStatus">
                <option v-for="item in statuses" :key="item" :value="item">
                  {{ item }}
                </option>
              </select>

              <!-- TRACKING INPUT -->
              <input
                v-if="selectedTransaction.type === 'withdraw'"
                v-model="bankTrackingCode"
                type="text"
                placeholder="شماره رهگیری بانک را وارد کنید"
                class="tracking-input"
              />

              <button class="update-btn" @click="updateStatus">
                <i class="mdi mdi-content-save-outline"></i>
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

/* ===== FAKE DATA ===== */

const transactions = ref([
  {
    id: 1,
    email: "alex@neofract.com",
    wallet: "0xA7B2F91D3A...",
    type: "deposit",
    amount: 1200,
    status: "completed",
    date: "2025/07/01",
  },

  {
    id: 2,
    email: "sara@neofract.com",
    wallet: "0x92AF81AA11...",
    type: "withdraw",
    amount: 540,
    status: "pending",
    bankTrackingCode: "",
    date: "2025/07/03",
  },

  {
    id: 3,
    email: "mike@neofract.com",
    wallet: "0x77DA912AB2...",
    type: "investment",
    amount: 3200,
    status: "completed",
    date: "2025/07/04",
  },

  {
    id: 4,
    email: "emma@neofract.com",
    wallet: "0xFFAA721BB3...",
    type: "bonus",
    amount: 150,
    status: "failed",
    date: "2025/07/06",
  },

  {
    id: 5,
    email: "david@neofract.com",
    wallet: "0xBC8821FA77...",
    type: "profit",
    amount: 890,
    status: "completed",
    date: "2025/07/07",
  },
]);

/* ===== FILTERS ===== */

const search = ref("");
const filterType = ref("");
const filterStatus = ref("");

/* ===== PAGINATION ===== */

const page = ref(1);
const perPage = 5;

/* ===== MODAL ===== */

const showModal = ref(false);

const selectedTransaction = ref(null);

const newStatus = ref("");

const bankTrackingCode = ref("");

/* ===== OPTIONS ===== */

const transactionTypes = [
  "deposit",
  "withdraw",
  "investment",
  "profit",
  "bonus",
];

const statuses = ["pending", "completed", "failed"];

/* ===== FILTER ===== */

const filteredTransactions = computed(() => {
  return transactions.value.filter((tx) => {
    const s = search.value.toLowerCase();

    return (
      (tx.email.toLowerCase().includes(s) ||
        tx.type.toLowerCase().includes(s)) &&
      (!filterType.value || tx.type === filterType.value) &&
      (!filterStatus.value || tx.status === filterStatus.value)
    );
  });
});

/* ===== PAGINATION ===== */

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / perPage),
);

const paginatedTransactions = computed(() => {
  const start = (page.value - 1) * perPage;

  return filteredTransactions.value.slice(start, start + perPage);
});

const prevPage = () => {
  if (page.value > 1) {
    page.value--;
  }
};

const nextPage = () => {
  if (page.value < totalPages.value) {
    page.value++;
  }
};

/* ===== STATS ===== */

const completedCount = computed(
  () => transactions.value.filter((tx) => tx.status === "completed").length,
);

const pendingCount = computed(
  () => transactions.value.filter((tx) => tx.status === "pending").length,
);

const totalAmount = computed(() =>
  transactions.value.reduce((sum, tx) => sum + tx.amount, 0),
);

/* ===== MODAL ===== */

function openModal(tx) {
  selectedTransaction.value = tx;

  newStatus.value = tx.status;

  bankTrackingCode.value = tx.bankTrackingCode || "";

  showModal.value = true;
}

/* ===== UPDATE ===== */

function updateStatus() {
  selectedTransaction.value.status = newStatus.value;

  if (selectedTransaction.value.type === "withdraw") {
    selectedTransaction.value.bankTrackingCode = bankTrackingCode.value;
  }

  const index = transactions.value.findIndex(
    (item) => item.id === selectedTransaction.value.id,
  );

  if (index !== -1) {
    transactions.value[index].status = newStatus.value;

    transactions.value[index].bankTrackingCode = bankTrackingCode.value;
  }

  showModal.value = false;
}

/* ===== HELPERS ===== */

const format = (value) => {
  return Number(value).toLocaleString("en-US");
};
</script>

<style scoped>
.transactions-page {
  min-height: 100vh;
  background: #f8f5f2;
  padding: 32px;
  direction: rtl;
}

/* ===== HEADER ===== */

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-bottom: 28px;
}

.page-title {
  font-size: 34px;
  font-weight: 900;
}

.page-subtitle {
  margin-top: 8px;
  color: #94a3b8;
}

.export-btn {
  height: 52px;
  padding: 0 22px;
  border: none;
  border-radius: 18px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  color: white;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

/* ===== STATS ===== */

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: white;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 24px;
  padding: 22px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 28px;
}

.stat-icon.purple {
  background: linear-gradient(135deg, #7c3aed, #a855f7);
}

.stat-icon.green {
  background: linear-gradient(135deg, #00c896, #00e0b8);
}

.stat-icon.orange {
  background: linear-gradient(135deg, #ff7a00, #ffb347);
}

.stat-icon.blue {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
}

.stat-card span {
  color: #94a3b8;
  font-size: 13px;
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 28px;
}

/* ===== FILTERS ===== */

.filters-card {
  background: white;
  border-radius: 28px;
  padding: 20px;
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.search-box {
  flex: 1;
  min-width: 260px;
  position: relative;
}

.search-box i {
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: #94a3b8;
}

.search-box input,
.filters-card select {
  width: 100%;
  height: 54px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: #f8f5f2;

  padding: 0 16px;
}

.search-box input {
  padding-right: 48px;
}

.filters-card select {
  min-width: 180px;
}

input:focus,
select:focus {
  outline: none;
  border-color: #7c3aed;
}

/* ===== TABLE ===== */

.table-card {
   background:white;
  border-radius: 30px;
  overflow: hidden;
}

.table-wrapper {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1000px;
}

thead {
  background: #111827 !important;
}

th {
  padding: 22px;
  text-align: right;
  color: #cbd5e1;
}

td {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  color: white;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.avatar {
  width: 52px;
  height: 52px;
  border-radius: 18px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
}

.user-info p {
  margin-top: 6px;
  color: #94a3b8;
  font-size: 12px;
}

.type-badge {
  background: rgba(124, 58, 237, 0.14);
  color: #c4b5fd;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
}

.amount {
  color: #00e0b8;
  font-weight: 800;
}

.status-badge {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status-badge.completed {
  background: rgba(0, 224, 184, 0.14);
  color: #00e0b8;
}

.status-badge.pending {
  background: rgba(255, 122, 0, 0.14);
  color: #ffb347;
}

.status-badge.failed {
  background: rgba(239, 68, 68, 0.14);
  color: #ff5a7a;
}

.actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 14px;
  cursor: pointer;
  color: white;
  font-size: 18px;
}

.action-btn.view {
  background: linear-gradient(135deg, #7c3aed, #2563eb);
}

/* ===== PAGINATION ===== */

.pagination {
  padding: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.pagination button {
  min-width: 42px;
  height: 42px;
  border: none;
  border-radius: 12px;
  background: #111827 !important;
  color: white;
  cursor: pointer;
  font-weight: 700;
}

.pages {
  display: flex;
  gap: 8px;
}

.pages .active {
  background: #7c3aed !important;
}

/* ===== MODAL ===== */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-box {
  width: 100%;
  max-width: 520px;
  background: #0f172a !important;
  border-radius: 28px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-header {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  background: #111827 !important;
}

.modal-header h3 {
  color: white;
  font-size: 22px;
  font-weight: 800;
}

.close-btn {
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 14px;
  background: #1e293b !important;
  color: white;
  cursor: pointer;
  font-size: 22px;
}

.modal-content {
  padding: 24px;
  background: #0f172a !important;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.detail-item span {
  color: #94a3b8;
}

.detail-item strong {
  color: white;
}

.wallet-text {
  font-size: 12px;
}

.green {
  color: #00e0b8 !important;
}

/* ===== UPDATE ===== */

.update-box {
  margin-top: 24px;
  background: #111827 !important;
  border-radius: 20px;
  padding: 18px;
}

.update-box h4 {
  color: white;
  margin-bottom: 16px;
}

.update-box select,
.tracking-input {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 14px;
  background: #0b1020 !important;
  color: white;
  padding: 0 16px;
  margin-bottom: 14px;
}

.tracking-input::placeholder {
  color: #64748b;
}

.update-btn {
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

/* ===== ANIMATION ===== */

.fade-enter-active,
.fade-leave-active {
  transition: 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .transactions-page {
    padding: 16px;
  }

  .page-title {
    font-size: 26px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .filters-card {
    padding: 16px;
  }

  .search-box,
  .filters-card select {
    width: 100%;
  }

  table {
    min-width: 850px;
  }
}
</style>
