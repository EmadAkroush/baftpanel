<template>
  <nav class="navbar">

    <!-- ===== Right ===== -->
    <div class="navbar-right">

      <!-- Mobile Menu -->
      <button
        class="mobile-menu-btn"
        @click="$emit('menu-click')"
      >
        <i class="mdi mdi-menu"></i>
      </button>

      <!-- Brand -->
      <div class="brand-box">

        <div class="brand-logo">
          <i class="mdi mdi-shopping-outline"></i>
        </div>

        <div class="brand-text hidden sm:block">
          <h2 class="brand-title">
            بافت
          </h2>

          <p class="brand-subtitle">
            پنل مدیریت فروشگاه
          </p>
        </div>

      </div>

    </div>

    <!-- ===== Left ===== -->
    <div class="navbar-left">

      <!-- Search -->
      <div class="search-box">

        <i class="mdi mdi-magnify search-icon"></i>

        <input
          type="text"
          placeholder="جستجو در پنل..."
        />

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

        <div class="user-info hidden md:block">

          <h4>
            {{ user?.firstName }}
            {{ user?.lastName }}
          </h4>

          <p>
            مدیر سیستم
          </p>

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

defineEmits(["menu-click"]);

const { authUser } = useAuth();

const user = computed(() => authUser.value?.user);
</script>

<style scoped>

/* ================================================= */
/* ==================== NAVBAR ===================== */
/* ================================================= */

.navbar {
  width: 100%;
  height: 86px;

  padding: 0 26px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
  z-index: 80;

  background:
    rgba(248,245,242,.88);

  backdrop-filter: blur(18px);

  border-bottom:
    1px solid rgba(217,165,179,.18);
}

/* ================================================= */
/* ================= RIGHT SIDE ==================== */
/* ================================================= */

.navbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

/* ===== Mobile Button ===== */

.mobile-menu-btn {
  width: 48px;
  height: 48px;

  border-radius: 16px;
  border: none;

  background:
    rgba(217,165,179,.14);

  color: #5B2A4A;

  display: none;
  align-items: center;
  justify-content: center;

  font-size: 24px;

  transition: .25s ease;

  cursor: pointer;
}

.mobile-menu-btn:hover {
  background: #5B2A4A;
  color: white;
}

/* ===== Brand ===== */

.brand-box {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-logo {
  width: 58px;
  height: 58px;

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

  color: white;
  font-size: 28px;

  box-shadow:
    0 12px 30px rgba(91,42,74,.16);
}

.brand-title {
  font-size: 22px;
  font-weight: 900;

  color: #1F1F24;
}

.brand-subtitle {
  margin-top: 4px;

  color: #5B2A4A;
  font-size: 13px;
}

/* ================================================= */
/* ================= LEFT SIDE ===================== */
/* ================================================= */

.navbar-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

/* ===== Search ===== */

.search-box {
  width: 340px;
  height: 54px;

  border-radius: 20px;

  background: white;

  border:
    1px solid rgba(217,165,179,.18);

  display: flex;
  align-items: center;

  padding: 0 18px;

  transition: .25s ease;
}

.search-box:focus-within {
  border-color: #C8A96B;

  box-shadow:
    0 0 0 4px rgba(200,169,107,.10);
}

.search-icon {
  color: #5B2A4A;
  font-size: 22px;

  margin-left: 12px;
}

.search-box input {
  width: 100%;
  height: 100%;

  border: none;
  background: transparent;

  color: #1F1F24;
  font-size: 14px;
}

.search-box input::placeholder {
  color: #9F7788;
}

.search-box input:focus {
  outline: none;
}

/* ================================================= */
/* ================= ACTIONS ======================= */
/* ================================================= */

.action-btn {
  width: 52px;
  height: 52px;

  border-radius: 18px;

  border:
    1px solid rgba(217,165,179,.18);

  background: white;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  color: #5B2A4A;
  font-size: 23px;

  transition: .25s ease;

  cursor: pointer;
}

.action-btn:hover {
  background: #5B2A4A;
  color: white;

  transform: translateY(-2px);

  box-shadow:
    0 14px 28px rgba(91,42,74,.12);
}

/* ===== Notification Dot ===== */

.notif-dot {
  position: absolute;

  top: 11px;
  right: 12px;

  width: 10px;
  height: 10px;

  border-radius: 999px;

  background: #C8A96B;

  border: 2px solid white;
}

/* ================================================= */
/* ================= USER BOX ====================== */
/* ================================================= */

.user-box {
  height: 58px;

  padding: 0 12px 0 18px;

  border-radius: 20px;

  background: white;

  border:
    1px solid rgba(217,165,179,.18);

  display: flex;
  align-items: center;
  gap: 14px;

  transition: .25s ease;
}

.user-box:hover {
  transform: translateY(-2px);

  box-shadow:
    0 14px 30px rgba(91,42,74,.10);
}

.user-info h4 {
  font-size: 14px;
  font-weight: 800;

  color: #1F1F24;
}

.user-info p {
  margin-top: 4px;

  color: #5B2A4A;
  font-size: 12px;
}

/* ===== Avatar ===== */

.avatar {
  width: 42px;
  height: 42px;

  border-radius: 14px;

  background:
    linear-gradient(
      135deg,
      #5B2A4A,
      #C8A96B
    );

  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  font-weight: 800;
  font-size: 16px;
}

/* ================================================= */
/* ================== RESPONSIVE =================== */
/* ================================================= */

@media (max-width: 1200px) {

  .search-box {
    width: 260px;
  }

}

@media (max-width: 992px) {

  .search-box {
    display: none;
  }

}

@media (max-width: 768px) {

  .navbar {
    height: 78px;
    padding: 0 14px;
  }

  .mobile-menu-btn {
    display: flex;
  }

  .brand-logo {
    width: 50px;
    height: 50px;

    border-radius: 16px;

    font-size: 24px;
  }

  .navbar-left {
    gap: 10px;
  }

  .action-btn {
    width: 46px;
    height: 46px;

    border-radius: 15px;

    font-size: 20px;
  }

  .user-box {
    height: 50px;

    padding: 0 8px;

    border-radius: 16px;
  }

  .avatar {
    width: 36px;
    height: 36px;

    border-radius: 12px;

    font-size: 14px;
  }

}

@media (max-width: 480px) {

  .navbar {
    padding: 0 10px;
  }

  .brand-text {
    display: none;
  }

  .navbar-left {
    gap: 8px;
  }

  .action-btn {
    width: 42px;
    height: 42px;

    border-radius: 14px;
  }

}

</style>