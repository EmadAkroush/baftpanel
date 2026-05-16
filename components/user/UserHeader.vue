<template>
  <div class="flex justify-between items-center mb-8 flex-wrap gap-4">
    <h1 class="text-2xl font-bold text-white">User Details</h1>

    <Button
      :label="user.isActive ? 'Block User' : 'Unblock User'"
      :icon="user.isActive ? 'pi pi-ban' : 'pi pi-check'"
      class="action-btn"
      :class="user.isActive ? 'danger' : 'success'"
      @click="$emit('toggleBlock')"
    />
  </div>
</template>

<script setup>
defineProps(["user"]);
defineEmits(["toggleBlock"]);
</script>