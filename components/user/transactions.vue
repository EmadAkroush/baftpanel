<template>
  <div class="details-card">

    <div class="section-header">
      <div>
        <h2>
          تراکنش‌های اخیر
        </h2>

        <p>
          لیست آخرین تراکنش‌های کاربر
        </p>
      </div>
    </div>

    <div class="transactions-list">

      <div
        v-for="item in transactions"
        :key="item.id"
        class="transaction-item"
      >

        <div class="transaction-user">

          <div
            class="transaction-icon"
            :class="item.type"
          >
            <i
              :class="
                item.type === 'deposit'
                  ? 'mdi mdi-arrow-down'
                  : 'mdi mdi-arrow-up'
              "
            ></i>
          </div>

          <div>

            <h4>
              {{ item.title }}
            </h4>

            <p>
              {{ item.date }}
            </p>

          </div>

        </div>

        <div
          class="transaction-price"
          :class="item.type"
        >
          {{ item.type === 'deposit' ? '+' : '-' }}
          ${{ format(item.amount) }}
        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
defineProps({
  transactions: Array,
  format: Function
})
</script>

<style scoped>
.details-card{
  background:white;
  border-radius:30px;
  padding:30px;
}

.transactions-list{
  display:flex;
  flex-direction:column;
  gap:16px;
}

.transaction-item{
  background:#F8F5F2;
  border-radius:22px;
  padding:18px;
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.transaction-user{
  display:flex;
  align-items:center;
  gap:14px;
}

.transaction-icon{
  width:54px;
  height:54px;
  border-radius:18px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
}

.transaction-icon.deposit{
  background:linear-gradient(135deg,#16A34A,#22C55E);
}

.transaction-icon.withdraw{
  background:linear-gradient(135deg,#DC2626,#EF4444);
}

.transaction-price.deposit{
  color:#16A34A;
}

.transaction-price.withdraw{
  color:#DC2626;
}

@media(max-width:768px){
  .transaction-item{
    flex-direction:column;
    align-items:flex-start;
  }
}
</style>