/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 自定义颜色
      colors: {
        "weather-primary": "#00668A",
        "weather-secondary": "#004E71",
      },
      // 自定义字体
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
      },
      // 自定义布局
      container: {
        padding: "2rem",
        center: true,
      },
      // 自定义屏幕尺寸
      screens: {
        sm: "640px",
        md: "768px",
      },
    },
  },
  plugins: [],
};
