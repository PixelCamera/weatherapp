<script setup>
import AsyncCityView from "@/views/CityView/AsyncCityView.vue";
import CityViewSkeleton from "@/views/CityView/CityViewSkeleton.vue";
</script>

<template>
  <suspense>
    <async-city-view />
    <template #fallback>
      <city-view-skeleton />
    </template>
  </suspense>
</template>