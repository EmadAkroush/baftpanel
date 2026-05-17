<template>
  <div class="user-details-page">

    <!-- ===== Top Header ===== -->
    <div class="details-header">

      <button
        class="back-btn"
        @click="navigateTo('/users')"
      >
        <i class="mdi mdi-arrow-right"></i>

        <span>بازگشت</span>
      </button>

      <div class="header-actions">

        <button
          class="header-action danger"
          @click="toggleBlock"
        >
          <i
            :class="
              user.isActive
                ? 'mdi mdi-account-cancel-outline'
                : 'mdi mdi-account-check-outline'
            "
          ></i>

          <span>
            {{
              user.isActive
                ? 'مسدود کردن'
                : 'فعال‌سازی'
            }}
          </span>
        </button>

        <button
          class="header-action primary"
          @click="updateUserFull"
        >
          <i class="mdi mdi-content-save-outline"></i>

          <span>ذخیره تغییرات</span>
        </button>

      </div>

    </div>

    <!-- ===== User Hero ===== -->
    <div class="hero-card">

      <div class="hero-left">

        <div class="hero-avatar">
          {{ user.firstName.charAt(0) }}
        </div>

        <div>

          <h1 class="hero-name">
            {{ user.firstName }}
            {{ user.lastName }}
          </h1>

          <p class="hero-email">
            {{ user.email }}
          </p>

          <div class="hero-badges">

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
                    ? 'احراز شده'
                    : 'احراز نشده'
                }}
              </span>
            </div>

          </div>

        </div>

      </div>

      <div class="hero-right">

        <div class="mini-stat">
          <span>کل درآمد</span>

          <strong>
            ${{ format(user.totalIncome) }}
          </strong>
        </div>

        <div class="mini-stat">
          <span>مجموع برداشت</span>

          <strong>
            ${{ format(user.withdrawalTotalBalance) }}
          </strong>
        </div>

        <div class="mini-stat">
          <span>VX Code</span>

          <strong>
            {{ user.vxCode }}
          </strong>
        </div>

      </div>

    </div>

    <!-- ===== Balance Cards ===== -->
    <div class="balances-grid">

      <div class="balance-card">
        <p>کیف پول اصلی</p>

        <h3>
          ${{ format(user.mainBalance) }}
        </h3>
      </div>

      <div class="balance-card">
        <p>سود کل</p>

        <h3 class="green">
          ${{ format(user.profitBalance) }}
        </h3>
      </div>

      <div class="balance-card">
        <p>رفرال</p>

        <h3 class="gold">
          ${{ format(user.referralBalance) }}
        </h3>
      </div>

      <div class="balance-card">
        <p>بونوس</p>

        <h3 class="purple">
          ${{ format(user.bonusBalance) }}
        </h3>
      </div>

    </div>

    <!-- ===== Form ===== -->
    <div class="details-card">

      <div class="section-header">

        <div>
          <h2>
            اطلاعات کامل کاربر
          </h2>

          <p>
            مدیریت کامل اطلاعات حساب کاربری
          </p>
        </div>

      </div>

      <div class="form-grid">

        <div class="form-group">
          <label>نام</label>

          <input
            v-model="form.firstName"
            type="text"
          />
        </div>

        <div class="form-group">
          <label>نام خانوادگی</label>

          <input
            v-model="form.lastName"
            type="text"
          />
        </div>

        <div class="form-group">
          <label>ایمیل</label>

          <input
            v-model="form.email"
            type="email"
          />
        </div>

        <div class="form-group">
          <label>تلفن</label>

          <input
            v-model="form.phone"
            type="text"
          />
        </div>

        <div class="form-group">
          <label>آدرس کیف پول</label>

          <input
            v-model="form.wallet"
            type="text"
          />
        </div>

        <div class="form-group">
          <label>کد VX</label>

          <input
            v-model="form.vxCode"
            type="text"
          />
        </div>

        <div class="form-group">
          <label>بالانس اصلی</label>

          <input
            v-model="form.mainBalance"
            type="number"
          />
        </div>

        <div class="form-group">
          <label>بالانس سود</label>

          <input
            v-model="form.profitBalance"
            type="number"
          />
        </div>

        <div class="form-group">
          <label>بالانس رفرال</label>

          <input
            v-model="form.referralBalance"
            type="number"
          />
        </div>

        <div class="form-group">
          <label>بالانس بونوس</label>

          <input
            v-model="form.bonusBalance"
            type="number"
          />
        </div>

        <div class="form-group">
          <label>کل درآمد</label>

          <input
            v-model="form.totalIncome"
            type="number"
          />
        </div>

        <div class="form-group">
          <label>کل برداشت</label>

          <input
            v-model="form.withdrawalTotalBalance"
            type="number"
          />
        </div>

        <div class="form-group">
          <label>Left Volume</label>

          <input
            v-model="form.leftVolume"
            type="number"
          />
        </div>

        <div class="form-group">
          <label>Right Volume</label>

          <input
            v-model="form.rightVolume"
            type="number"
          />
        </div>

      </div>

    </div>

    <!-- ===== Purchased Products ===== -->
    <div class="details-card">

      <div class="section-header">

        <div>
          <h2>
            محصولات خریداری شده
          </h2>

          <p>
            لیست محصولات ثبت شده توسط کاربر
          </p>
        </div>

      </div>

      <div class="products-grid">

        <div
          v-for="product in purchasedProducts"
          :key="product.id"
          class="product-card"
        >

          <div class="product-image">
            <img
              :src="product.image"
              :alt="product.title"
            />
          </div>

          <div class="product-content">

            <div class="product-top">

              <h3>
                {{ product.title }}
              </h3>

              <span class="product-category">
                {{ product.category }}
              </span>

            </div>

            <p class="product-desc">
              {{ product.description }}
            </p>

            <div class="product-meta">

              <div class="meta-item">
                <span>تعداد:</span>

                <strong>
                  {{ product.quantity }}
                </strong>
              </div>

              <div class="meta-item">
                <span>قیمت:</span>

                <strong>
                  ${{ format(product.price) }}
                </strong>
              </div>

            </div>

            <div class="product-footer">

              <div class="purchase-date">
                <i class="mdi mdi-calendar-month-outline"></i>

                <span>
                  {{ product.date }}
                </span>
              </div>

              <button class="view-product-btn">
                مشاهده محصول
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- ===== Transactions ===== -->
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

  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

