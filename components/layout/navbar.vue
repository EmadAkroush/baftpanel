<template>
  <nav class="navbar">
    <!-- Right -->
    <div class="navbar-right">
      <!-- Mobile Menu -->
      <button class="menu-btn md:hidden" @click="emit('toggle')">
        <i class="mdi mdi-menu"></i>
      </button>

    
    </div>

    <!-- Left -->
    <div class="navbar-left">
      <!-- Search -->
      <div class="search-box hidden lg:flex">
        <i class="mdi mdi-magnify search-icon"></i>

        <input type="text" placeholder="جستجو در پنل..." />
      </div>

      <!-- Notification -->
      <button class="action-btn">
        <i class="mdi mdi-bell-outline"></i>

        <span class="notif-dot"></span>
      </button>

      <!-- Messages -->
      <button class="action-btn hidden sm:flex">
        <i class="mdi mdi-email-outline"></i>
      </button>

      <!-- User -->
      <div class="user-box">
        <div class="user-info hidden sm:block">
          <h4>
            {{ user?.firstName }}
            {{ user?.lastName }}
          </h4>

          <p>مدیر سیستم</p>
        </div>

        <div class="avatar">
          <span>
            {{ user?.firstName?.charAt(0) }}
          </span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  collapsed: Boolean
});

const emit = defineEmits(["toggle"]);

const { authUser } = useAuth();

const user = computed(() => authUser.value?.user);
</script>

<style scoped>
.navbar {
  height: 82px;
  width: 100%;
  background: rgba(248, 245, 242, 0.92);
  backdrop-filter: blur(16px);

  border-bottom: 1px solid rgba(217, 165, 179, 0.22);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 28px;

  position: sticky;
  top: 0;
  z-index: 50;
}

/* ===== Right ===== */
.navbar-right {
  display: flex;
  align-items: center;
  gap: 18px;
}

/* ===== Mobile Button ===== */
.menu-btn {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  border: 1px solid rgba(217, 165, 179, 0.25);

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  color: #5b2a4a;
  font-size: 24px;

  transition: 0.25s ease;
}

.menu-btn:hover {
  background: #5b2a4a;
  color: white;
}

/* ===== Brand ===== */
.brand-box {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  width: 56px;
  height: 56px;
  border-radius: 20px;

  background: linear-gradient(135deg, #5b2a4a, #c8a96b);

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-size: 28px;

  box-shadow: 0 10px 25px rgba(91, 42, 74, 0.18);
}

.brand-title {
  font-size: 22px;
  font-weight: 800;
  color: #1f1f24;
}

.brand-subtitle {
  margin-top: 4px;
  font-size: 13px;
  color: #5b2a4a;
}

/* ===== Left ===== */
.navbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* ===== Search ===== */
.search-box {
  width: 320px;
  height: 52px;

  border-radius: 18px;

  background: white;

  border: 1px solid rgba(217, 165, 179, 0.24);

  display: flex;
  align-items: center;

  padding: 0 18px;

  transition: 0.25s ease;
}

.search-box:focus-within {
  border-color: #c8a96b;

  box-shadow: 0 0 0 4px rgba(200, 169, 107, 0.1);
}

.search-icon {
  color: #5b2a4a;
  font-size: 22px;
  margin-left: 12px;
}

.search-box input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;

  color: #1f1f24;
  font-size: 14px;
}

.search-box input::placeholder {
  color: #9f7788;
}

.search-box input:focus {
  outline: none;
}

/* ===== Action Buttons ===== */
.action-btn {
  width: 52px;
  height: 52px;

  border-radius: 18px;

  border: 1px solid rgba(217, 165, 179, 0.24);

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  color: #5b2a4a;
  font-size: 24px;

  transition: 0.25s ease;
}

.action-btn:hover {
  background: #5b2a4a;
  color: white;

  transform: translateY(-2px);

  box-shadow: 0 12px 25px rgba(91, 42, 74, 0.14);
}

.notif-dot {
  position: absolute;
  top: 12px;
  right: 13px;

  width: 10px;
  height: 10px;

  border-radius: 999px;

  background: #c8a96b;

  border: 2px solid white;
}

/* ===== User ===== */
.user-box {
  display: flex;
  align-items: center;
  gap: 14px;

  background: white;

  border: 1px solid rgba(217, 165, 179, 0.22);

  height: 58px;

  padding: 0 10px 0 18px;

  border-radius: 20px;

  transition: 0.25s ease;
}

.user-box:hover {
  transform: translateY(-2px);

  box-shadow: 0 12px 25px rgba(91, 42, 74, 0.1);
}

.user-info h4 {
  font-size: 14px;
  font-weight: 800;
  color: #1f1f24;
}

.user-info p {
  margin-top: 4px;
  font-size: 12px;
  color: #5b2a4a;
}

.avatar {
  width: 42px;
  height: 42px;

  border-radius: 14px;

  background: linear-gradient(135deg, #5b2a4a, #c8a96b);

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: 800;
  font-size: 16px;
}

/* ===== Responsive ===== */
@media (max-width: 768px) {
  .navbar {
    padding: 0 16px;
  }

  .brand-logo {
    width: 48px;
    height: 48px;
    border-radius: 16px;
  }

  .search-box {
    display: none;
  }
}
</style>
