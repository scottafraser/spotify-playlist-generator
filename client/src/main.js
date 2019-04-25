import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import Spotify from "spotify-web-api-node";
import VueSpotify from "vue-spotify";

Vue.config.productionTip = false;

Vue.use(VueSpotify, new Spotify());

new Vue({
  render: h => h(App)
}).$mount("#app");
