import "@/assets/tailwind.css"; // 导入 tailwindcss 样式
import { createApp } from "vue";
import App from "./App.vue";

import router from "@/router/index.js";

const app = createApp(App);

app.use(router);

app.mount("#app");
