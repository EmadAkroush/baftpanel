<template>
  <div class="orders-page">

    <!-- ===== HEADER ===== -->
    <div class="page-header">

      <div>
        <h1 class="page-title">
          مدیریت سفارشات
        </h1>

        <p class="page-subtitle">
          مشاهده، مدیریت و بروزرسانی وضعیت سفارشات مشتریان
        </p>
      </div>

    </div>

    <!-- ===== STATS ===== -->
    <div class="stats-grid">

      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="mdi mdi-cart-outline"></i>
        </div>

        <div>
          <span>کل سفارشات</span>
          <strong>{{ orders.length }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="mdi mdi-truck-fast-outline"></i>
        </div>

        <div>
          <span>درحال ارسال</span>
          <strong>{{ shippingCount }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <i class="mdi mdi-check-circle-outline"></i>
        </div>

        <div>
          <span>تحویل شده</span>
          <strong>{{ deliveredCount }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon purple">
          <i class="mdi mdi-cash-multiple"></i>
        </div>

        <div>
          <span>فروش کل</span>
          <strong>۱۲۸ میلیون</strong>
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
          placeholder="جستجو سفارش..."
        />
      </div>

      <select v-model="statusFilter">
        <option value="">
          همه وضعیت‌ها
        </option>

        <option value="pending">
          در انتظار
        </option>

        <option value="shipping">
          درحال ارسال
        </option>

        <option value="delivered">
          تحویل شده
        </option>
      </select>

    </div>

    <!-- ===== TABLE ===== -->
    <div class="table-card">

      <div class="table-wrapper">

        <table>

          <thead>
            <tr>
              <th>شماره سفارش</th>
              <th>مشتری</th>
              <th>مبلغ</th>
              <th>تاریخ</th>
              <th>وضعیت</th>
              <th>کد رهگیری</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="order in filteredOrders"
              :key="order.id"
            >

              <td>
                #{{ order.id }}
              </td>

              <td>
                <div class="customer-box">

                  <div class="avatar">
                    {{ order.customer.charAt(0) }}
                  </div>

                  <div>
                    <h4>{{ order.customer }}</h4>
                    <p>{{ order.phone }}</p>
                  </div>

                </div>
              </td>

              <td class="price">
                {{ format(order.amount) }} تومان
              </td>

              <td>
                {{ order.date }}
              </td>

              <td>

                <span
                  class="status-badge"
                  :class="order.status"
                >
                  {{ getStatusLabel(order.status) }}
                </span>

              </td>

              <td>
                <span
                  v-if="order.trackingCode"
                  class="tracking-code"
                >
                  {{ order.trackingCode }}
                </span>

                <span
                  v-else
                  class="empty-code"
                >
                  ثبت نشده
                </span>
              </td>

              <td>

                <div class="actions">

                  <button
                    class="action-btn edit"
                    @click="openModal(order)"
                  >
                    <i class="mdi mdi-pencil-outline"></i>
                  </button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

    <!-- ===== MODAL ===== -->
    <transition name="fade">

      <div
        v-if="showModal"
        class="modal-overlay"
        @click.self="closeModal"
      >

        <div class="modal-box">

          <div class="modal-header">

            <h3>
              بروزرسانی سفارش #{{ selectedOrder?.id }}
            </h3>

            <button
              class="close-btn"
              @click="closeModal"
            >
              <i class="mdi mdi-close"></i>
            </button>

          </div>

          <div class="modal-body">

            <!-- STATUS -->
            <div class="form-group">

              <label>
                وضعیت سفارش
              </label>

              <select v-model="selectedOrder.status">

                <option value="pending">
                  در انتظار
                </option>

                <option value="shipping">
                  درحال ارسال
                </option>

                <option value="delivered">
                  تحویل شده
                </option>

              </select>

            </div>

            <!-- TRACKING -->
            <div class="form-group">

              <label>
                کد رهگیری پست
              </label>

              <input
                v-model="selectedOrder.trackingCode"
                type="text"
                placeholder="مثلا: 5544123366"
              />

            </div>

          </div>

          <!-- FOOTER -->
          <div class="modal-footer">

            <button
              class="sms-btn"
              @click="sendSms"
            >
              <i class="mdi mdi-message-processing-outline"></i>
              ارسال پیامک
            </button>

            <button
              class="save-btn"
              @click="saveChanges"
            >
              ذخیره تغییرات
            </button>

          </div>

        </div>

      </div>

    </transition>

  </div>
</template>

<script setup>
import { ref, computed } from "vue";
definePageMeta({ middleware: "auth" });


/* ===== DATA ===== */

const orders = ref([
  {
    id: 1024,
    customer: "علی محمدی",
    phone: "09121234567",
    amount: 3200000,
    date: "1403/05/12",
    status: "pending",
    trackingCode: "",
  },

  {
    id: 1025,
    customer: "مریم حسینی",
    phone: "09125556677",
    amount: 1850000,
    date: "1403/05/11",
    status: "shipping",
    trackingCode: "5544123366",
  },

  {
    id: 1026,
    customer: "رضا کریمی",
    phone: "09123334455",
    amount: 4400000,
    date: "1403/05/10",
    status: "delivered",
    trackingCode: "7788991122",
  },
]);

/* ===== FILTERS ===== */

const search = ref("");
const statusFilter = ref("");

/* ===== MODAL ===== */

const showModal = ref(false);
const selectedOrder = ref(null);

/* ===== COMPUTED ===== */

const filteredOrders = computed(() => {
  return orders.value.filter((item) => {

    const matchSearch =
      item.customer.includes(search.value) ||
      String(item.id).includes(search.value);

    const matchStatus =
      !statusFilter.value ||
      item.status === statusFilter.value;

    return matchSearch && matchStatus;
  });
});

const shippingCount = computed(() =>
  orders.value.filter(o => o.status === "shipping").length
);

const deliveredCount = computed(() =>
  orders.value.filter(o => o.status === "delivered").length
);

/* ===== METHODS ===== */

const openModal = (order) => {
  selectedOrder.value = order;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const saveChanges = () => {
  showModal.value = false;
};

const sendSms = () => {
  alert(
    `کد رهگیری ${selectedOrder.value.trackingCode} برای ${selectedOrder.value.phone} ارسال شد`
  );
};

const getStatusLabel = (status) => {

  switch (status) {

    case "pending":
      return "در انتظار";

    case "shipping":
      return "درحال ارسال";

    case "delivered":
      return "تحویل شده";

    default:
      return "-";
  }
};

const format = (val) => {
  return Number(val).toLocaleString("fa-IR");
};
</script>

<style scoped>



.orders-page{
  min-height:100vh;
  background:#F8F5F2;
  padding:32px;
  direction:rtl;
}

/* ===== HEADER ===== */

.page-header{
  margin-bottom:24px;
}

.page-title{
  font-size:34px;
  font-weight:900;
  color:#1F1F24;
}

.page-subtitle{
  margin-top:8px;
  color:#8B5E74;
}

/* ===== STATS ===== */

.stats-grid{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:20px;
  margin-bottom:24px;
}

.stat-card{
  background:white;
  border-radius:24px;
  padding:22px;
  display:flex;
  align-items:center;
  gap:16px;
}

.stat-icon{
  width:64px;
  height:64px;
  border-radius:20px;
  display:flex;
  align-items:center;
  justify-content:center;
  color:white;
  font-size:28px;
}

.stat-icon.blue{
  background:linear-gradient(135deg,#2563EB,#3B82F6);
}

.stat-icon.orange{
  background:linear-gradient(135deg,#EA580C,#F97316);
}

.stat-icon.green{
  background:linear-gradient(135deg,#16A34A,#22C55E);
}

.stat-icon.purple{
  background:linear-gradient(135deg,#5B2A4A,#C8A96B);
}

.stat-card span{
  color:#8B5E74;
  font-size:13px;
}

.stat-card strong{
  display:block;
  margin-top:8px;
  font-size:28px;
  color:#1F1F24;
}

/* ===== FILTERS ===== */

.filters-card{
  background:white;
  border-radius:24px;
  padding:20px;
  display:flex;
  gap:14px;
  flex-wrap:wrap;
  margin-bottom:24px;
}

.search-box{
  flex:1;
  min-width:260px;
  position:relative;
}

.search-box i{
  position:absolute;
  right:16px;
  top:50%;
  transform:translateY(-50%);
  color:#8B5E74;
}

.search-box input,
.filters-card select{
  width:100%;
  height:54px;
  border-radius:16px;
  border:1px solid rgba(217,165,179,.20);
  background:#F8F5F2;
  padding:0 16px;
  font-size:14px;
}

.search-box input{
  padding-right:48px;
}

.filters-card select{
  min-width:180px;
}

input:focus,
select:focus{
  outline:none;
  border-color:#C8A96B;
}

/* ===== TABLE ===== */

.table-card{
  background:white;
  border-radius:30px;
  overflow:hidden;
}

.table-wrapper{
  overflow:auto;
}

table{
  width:100%;
  border-collapse:collapse;
  min-width:1000px;
}

thead{
  background:#F8F5F2;
}

th{
  padding:20px;
  text-align:right;
  color:#5B2A4A;
  font-size:14px;
}

td{
  padding:20px;
  border-top:1px solid rgba(217,165,179,.12);
}

.customer-box{
  display:flex;
  align-items:center;
  gap:14px;
}

.avatar{
  width:48px;
  height:48px;
  border-radius:16px;
  background:linear-gradient(135deg,#5B2A4A,#C8A96B);
  color:white;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:800;
}

.customer-box h4{
  color:#1F1F24;
  font-size:15px;
  font-weight:800;
}

.customer-box p{
  margin-top:6px;
  color:#8B5E74;
  font-size:12px;
}

.price{
  font-weight:800;
  color:#16A34A;
}

.status-badge{
  padding:8px 14px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
}

.status-badge.pending{
  background:rgba(234,88,12,.12);
  color:#EA580C;
}

.status-badge.shipping{
  background:rgba(37,99,235,.12);
  color:#2563EB;
}

.status-badge.delivered{
  background:rgba(34,197,94,.12);
  color:#16A34A;
}

.tracking-code{
  color:#5B2A4A;
  font-weight:700;
}

.empty-code{
  color:#9CA3AF;
}

.actions{
  display:flex;
  gap:10px;
}

.action-btn{
  width:44px;
  height:44px;
  border:none;
  border-radius:14px;
  cursor:pointer;
  color:white;
  font-size:18px;
}

.action-btn.edit{
  background:#7C3AED;
}

/* ===== MODAL ===== */

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(15,23,42,.45);
  backdrop-filter:blur(6px);
  display:flex;
  align-items:center;
  justify-content:center;
  z-index:300;
  padding:20px;
}

.modal-box{
  width:100%;
  max-width:520px;
  background:white;
  border-radius:30px;
  overflow:hidden;
}

.modal-header{
  height:80px;
  padding:0 24px;
  border-bottom:1px solid rgba(217,165,179,.12);
  display:flex;
  align-items:center;
  justify-content:space-between;
}

.modal-header h3{
  font-size:22px;
  font-weight:800;
  color:#1F1F24;
}

.close-btn{
  width:42px;
  height:42px;
  border:none;
  border-radius:14px;
  background:#F3F4F6;
  cursor:pointer;
  font-size:20px;
}

.modal-body{
  padding:24px;
}

.form-group{
  margin-bottom:20px;
}

.form-group label{
  display:block;
  margin-bottom:10px;
  color:#5B2A4A;
  font-weight:700;
}

.form-group input,
.form-group select{
  width:100%;
  height:54px;
  border-radius:16px;
  border:1px solid rgba(217,165,179,.20);
  background:#F8F5F2;
  padding:0 16px;
}

.modal-footer{
  padding:24px;
  display:flex;
  gap:14px;
  flex-wrap:wrap;
}

.save-btn,
.sms-btn{
  flex:1;
  height:54px;
  border:none;
  border-radius:18px;
  cursor:pointer;
  font-weight:700;
  display:flex;
  align-items:center;
  justify-content:center;
  gap:10px;
}

.save-btn{
  background:linear-gradient(135deg,#5B2A4A,#C8A96B);
  color:white;
}

.sms-btn{
  background:#2563EB;
  color:white;
}

/* ===== ANIMATION ===== */

.fade-enter-active,
.fade-leave-active{
  transition:.25s ease;
}

.fade-enter-from,
.fade-leave-to{
  opacity:0;
}

/* ===== RESPONSIVE ===== */

@media(max-width:1200px){

  .stats-grid{
    grid-template-columns:repeat(2,1fr);
  }

}

@media(max-width:768px){

  .orders-page{
    padding:16px;
  }

  .page-title{
    font-size:26px;
  }

  .stats-grid{
    grid-template-columns:1fr;
  }

  .filters-card{
    padding:16px;
  }

  .search-box,
  .filters-card select{
    width:100%;
  }

  table{
    min-width:850px;
  }

  .modal-box{
    border-radius:24px;
  }

  .modal-footer{
    flex-direction:column;
  }

}

</style>