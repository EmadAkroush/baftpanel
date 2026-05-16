<template>
  <div class="card flex flex-col sm:flex-row items-center gap-6 mb-6">
    <div class="avatar-large">
      <i class="pi pi-user text-3xl"></i>
    </div>

    <div class="flex-1 space-y-2 text-gray-300">
      <p><span class="label">Username:</span> {{ user?.username }}</p>
      <p><span class="label">Name:</span> {{ user?.firstName }} {{ user?.lastName }}</p>
      <p><span class="label">Email:</span> {{ user?.email }}</p>
      <p><span class="label">Phone:</span> {{ user?.phone || "-" }}</p>
      <p><span class="label">Role:</span> {{ user?.role }}</p>

      <span class="status-badge" :class="user?.isActive ? 'active' : 'inactive'">
        {{ user?.isActive ? "Active" : "Blocked" }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps(["user"]);
</script>