<script setup>
import {RouterView} from "vue-router";
import SiteNavigation from "@/components/SiteNavigation.vue";
import SiteFooter from "@/components/SiteFooter.vue";
</script>

<template>
  <div class="flex min-h-screen w-full flex-col bg-weather-primary font-Roboto">
    <site-navigation/>
    <router-view v-slot="{ Component }" class="flex-1">
      <transition mode="in-out" name="page">
        <Component :is="Component"/>
      </transition>
    </router-view>

    <site-footer/>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: 600ms ease all;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