/* ===== Fake User ===== */
const user = reactive({
  firstName: "پارسا",
  lastName: "محمدی",
  email: "parsa@example.com",
  phone: "09121234567",

  wallet: "0x84f9dD8847ab4D",
  vxCode: "VX-84521",

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
});

/* ===== Form ===== */
const form = reactive({
  ...user
});

/* ===== Purchased Products ===== */
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
]);

/* ===== Transactions ===== */
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
]);

/* ===== Save ===== */
function updateUserFull() {
  Object.assign(user, form);

  alert("اطلاعات کاربر ذخیره شد");
}

/* ===== Toggle ===== */
function toggleBlock() {
  user.isActive = !user.isActive;
}

/* ===== Format ===== */
const format = (val) =>
  Number(val || 0).toLocaleString("fa-IR");
</script>

<style scoped>

.user-details-page {
  min-height: 100vh;
  padding: 32px;
  background: #F8F5F2;
  direction: rtl;
}

/* ===== Header ===== */

.details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.back-btn {
  height: 52px;
  padding: 0 20px;
  border-radius: 18px;
  border: 1px solid rgba(217,165,179,.20);
  background: white;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5B2A4A;
  cursor: pointer;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.header-action {
  height: 52px;
  padding: 0 18px;
  border: none;
  border-radius: 18px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 700;
}

.header-action.primary {
  background: linear-gradient(135deg,#5B2A4A,#C8A96B);
}

.header-action.danger {
  background: linear-gradient(135deg,#DC2626,#EF4444);
}

/* ===== Hero ===== */

.hero-card {
  background: white;
  border-radius: 30px;
  padding: 30px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 24px;
  border: 1px solid rgba(217,165,179,.18);
}

.hero-left {
  display: flex;
  gap: 20px;
  align-items: center;
}

.hero-avatar {
  width: 100px;
  height: 100px;
  border-radius: 28px;
  background: linear-gradient(135deg,#5B2A4A,#C8A96B);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 800;
}

.hero-name {
  font-size: 32px;
  font-weight: 800;
  color: #1F1F24;
}

.hero-email {
  margin-top: 8px;
  color: #8B5E74;
}

.hero-badges {
  margin-top: 18px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.hero-right {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.mini-stat {
  min-width: 150px;
  background: #F8F5F2;
  padding: 18px;
  border-radius: 20px;
}

.mini-stat span {
  color: #8B5E74;
  font-size: 13px;
}

.mini-stat strong {
  display: block;
  margin-top: 10px;
  font-size: 22px;
  color: #1F1F24;
}

/* ===== Balance ===== */

.balances-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.balance-card {
  background: white;
  padding: 24px;
  border-radius: 24px;
}

.balance-card p {
  color: #8B5E74;
}

.balance-card h3 {
  margin-top: 12px;
  font-size: 28px;
  color: #1F1F24;
}

.green {
  color: #16A34A !important;
}

.gold {
  color: #C8A96B !important;
}

.purple {
  color: #7C3AED !important;
}

/* ===== Details ===== */

.details-card {
  background: white;
  border-radius: 30px;
  padding: 30px;
  margin-bottom: 24px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  font-size: 26px;
  color: #1F1F24;
  font-weight: 800;
}

.section-header p {
  margin-top: 8px;
  color: #8B5E74;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #5B2A4A;
  font-weight: 700;
}

.form-group input {
  width: 100%;
  height: 54px;
  border-radius: 16px;
  border: 1px solid rgba(217,165,179,.25);
  background: #F8F5F2;
  padding: 0 16px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #C8A96B;
}

/* ===== Status ===== */

.status-badge,
.verify-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.status-badge span {
  width: 8px;
  height: 8px;
  border-radius: 999px;
}

.active {
  background: rgba(34,197,94,.12);
  color: #16A34A;
}

.active span {
  background: #16A34A;
}

.inactive {
  background: rgba(239,68,68,.12);
  color: #DC2626;
}

.inactive span {
  background: #DC2626;
}

.verified {
  background: rgba(34,197,94,.12);
  color: #16A34A;
}

.not-verified {
  background: rgba(239,68,68,.12);
  color: #DC2626;
}

/* ===== Products ===== */

.products-grid {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 20px;
}

.product-card {
  background: #F8F5F2;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(217,165,179,.14);
  transition: .25s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 30px rgba(91,42,74,.08);
}

.product-image {
  height: 240px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-content {
  padding: 20px;
}

.product-top {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: flex-start;
}

.product-top h3 {
  font-size: 18px;
  font-weight: 800;
  color: #1F1F24;
}

.product-category {
  background: rgba(200,169,107,.14);
  color: #5B2A4A;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 12px;
  white-space: nowrap;
}

.product-desc {
  margin-top: 14px;
  color: #8B5E74;
  line-height: 1.9;
  font-size: 13px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 18px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item span {
  color: #8B5E74;
  font-size: 12px;
}

.meta-item strong {
  color: #1F1F24;
  font-size: 16px;
}

.product-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.purchase-date {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #8B5E74;
  font-size: 13px;
}

.view-product-btn {
  height: 42px;
  padding: 0 16px;
  border-radius: 14px;
  border: none;
  background: linear-gradient(135deg,#5B2A4A,#C8A96B);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

/* ===== Transactions ===== */

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.transaction-item {
  background: #F8F5F2;
  border-radius: 22px;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.transaction-user {
  display: flex;
  align-items: center;
  gap: 14px;
}

.transaction-icon {
  width: 54px;
  height: 54px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.transaction-icon.deposit {
  background: linear-gradient(135deg,#16A34A,#22C55E);
}

.transaction-icon.withdraw {
  background: linear-gradient(135deg,#DC2626,#EF4444);
}

.transaction-user h4 {
  font-weight: 800;
  color: #1F1F24;
}

.transaction-user p {
  margin-top: 6px;
  font-size: 13px;
  color: #8B5E74;
}

.transaction-price {
  font-size: 22px;
  font-weight: 800;
}

.transaction-price.deposit {
  color: #16A34A;
}

.transaction-price.withdraw {
  color: #DC2626;
}

/* ===== Responsive ===== */

@media (max-width: 1200px) {

  .balances-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .products-grid {
    grid-template-columns: repeat(2,1fr);
  }

}

@media (max-width: 768px) {

  .user-details-page {
    padding: 16px;
  }

  .hero-card,
  .details-card {
    padding: 20px;
    border-radius: 24px;
  }

  .hero-left {
    flex-direction: column;
    align-items: flex-start;
  }

  .hero-name {
    font-size: 26px;
  }

  .balances-grid {
    grid-template-columns: 1fr;
  }

  .products-grid {
    grid-template-columns: 1fr;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .transaction-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 14px;
  }

}

</style>