<script setup>
import HStack from "@/components/global/HStack.vue";
import VStack from "@/components/global/VStack.vue";

defineProps({
  date: String,
  weekday: String,
  iconClass: String,
  text: String,
  sunrise: String,
  sunset: String,
  tempMax: String,
  tempMin: String,
});
</script>

<template>
  <!--Cards-->
  <h-stack
      class="rounded-lg bg-white bg-opacity-5 p-4 text-neutral-100 duration-200 hover:-translate-y-2 hover:cursor-pointer hover:bg-white hover:bg-opacity-20 hover:text-white hover:shadow-2xl hover:ring-2 hover:ring-neutral-200 lg:flex-col"
  >
    <!--Date & Weekday-->
    <div class="text-md basis-1/4 font-bold flex flex-wrap gap-1 justify-center">
      <p>{{ date }}</p>
      <p>{{ weekday }}</p>
    </div>

    <!--Weather Icon & Sunrise/Sunset-->
    <v-stack class="basis-1/2 gap-1">
      <!--Weather Icon & Text -->
      <h-stack class="gap-3">
        <i :class="iconClass" class="text-3xl"></i>
        <p>{{ text }}</p>
      </h-stack>

      <!--Sunrise & Sunset-->
      <h-stack class="gap-2">
        <h-stack class="gap-1">
          <i class="fas fa-sun text-yellow-400"></i>
          <p class="text-sm">{{ sunrise }}</p>
        </h-stack>
        <h-stack class="gap-1">
          <i class="fas fa-moon text-yellow-400"></i>
          <p class="text-sm">{{ sunset }}</p>
        </h-stack>
      </h-stack>
    </v-stack>

    <!--Temperature-->
    <p class="text-md basis-1/4 text-right font-bold">
      {{ tempMax }}° / {{ tempMin }}°
    </p>
  </h-stack>
</template>