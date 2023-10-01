<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import HStack from "@/components/global/HStack.vue";
import VStack from "@/components/global/VStack.vue";
import WeatherDetailCard from "@/views/CityView/components/WeatherDetailCard.vue";
import Divider from "@/components/global/Divider.vue";
import HourlyForecastCard from "@/views/CityView/components/HourlyForecastCard.vue"; // 导入中文语言包
dayjs.locale("zh-cn"); // 使用中文语言包

const route = useRoute(); // 获取路由实例

// 和风天气 API 的密钥
const API_KEY = "7d0835ccc03346ffb8dc8e5525272f98";

// 存储天气数据
const currentWeather = ref(); //实时天气预报
const dailyForecast = ref(null); // 每日天气预报
const hourlyForecast = ref(null); // 每小时天气预报

// 格式化日期： "2023-10-01T16:07+08:00" -> "2023-10-01 16:07 星期日"
const formatDateTime = (dateString) => {
  return dayjs(dateString).format("YYYY-MM-DD HH:mm dddd");
};

// 格式化时间：“2023-10-01T17:00+08:00" -> "5PM"
const formatHour = (dateString) => {
  return dayjs(dateString).format("HH:mm");
};

// 格式化星期

// 定义天气详情卡片的数据，包括图标、标签和值

const weatherItems = computed(() => {
  if (!currentWeather.value) {
    return [];
  }
  return [
    {
      icon: "fas fa-wind",
      label: "风向",
      value: currentWeather.value.now.windDir,
    },
    {
      icon: "fas fa-compass",
      label: "风向角度",
      value: currentWeather.value.now.wind360 + "°",
    },
    {
      icon: "fas fa-fan",
      label: "风力等级",
      value: currentWeather.value.now.windScale,
    },
    {
      icon: "fas fa-wind",
      label: "风速",
      value: currentWeather.value.now.windSpeed + "km/h",
    },
    {
      icon: "fas fa-tint",
      label: "湿度",
      value: currentWeather.value.now.humidity + "%",
    },
    {
      icon: "fas fa-gauge",
      label: "气压",
      value: currentWeather.value.now.pressure + "hPa",
    },
    {
      icon: "fas fa-eye",
      label: "能见度",
      value: currentWeather.value.now.vis + "km",
    },
    {
      icon: "fas fa-cloud-rain",
      label: "降水量",
      value: currentWeather.value.now.precip + "mm",
    },
    {
      icon: "fas fa-cloud",
      label: "云量",
      value: currentWeather.value.now.cloud + "%",
    },
    {
      icon: "fas fa-temperature-low",
      label: "露点温度",
      value: currentWeather.value.now.dew + "°C",
    },
    {
      icon: "fas fa-thermometer-half",
      label: "体感温度",
      value: currentWeather.value.now.feelsLike + "°C",
    },
    {
      icon: "fas fa-temperature-high",
      label: "实时温度",
      value: currentWeather.value.now.temp + "°C",
    },
  ];
});

