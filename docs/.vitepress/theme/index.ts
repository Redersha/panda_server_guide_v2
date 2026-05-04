import DefaultTheme from "vitepress/theme";
import ServerStatus from "./components/ServerStatus.vue";
import "./style/index.css"; //引入自定义的样式

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ServerStatus', ServerStatus);
  },
};