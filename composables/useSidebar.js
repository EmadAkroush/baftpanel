// composables/useSidebar.js
import { ref } from 'vue';

export const sidebarOpen = ref(false);

export function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value;
}

export function closeSidebar() {
  sidebarOpen.value = false;
}
