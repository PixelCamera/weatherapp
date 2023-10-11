<script setup>
import { ref } from "vue";
import axios from "axios";
import CityCard from "@/views/CityListView/CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const API_KEY = "7d0835ccc03346ffb8dc8e5525272f98"; // 和风天气 API 的密钥

// 定义一个异步函数 getCities，它用于从本地存储中获取保存的城市，并从一个外部API获取每个城市的天气数据。
const getCities = async () => {
  // 检查本地存储中是否有名为 "savedCities" 的项。
  if (localStorage.getItem("savedCities")) {
    // 如果存在，解析该项（它应该是一个JSON字符串）并将其值赋给 savedCities 响应式引用。
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  // 初始化一个空数组 request，用于存储将要发送的所有天气API请求。
  const request = [];

  // 遍历 savedCities 数组中的每个城市。
  savedCities.value.forEach((city) => {
    // 对于每个城市，创建一个新的axios请求，并将其添加到 request 数组中。
    request.push(
      axios.get(
        `https://devapi.qweather.com/v7/weather/now?location=${city.locationId}&key=${API_KEY}`,
      ),
    );
  });

  // 使用 Promise.all 等待所有天气API请求完成。
  // Promise.all 返回一个新的promise，该promise在所有给定的promises都已完成时解析，
  // 或者在任何一个promise被拒绝时拒绝。
  const weatherData = await Promise.all(request);

  // 遍历从API收到的每个天气数据响应。
  weatherData.forEach((value, index) => {
    // 将每个城市的天气数据赋值到 savedCities 数组的相应元素中。
    savedCities.value[index].weather = value.data;
  });
};

// 调用 getCities 函数，以便在组件加载时获取天气数据。
await getCities();

const router = useRouter();

const goToCityView = (city) => {
  router.push({
    name: "cityView",
    params: {
      country: city.country,
      adm1: city.adm1,
      name: city.name,
    },
    query: {
      locationId: city.locationId,
    },
  });
};
</script>

<template>
  <!--City List-->
  <div class="flex-grow">
    <div
      class="container grid gap-6 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    >
      <CityCard
        v-for="city in savedCities"
        :key="city.id"
        :city="city"
        @click="goToCityView(city)"
      />
    </div>
    <!--Empty State-->
    <div v-if="savedCities.length === 0" class="container">
      <p class="text-white">
        未添加任何城市或地区。要跟踪某个城市或地区的天气，请在上方的搜索框中搜索并添加。
      </p>
    </div>
  </div>
</template>