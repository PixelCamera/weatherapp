<script setup>
import { RouterLink } from "vue-router";
import Spacer from "@/components/global/Spacer.vue";
import HStack from "@/components/global/HStack.vue";
import BaseModal from "@/components/BaseModal.vue";

const appName = "本地天气";
</script>

<template>
  <!--Navigation-->
  <h-stack class="sticky px-8 py-6 text-white shadow-lg">
    <!--Logo & App Name -->
    <router-link :to="{ name: 'home' }">
      <h-stack class="gap-2">
        <i class="fa-solid fa-sun fa-spin text-2xl"></i>
        <p>{{ appName }}</p>
      </h-stack>
    </router-link>

    <!--Spacer-->
    <spacer />

    <!--Button -->
    <h-stack>
      <!--Info-->
      <i
        class="fa-solid fa-circle-info duration-150 hover:text-weather-secondary"
      ></i>
    </HStack>
  </HStack>
</template>
