<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

const userQuery = ref(""); // 用户输入的城市查询字符串
const searchResults = ref([]); // 存储城市搜索结果
const searchTimeoutId = ref(null); // 存储查询定时器的 ID
const error = ref(null); // 存储搜索错误信息
const API_KEY = "7d0835ccc03346ffb8dc8e5525272f98"; // 和风天气 API 的密钥
const SEARCH_DELAY = 1000; // 设置查询延迟时间（毫秒）

// 清除现有的查询定时器
const clearExistingTimeout = () => {
  if (searchTimeoutId.value) {
    clearTimeout(searchTimeoutId.value);
  }
};

// 检查查询字符串是否为空
const isQueryEmpty = () => userQuery.value === "";

// 处理API的响应数据
const handleApiResponse = (data) => {
  // 如果API返回的code是200，说明获取数据成功
  if (data.code === "200") {
    searchResults.value = data.location; // 更新搜索结果
    error.value = null; // 清除任何先前的错误消息
    return;
  }

  // 如果API返回的code是404，说明没有找到匹配的城市或地区
  if (data.code === "404") {
    searchResults.value = []; // 清空搜索结果
    error.value = "未找到匹配的城市或地区，请重新输入"; // 设置特定的错误消息
    return;
  }

  // 对于其它错误代码，设置一个通用的错误消息
  searchResults.value = [];
  error.value = "服务器错误，请稍后再试";
};

// 处理API请求过程中出现的错误
const handleApiError = () => {
  searchResults.value = []; // 清空搜索结果
  error.value = "网络错误，请检查你的网络连接或稍后再试"; // 设置网络错误的消息
};

// 主函数，用于获取搜索结果
const getSearchResults = () => {
  clearExistingTimeout(); // 清除现有的定时器

  // 如果查询字符串为空，则清空搜索结果并返回
  if (isQueryEmpty()) {
    searchResults.value = null;
    error.value = null;
    return;
  }

  // 请求数据，使用setTimeout来实现防抖功能，减少不必要的API调用
  searchTimeoutId.value = setTimeout(async () => {
    try {
      // 异步请求API并获取响应
      const response = await axios.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${userQuery.value}&key=${API_KEY}`,
      );

      // 处理API响应数据
      handleApiResponse(response.data);
    } catch (error) {
      // 如果在请求过程中出现错误，处理API错误
      handleApiError(error);
    }
  }, SEARCH_DELAY); // 设置延迟时间
};

//通过路由参数传递城市信息
const previewCity = (data) => {
  router.push({
    name: "cityView",
    params: {
      country: data.country,
      adm1: data.adm1,
      name: data.name,
    },
    query: {
      locationId: data.id,
      preview: true,
    },
  });
};
</script>
<template>
  <div>
    <div class="container mb-8 pt-4 text-white">
      <!--Search Bar-->
      <input
        v-model="userQuery"
        class="w-full border-b bg-transparent px-2 py-1 transition focus:border-weather-secondary focus:shadow-[0_1px_0_0_#004E71] focus:outline-none"
        placeholder="搜索城市或地区"
        type="text"
        @input="getSearchResults"
      />
      <!--Search Results-->
      <ul class="w-full rounded bg-weather-secondary shadow-md">
        <!--Search Error-->
        <li v-if="error" class="px-2 py-2 hover:bg-weather-primary">
          {{ error }}
        </li>
        <!--Display Search Results-->
        <li
          v-for="item in searchResults"
          v-else
          :key="item.id"
          class="cursor-pointer rounded px-2 py-2 duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:bg-weather-primary hover:shadow-2xl hover:ring-2 hover:ring-neutral-200"
          @click="previewCity(item)"
        >
          {{ item.name }} - {{ item.adm1 }} - {{ item.country }}
        </li>
      </ul>
    </div>
  </div>
</template>