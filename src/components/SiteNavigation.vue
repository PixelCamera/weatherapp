<script setup>
import { RouterLink } from "vue-router";
import Spacer from "@/components/Spacer.vue";
import HStack from "@/components/HStack.vue";

const appName = "The Local Weather";
</script>

<template>
  <!--顶部导航组件-->
  <HStack class="sticky px-8 py-6 text-white shadow-lg">
    <!--导航左侧：Logo + app name，点击跳转至首页 -->
    <RouterLink :to="{ name: 'home' }">
      <HStack class="gap-2">
        <i class="fa-solid fa-sun fa-spin text-2xl"></i>
        <p>{{ appName }}</p>
      </HStack>
    </RouterLink>

    <!--Spacer 组件，占位+控制布局-->
    <Spacer />

    <!--导航右侧：按钮 -->
    <HStack>
      <i
        class="fa-solid fa-circle-info hover:text-weather-secondary duration-150"
      ></i>
    </HStack>
  </HStack>
</template>
