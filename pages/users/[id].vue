<!-- pages/users/[id].vue -->
<template>
  <div class="user-details-page">

    <!-- Header -->
    <UserHeader
      :user="user"
      @toggle-block="toggleBlock"
      @save="updateUserFull"
    />

    <!-- Hero -->
    <UserHero
      :user="user"
      :format="format"
    />

    <!-- Details Form -->
    <UserForm
      :form="form"
    />

    <!-- Products -->
    <UserPurchased
      :products="purchasedProducts"
      :format="format"
    />

    <!-- Transactions -->
    <UserTransactions
      :transactions="transactions"
      :format="format"
    />

  </div>
</template>

<script setup>
import { reactive, ref } from "vue"

/* COMPONENTS */


/* ===== USER ===== */
const user = reactive({
  firstName: "پارسا",
  lastName: "محمدی",
  email: "parsa@example.com",
  phone: "09121234567",

  wallet: "565656565654654646",
  vxCode: "ne-84521",

  mainBalance: 18250,
  profitBalance: 5280,
  referralBalance: 2100,
  bonusBalance: 850,

  totalIncome: 35200,
  withdrawalTotalBalance: 11800,

  leftVolume: 8200,
  rightVolume: 6400,

  isActive: true,
  isVerified: true
})

/* ===== FORM ===== */
const form = reactive({
  ...user
})

/* ===== PRODUCTS ===== */
const purchasedProducts = ref([
  {
    id: 1,
    title: "کت لینن مردانه",
    category: "پوشاک مردانه",
    description:
      "کت لینن پریمیوم مناسب استایل رسمی و نیمه رسمی",
    quantity: 1,
    price: 320,
    date: "۱۴۰۵/۰۲/۱۲",
    image:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1200"
  },

  {
    id: 2,
    title: "شلوار پارچه‌ای کلاسیک",
    category: "شلوار",
    description:
      "شلوار پارچه‌ای با پارچه ترک و دوخت اختصاصی بافت",
    quantity: 2,
    price: 180,
    date: "۱۴۰۵/۰۲/۰۹",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1200"
  },

  {
    id: 3,
    title: "پیراهن سفید مینیمال",
    category: "پیراهن",
    description:
      "پیراهن مینیمال مناسب استفاده روزمره و رسمی",
    quantity: 1,
    price: 95,
    date: "۱۴۰۵/۰۲/۰۳",
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1200"
  }
])

/* ===== TRANSACTIONS ===== */
const transactions = ref([
  {
    id: 1,
    title: "واریز حساب",
    date: "۱۴۰۵/۰۲/۱۰",
    amount: 2500,
    type: "deposit"
  },

  {
    id: 2,
    title: "برداشت سود",
    date: "۱۴۰۵/۰۲/۰۸",
    amount: 1200,
    type: "withdraw"
  },

  {
    id: 3,
    title: "دریافت رفرال",
    date: "۱۴۰۵/۰۲/۰۶",
    amount: 850,
    type: "deposit"
  }
])

/* ===== SAVE ===== */
function updateUserFull() {
  Object.assign(user, form)

  alert("اطلاعات کاربر ذخیره شد")
}

/* ===== BLOCK ===== */
function toggleBlock() {
  user.isActive = !user.isActive
}

/* ===== FORMAT ===== */
const format = (val) =>
  Number(val || 0).toLocaleString("fa-IR")
</script>

<style scoped>

.user-details-page {
  min-height: 100vh;
  padding: 32px;
  background: #F8F5F2;
  direction: rtl;
}

@media (max-width: 768px) {

  .user-details-page {
    padding: 16px;
  }

}

</style>