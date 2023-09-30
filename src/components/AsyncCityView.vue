<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRoute } from "vue-router";

const router = useRoute(); // 获取路由实例
const weatherData = ref(null); // 存储天气数据
const API_KEY = "7d0835ccc03346ffb8dc8e5525272f98"; // 和风天气 API 的密钥

// 获取天气数据
const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://devapi.qweather.com/v7/weather/now?location=${router.query.locationId}&key=${API_KEY}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

weatherData.value = await getWeatherData();
console.log(weatherData.value);
</script>

<template>
  <div v-if="weatherData">
    <h1>实时天气</h1>
    <p><strong>更新时间：</strong> {{ weatherData.updateTime }}</p>
    <p><strong>温度：</strong> {{ weatherData.now.temp }}°C</p>
    <p><strong>体感温度：</strong> {{ weatherData.now.feelsLike }}°C</p>
    <p><strong>天气：</strong> {{ weatherData.now.text }}</p>
    <p><strong>风向：</strong> {{ weatherData.now.windDir }}</p>
    <p><strong>风速：</strong> {{ weatherData.now.windSpeed }} km/h</p>
    <p><strong>湿度：</strong> {{ weatherData.now.humidity }}%</p>
    <p><strong>气压：</strong> {{ weatherData.now.pressure }} hPa</p>
    <p><strong>能见度：</strong> {{ weatherData.now.vis }} km</p>
    <a :href="weatherData.fxLink" target="_blank"> 查看更多天气信息 </a>
  </div>
  <div v-else>加载中...</div>
</template>