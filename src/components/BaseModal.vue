<script setup>
import Spacer from "@/components/global/Spacer.vue";
import HStack from "@/components/global/HStack.vue";
import VStack from "@/components/global/VStack.vue";

const closeButtonText = "关闭"; // 按钮文字
</script>
<template>
  <!--Mask-->
  <div
    class="absolute left-0 top-0 flex h-screen w-full justify-center bg-black bg-opacity-30 px-8"
  >
    <!--Modal-->
    <v-stack class="m-32 max-w-screen-md self-start rounded bg-white p-10">
      <!--Slot-->
      <slot />

      <!--Footer-->
      <h-stack class="w-full gap-2">
        <Spacer />
        <button
          class="rounded bg-weather-primary px-6 py-2 text-white hover:bg-weather-secondary"
        >
          {{ closeButtonText }}
        </button>
      </h-stack>
    </v-stack>
  </div>
</template>