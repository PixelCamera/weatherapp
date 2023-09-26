<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "@/components/SiteNavigation.vue";
</script>

<template>
  <div class="font-Roboto bg-weather-primary flex min-h-screen flex-col">
    <SiteNavigation />
    <RouterView />
  </div>
</template>
