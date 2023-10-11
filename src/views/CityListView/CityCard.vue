<script setup>
import { defineProps, onMounted, onUnmounted, ref } from "vue";
import VStack from "@/components/global/VStack.vue";
import HStack from "@/components/global/HStack.vue";
import Spacer from "@/components/global/Spacer.vue";

// 定义传入的城市对象属性
const props = defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

// 更新时间的属性
const timeDifference = ref("");

// 计算时间差的函数
const calculateTimeDifference = () => {
  const now = new Date();
  const then = new Date(props.city.weather.updateTime);
  const diffInMilliseconds = now - then;
  const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
  if (diffInMinutes < 1) {
    timeDifference.value = `刚刚`;
  } else if (diffInMinutes < 60) {
    timeDifference.value = `${diffInMinutes} 分钟前`;
  } else {
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      timeDifference.value = `${diffInHours} 小时前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      timeDifference.value = `${diffInDays} 天前`;
    }
  }
};
let intervalId;

onMounted(() => {
  calculateTimeDifference();
  intervalId = setInterval(calculateTimeDifference, 60000);
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <h-stack
    class="select-none gap-4 rounded-xl bg-white bg-opacity-5 px-6 py-4 text-neutral-100 shadow-lg duration-200 hover:-translate-y-0.5 hover:scale-105 hover:cursor-pointer hover:bg-opacity-20 hover:text-white hover:shadow-2xl hover:ring-2 hover:ring-neutral-200"
  >
    <!-- Left Section -->
    <v-stack class="w gap-4">
      <v-stack class="w-full gap-1">
        <p class="w-full text-3xl font-bold">{{ city.name }}</p>
        <p class="w-full text-sm">{{ city.adm1 }}, {{ city.country }}</p>
      </v-stack>
      <spacer />
      <h-stack class="w-full gap-2">
        <i :class="'qi-' + city.weather.now.icon + '-fill text-2xl'"></i>
        <p class="text-sm">{{ city.weather.now.text }}</p>
      </h-stack>
    </v-stack>
    <spacer />
    <!--Right Section-->
    <v-stack class="h-full">
      <p class="w-full text-right text-6xl font-bold">
        {{ city.weather.now.temp }}°
      </p>
      <spacer />

      <div :key="timeDifference" class="w-full text-right text-sm">
        {{ timeDifference }}
      </div>

      <p class="w-full text-right text-sm">{{ city.weather.updateTime }}</p>
    </v-stack>
  </h-stack>
</template>