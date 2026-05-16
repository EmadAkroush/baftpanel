<template>
  <div class="flex min-h-screen w-full overflow-hidden bg-main">

    <!-- Sidebar -->
    <div class="w-full md:w-auto border-r border-purple-900/20">
      <LayoutSidebar />
    </div>

    <!-- Content -->
    <div class="flex-1 flex flex-col">

      <LayoutNavbar />

      <main class="p-4 text-white">
        <slot />
      </main>

    </div>

  </div>
</template>

<style>
.bg-main {
  background: #090040;
}
</style>