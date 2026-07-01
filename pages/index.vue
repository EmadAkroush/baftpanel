<template>
  <div class="dashboard-page">

    <!-- ===== Header ===== -->
    <div class="dashboard-header">

      <div>
        <h1 class="dashboard-title">
          داشبورد مدیریت
        </h1>

        <p class="dashboard-subtitle">
          مدیریت کامل فروشگاه بافت و بررسی عملکرد فروش
        </p>
      </div>

      <button class="header-btn">
        <i class="mdi mdi-bell-outline"></i>
        <span>اعلان‌ها</span>
      </button>

    </div>

    <!-- ===== Stats ===== -->
    <div class="stats-grid">

      <div
        v-for="item in statCards"
        :key="item.title"
        class="stat-card"
      >

        <div class="stat-icon">
          <i :class="item.icon"></i>
        </div>

        <div class="stat-content">

          <div class="stat-top">

            <span class="stat-title">
              {{ item.title }}
            </span>

            <span
              class="stat-badge"
              :class="item.badgeClass"
            >
              {{ item.change }}
            </span>

          </div>

          <h2 class="stat-value">
            {{ item.value }}
          </h2>

        </div>

      </div>

    </div>

    <!-- ===== Charts ===== -->
    <div class="charts-grid">

      <!-- فروش -->
      <div class="chart-card large-card">

        <div class="card-header">
          <div>
            <h3>فروش ماهانه</h3>
            <p>میزان فروش ۳۰ روز اخیر</p>
          </div>

          <button class="card-action">
            گزارش کامل
          </button>
        </div>

        <Chart
          type="line"
          :data="salesChart"
          :options="chartOptions"
          class="chart-style"
        />

      </div>

      <!-- سفارشات -->
      <div class="chart-card">

        <div class="card-header">
          <div>
            <h3>وضعیت سفارشات</h3>
            <p>بررسی سفارش‌های فروشگاه</p>
          </div>
        </div>

        <Chart
          type="doughnut"
          :data="ordersChart"
          :options="doughnutOptions"
          class="chart-style"
        />

      </div>

    </div>

    <!-- ===== Recent Orders ===== -->
    <div class="orders-card">

      <div class="card-header mb-6">

        <div>
          <h3>آخرین سفارشات</h3>
          <p>
            جدیدترین خریدهای ثبت شده در فروشگاه
          </p>
        </div>

        <button class="card-action">
          مشاهده همه
        </button>

      </div>

      <div class="orders-list">

        <div
          v-for="order in orders"
          :key="order.id"
          class="order-item"
        >

          <div class="order-user">

            <div class="user-avatar">
              {{ order.name.charAt(0) }}
            </div>

            <div>

              <h4>
                {{ order.name }}
              </h4>

              <p>
                سفارش #{{ order.code }}
              </p>

            </div>

          </div>

          <div class="order-price">
            {{ format(order.price) }} تومان
          </div>

          <div
            class="order-status"
            :class="order.statusClass"
          >
            {{ order.status }}
          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";
import Chart from "primevue/chart";

definePageMeta({ middleware: "auth" });
const { authUser } = useAuth();

/* ===== Stats ===== */
const statCards = ref([
  {
    title: "فروش امروز",
    value: "۱۲۸,۰۰۰,۰۰۰",
    icon: "mdi mdi-cash-multiple",
    change: "+۱۲٪",
    badgeClass: "success"
  },

  {
    title: "مجموع واریز",
    value: "۸۹۲,۰۰۰,۰۰۰",
    icon: "mdi mdi-bank-transfer-in",
    change: "+۱۸٪",
    badgeClass: "success"
  },

  {
    title: "مجموع برداشت",
    value: "۴۳۱,۰۰۰,۰۰۰",
    icon: "mdi mdi-bank-transfer-out",
    change: "+۶٪",
    badgeClass: "danger"
  },

  {
    title: "واریزی نتورک",
    value: "۲۶۵,۰۰۰,۰۰۰",
    icon: "mdi mdi-access-point-network",
    change: "+۹٪",
    badgeClass: "success"
  },

  {
    title: "تعداد سفارشات",
    value: "۲۴۸",
    icon: "mdi mdi-cart-outline",
    change: "+۸٪",
    badgeClass: "success"
  },

  {
    title: "کاربران جدید",
    value: "۴۲",
    icon: "mdi mdi-account-group-outline",
    change: "+۵٪",
    badgeClass: "success"
  },

  {
    title: "محصولات فعال",
    value: "۸۶",
    icon: "mdi mdi-hanger",
    change: "-۲٪",
    badgeClass: "danger"
  }
]);

