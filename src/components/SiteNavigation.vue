<script setup>
import { RouterLink } from "vue-router";
import Spacer from "@/components/global/Spacer.vue";
import HStack from "@/components/global/HStack.vue";
import BaseModal from "@/components/BaseModal.vue";
import { ref } from "vue";

const appName = "本地天气"; // 应用名称
const modalActive = ref(null); // 是否显示模态框
const toggleModal = () => {
  modalActive.value = !modalActive.value; // 切换模态框显示状态
};
</script>

<template>
  <!--Navigation-->
  <h-stack class="sticky px-10 py-6 text-white shadow-lg">
    <!--LEFT AREA: Logo & App Name -->
    <router-link :to="{ name: 'home' }">
      <h-stack class="gap-3">
        <i class="fa-solid fa-sun fa-spin text-2xl"></i>
        <p>{{ appName }}</p>
      </h-stack>
    </router-link>

    <!--Spacer-->
    <spacer />

    <!--RIGHT AREA: Icon Button -->
    <h-stack class="gap-6">
      <!--Circle Info Icon-->
      <i
        class="fa-solid fa-circle-info text-2xl duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-neutral-200"
        @click="toggleModal"
      ></i>
      <!--Plus Icon-->
      <i
        class="fa-solid fa-plus text-2xl duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-neutral-200"
      ></i>
      <!--BaseModal-->
      <base-modal :modal-active="modalActive" @close="toggleModal">
        <!--Modal Content-->
        <div class="flex flex-col gap-2 text-black">
          <h1
            class="mb-4 text-2xl font-bold underline decoration-weather-primary decoration-4 underline-offset-8"
          >
            关于
          </h1>
          <p class="mb-4">
            “{{ appName }}”允许您跟踪您选择的城市的当前和未来天气。
          </p>
          <h-stack class="gap-2"
            ><i
              class="fa-solid fa-circle-question fa-beat w-6 text-2xl text-weather-primary"
            ></i>
            <h2 class="text-xl font-bold">如何使用</h2></h-stack
          >
          <ol class="mb-4 list-inside list-decimal">
            <li>通过在搜索栏中输入名称来搜索您的城市。</li>
            <li>在结果中选择一个城市，这将带您查看所选城市的当前天气。</li>
            <li>
              通过点击右上角的“+”图标来跟踪该城市。这将保存该城市，以便稍后在主页上查看。
            </li>
          </ol>

          <h-stack class="gap-2"
            ><i class="fa-solid fa-trash fa-beat w-6 text-2xl text-red-600"></i>
            <h2 class="text-xl font-bold">删除城市</h2></h-stack
          >
          <p class="mb-4">
            如果您不再希望跟踪某个城市，只需在主页上选择该城市。
            在页面底部，将有一个删除城市的选项。
          </p>
        </div>
      </base-modal>
    </h-stack>
  </h-stack>
</template>