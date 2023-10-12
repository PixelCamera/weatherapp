<script setup>
import axios from "axios";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import HStack from "@/components/global/HStack.vue";
import VStack from "@/components/global/VStack.vue";
import WeatherDetailCard from "@/views/CityView/components/WeatherDetailCard.vue";
import Divider from "@/components/global/Divider.vue";
import HourlyForecastCard from "@/views/CityView/components/HourlyForecastCard.vue";
import DailyForecastCard from "@/views/CityView/components/DailyForecastCard.vue";
import { uid } from "uid";

dayjs.locale("zh-cn"); // 使用中文语言包

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();

/**
 * 添加城市到 localStorage，同时去掉预览参数
 */
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    country: route.params.country,
    adm1: route.params.adm1,
    name: route.params.name,
    locationId: route.query.locationId,
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  router.replace({ query });
};

const removeCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const index = savedCities.value.findIndex(
    (city) => city.locationId === route.query.locationId,
  );
  savedCities.value.splice(index, 1);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  router.replace({ path: "/" });
};
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

// 格式化星期：“2023-10-01T17:00+08:00" -> "星期日"
const formatWeekday = (dateString) => {
  return dayjs(dateString).format("dddd");
};

// 格式化日期：“2023-10-01T17:00+08:00" -> "10-01"
const formatDate = (dateString) => {
  return dayjs(dateString).format("MM-DD");
};

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
  <div class="flex select-none flex-col items-center">
    <!--Preview Banner-->
    <div
      v-if="route.query.preview"
      class="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 p-3 text-center text-white opacity-90 shadow-lg duration-200 hover:-translate-y-0.5 hover:from-cyan-500 hover:via-teal-400 hover:to-emerald-500 hover:opacity-100 hover:shadow-xl"
    >
      <p>
        您当前正在预览该城市，点击
        <span
          class="m-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-emerald-500 duration-300 hover:-translate-y-0.5 hover:scale-125 hover:bg-yellow-400 hover:text-white active:scale-100"
          title="点击追踪此城市"
          @click="addCity"
        >
          <i class="fa-solid fa-plus"></i>
        </span>
        图标追踪此城市。
      </p>
    </div>

    <!--Remove Banner-->
    <div
      v-if="!route.query.preview"
      class="w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-500 p-3 text-center text-white opacity-90 shadow-lg duration-200 hover:-translate-y-0.5 hover:from-indigo-500 hover:via-violet-400 hover:to-purple-500 hover:opacity-100 hover:shadow-xl"
    >
      <p>
        您当前已经保存此城市，点击
        <span
          class="m-1 inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white text-violet-500 duration-300 hover:-translate-y-0.5 hover:scale-125 hover:bg-rose-500 hover:text-white active:scale-100"
          title="点击删除此城市"
          @click="removeCity"
        >
          <i class="fa-solid fa-trash"></i>
        </span>
        图标删除此城市。
      </p>
    </div>

    <!--Weather Overview-->
    <div class="flex flex-col items-center gap-10 py-12 text-white">
      <!--City Name & Update Time-->
      <VStack class="gap-2">
        <a
          :href="currentWeather.fxLink"
          class="group flex flex-row items-center gap-2 rounded px-4 py-2 duration-200 hover:-translate-y-2 hover:scale-110 hover:rounded-lg hover:bg-black hover:bg-opacity-20 hover:px-6 hover:shadow"
          target="_blank"
        >
          <span class="w-2"></span>
          <h1 class="text-4xl">{{ route.params.name }}</h1>
          <i
            class="fas fa-external-link-alt w-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          ></i>
        </a>

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
    <v-stack v-if="dailyForecast" class="w-full gap-1 px-2 py-4">
      <!--Title-->
      <h-stack class="w-full gap-2 px-8">
        <i class="fas fa-calendar text-lg text-neutral-100"></i>
        <h2 class="w-full text-sm text-neutral-100">每日气象</h2>
      </h-stack>

      <!--Cards Container-->
      <div
        class="grid w-full grid-cols-1 gap-3 p-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7"
      >
        <!--Cards-->
        <daily-forecast-card
          v-for="day in dailyForecast.daily"
          :key="day.fxDate"
          :date="formatDate(day.fxDate)"
          :iconClass="`qi-${day.iconDay}-fill`"
          :sunrise="day.sunrise"
          :sunset="day.sunset"
          :temp-max="day.tempMax"
          :temp-min="day.tempMin"
          :text="day.textDay"
          :weekday="formatWeekday(day.fxDate)"
        ></daily-forecast-card>
      </div>
    </v-stack>
  </div>
</template>