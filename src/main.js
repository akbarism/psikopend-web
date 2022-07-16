import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./assets/css/style.css";
import "./plugins/Dayjs";

import viewImage from "./components/base/viewImage.vue";

Vue.component('viewImage',viewImage);

import Vue2Editor from "vue2-editor";
Vue.use(Vue2Editor);
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
const options = {
  draggable: true,
  timeout: 5000,
};
Vue.use(Toast, options);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
