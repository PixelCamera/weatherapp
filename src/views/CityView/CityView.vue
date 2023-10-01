<script setup>
import AsyncCityView from "@/views/CityView/AsyncCityView.vue";
</script>

<template>
  <suspense>
    <async-city-view />
    <template #fallback>
      <div>加载中...</div>
    </template>
  </suspense>
</template>