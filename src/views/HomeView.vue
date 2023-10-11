<script setup>
import CityList from "@/views/CityListView/CityList.vue";
import CitySearch from "@/views/CitySearch/CitySearch.vue";
</script>
<template>
  <city-search />
  <suspense>
    <city-list />
    <template #fallback>
      <div>加载中...</div>
    </template>
  </suspense>
</template>