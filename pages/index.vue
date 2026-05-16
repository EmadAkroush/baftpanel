<template>
  <div class="dashboard-page p-6 min-h-screen">

    <!-- HEADER -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-2xl font-bold text-white">Admin Dashboard</h1>
    </div>

    <!-- STATS -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card v-for="item in statCards" :key="item.title" class="stat-card">
        <template #title>
          <div class="text-sm text-gray-400">{{ item.title }}</div>
        </template>
        <template #content>
          <div class="text-2xl font-bold text-white">{{ item.value }}</div>
        </template>
      </Card>
    </div>

    <!-- CHARTS -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

      <!-- PROFIT -->
      <Card class="chart-card">
        <template #title>Profit Chart</template>
        <template #content>
          <Chart type="bar" :data="profitChart" :options="chartOptions" />
        </template>
      </Card>

      <!-- VX -->
      <Card class="chart-card">
        <template #title>VX (Referral + Binary)</template>
        <template #content>
          <Chart type="bar" :data="vxChart" :options="chartOptions" />
        </template>
      </Card>

      <!-- DEPOSIT -->
      <Card class="chart-card">
        <template #title>Deposit Chart</template>
        <template #content>
          <Chart type="bar" :data="depositChart" :options="chartOptions" />
        </template>
      </Card>

      <!-- WITHDRAW -->
      <Card class="chart-card">
        <template #title>Withdraw Chart</template>
        <template #content>
          <Chart type="bar" :data="withdrawChart" :options="chartOptions" />
        </template>
      </Card>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Card from "primevue/card";
import Chart from "primevue/chart";

definePageMeta({ middleware: "auth" });

const { authUser } = useAuth();

/* ===== Stats ===== */
const statCards = ref([]);

/* ===== Chart States ===== */
const profitChart = ref({ labels: [], datasets: [] });
const vxChart = ref({ labels: [], datasets: [] });
const depositChart = ref({ labels: [], datasets: [] });
const withdrawChart = ref({ labels: [], datasets: [] });

/* ===== Chart Options ===== */
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { labels: { color: "#ccc" } },
  },
  scales: {
    x: {
      ticks: { color: "#aaa" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
    y: {
      ticks: { color: "#aaa" },
      grid: { color: "rgba(255,255,255,0.05)" },
    },
  },
};

/* ===== Fetch Data ===== */
onMounted(async () => {
  try {
    const userId = authUser.value.user.id;

    /* ===== Stats (initial) ===== */
    const stats = await $fetch("/api/admin");

    /* ===== PROFIT ===== */
    const profit = await $fetch("/api/admin/profit", {
      method: "POST",
      body: { userId },
    });

    profitChart.value = {
      labels: profit.labels,
      datasets: [
        {
          label: "Profit",
          data: profit.data,
          backgroundColor: "#22c55e",
        },
      ],
    };

    /* ===== VX ===== */
    const vx = await $fetch("/api/admin/vx", {
      method: "POST",
      body: { userId },
    });

    vxChart.value = {
      labels: vx.labels,
      datasets: [
        {
          label: "VX Income",
          data: vx.data,
          backgroundColor: "#a855f7",
        },
      ],
    };

    /* ===== DEPOSIT ===== */
    const deposit = await $fetch("/api/admin/deposit", {
      method: "POST",
      body: { userId },
    });

    const totalDeposits = deposit.data.reduce((a, b) => a + b, 0);

    depositChart.value = {
      labels: deposit.labels,
      datasets: [
        {
          label: "Deposits",
          data: deposit.data,
          backgroundColor: "#3b82f6",
        },
      ],
    };

    /* ===== WITHDRAW ===== */
    const withdraw = await $fetch("/api/admin/withdraw", {
      method: "POST",
      body: { userId },
    });

    const totalWithdraw = withdraw.data.reduce((a, b) => a + b, 0);

    withdrawChart.value = {
      labels: withdraw.labels,
      datasets: [
        {
          label: "Withdrawals",
          data: withdraw.data,
          backgroundColor: "#ef4444",
        },
      ],
    };

    /* ===== FINAL STAT CARDS ===== */
    statCards.value = [
      { title: "Total Users", value: stats.users },
      { title: "Active Investments", value: stats.activeInvestment },
      { title: "Total Deposits", value: totalDeposits },
      { title: "Total Withdrawals", value: totalWithdraw },
    ];

  } catch (err) {
    console.log("Dashboard error:", err);
  }
});
</script>

<style scoped>

/* PAGE BG */
.dashboard-page {
  background: radial-gradient(circle at top, #1a0f5a, #090040);
}

/* STAT CARD */
.stat-card {
  background: rgba(71, 19, 150, 0.3);
  border: 1px solid rgba(177, 59, 255, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(10px);
}

/* CHART CARD */
.chart-card {
  background: rgba(71, 19, 150, 0.25);
  border: 1px solid rgba(177, 59, 255, 0.2);
  border-radius: 16px;
  backdrop-filter: blur(12px);
  color: white;
}

/* FIX CHART TEXT */
:deep(canvas) {
  filter: brightness(1.1);
}

</style>