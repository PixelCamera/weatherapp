<script setup>
import Spacer from "@/components/global/Spacer.vue";
import HStack from "@/components/global/HStack.vue";
import VStack from "@/components/global/VStack.vue";

defineProps({
  modalActive: {
    // 是否显示模态框
    type: Boolean,
    default: false,
  },
});
defineEmits(["close"]);
const closeButtonText = "关闭"; // 按钮文字
</script>
<template>
  <!--Teleport将模态框移动到body元素中，以便它不会受到父元素的z-index影响。-->
  <Teleport to="body">
    <!--Mask-->
    <div
      v-show="modalActive"
      class="absolute left-0 top-0 flex h-screen w-full justify-center bg-black bg-opacity-30 px-8 transition"
    >
      <!--Modal-->
      <v-stack
        v-if="modalActive"
        class="m-32 max-w-screen-md self-start rounded bg-white p-10 shadow-lg"
      >
        <!--Slot-->
        <slot />

        <!--Footer-->
        <h-stack class="w-full gap-2">
          <Spacer />
          <button
            class="rounded bg-weather-primary px-6 py-2 text-white hover:bg-weather-secondary"
            @click="$emit('close')"
          >
            {{ closeButtonText }}
          </button>
        </h-stack>
      </v-stack>
    </div>
  </Teleport>
</template>