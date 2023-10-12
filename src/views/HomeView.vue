<script setup>
import CityList from "@/views/CityListView/CityList.vue";
import CitySearch from "@/views/CitySearch/CitySearch.vue";
import CityListSkeleton from "@/views/CityListView/CityListSkeleton.vue";
</script>
<template>
  <city-search />
  <suspense>
    <city-list />
    <template #fallback>
      <city-list-skeleton />
    </template>
  </suspense>
</template>