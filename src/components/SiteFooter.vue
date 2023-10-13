<template>
  <!--Copyright section-->
  <footer
      class="mt-8 flex flex-col items-center justify-center gap-1 bg-black bg-opacity-10 py-6 text-sm text-neutral-200 md:flex-row md:gap-4"
  >
    <h-Stack class="gap-1">
      <span>© 2023 Copyright</span>
      <a
          class="font-semibold hover:underline"
          href="https://github.com/PixelCamera"
          target="_blank"
      >PixelCamera</a
      >
    </h-Stack>
    <h-stack class="gap-1">
      <span>Powered by</span>
      <a
          class="font-semibold hover:underline"
          href="https://www.qweather.com"
          target="_blank"
      >QWeather</a
      >
    </h-stack>
  </footer>
</template>
<script setup>
import HStack from "@/components/global/HStack.vue";
</script>
