import DefaultTheme from "vitepress/theme";
import ServerStatus from "./components/ServerStatus.vue";
import LiquidGlass from "./components/LiquidGlass.vue";
import PhotoAlbum from "./components/PhotoAlbum.vue";
import "./style/index.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ServerStatus', ServerStatus);
    app.component('LiquidGlass', LiquidGlass);
    app.component('PhotoAlbum', PhotoAlbum);
  },
};