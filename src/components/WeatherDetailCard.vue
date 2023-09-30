<script setup>
defineProps({
  iconClass: String,
  label: String,
  value: String,
});
</script>

<template>
  <div
    class="m-2 flex items-center space-x-2 rounded-lg bg-white bg-opacity-20 p-4"
  >
    <i :class="iconClass" class="text-xl"></i>
    <div>
      <p class="text-sm">{{ label }}</p>
      <p class="font-bold">{{ value }}</p>
    </div>
  </div>
</template>
