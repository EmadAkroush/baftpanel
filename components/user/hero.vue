<template>
  <!-- ===== Top Header ===== -->
  <div class="details-header">

    <button
      class="back-btn"
      @click="$emit('back')"
    >
      <i class="mdi mdi-arrow-right"></i>

      <span>بازگشت</span>
    </button>

    <div class="header-actions">

  

   

    </div>

  </div>
</template>

<script setup>
defineProps({
  user: Object
});

defineEmits([
  "back",
  "toggle-block",
  "save"
]);
</script>

<style scoped>
.details-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.back-btn {
  height: 52px;
  padding: 0 20px;
  border-radius: 18px;
  border: 1px solid rgba(217,165,179,.20);
  background: white;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #5B2A4A;
  cursor: pointer;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.header-action {
  height: 52px;
  padding: 0 18px;
  border: none;
  border-radius: 18px;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  font-weight: 700;
}

.header-action.primary {
  background: linear-gradient(135deg,#5B2A4A,#C8A96B);
}

.header-action.danger {
  background: linear-gradient(135deg,#DC2626,#EF4444);
}
</style>