<template>
  <nav
    class="w-full h-16 bg-navbar border-b border-purple-900/40 flex items-center px-6 backdrop-blur-md"
  >
    <!-- Left: Hamburger (Mobile Only) -->
    <button
      class="md:hidden text-2xl text-gray-300 hover:text-white transition"
      @click="toggleSidebar"
    >
      <i class="mdi mdi-menu"></i>
    </button>

    <!-- 🔥 spacer برای حفظ layout -->
    <div class="flex-1"></div>

    <!-- Right: Icons + User -->
    <div class="flex items-center gap-6">
      <!-- Notification -->
      <div class="icon-btn">
        <i class="mdi mdi-bell-outline text-xl"></i>
        <span class="notif-badge"></span>
      </div>

      <!-- User Info -->
      <div class="flex items-center gap-3 cursor-pointer group">
        <div class="text-right leading-tight hidden sm:block">
          <p
            class="text-sm font-semibold text-white group-hover:text-purple-300 transition"
          >
            {{ user?.firstName }} {{ user?.lastName }}
          </p>

          <p class="text-xs text-gray-400">
            {{ user?.email }}
          </p>
        </div>

        <div class="avatar">
          <i class="mdi mdi-account text-2xl"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { toggleSidebar } from "~/composables/useSidebar.js";

const { authUser } = useAuth();

/* 👇 استخراج user واقعی */
const user = computed(() => authUser.value?.user);
</script>

<style scoped>
/* Navbar Background */
.bg-navbar {
  background: rgba(9, 0, 64, 0.9);
}

/* (باقی استایل‌ها بدون تغییر) */

.custom-search :deep(input) {
  background: #140a5c;
  border: 1px solid rgba(177, 59, 255, 0.25);
  color: white;
  border-radius: 12px;
  padding-left: 2.5rem;
  height: 40px;
  transition: all 0.25s ease;
}

.custom-search :deep(input::placeholder) {
  color: #a1a1aa;
}

.custom-search :deep(input:focus) {
  border-color: #b13bff;
  box-shadow:
    0 0 0 2px rgba(177, 59, 255, 0.25),
    0 0 10px rgba(177, 59, 255, 0.4);
}

.icon-btn {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: #140a5c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c4b5fd;
  cursor: pointer;
  transition: all 0.25s ease;
}

.icon-btn:hover {
  background: #1e0d6b;
  color: white;
  box-shadow: 0 0 10px rgba(177, 59, 255, 0.5);
}

.notif-badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background: #ffcc00;
  border-radius: 9999px;
  box-shadow: 0 0 6px #ffcc00;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  background: linear-gradient(135deg, #b13bff, #471396);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.avatar:hover {
  box-shadow: 0 0 12px rgba(177, 59, 255, 0.6);
}
</style>