// 实时天气预报：https://dev.qweather.com/docs/api/weather/weather-now/
const getCurrentWeather = async (id) => {
  try {
    const response = await axios.get(
      `https://devapi.qweather.com/v7/weather/now?location=${id}&key=${API_KEY}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 每日天气预报：https://dev.qweather.com/docs/api/weather/weather-daily-forecast/
const getDailyForecast = async (id) => {
  try {
    const response = await axios.get(
      `https://devapi.qweather.com/v7/weather/7d?location=${id}&key=${API_KEY}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

// 每小时天气预报：https://dev.qweather.com/docs/api/weather/weather-hourly-forecast/
const getHourlyForecast = async (id) => {
  try {
    const response = await axios.get(
      `https://devapi.qweather.com/v7/weather/24h?location=${id}&key=${API_KEY}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const locationID = route.query.locationId;
currentWeather.value = await getCurrentWeather(locationID);
dailyForecast.value = await getDailyForecast(locationID);
hourlyForecast.value = await getHourlyForecast(locationID);
</script>

<template>
  <div class="flex flex-col items-center">
    <!--Banner-->
    <div class="w-full bg-weather-secondary p-4 text-center text-white">
      <p>
        您当前正在预览该城市，点击
        <i class="fa-solid fa-plus hover:text-neutral-200"></i>
        图标开始追踪此城市。
      </p>
    </div>

    <!--Weather Overview-->
    <div class="flex flex-col items-center gap-10 py-12 text-white">
      <!--City Name & Update Time-->
      <VStack class="gap-2">
        <h1 class="text-4xl">{{ route.params.name }}</h1>
        <p class="text-sm">{{ formatDateTime(currentWeather.updateTime) }}</p>
      </VStack>

      <!--Weather Icon & Temperature-->
      <HStack class="gap-4">
        <i
          :class="'qi-' + currentWeather.now.icon + '-fill'"
          class="text-6xl"
        ></i>
        <p class="text-6xl">{{ Math.round(currentWeather.now.temp) }}°</p>
      </HStack>

      <!--Weather Description-->
      <p>
        天气{{ currentWeather.now.text }}，体感温度约为
        {{ Math.round(currentWeather.now.feelsLike) }}°C。
      </p>
    </div>

    <Divider />
    <!--Weather Details-->
    <v-stack v-if="currentWeather" class="w-full gap-1 px-2 py-4">
      <!--Title-->
      <h-stack class="w-full gap-2 px-8">
        <i
          :class="'qi-' + currentWeather.now.icon + '-fill'"
          class="text-lg text-neutral-100"
        ></i>
        <h2 class="w-full text-sm text-neutral-100">实时天气</h2>
      </h-stack>
      <!--Cards-->
      <div class="flex w-full flex-wrap justify-center gap-3 p-4">
        <weather-detail-card
          v-for="item in weatherItems"
          :key="item.label"
          :iconClass="item.icon"
          :label="item.label"
          :value="item.value"
        />
      </div>
    </v-stack>
    <Divider />
    <!--Hourly Forecast-->
    <v-stack v-if="hourlyForecast" class="w-full gap-1 px-2 py-4">
      <!--Title-->
      <h-stack class="w-full gap-2 px-8">
        <i class="fas fa-clock text-lg text-neutral-100"></i>
        <h2 class="w-full text-sm text-neutral-100">小时预报</h2>
      </h-stack>
      <!--Cards-->
      <h-stack class="w-full gap-3 overflow-auto p-4">
        <hourly-forecast-card
          v-for="hour in hourlyForecast.hourly"
          :key="hour.fxTime"
          :iconClass="`qi-${hour.icon}-fill`"
          :temp="hour.temp"
          :text="hour.text"
          :time="formatHour(hour.fxTime)"
        />
      </h-stack>
    </v-stack>

    <Divider />

    <!--Daily Forecast-->
    <div v-if="dailyForecast" class="container mx-auto py-4">
      <h2 class="mb-4 text-2xl font-bold">每日天气预报</h2>
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="day in dailyForecast.daily"
          :key="day.fxDate"
          class="rounded-lg border p-4"
        >
          <h3 class="text-xl font-bold">
            {{ day.fxDate | formatDate }}
          </h3>
          <div class="mt-2 flex items-center">
            <i :class="`qi-${day.iconDay}`" class="text-4xl"></i>
            <div class="ml-4">
              <p>{{ day.textDay }}</p>
              <p class="font-bold">{{ day.tempMax }}° / {{ day.tempMin }}°</p>
            </div>
          </div>
          <p class="mt-2"><strong>日出:</strong> {{ day.sunrise }}</p>
          <p><strong>日落:</strong> {{ day.sunset }}</p>
          <p><strong>风向:</strong> {{ day.windDirDay }}</p>
          <p><strong>风速:</strong> {{ day.windSpeedDay }} m/s</p>
          <p><strong>湿度:</strong> {{ day.humidity }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>