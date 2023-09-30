<script setup>
import AsyncCityView from "@/components/AsyncCityView.vue";
</script>

<template>
  <suspense>
    <async-city-view />
    <template #fallback>
      <div>加载中...</div>
    </template>
  </suspense>
</template>