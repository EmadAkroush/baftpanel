<template>
  <aside
    class="sidebar"
    :class="[
      collapsed ? 'sidebar-collapsed' : 'sidebar-expanded',

      mobileOpen ? 'sidebar-mobile-open' : 'sidebar-mobile-close',
    ]"
  >
    <!-- ===== Header ===== -->
    <div class="sidebar-header">
      <div class="logo-box">
        <div class="logo-icon">
          <i class="mdi mdi-yarn"></i>
        </div>

        <transition name="fade">
          <div v-if="!collapsed">
            <h2 class="logo-title">بافت</h2>

            <p class="logo-subtitle">پنل مدیریت</p>
          </div>
        </transition>
      </div>

      <button class="collapse-btn" @click="emit('toggle')">
        <i
          :class="collapsed ? 'mdi mdi-chevron-left' : 'mdi mdi-chevron-right'"
        ></i>
      </button>
    </div>

    <!-- ===== Menu ===== -->
    <nav class="menu-list">
      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        class="menu-item"
        :class="{
          active: route.path === item.to,
        }"
        @click="handleItemClick"
      >
        <!-- Icon -->
        <div class="menu-icon">
          <i :class="item.icon"></i>
        </div>

        <!-- Label -->
        <transition name="fade">
          <span v-if="!collapsed" class="menu-label">
            {{ item.label }}
          </span>
        </transition>

        <!-- Active Dot -->
        <div
          v-if="route.path === item.to && !collapsed"
          class="active-dot"
        ></div>
      </NuxtLink>
    </nav>

    <!-- ===== Footer ===== -->
    <div class="sidebar-footer">
      <button class="logout-btn" @click="logout">
        <div class="menu-icon">
          <i class="mdi mdi-logout"></i>
        </div>

        <transition name="fade">
          <span v-if="!collapsed"> خروج از حساب </span>
        </transition>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

/* ===== Sidebar State ===== */

const mobileOpen = ref(false);


const props = defineProps({
  collapsed: Boolean
});

const emit = defineEmits(["toggle"]);

/* ===== Menu ===== */
const items = [
  {
    label: "داشبورد",
    to: "/",
    icon: "mdi mdi-view-grid-outline",
  },

  {
    label: "کاربران",
    to: "/users",
    icon: "mdi mdi-account-group-outline",
  },

  {
    label: "محصولات",
    to: "/products",
    icon: "mdi mdi-hanger",
  },

  {
    label: "سفارشات",
    to: "/orders",
    icon: "mdi mdi-shopping-outline",
  },

  {
    label: "تراکنش‌ها",
    to: "/transactions",
    icon: "mdi mdi-swap-horizontal",
  },

  {
    label: "دسته‌بندی‌ها",
    to: "/categories",
    icon: "mdi mdi-shape-outline",
  },

  {
    label: "تنظیمات",
    to: "/settings",
    icon: "mdi mdi-cog-outline",
  },
];

/* ===== Responsive ===== */
const checkMobile = () => {
  mobileOpen.value = window.innerWidth > 768;
};

