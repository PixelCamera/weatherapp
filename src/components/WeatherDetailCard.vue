<script setup>
defineProps({
  iconClass: String,
  label: String,
  value: String,
});
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-lg bg-white bg-opacity-10 px-4 py-2.5 text-neutral-100 duration-200 hover:-translate-y-0.5 hover:cursor-pointer hover:bg-opacity-30 hover:text-white hover:shadow-lg hover:ring-2 hover:ring-neutral-200"
  >
    <i :class="iconClass" class="text-2xl"></i>
    <div>
      <p class="text-sm">{{ label }}</p>
      <p class="font-bold">{{ value }}</p>
    </div>
  </div>
</template>