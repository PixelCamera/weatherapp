<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "@/components/SiteNavigation.vue";
import BaseModal from "@/components/BaseModal.vue";
</script>

<template>
  <div class="flex min-h-screen flex-col bg-weather-primary font-Roboto">
    <site-navigation />
    <router-view />
  </div>
</template>
