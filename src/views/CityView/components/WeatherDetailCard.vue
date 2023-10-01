<script setup>
import HStack from "@/components/global/HStack.vue";

defineProps({
  iconClass: String,
  label: String,
  value: String,
});
</script>

<template>
  <h-stack
    class="gap-4 rounded-lg bg-white bg-opacity-5 px-5 py-3 text-neutral-100 duration-200 hover:-translate-y-1 hover:scale-110 hover:cursor-pointer hover:bg-opacity-20 hover:text-white hover:shadow-2xl hover:ring-2 hover:ring-neutral-200"
  >
    <i :class="iconClass" class="text-2xl"></i>
    <div>
      <p class="text-sm">{{ label }}</p>
      <p class="font-bold">{{ value }}</p>
    </div>
  </h-stack>
</template>