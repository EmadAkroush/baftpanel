<template>
  <aside
    class="sidebar"
    :class="[
      collapsed ? 'sidebar-collapsed' : 'sidebar-expanded',
      mobileOpen ? 'sidebar-mobile-open' : 'sidebar-mobile-close'
    ]"
  >
    <!-- ===== Header ===== -->
    <div class="sidebar-header">

      <div class="logo-box">

        <div class="logo-icon">
          <i class="mdi mdi-yarn"></i>
        </div>

        <transition name="fade">
          <div
            v-if="!collapsed || isMobile"
            class="logo-content"
          >
            <h2 class="logo-title">
              بافت
            </h2>

            <p class="logo-subtitle">
              پنل سوپر ادمین
            </p>
          </div>
        </transition>

      </div>

      <!-- Desktop Collapse -->
      <button
        class="collapse-btn hidden-mobile"
        @click="emit('toggle')"
      >
        <i
          :class="
            collapsed
              ? 'mdi mdi-chevron-left'
              : 'mdi mdi-chevron-right'
          "
        ></i>
      </button>

      <!-- Mobile Close -->
      <button
        class="collapse-btn mobile-close-btn"
        @click="closeMobile"
      >
        <i class="mdi mdi-close"></i>
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
          active: route.path === item.to
        }"
        @click="handleItemClick"
      >

        <!-- Icon -->
        <div class="menu-icon">
          <i :class="item.icon"></i>
        </div>

        <!-- Label -->
        <transition name="fade">
          <span
            v-if="!collapsed || isMobile"
            class="menu-label"
          >
            {{ item.label }}
          </span>
        </transition>

        <!-- Active Dot -->
        <div
          v-if="route.path === item.to && (!collapsed || isMobile)"
          class="active-dot"
        ></div>

      </NuxtLink>

    </nav>

    <!-- ===== Footer ===== -->
    <div class="sidebar-footer">

      <button
        class="logout-btn"
        @click="logout"
      >

        <div class="menu-icon">
          <i class="mdi mdi-logout"></i>
        </div>

        <transition name="fade">
          <span v-if="!collapsed || isMobile">
            خروج از حساب
          </span>
        </transition>

      </button>

    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const isMobile = ref(false);

