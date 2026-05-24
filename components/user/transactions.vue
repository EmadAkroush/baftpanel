<template>
  <div class="details-card">

    <!-- HEADER -->
    <div class="section-header">

      <div>
        <h2>
          تراکنش‌های اخیر
        </h2>

        <p>
          مدیریت و مشاهده کامل تراکنش‌های کاربر
        </p>
      </div>

    </div>

    <!-- FILTERS -->
    <div class="filters-wrapper">

      <!-- SEARCH -->
      <div class="search-box">

        <i class="mdi mdi-magnify"></i>

        <input
          v-model="search"
          type="text"
          placeholder="جستجو تراکنش..."
        />

      </div>

      <!-- FILTER -->
      <select v-model="selectedType">

        <option value="">
          همه تراکنش‌ها
        </option>

        <option value="deposit">
          واریز
        </option>

        <option value="withdraw">
          برداشت
        </option>

      </select>

    </div>

    <!-- TRANSACTIONS -->
    <div class="transactions-list">

      <div
        v-for="item in paginatedTransactions"
        :key="item.id"
        class="transaction-item"
      >

        <!-- LEFT -->
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

        <!-- RIGHT -->
        <div
          class="transaction-price"
          :class="item.type"
        >
          {{ item.type === 'deposit' ? '+' : '-' }}
          {{ format(item.amount) }}
        </div>

      </div>

      <!-- EMPTY -->
      <div
        v-if="paginatedTransactions.length === 0"
        class="empty-state"
      >
        <i class="mdi mdi-database-remove-outline"></i>

        <span>
          تراکنشی یافت نشد
        </span>
      </div>

    </div>

    <!-- PAGINATION -->
    <div
      v-if="totalPages > 1"
      class="pagination"
    >

      <button
        class="page-btn"
        :disabled="page === 1"
        @click="page--"
      >
        <i class="mdi mdi-chevron-right"></i>
      </button>

      <button
        v-for="p in totalPages"
        :key="p"
        class="page-number"
        :class="{ active: page === p }"
        @click="page = p"
      >
        {{ p }}
      </button>

      <button
        class="page-btn"
        :disabled="page === totalPages"
        @click="page++"
      >
        <i class="mdi mdi-chevron-left"></i>
      </button>

    </div>

  </div>
</template>

<script setup>
import { ref, computed } from "vue"

/* PROPS */
const props = defineProps({
  transactions: {
    type: Array,
    default: () => []
  }
})

/* FORMAT */
const format = (val) => {
  return Number(val || 0).toLocaleString("fa-IR")
}

/* FILTERS */
const search = ref("")
const selectedType = ref("")

/* PAGINATION */
const page = ref(1)
const perPage = 5

/* FILTERED */
const filteredTransactions = computed(() => {

  return props.transactions.filter((item) => {

    const matchSearch =
      item.title
        .toLowerCase()
        .includes(search.value.toLowerCase())

    const matchType =
      !selectedType.value ||
      item.type === selectedType.value

    return matchSearch && matchType
  })

})

/* TOTAL PAGES */
const totalPages = computed(() => {
  return Math.ceil(
    filteredTransactions.value.length / perPage
  )
})

/* PAGINATED */
const paginatedTransactions = computed(() => {

  const start =
    (page.value - 1) * perPage

  return filteredTransactions.value.slice(
    start,
    start + perPage
  )

})
</script>

<style scoped>

/* ===== CARD ===== */

.details-card{
  background:white;
  border-radius:30px;
  padding:30px;
  margin-top:24px;
  border:1px solid rgba(217,165,179,.18);
}

/* ===== HEADER ===== */

.section-header{
  margin-bottom:24px;
}

.section-header h2{
  font-size:28px;
  font-weight:800;
  color:#1F1F24;
}

.section-header p{
  margin-top:8px;
  color:#8B5E74;
  font-size:14px;
}

/* ===== FILTERS ===== */

.filters-wrapper{
  display:flex;
  gap:14px;
  margin-bottom:24px;
  flex-wrap:wrap;
}

/* SEARCH */

.search-box{
  flex:1;
  min-width:240px;
  height:54px;
  border-radius:18px;
  background:#F8F5F2;
  border:1px solid rgba(217,165,179,.18);
  display:flex;
  align-items:center;
  padding:0 16px;
  gap:10px;
}

.search-box i{
  color:#8B5E74;
  font-size:20px;
}

.search-box input{
  width:100%;
  border:none;
  background:transparent;
  outline:none;
  color:#1F1F24;
  font-size:14px;
}

/* SELECT */

select{
  min-width:180px;
  height:54px;
  border-radius:18px;
  border:1px solid rgba(217,165,179,.18);
  background:#F8F5F2;
  padding:0 16px;
  outline:none;
  color:#1F1F24;
  font-size:14px;
  cursor:pointer;
}

/* ===== LIST ===== */

.transactions-list{
  display:flex;
  flex-direction:column;
  gap:16px;
}

/* ITEM */

.transaction-item{
  background:#F8F5F2;
  border-radius:24px;
  padding:20px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  transition:.25s ease;
  border:1px solid transparent;
}

.transaction-item:hover{
  transform:translateY(-2px);
  border-color:rgba(217,165,179,.18);
  box-shadow:0 12px 30px rgba(91,42,74,.06);
}

/* USER */

.transaction-user{
  display:flex;
  align-items:center;
  gap:16px;
}

.transaction-user h4{
  font-size:17px;
  font-weight:800;
  color:#1F1F24;
}

.transaction-user p{
  margin-top:6px;
  font-size:13px;
  color:#8B5E74;
}

/* ICON */

.transaction-icon{
  width:58px;
  height:58px;
  border-radius:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  flex-shrink:0;
}

.transaction-icon i{
  font-size:24px;
}

.transaction-icon.deposit{
  background:linear-gradient(135deg,#16A34A,#22C55E);
}

.transaction-icon.withdraw{
  background:linear-gradient(135deg,#DC2626,#EF4444);
}

/* PRICE */

.transaction-price{
  font-size:24px;
  font-weight:800;
}

.transaction-price.deposit{
  color:#16A34A;
}

.transaction-price.withdraw{
  color:#DC2626;
}

/* ===== EMPTY ===== */

.empty-state{
  height:220px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:12px;
  color:#8B5E74;
}

.empty-state i{
  font-size:54px;
}

/* ===== PAGINATION ===== */

.pagination{
  margin-top:28px;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
  flex-wrap:wrap;
}

.page-btn,
.page-number{
  width:44px;
  height:44px;
  border:none;
  border-radius:14px;
  background:#F8F5F2;
  cursor:pointer;
  transition:.25s;
  font-weight:700;
  color:#5B2A4A;
}

.page-btn:hover,
.page-number:hover{
  background:#EFE6E9;
}

.page-number.active{
  background:linear-gradient(135deg,#5B2A4A,#C8A96B);
  color:white;
}

.page-btn:disabled{
  opacity:.4;
  cursor:not-allowed;
}

/* ===== RESPONSIVE ===== */

@media(max-width:768px){

  .details-card{
    padding:20px;
    border-radius:24px;
  }

  .filters-wrapper{
    flex-direction:column;
  }

  .search-box,
  select{
    width:100%;
  }

  .transaction-item{
    flex-direction:column;
    align-items:flex-start;
  }

  .transaction-price{
    font-size:20px;
  }

}

</style>