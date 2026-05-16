<template>
  <div class="card mb-6">
    <h2 class="section-title">Balances</h2>

    <!-- ===== Financial Balances ===== -->
    <div class="mb-6">
      <h3 class="sub-title">Financial</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="balance-card">
          <p>Main Balance</p>
          <h3>${{ user?.mainBalance }}</h3>
        </div>

        <div class="balance-card">
          <p>Max Cap Balance</p>
          <h3>${{ user?.maxCapBalance }}</h3>
        </div>

        <div class="balance-card">
          <p>Withdrawal Total</p>
          <h3>${{ user?.withdrawalTotalBalance }}</h3>
        </div>

        <div class="balance-card">
          <p>Profit Balance</p>
          <h3 class="text-purple-300">${{ user?.profitBalance }}</h3>
        </div>

        <div class="balance-card">
          <p>Referral Balance</p>
          <h3 class="text-yellow-300">${{ user?.referralBalance }}</h3>
        </div>

        <div class="balance-card">
          <p>Bonus Balance</p>
          <h3>${{ user?.bonusBalance }}</h3>
        </div>

        <div class="balance-card">
          <p>Total Income</p>
          <h3 class="text-green-300">${{ user?.totalIncome }}</h3>
        </div>

        <div class="balance-card">
          <p>Total Balance</p>
          <h3 class="text-blue-300">${{ user?.totalBalance }}</h3>
        </div>
      </div>
    </div>

    <!-- ===== Binary Plan ===== -->
    <div>
      <h3 class="sub-title">Binary Volumes</h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="balance-card">
          <p>Left Volume</p>
          <h3 class="text-pink-300">${{ user?.leftVolume }}</h3>
        </div>

        <div class="balance-card">
          <p>Right Volume</p>
          <h3 class="text-indigo-300">${{ user?.rightVolume }}</h3>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps(["user"]);
</script>

<style scoped>

/* CARD */
.card {
  background: rgba(71, 19, 150, 0.35);
  border: 1px solid rgba(177, 59, 255, 0.2);
  border-radius: 16px;
  padding: 20px;
  backdrop-filter: blur(12px);
}

/* TITLES */
.section-title {
  color: white;
  font-weight: bold;
  margin-bottom: 15px;
}

.sub-title {
  color: #bbb;
  font-size: 14px;
  margin-bottom: 10px;
}

/* BALANCE CARD */
.balance-card {
  background: rgba(0,0,0,0.2);
  padding: 14px;
  border-radius: 12px;
  transition: 0.2s;
}

.balance-card:hover {
  background: rgba(177, 59, 255, 0.12);
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

</style>