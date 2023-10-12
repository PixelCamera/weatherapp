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
        class="fixed left-0 top-0 flex h-screen w-full justify-center bg-black bg-opacity-30 px-8"
    >
      <!--Modal-->
      <v-stack
          v-if="modalActive"
          class="my-32 h-fit max-w-screen-md rounded bg-white p-10 shadow-lg sm:my-16 sm:max-w-screen-lg sm:p-6"
      >
        <h-stack class="w-full gap-2">
          <Spacer/>
          <i
              class="fas fa-times text-black text-2xl  duration-200 hover:-translate-y-0.5 hover:scale-110 "
              @click="$emit('close')"
          >
          </i>
        </h-stack>
        <!--Slot-->
        <slot/>

        <!--Footer-->

      </v-stack>
    </div>
  </Teleport>
</template>
