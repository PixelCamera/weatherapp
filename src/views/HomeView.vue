<script setup>
import { ref } from "vue";
import axios from "axios";

const citySearchQuery = ref("");
const citySearchResults = ref([]);
const queryTimeout = ref(null);
const qweatherApiKey = "7d0835ccc03346ffb8dc8e5525272f98"; // 和风天气API密钥
const getSearchResults = () => {
  // 如果存在定时器，清除定时器，防止频繁请求
  if (queryTimeout.value){
    clearTimeout(queryTimeout.value);
  }

  // 请求设置定时器，存储在queryTimeout中
  queryTimeout.value = setTimeout(async () => {
    if (citySearchQuery.value !== "") {
      const result = await axios.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${citySearchQuery.value}&key=${qweatherApiKey}`,
      );
      citySearchResults.value = result.data.location;
      return;
    }
    citySearchResults.value = null;
  }, 1000);
}
</script>
<template>
  <div class="container mb-8 pt-4 text-white">
    <!--Search Bar-->
    <input
      v-model="citySearchQuery"
      class="w-full border-b bg-transparent px-2 py-1 transition focus:border-weather-secondary focus:shadow-[0_1px_0_0_#004E71] focus:outline-none"
      placeholder="搜索城市或地区"
      type="text"
      @input="getSearchResults"
    />
    <!--Search Results-->
    <ul class="w-full bg-weather-secondary shadow-md">
      <li
        v-for="item in citySearchResults"
        :key="item.id"
        class="cursor-pointer px-2 py-2 hover:bg-weather-primary"
      >
        {{ item.name }}-{{ item.adm1 }}-{{ item.country }}
      </li>
    </ul>
  </div>
</template>