/* ===== Sales Chart ===== */
const salesChart = ref({
  labels: [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه"
  ],

  datasets: [
    {
      label: "فروش",
      data: [12, 19, 8, 15, 21, 18, 26],
      borderColor: "#5B2A4A",
      backgroundColor: "rgba(200,169,107,.18)",
      tension: 0.4,
      fill: true
    }
  ]
});

/* ===== Orders Chart ===== */
const ordersChart = ref({
  labels: [
    "تحویل شده",
    "در حال ارسال",
    "لغو شده"
  ],

  datasets: [
    {
      data: [62, 28, 10],
      backgroundColor: [
        "#5B2A4A",
        "#C8A96B",
        "#D9A5B3"
      ],
      borderWidth: 0
    }
  ]
});

/* ===== Chart Options ===== */
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      labels: {
        color: "#5B2A4A",
        font: {
          family: "inherit"
        }
      }
    }
  },

  scales: {
    x: {
      ticks: {
        color: "#5B2A4A"
      },
      grid: {
        color: "rgba(91,42,74,.06)"
      }
    },

    y: {
      ticks: {
        color: "#5B2A4A"
      },
      grid: {
        color: "rgba(91,42,74,.06)"
      }
    }
  }
};

const doughnutOptions = {
  responsive: true,
  maintainAspectRatio: false,

  plugins: {
    legend: {
      position: "bottom",

      labels: {
        color: "#5B2A4A"
      }
    }
  }
};

/* ===== Orders ===== */
const orders = ref([
  {
    id: 1,
    name: "نگار محمدی",
    code: "548921",
    price: 2850000,
    status: "تحویل شده",
    statusClass: "success"
  },

  {
    id: 2,
    name: "پارسا احمدی",
    code: "548922",
    price: 1750000,
    status: "در حال ارسال",
    statusClass: "pending"
  },

  {
    id: 3,
    name: "ترانه عزیزی",
    code: "548923",
    price: 3950000,
    status: "لغو شده",
    statusClass: "cancel"
  }
]);

/* ===== Format ===== */
const format = (val) =>
  Number(val).toLocaleString("fa-IR");
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: #F8F5F2;
  padding: 32px;
  direction: rtl;
}

/* ===== Header ===== */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.dashboard-title {
  font-size: 34px;
  font-weight: 800;
  color: #1F1F24;
}

.dashboard-subtitle {
  margin-top: 8px;
  color: #5B2A4A;
}

.header-btn {
  height: 52px;
  padding: 0 20px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(
    135deg,
    #5B2A4A,
    #C8A96B
  );
  color: white;
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(91,42,74,.14);
}

.header-btn i {
  font-size: 22px;
}

/* ===== Stats ===== */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
  margin-bottom: 28px;
}

.stat-card {
  background: rgba(255,255,255,.75);
  backdrop-filter: blur(12px);
  border-radius: 28px;
  padding: 24px;
  border: 1px solid rgba(217,165,179,.18);
  display: flex;
  align-items: center;
  gap: 18px;
  transition: .35s ease;
  box-shadow:
    0 10px 30px rgba(91,42,74,.05),
    inset 0 1px 0 rgba(255,255,255,.8);
}

.stat-card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 18px 45px rgba(91,42,74,.10),
    inset 0 1px 0 rgba(255,255,255,.9);
}

.stat-icon {
  width: 74px;
  height: 74px;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(91,42,74,.10),
    rgba(200,169,107,.22)
  );

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(200,169,107,.15);
}

.stat-icon i {
  font-size: 34px;
  color: #5B2A4A;
}

.stat-content {
  flex: 1;
}

.stat-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.stat-title {
  color: #5B2A4A;
  font-size: 14px;
  font-weight: 600;
}

.stat-value {
  font-size: 28px;
  font-weight: 800;
  color: #1F1F24;
  letter-spacing: -.5px;
}

.stat-badge {
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.success {
  background: rgba(34,197,94,.12);
  color: #16a34a;
}

.danger {
  background: rgba(239,68,68,.12);
  color: #dc2626;
}

/* ===== Charts ===== */
.charts-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  margin-bottom: 28px;
}