const props = defineProps({
  collapsed: {
    type: Boolean,
    default: false
  },

  mobileOpen: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits([
  "toggle",
  "close-mobile"
]);

/* ===== Responsive ===== */

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

onMounted(() => {
  checkMobile();

  window.addEventListener(
    "resize",
    checkMobile
  );
});

onBeforeUnmount(() => {
  window.removeEventListener(
    "resize",
    checkMobile
  );
});

/* ===== Menu ===== */

const items = [
  {
    label: "داشبورد",
    to: "/",
    icon: "mdi mdi-view-grid-outline"
  },

  {
    label: "کاربران",
    to: "/users",
    icon: "mdi mdi-account-group-outline"
  },

  {
    label: "محصولات",
    to: "/products",
    icon: "mdi mdi-hanger"
  },

  {
    label: "سفارشات",
    to: "/orders",
    icon: "mdi mdi-shopping-outline"
  },

  {
    label: "تراکنش‌ها",
    to: "/transactions",
    icon: "mdi mdi-swap-horizontal"
  },

  {
    label: "دسته‌بندی‌ها",
    to: "/categories",
    icon: "mdi mdi-shape-outline"
  },


];

/* ===== Actions ===== */

const closeMobile = () => {
  emit("close-mobile");
};

const handleItemClick = () => {
  if (window.innerWidth < 768) {
    emit("close-mobile");
  }
};

async function logout() {

  try {

    await $fetch("/api/auth/logout", {
      method: "POST"
    });

    window.location.reload();

  } catch (err) {

    console.log(err);

  }

}
</script>

<style scoped>

/* =========================
   Sidebar
========================= */

.sidebar {
  position: fixed;
  top: 0;
  right: 0;

  height: 100vh;

  display: flex;
  flex-direction: column;

  background:
    linear-gradient(
      180deg,
      #FFFFFF,
      #F8F5F2
    );

  backdrop-filter: blur(18px);

  border-left:
    1px solid rgba(217,165,179,.18);

  box-shadow:
    0 10px 40px rgba(91,42,74,.08);

  transition:
    width .3s ease,
    transform .3s ease;

  overflow: hidden;

  z-index: 300;
}

/* =========================
   Width
========================= */

.sidebar-expanded {
  width: 290px;
  min-width: 290px;
}

.sidebar-collapsed {
  width: 92px;
  min-width: 92px;
}

/* =========================
   Header
========================= */

.sidebar-header {
  height: 88px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 16px;

  border-bottom:
    1px solid rgba(217,165,179,.14);

  flex-shrink: 0;
}

/* =========================
   Logo
========================= */

.logo-box {
  display: flex;
  align-items: center;
  gap: 14px;

  min-width: 0;
}

.logo-icon {
  width: 56px;
  height: 56px;

  border-radius: 20px;

  background:
    linear-gradient(
      135deg,
      #5B2A4A,
      #C8A96B
    );

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  color: white;
  font-size: 28px;

  box-shadow:
    0 12px 24px rgba(91,42,74,.14);
}

.logo-content {
  min-width: 0;
}

.logo-title {
  font-size: 22px;
  font-weight: 800;

  color: #1F1F24;

  white-space: nowrap;
}

.logo-subtitle {
  margin-top: 4px;

  font-size: 12px;

  color: #5B2A4A;

  white-space: nowrap;
}

/* =========================
   Collapse Button
========================= */

.collapse-btn {
  width: 42px;
  height: 42px;

  border: none;
  border-radius: 14px;

  background:
    rgba(217,165,179,.10);

  color: #5B2A4A;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;

  font-size: 22px;

  flex-shrink: 0;

  transition: .25s ease;
}

.collapse-btn:hover {
  background: #5B2A4A;
  color: white;
}

/* =========================
   Menu
========================= */

.menu-list {
  flex: 1;

  overflow-y: auto;
  overflow-x: hidden;

  padding: 18px 14px;

  display: flex;
  flex-direction: column;

  gap: 10px;
}

/* =========================
   Menu Item
========================= */

.menu-item {
  position: relative;

  min-height: 58px;

  display: flex;
  align-items: center;

  gap: 14px;

  padding: 0 16px;

  border-radius: 20px;

  text-decoration: none;

  color: #5B2A4A;
  font-weight: 700;

  transition: .25s ease;

  overflow: hidden;
}

.menu-item:hover {
  background:
    rgba(217,165,179,.10);

  transform: translateX(-4px);
}

.menu-label {
  white-space: nowrap;
  font-size: 14px;
}

/* =========================
   Icon
========================= */

.menu-icon {
  width: 42px;
  height: 42px;

  border-radius: 14px;

  background:
    rgba(217,165,179,.10);

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;
}

.menu-icon i {
  font-size: 22px;
  color: #5B2A4A;
}

/* =========================
   Active
========================= */

.active {
  background:
    linear-gradient(
      135deg,
      rgba(91,42,74,.08),
      rgba(200,169,107,.15)
    );

  box-shadow:
    0 10px 25px rgba(91,42,74,.06);
}

.active .menu-icon {
  background:
    linear-gradient(
      135deg,
      #5B2A4A,
      #C8A96B
    );
}

.active .menu-icon i {
  color: white;
}

.active-dot {
  position: absolute;
  left: 18px;

  width: 8px;
  height: 8px;

  border-radius: 999px;

  background: #C8A96B;
}

/* =========================
   Footer
========================= */

.sidebar-footer {
  padding: 16px 14px;

  border-top:
    1px solid rgba(217,165,179,.14);

  flex-shrink: 0;
}

.logout-btn {
  width: 100%;
  height: 58px;

  border: none;
  border-radius: 20px;

  background:
    rgba(217,165,179,.10);

  display: flex;
  align-items: center;

  gap: 14px;

  padding: 0 16px;

  color: #5B2A4A;
  font-weight: 700;

  cursor: pointer;

  transition: .25s ease;
}

.logout-btn:hover {
  background:
    linear-gradient(
      135deg,
      #5B2A4A,
      #C8A96B
    );

  color: white;
}

.logout-btn:hover .menu-icon {
  background:
    rgba(255,255,255,.14);
}

.logout-btn:hover .menu-icon i {
  color: white;
}

/* =========================
   Scrollbar
========================= */

.menu-list::-webkit-scrollbar {
  width: 5px;
}

.menu-list::-webkit-scrollbar-thumb {
  background:
    rgba(91,42,74,.14);

  border-radius: 999px;
}

/* =========================
   Animations
========================= */

.fade-enter-active,
.fade-leave-active {
  transition: opacity .18s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* =========================
   Mobile
========================= */

.mobile-close-btn {
  display: none;
}

@media (max-width: 768px) {

  .sidebar {
    width: 280px !important;
    min-width: 280px !important;

    background:
      linear-gradient(
        180deg,
        #FFFFFF,
        #F8F5F2
      );

    transform: translateX(100%);

    box-shadow:
      -10px 0 40px rgba(0,0,0,.14);
  }

  .sidebar-mobile-open {
    transform: translateX(0);
  }

  .sidebar-mobile-close {
    transform: translateX(100%);
  }

  .hidden-mobile {
    display: none;
  }

  .mobile-close-btn {
    display: flex;
  }

  .sidebar-header {
    height: 84px;
    padding: 0 14px;
  }

  .menu-list {
    padding: 14px 12px;
  }

  .menu-item {
    min-height: 54px;
    border-radius: 18px;
  }

  .logout-btn {
    height: 54px;
    border-radius: 18px;
  }

}

/* =========================
   Small Mobile
========================= */

@media (max-width: 480px) {

  .sidebar {
    width: 86vw !important;
    min-width: 86vw !important;
    max-width: 320px;
  }

  .logo-title {
    font-size: 20px;
  }

  .menu-label {
    font-size: 13px;
  }

}

</style>