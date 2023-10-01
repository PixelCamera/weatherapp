<script setup>
import VStack from "@/components/global/VStack.vue";

defineProps({
  time: String,
  iconClass: String,
  temp: Number,
  text: String,
});
</script>

<template>
  <v-stack
    class="w-full gap-1 rounded-lg px-5 py-3 text-neutral-100 duration-200 hover:-translate-y-1 hover:scale-110 hover:cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white hover:shadow-2xl hover:ring-2 hover:ring-neutral-200"
  >
    <p>{{ time }}</p>
    <i :class="iconClass" class="text-3xl"></i>
    <p class="text-lg">{{ temp }}°C</p>
    <p class="text-sm">{{ text }}</p>
  </v-stack>
</template>