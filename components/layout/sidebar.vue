<template>
  <aside
    class="h-full bg-sidebar text-white flex flex-col transition-all duration-300"
    :class="collapsed ? 'w-[80px]' : 'w-[260px]'"
  >

    <!-- Header -->
    <div class="flex items-center justify-between p-4">

      <i class="mdi mdi-shield-crown text-3xl text-purple-400"></i>

      <button
        class="text-white"
        @click="collapsed = !collapsed"
      >
        <i :class="collapsed ? 'mdi mdi-arrow-right' : 'mdi mdi-arrow-left'"></i>
      </button>

    </div>

    <!-- MENU -->
    <nav class="flex flex-col gap-2 px-2">

      <NuxtLink
        v-for="item in items"
        :key="item.label"
        :to="item.to"
        class="menu-item"
        :class="{ active: route.path === item.to }"
        @click="closeSidebar"
      >

        <i :class="item.icon"></i>

        <span v-if="!collapsed">
          {{ item.label }}
        </span>

      </NuxtLink>

      <!-- Logout -->
      <button
        class="menu-item mt-4"
        @click="logout"
      >
        <i class="mdi mdi-logout"></i>
        <span v-if="!collapsed">Logout</span>
      </button>

    </nav>

  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
import { sidebarOpen, closeSidebar } from "~/composables/useSidebar.js";

const route = useRoute();
const collapsed = ref(false);

/* ✅ فقط اینجا Packages اضافه شده */
const items = [
  { label: "Dashboard", to: "/", icon: "mdi mdi-view-dashboard-outline" },
  { label: "Users", to: "/users", icon: "mdi mdi-account-group-outline" },
  { label: "Transactions", to: "/transactions", icon: "mdi mdi-swap-horizontal" },

  // ✅ NEW
  { label: "Packages", to: "/packages", icon: "mdi mdi-cube-outline" },
];

async function logout() {
  await $fetch("/api/auth/logout", { method: "POST" });
  window.location.reload();
}
</script>

<style scoped>

.bg-sidebar {
  background: linear-gradient(180deg, #090040, #0f0a3a);
  border-right: 1px solid rgba(177, 59, 255, 0.2);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 10px;
  color: #b5b5c3;
  transition: 0.2s;
  text-decoration: none;
}

.menu-item i {
  font-size: 20px;
  color: #a78bfa;
}

.menu-item:hover {
  background: rgba(177, 59, 255, 0.15);
  color: white;
}

.active {
  background: rgba(177, 59, 255, 0.25);
  color: white;
  box-shadow: 0 0 10px rgba(177, 59, 255, 0.3);
}

</style>