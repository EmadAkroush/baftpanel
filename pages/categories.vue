<template>
  <div class="categories-page">
    <!-- ===== HEADER ===== -->
    <div class="page-header">
      <div>
        <h1 class="page-title">مدیریت دسته‌بندی‌ها</h1>

        <p class="page-subtitle">
          مدیریت، ویرایش و سازماندهی دسته‌بندی‌های فروشگاه
        </p>
      </div>

      <div class="header-actions">
        <button class="add-btn" @click="openCreateModal">
          <i class="mdi mdi-plus"></i>
          افزودن دسته‌بندی
        </button>
      </div>
    </div>

    <!-- ===== STATS ===== -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon purple">
          <i class="mdi mdi-shape-outline"></i>
        </div>

        <div>
          <span>کل دسته‌بندی‌ها</span>
          <strong>{{ categories.length }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon green">
          <i class="mdi mdi-check-circle-outline"></i>
        </div>

        <div>
          <span>فعال</span>
          <strong>{{ activeCategories }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon orange">
          <i class="mdi mdi-folder-multiple-outline"></i>
        </div>

        <div>
          <span>دسته والد</span>
          <strong>{{ parentCategories }}</strong>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon blue">
          <i class="mdi mdi-chart-bar"></i>
        </div>

        <div>
          <span>محصولات متصل</span>
          <strong>{{ totalProducts }}</strong>
        </div>
      </div>
    </div>

    <!-- ===== FILTERS ===== -->
    <div class="filters-card">
      <div class="search-box">
        <i class="mdi mdi-magnify"></i>

        <input v-model="search" type="text" placeholder="جستجو دسته‌بندی..." />
      </div>

      <select v-model="statusFilter">
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
              <th>دسته‌بندی</th>
              <th>اسلاگ</th>
              <th>دسته والد</th>
              <th>تعداد محصولات</th>
              <th>وضعیت</th>
              <th>تاریخ ایجاد</th>
              <th>عملیات</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="category in paginatedCategories" :key="category.id">
              <!-- CATEGORY -->
              <td>
                <div class="category-info">
                  <div class="category-icon">
                    <i :class="category.icon"></i>
                  </div>

                  <div>
                    <h4>
                      {{ category.title }}
                    </h4>

                    <p>
                      {{ category.description }}
                    </p>
                  </div>
                </div>
              </td>

              <!-- SLUG -->
              <td>
                <span class="slug"> /{{ category.slug }} </span>
              </td>

              <!-- PARENT -->
              <td>
                <span class="parent-badge" :class="{ empty: !category.parent }">
                  {{ category.parent ? category.parent : "ندارد" }}
                </span>
              </td>

              <!-- PRODUCTS -->
              <td>
                <span class="products-count">
                  {{ category.products }}
                </span>
              </td>

              <!-- STATUS -->
              <td>
                <span class="status-badge" :class="category.status">
                  {{ category.status === "active" ? "فعال" : "غیرفعال" }}
                </span>
              </td>

              <!-- DATE -->
              <td>
                {{ category.createdAt }}
              </td>

              <!-- ACTIONS -->
              <td>
                <div class="actions">
                  <button
                    class="action-btn edit"
                    @click="openEditModal(category)"
                  >
                    <i class="mdi mdi-pencil-outline"></i>
                  </button>

                  <button
                    class="action-btn delete"
                    @click="deleteCategory(category.id)"
                  >
                    <i class="mdi mdi-delete-outline"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr v-if="!paginatedCategories.length">
              <td colspan="7">
                <div class="empty-state">دسته‌بندی‌ای یافت نشد</div>
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

    <!-- ===== CREATE / EDIT MODAL ===== -->

    <transition name="fade">
      <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-box">
          <!-- HEADER -->
          <div class="modal-header">
            <h3>
              {{ isEdit ? "ویرایش دسته‌بندی" : "ایجاد دسته‌بندی جدید" }}
            </h3>

            <button class="close-btn" @click="closeModal">
              <i class="mdi mdi-close"></i>
            </button>
          </div>

          <!-- CONTENT -->
          <div class="modal-content">
            <!-- TITLE -->
            <div class="form-group">
              <label>عنوان دسته‌بندی</label>

              <input
                v-model="form.title"
                type="text"
                placeholder="مثلا مردانه"
              />
            </div>

            <!-- SLUG -->
            <div class="form-group">
              <label>اسلاگ</label>

              <input v-model="form.slug" type="text" placeholder="مثلا men" />
            </div>

            <!-- DESCRIPTION -->
            <div class="form-group">
              <label>توضیحات</label>

              <textarea
                v-model="form.description"
                rows="4"
                placeholder="توضیحات دسته‌بندی..."
              />
            </div>

            <!-- PARENT -->
            <div class="form-group">
              <label>دسته والد</label>

              <select v-model="form.parent">
                <option value="">بدون والد</option>

                <option
                  v-for="item in categories"
                  :key="item.id"
                  :value="item.title"
                >
                  {{ item.title }}
                </option>
              </select>
            </div>

            <!-- STATUS -->
            <div class="form-group">
              <label>وضعیت</label>

              <select v-model="form.status">
                <option value="active">فعال</option>

                <option value="inactive">غیرفعال</option>
              </select>
            </div>

            <!-- BUTTON -->
            <button class="submit-btn" @click="submitCategory">
              <i class="mdi mdi-content-save-outline"></i>

              {{ isEdit ? "ذخیره تغییرات" : "ایجاد دسته‌بندی" }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

/* ===== DATA ===== */

const categories = ref([
  {
    id: 1,
    title: "مردانه",
    slug: "men",
    parent: null,
    products: 120,
    status: "active",
    createdAt: "1404/04/01",
    icon: "mdi mdi-tshirt-crew-outline",
    description: "پوشاک و استایل مردانه",
  },

  {
    id: 2,
    title: "زنانه",
    slug: "women",
    parent: null,
    products: 98,
    status: "active",
    createdAt: "1404/04/02",
    icon: "mdi mdi-shopping-outline",
    description: "مد و پوشاک زنانه",
  },

  {
    id: 3,
    title: "اکسسوری",
    slug: "accessories",
    parent: null,
    products: 76,
    status: "active",
    createdAt: "1404/04/05",
    icon: "mdi mdi-sunglasses",
    description: "اکسسوری و لوازم جانبی",
  },
]);

/* ===== FILTERS ===== */

const search = ref("");
const statusFilter = ref("");

/* ===== PAGINATION ===== */

const page = ref(1);
const perPage = 5;

/* ===== MODAL ===== */

const showModal = ref(false);
const isEdit = ref(false);

const form = ref({
  id: null,
  title: "",
  slug: "",
  parent: "",
  description: "",
  status: "active",
});

/* ===== FILTERED ===== */

const filteredCategories = computed(() => {
  return categories.value.filter((item) => {
    const s = search.value.toLowerCase();

    return (
      (item.title.toLowerCase().includes(s) ||
        item.slug.toLowerCase().includes(s)) &&
      (!statusFilter.value || item.status === statusFilter.value)
    );
  });
});

/* ===== PAGINATION ===== */

const totalPages = computed(() =>
  Math.ceil(filteredCategories.value.length / perPage),
);

const paginatedCategories = computed(() => {
  const start = (page.value - 1) * perPage;

  return filteredCategories.value.slice(start, start + perPage);
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

const activeCategories = computed(
  () => categories.value.filter((item) => item.status === "active").length,
);

const parentCategories = computed(
  () => categories.value.filter((item) => !item.parent).length,
);

const totalProducts = computed(() =>
  categories.value.reduce((sum, item) => sum + item.products, 0),
);

/* ===== MODAL ===== */

function openCreateModal() {
  isEdit.value = false;

  form.value = {
    id: null,
    title: "",
    slug: "",
    parent: "",
    description: "",
    status: "active",
  };

  showModal.value = true;
}

function openEditModal(category) {
  isEdit.value = true;

  form.value = {
    ...category,
  };

  showModal.value = true;
}

function closeModal() {
  showModal.value = false;
}

/* ===== SUBMIT ===== */

function submitCategory() {
  if (!form.value.title || !form.value.slug) {
    return;
  }

  if (isEdit.value) {
    const index = categories.value.findIndex(
      (item) => item.id === form.value.id,
    );

    if (index !== -1) {
      categories.value[index] = {
        ...categories.value[index],
        ...form.value,
      };
    }
  } else {
    categories.value.unshift({
      id: Date.now(),
      title: form.value.title,
      slug: form.value.slug,
      parent: form.value.parent,
      description: form.value.description,
      status: form.value.status,
      products: 0,
      createdAt: "1404/04/20",
      icon: "mdi mdi-shape-outline",
    });
  }

  closeModal();
}

/* ===== DELETE ===== */

function deleteCategory(id) {
  const confirmed = confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟");

  if (!confirmed) return;

  categories.value = categories.value.filter((item) => item.id !== id);
}
</script>

<style scoped>
.categories-page {
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

.header-actions {
  display: flex;
  gap: 12px;
}

.add-btn {
  height: 52px;
  padding: 0 24px;
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


  padding: 0 16px;
}

.search-box input {
  padding-right: 48px;
}

.filters-card select {
  min-width: 180px;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #7c3aed;
}

/* ===== TABLE ===== */

.table-card {

  border-radius: 30px;
  overflow: hidden;
}

.table-wrapper {
  overflow: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 1100px;
  color: #0f172a;
}


thead {
  background: #111827;
}

th {
  padding: 22px;
  text-align: right;
  color: #cbd5e1;
}

td {
  padding: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);

}

/* ===== CATEGORY ===== */

.category-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.category-icon {
  width: 58px;
  height: 58px;
  border-radius: 18px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
}

.category-info p {
  margin-top: 6px;
  color: #94a3b8;
  font-size: 12px;
}

.slug {
  color: #00e0b8;
  font-weight: 700;
}

.parent-badge {
  background: rgba(124, 58, 237, 0.14);
  color: #c4b5fd;
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
}

.parent-badge.empty {
  background: rgba(148, 163, 184, 0.14);
  color: #94a3b8;
}

.products-count {
  color: #00e0b8;
  font-weight: 800;
}

.status-badge {
  padding: 8px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
}

.status-badge.active {
  background: rgba(0, 224, 184, 0.14);
  color: #00e0b8;
}

.status-badge.inactive {
  background: rgba(255, 90, 122, 0.14);
  color: #ff5a7a;
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
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 18px;
}

.action-btn.edit {
  background: linear-gradient(135deg, #7c3aed, #2563eb);
}

.action-btn.delete {
  background: linear-gradient(135deg, #ef4444, #dc2626);
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
  background: #111827;
  color: white;
  cursor: pointer;
  font-weight: 700;
}

.pages {
  display: flex;
  gap: 8px;
}

.pages .active {
  background: #7c3aed;
}

/* ===== MODAL ===== */

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 20px;
}

.modal-box {
  width: 100%;
  max-width: 560px;
  background: #0f172a;
  border-radius: 30px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.modal-header {
  padding: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  background: #111827;
  color: white;
  cursor: pointer;
  font-size: 22px;
}

.modal-content {
  padding: 24px;
}

.form-group {
  margin-bottom: 18px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #cbd5e1;
  font-size: 14px;
}

.form-group input,
.form-group textarea,
.form-group select {
  width: 100%;
  border: none;
  border-radius: 16px;
  background: #111827;
  color: white;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.submit-btn {
  width: 100%;
  height: 54px;
  border: none;
  border-radius: 16px;
  background: linear-gradient(135deg, #7c3aed, #2563eb);
  color: white;
  font-weight: 800;
  cursor: pointer;
  margin-top: 10px;
}

/* ===== EMPTY ===== */

.empty-state {
  padding: 50px 20px;
  text-align: center;
  color: #94a3b8;
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
  .categories-page {
    padding: 16px;
  }

  .page-title {
    font-size: 26px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  table {
    min-width: 950px;
  }
}
</style>
