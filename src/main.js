import App from "./App.vue";
import { createApp } from "vue";
import router from "./router";
import "qweather-icons/font/qweather-icons.css"; // 引入和风天气图标库
import "./assets/tailwind.css"; // 导入 tailwindcss 样式

const app = createApp(App);

app.use(router);

app.mount("#app");
