<template>
  <div class="products-page">
    <!-- ===== HEADER ===== -->
    <div class="page-header">
      <div>
        <h1 class="page-title">مدیریت محصولات</h1>

        <p class="page-subtitle">
          مشاهده، مدیریت و ویرایش تمامی محصولات فروشگاه بافت
        </p>
      </div>

      <div class="header-actions">
        <NuxtLink to="/products/create">
          <button class="add-btn">
            <i class="mdi mdi-plus"></i>
            افزودن محصول
          </button>
        </NuxtLink>
      </div>
    </div>

    <!-- ===== STATS ===== -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple">
          <i class="mdi mdi-package-variant-closed"></i>
        </div>

        <div>
          <span>کل محصولات</span>
          <strong>{{ totalProducts }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <i class="mdi mdi-check-circle-outline"></i>
        </div>

        <div>
          <span>محصولات فعال</span>
          <strong>{{ activeProducts }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="mdi mdi-alert-circle-outline"></i>
        </div>

        <div>
          <span>اتمام موجودی</span>
          <strong>{{ outOfStock }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="mdi mdi-cash-multiple"></i>
        </div>

        <div>
          <span>مجموع فروش</span>
          <strong>128K</strong>
        </div>
      </div>
    </div>

    <!-- ===== FILTERS ===== -->
    <div class="filters-card">
      <div class="search-box">
        <i class="mdi mdi-magnify"></i>

        <input v-model="search" type="text" placeholder="جستجو محصول..." />
      </div>

      <select v-model="selectedCategory">
        <option value="">همه دسته‌بندی‌ها</option>

        <option
          v-for="category in categories"
          :key="category._id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>

      <select v-model="selectedStatus">
        <option value="">همه وضعیت‌ها</option>

        <option value="active">فعال</option>

        <option value="inactive">غیرفعال</option>
      </select>
    </div>

    <!-- ===== TABLE ===== -->
    <div class="table-card">
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>محصول</th>
              <th>دسته‌بندی</th>
              <th>قیمت</th>
              <th>موجودی</th>
              <th>فروش</th>
              <th>وضعیت</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="product in products" :key="product.id">
              <!-- PRODUCT -->
              <td>
                <div class="product-info">
                  <img :src="product.image" :alt="product.title" />

                  <div>
                    <h4>
                      {{ product.title }}
                    </h4>

                    <p>
                      {{ product.code }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- CATEGORY -->
              <td>
                <span class="category-badge">
                  {{ product.category }}
                </span>
              </td>

              <!-- PRICE -->
              <td class="price">{{ format(product.price) }}</td>

              <!-- STOCK -->
              <td>
                <span
                  class="stock-badge"
                  :class="product.stock > 0 ? 'in-stock' : 'out-stock'"
                >
                  {{
                    product.stock > 0 ? product.stock + " عدد" : "اتمام موجودی"
                  }}
                </span>
              </td>

              <!-- SALES -->
              <td>
                {{ product.sales }}
              </td>

              <!-- STATUS -->
              <td>
                <span class="status-badge" :class="product.status">
                  {{ product.status === "active" ? "فعال" : "غیرفعال" }}
                </span>
              </td>

              <!-- ACTIONS -->
              <td>
                <div class="actions">
                  <nuxt-link :to="`/products/${product.id}`">
                    <button class="action-btn edit">
                      <i class="mdi mdi-pencil-outline"></i>
                    </button>
                  </nuxt-link>
                  <button
                    class="action-btn delete"
                    @click="deleteProduct(product.id)"
                  >
                    <i class="mdi mdi-delete-outline"></i>
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
            @click="changePage(p)"
          >
            {{ p }}
          </button>
        </div>

        <button @click="nextPage" :disabled="page === totalPages">بعدی</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const config = useRuntimeConfig();

/* ===== PRODUCTS ===== */
const products = ref([]);

const categories = ref([]);

const page = ref(1);

const totalPages = ref(1);

const totalProducts = ref(0);

const changePage = async (p) => {
  page.value = p;

  await fetchProducts();
};

async function fetchCategories() {
  try {
    const res = await $fetch("/api/categories");

    categories.value = res || [];
  } catch (err) {
    console.error("Categories Error:", err);
  }
}

/* ===== FETCH PRODUCTS ===== */
async function fetchProducts() {

  try {
    const res = await $fetch("/api/products", {
      method: "GET",
      query: {
        page: page.value,
      },
    });
  console.log("Fetching products for page:", page.value);
    totalPages.value = res.pagination.totalPages || 1;

    totalProducts.value = res.pagination.total || 0;

    products.value = (res.data || []).map((item) => ({
      id: item._id,

      title: item.title,

      code: item._id?.slice(-6) || "-",

      category: item.category,

      price: item.discountPrice > 0 ? item.discountPrice : item.price,

      stock: item.stock || 0,

      sales: item.soldCount || 0,

      status: item.active ? "active" : "inactive",

      image: item.images?.[0]
        ? `${config.public.apiBase}${item.images[0]}`
        : "https://via.placeholder.com/80x80.png?text=Product",
    }));
  } catch (err) {
    console.error("Products Error:", err);
  }
}

onMounted(async () => {
  await fetchCategories();
  await fetchProducts();
});

/* ===== FILTERS ===== */
const search = ref("");
const selectedCategory = ref("");
const selectedStatus = ref("");

const nextPage = async () => {
  if (page.value < totalPages.value) {
    page.value++;

    await fetchProducts();
  }
};

const prevPage = async () => {
  if (page.value > 1) {
    page.value--;

    await fetchProducts();
  }
};


/* ===== FILTERED ===== */
const filteredProducts = computed(() => {
  return products.value.filter((item) => {
    const matchSearch = item.title
      ?.toLowerCase()
      .includes(search.value.toLowerCase());

    const matchCategory =
      !selectedCategory.value || item.category === selectedCategory.value;

    const matchStatus =
      !selectedStatus.value || item.status === selectedStatus.value;

    return matchSearch && matchCategory && matchStatus;
  });
});

/* ===== STATS ===== */
const activeProducts = computed(
  () => products.value.filter((p) => p.status === "active").length,
);

const outOfStock = computed(
  () => products.value.filter((p) => p.stock <= 0).length,
);

/* ===== DELETE PRODUCT ===== */
async function deleteProduct(id) {
  const confirmed = confirm("آیا از حذف این محصول مطمئن هستید؟");

  if (!confirmed) return;

  try {
    await $fetch("/api/products/delete", {
      method: "DELETE",
      query: {
        id,
      },
    });

    await fetchProducts();
  } catch (err) {
    console.error(err);

    alert("خطا در حذف محصول");
  }
}

/* ===== METHODS ===== */

const format = (val) => {
  return Number(val || 0).toLocaleString("fa-IR");
};
</script>

<style scoped>
.products-page {
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
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.page-title {
  font-size: 34px;
  font-weight: 900;
  color: #1f1f24;
}

.page-subtitle {
  margin-top: 8px;
  color: #8b5e74;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.add-btn,
.export-btn {
  height: 52px;
  padding: 0 22px;
  border: none;
  border-radius: 18px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.add-btn {
  background: linear-gradient(135deg, #5b2a4a, #c8a96b);
  color: white;
}

.export-btn {
  background: white;
  border: 1px solid rgba(217, 165, 179, 0.2);
  color: #5b2a4a;
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
  background: linear-gradient(135deg, #5b2a4a, #7c3aed);
}

.stat-icon.green {
  background: linear-gradient(135deg, #16a34a, #22c55e);
}

.stat-icon.orange {
  background: linear-gradient(135deg, #ea580c, #f97316);
}

.stat-icon.blue {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
}

.stat-card span {
  color: #8b5e74;
  font-size: 13px;
}

.stat-card strong {
  display: block;
  margin-top: 8px;
  font-size: 28px;
  color: #1f1f24;
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
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #8b5e74;
}

.search-box input,
.filters-card select {
  width: 100%;
  height: 54px;
  border-radius: 16px;
  border: 1px solid rgba(217, 165, 179, 0.2);
  background: #f8f5f2;
  padding: 0 16px;
  font-size: 14px;
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
  border-color: #c8a96b;
}

/* ===== TABLE ===== */

.table-card {
  background: white;
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
  background: #f8f5f2;
}

th {
  padding: 20px;
  text-align: right;
  color: #5b2a4a;
  font-size: 14px;
}

td {
  padding: 20px;
  border-top: 1px solid rgba(217, 165, 179, 0.12);
}

.product-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.product-info img {
  width: 70px;
  height: 70px;
  border-radius: 18px;
  object-fit: cover;
}

.product-info h4 {
  font-size: 16px;
  color: #1f1f24;
  font-weight: 800;
}

.product-info p {
  margin-top: 8px;
  color: #8b5e74;
  font-size: 13px;
}

.category-badge {
  background: rgba(200, 169, 107, 0.14);
  color: #5b2a4a;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
}

.price {
  font-weight: 800;
  color: #16a34a;
}

.stock-badge {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.in-stock {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.out-stock {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

.status-badge {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status-badge.active {
  background: rgba(34, 197, 94, 0.12);
  color: #16a34a;
}

.status-badge.inactive {
  background: rgba(239, 68, 68, 0.12);
  color: #dc2626;
}

/* ===== ACTIONS ===== */

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
  background: #2563eb;
}

.action-btn.edit {
  background: #7c3aed;
}

.action-btn.delete {
  background: #dc2626;
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
  background: #f3f4f6;
  cursor: pointer;
  font-weight: 700;
}

.pages {
  display: flex;
  gap: 8px;
}

.pages .active {
  background: #5b2a4a;
  color: white;
}

/* ===== RESPONSIVE ===== */

@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .products-page {
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

  .table-card {
    border-radius: 24px;
  }

  table {
    min-width: 850px;
  }
}
</style>
