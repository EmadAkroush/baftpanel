<template>
  <div class="layout-wrapper">

    <!-- Sidebar -->
    <LayoutSidebar
      :collapsed="collapsed"
      @toggle="toggleSidebar"
    />

    <!-- Main -->
    <div
      class="main-wrapper"
      :class="collapsed ? 'main-expanded' : 'main-shrink'"
    >

      <!-- Navbar -->
      <header class="navbar-wrapper">
        <LayoutNavbar
          :collapsed="collapsed"
          @toggle="toggleSidebar"
        />
      </header>

      <!-- Content -->
      <main class="content-wrapper">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref } from "vue";

const collapsed = ref(false);

const toggleSidebar = () => {
  collapsed.value = !collapsed.value;
};
</script>

<style scoped>

/* ===== Layout ===== */
.layout-wrapper {
  min-height: 100vh;
  background: #F8F5F2;
  direction: rtl;
}

/* ===== Main ===== */
.main-wrapper {
  min-height: 100vh;

  transition:
    margin-right .3s ease,
    width .3s ease;
}

/* وقتی سایدبار بازه */
.main-shrink {
  margin-right: 280px;
  width: calc(100% - 280px);
}

/* وقتی بسته است */
.main-expanded {
  margin-right: 92px;
  width: calc(100% - 92px);
}

/* ===== Navbar ===== */
.navbar-wrapper {
  padding: 18px 24px;
}

/* ===== Content ===== */
.content-wrapper {
  padding: 24px;
}

/* ===== Mobile ===== */
@media (max-width: 768px) {

  .main-wrapper,
  .main-shrink,
  .main-expanded {
    margin-right: 0 !important;
    width: 100% !important;
  }

}

</style>