onMounted(() => {
  checkMobile();

  window.addEventListener("resize", checkMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

/* ===== Actions ===== */
const toggleCollapse = () => {
  collapsed.value = !collapsed.value;
};

const handleItemClick = () => {
  if (window.innerWidth < 768) {
    mobileOpen.value = false;
  }
};

async function logout() {
  await $fetch("/api/auth/logout", {
    method: "POST",
  });

  window.location.reload();
}
</script>

<style scoped>
/* ================= Sidebar ================= */

.sidebar {
  height: 100vh;

  display: flex;
  flex-direction: column;

  position: fixed;
  top: 0;
  right: 0;

  height: 100vh;

  z-index: 120;

  transition:
    width 0.28s ease,
    transform 0.28s ease;

  overflow: hidden;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.95),
    rgba(253, 248, 246, 0.92)
  );

  backdrop-filter: blur(20px);

  border-left: 1px solid rgba(217, 165, 179, 0.18);

  box-shadow: 0 10px 40px rgba(91, 42, 74, 0.05);

  z-index: 80;
}

/* ================= Width ================= */

.sidebar-expanded {
  width: 280px;
  min-width: 280px;
}

.sidebar-collapsed {
  width: 92px;
  min-width: 92px;
}

/* ================= Header ================= */

.sidebar-header {
  height: 92px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 18px;

  border-bottom: 1px solid rgba(217, 165, 179, 0.14);
}

/* ================= Logo ================= */

.logo-box {
  display: flex;
  align-items: center;
  gap: 14px;

  min-width: 0;
}

.logo-icon {
  width: 58px;
  height: 58px;

  border-radius: 20px;

  background: linear-gradient(135deg, #5b2a4a, #c8a96b);

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  color: white;
  font-size: 28px;

  box-shadow: 0 12px 28px rgba(91, 42, 74, 0.16);
}

.logo-title {
  font-size: 22px;
  font-weight: 800;

  color: #1f1f24;
}

.logo-subtitle {
  margin-top: 4px;

  font-size: 12px;

  color: #5b2a4a;
}

/* ================= Collapse ================= */

.collapse-btn {
  width: 42px;
  height: 42px;

  border: none;
  border-radius: 14px;

  background: rgba(217, 165, 179, 0.1);

  color: #5b2a4a;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22px;

  cursor: pointer;

  flex-shrink: 0;

  transition: 0.25s ease;
}

.collapse-btn:hover {
  background: #5b2a4a;
  color: white;
}

/* ================= Menu ================= */

.menu-list {
  flex: 1;

  padding: 18px 14px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  overflow-y: auto;
}

/* ================= Item ================= */

.menu-item {
  position: relative;

  height: 60px;

  border-radius: 20px;

  display: flex;
  align-items: center;

  gap: 14px;

  padding: 0 16px;

  color: #5b2a4a;

  text-decoration: none;

  transition: 0.25s ease;

  font-weight: 700;

  overflow: hidden;
}

.menu-item:hover {
  background: rgba(217, 165, 179, 0.1);

  transform: translateX(-4px);
}

.menu-label {
  white-space: nowrap;
}

/* ================= Icon ================= */

.menu-icon {
  width: 42px;
  height: 42px;

  border-radius: 14px;

  background: rgba(217, 165, 179, 0.1);

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
}

.menu-icon i {
  font-size: 22px;
  color: #5b2a4a;
}

/* ================= Active ================= */

.active {
  background: linear-gradient(
    135deg,
    rgba(91, 42, 74, 0.08),
    rgba(200, 169, 107, 0.14)
  );

  box-shadow: 0 10px 25px rgba(91, 42, 74, 0.08);

  color: #1f1f24;
}

.active .menu-icon {
  background: linear-gradient(135deg, #5b2a4a, #c8a96b);
}

.active .menu-icon i {
  color: white;
}

.active-dot {
  width: 8px;
  height: 8px;

  border-radius: 999px;

  background: #c8a96b;

  position: absolute;

  left: 18px;
}

/* ================= Footer ================= */

.sidebar-footer {
  padding: 18px 14px;

  border-top: 1px solid rgba(217, 165, 179, 0.14);
}

.logout-btn {
  width: 100%;
  height: 60px;

  border: none;
  border-radius: 20px;

  background: rgba(217, 165, 179, 0.1);

  color: #5b2a4a;

  display: flex;
  align-items: center;

  gap: 14px;

  padding: 0 16px;

  cursor: pointer;

  font-weight: 700;

  transition: 0.25s ease;
}

.logout-btn:hover {
  background: linear-gradient(135deg, #5b2a4a, #c8a96b);

  color: white;

  box-shadow: 0 14px 28px rgba(91, 42, 74, 0.14);
}

.logout-btn:hover .menu-icon {
  background: rgba(255, 255, 255, 0.16);
}

.logout-btn:hover .menu-icon i {
  color: white;
}

/* ================= Animations ================= */

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ================= Scrollbar ================= */

.menu-list::-webkit-scrollbar {
  width: 6px;
}

.menu-list::-webkit-scrollbar-thumb {
  background: rgba(91, 42, 74, 0.12);

  border-radius: 999px;
}

/* ================= Responsive ================= */

@media (max-width: 768px) {
  .sidebar {
    position: fixed;

    top: 0;
    right: 0;
    bottom: 0;

    z-index: 120;
  }

  .sidebar-expanded {
    width: 280px;
    min-width: 280px;
  }

  .sidebar-collapsed {
    width: 82px;
    min-width: 82px;
  }

  .sidebar-mobile-close {
    transform: translateX(100%);
  }

  .sidebar-mobile-open {
    transform: translateX(0);
  }
}
</style>