.chart-card,
.orders-card {
  background: rgba(255,255,255,.78);
  backdrop-filter: blur(12px);
  border-radius: 30px;
  padding: 28px;
  border: 1px solid rgba(217,165,179,.18);
  box-shadow:
    0 10px 30px rgba(91,42,74,.05),
    inset 0 1px 0 rgba(255,255,255,.8);
}

.large-card {
  min-height: 430px;
}

.chart-style {
  height: 320px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: 22px;
  font-weight: 800;
  color: #1F1F24;
}

.card-header p {
  margin-top: 6px;
  color: #5B2A4A;
  font-size: 14px;
}

.card-action {
  height: 42px;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid rgba(217,165,179,.25);
  background: rgba(217,165,179,.10);
  color: #5B2A4A;
  cursor: pointer;
  font-weight: 700;
}

/* ===== Orders ===== */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.order-item {
  padding: 18px;
  border-radius: 20px;
  background: #F8F5F2;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.order-user {
  display: flex;
  align-items: center;
  gap: 14px;
}

.user-avatar {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(
    135deg,
    #5B2A4A,
    #C8A96B
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}

.order-user h4 {
  color: #1F1F24;
  font-weight: 700;
}

.order-user p {
  color: #5B2A4A;
  font-size: 13px;
  margin-top: 4px;
}

.order-price {
  font-weight: 800;
  color: #1F1F24;
}

.order-status {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.pending {
  background: rgba(200,169,107,.18);
  color: #C8A96B;
}

.cancel {
  background: rgba(217,165,179,.18);
  color: #b45309;
}
/* ===== Responsive ===== */
@media (max-width: 1400px) {

  .stats-grid {
    grid-template-columns: repeat(3,1fr);
  }

}

@media (max-width: 1200px) {

  .dashboard-page {
    padding: 24px;
  }

  .stats-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .charts-grid {
    grid-template-columns: 1fr;
  }

  .large-card {
    min-height: auto;
  }

}

@media (max-width: 992px) {

  .dashboard-title {
    font-size: 28px;
  }

  .stat-card {
    padding: 20px;
  }

  .stat-icon {
    width: 64px;
    height: 64px;
  }

  .stat-icon i {
    font-size: 28px;
  }

  .stat-value {
    font-size: 24px;
  }

  .chart-card,
  .orders-card {
    padding: 22px;
  }

  .chart-style {
    height: 280px;
  }

}

@media (max-width: 768px) {

  .dashboard-page {
    padding: 16px;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
  }

  .dashboard-title {
    font-size: 24px;
  }

  .dashboard-subtitle {
    font-size: 14px;
    line-height: 1.8;
  }

  .header-btn {
    width: 100%;
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .stat-card {
    padding: 18px;
    border-radius: 22px;
  }

  .stat-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .stat-value {
    font-size: 22px;
  }

  .charts-grid {
    gap: 18px;
  }

  .chart-card,
  .orders-card {
    padding: 18px;
    border-radius: 24px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

  .card-action {
    width: 100%;
    justify-content: center;
  }

  .chart-style {
    height: 240px;
  }

  .orders-list {
    gap: 14px;
  }

  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .order-price,
  .order-status {
    width: 100%;
  }

}

@media (max-width: 576px) {

  .dashboard-page {
    padding: 12px;
  }

  .dashboard-title {
    font-size: 22px;
  }

  .dashboard-subtitle {
    font-size: 13px;
  }

  .stat-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }

  .stat-icon {
    width: 58px;
    height: 58px;
    border-radius: 18px;
  }

  .stat-icon i {
    font-size: 24px;
  }

  .stat-title {
    font-size: 13px;
  }

  .stat-value {
    font-size: 20px;
  }

  .chart-card,
  .orders-card {
    padding: 16px;
    border-radius: 20px;
  }

  .card-header h3 {
    font-size: 18px;
  }

  .card-header p {
    font-size: 13px;
  }

  .chart-style {
    height: 220px;
  }

  .user-avatar {
    width: 46px;
    height: 46px;
    border-radius: 14px;
  }

  .order-user h4 {
    font-size: 14px;
  }

  .order-user p {
    font-size: 12px;
  }

  .order-price {
    font-size: 14px;
  }

  .order-status {
    text-align: center;
  }

}

</style>