<template>
  <div class="layout-wrapper">

    <!-- ===== Mobile Overlay ===== -->
    <transition name="fade">
      <div
        v-if="mobileSidebar"
        class="mobile-overlay"
        @click="closeMobileSidebar"
      />
    </transition>

    <!-- ===== Sidebar ===== -->
    <aside
      class="sidebar-wrapper"
      :class="{
        collapsed: collapsed && !isMobile,
        mobileOpen: mobileSidebar,
      }"
    >
      <LayoutSidebar
        :collapsed="collapsed"
        :mobile-open="mobileSidebar"
        @toggle="toggleSidebar"
        @close-mobile="closeMobileSidebar"
      />
    </aside>

    <!-- ===== Main ===== -->
    <div
      class="main-wrapper"
      :class="{
        expanded: collapsed && !isMobile,
      }"
    >

      <!-- ===== Navbar ===== -->
      <LayoutNavbar
        @menu-click="toggleMobileSidebar"
      />

      <!-- ===== Content ===== -->
      <main class="content-wrapper">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  watch
} from "vue";

/* =========================
   States
========================= */

const collapsed = ref(false);

const mobileSidebar = ref(false);

const isMobile = ref(false);

/* =========================
   Check Screen
========================= */

const checkScreen = () => {

  isMobile.value =
    window.innerWidth <= 768;

  // Mobile
  if (isMobile.value) {

    collapsed.value = false;

  } else {

    mobileSidebar.value = false;

  }

};

/* =========================
   Sidebar
========================= */

const toggleSidebar = () => {

  // Desktop only
  if (!isMobile.value) {

    collapsed.value =
      !collapsed.value;

  }

};

const toggleMobileSidebar = () => {

  mobileSidebar.value =
    !mobileSidebar.value;

};

const closeMobileSidebar = () => {

  mobileSidebar.value = false;

};

/* =========================
   Body Scroll Lock
========================= */

watch(mobileSidebar, (val) => {

  if (process.client) {

    document.body.style.overflow =
      val ? "hidden" : "";

  }

});

/* =========================
   Lifecycle
========================= */

onMounted(() => {

  checkScreen();

  window.addEventListener(
    "resize",
    checkScreen
  );

});

onBeforeUnmount(() => {

  window.removeEventListener(
    "resize",
    checkScreen
  );

  document.body.style.overflow =
    "";

});
</script>

<style scoped>

/* =========================
   Global
========================= */

.layout-wrapper {
  position: relative;

  display: flex;

  width: 100%;
  min-height: 100vh;

  background: #F8F5F2;

  direction: rtl;

  overflow-x: hidden;
}

/* =========================
   Sidebar Wrapper
========================= */

.sidebar-wrapper {
  width: 290px;
  min-width: 290px;

  height: 100vh;

  flex-shrink: 0;

  position: sticky;
  top: 0;

  z-index: 120;

  transition:
    width .3s ease,
    min-width .3s ease,
    transform .35s ease;

  background: transparent;
}

/* ===== Desktop Collapse ===== */

.sidebar-wrapper.collapsed {
  width: 92px;
  min-width: 92px;
}

/* =========================
   Main Wrapper
========================= */

.main-wrapper {
  flex: 1;

  min-width: 0;
  width: 100%;

  display: flex;
  flex-direction: column;

  overflow: hidden;
}

/* =========================
   Content
========================= */

.content-wrapper {
  flex: 1;

  width: 100%;
  max-width: 100%;

  padding: 24px;

  overflow-x: hidden;
  overflow-y: auto;

  box-sizing: border-box;
}

/* =========================
   Overlay
========================= */

.mobile-overlay {
  position: fixed;
  inset: 0;

  background:
    rgba(31,31,36,.42);

  backdrop-filter: blur(4px);

  z-index: 180;
}

/* =========================
   Fade Animation
========================= */

.fade-enter-active,
.fade-leave-active {
  transition: opacity .25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ==================================================
   =================== TABLET ========================
================================================== */

@media (max-width: 1200px) {

  .content-wrapper {
    padding: 20px;
  }

}

/* ==================================================
   =================== MOBILE ========================
================================================== */

@media (max-width: 768px) {

  .layout-wrapper {
    overflow-x: hidden;
  }

  /* =========================
     Sidebar
  ========================= */

  .sidebar-wrapper {

    position: fixed;

    top: 0;
    right: 0;

    width: 285px;
    min-width: 285px;

    height: 100vh;

    transform: translateX(100%);

    z-index: 250;

    background:
      linear-gradient(
        180deg,
        #FFFFFF,
        #F8F5F2
      );

    border-left:
      1px solid rgba(217,165,179,.18);

    box-shadow:
      -10px 0 40px rgba(91,42,74,.10);

    transition:
      transform .35s ease;
  }

  /* ===== Open ===== */

  .sidebar-wrapper.mobileOpen {
    transform: translateX(0);
  }

  /* ===== Disable collapsed on mobile ===== */

  .sidebar-wrapper.collapsed {
    width: 285px;
    min-width: 285px;
  }

  /* =========================
     Main
  ========================= */

  .main-wrapper {
    width: 100%;
    max-width: 100%;

    margin: 0;

    overflow-x: hidden;
  }

  /* =========================
     Content
  ========================= */

  .content-wrapper {
    padding: 14px;

    width: 100%;
    max-width: 100vw;

    overflow-x: hidden;

    box-sizing: border-box;
  }

}

/* ==================================================
   =============== SMALL MOBILE ======================
================================================== */

@media (max-width: 480px) {

  .sidebar-wrapper {
    width: 86vw;
    min-width: 86vw;

    max-width: 320px;
  }

  .content-wrapper {
    padding: 12px;
  }

}

</style>