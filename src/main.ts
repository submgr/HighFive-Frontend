import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* app kit mobile imports */
import './assets/css/appkit_mobile/styles/bootstrap.css';
import './assets/css/appkit_mobile/styles/style.css';

import store from "./store";

import globaldata from './modules/global';

const urlParams = new URLSearchParams(window.location.search);
const isVKMiniApps = urlParams.get('isVKMiniApps');
if (isVKMiniApps === 'true') {
  localStorage.setItem('instanceInfo_Platform', 'VKMiniApps');
  globaldata.functions.updateInstanceInfoField("platform", "VKMiniApps")
}else{
  localStorage.setItem('instanceInfo_Platform', 'regular');
}

import Axios from 'axios';

// Assuming Axios and store are already imported

// Create a request interceptor
Axios.interceptors.request.use((config) => {
  const userData = store.getters.getUserData;

  if (config.url && userData && userData.id && userData.token) {
    if (config.method?.toUpperCase() === 'POST') {
      config.headers['Content-Type'] = 'application/json';
      // Ensure the body is an object (for JSON bodies)
      if (!config.data) config.data = {};
      let data = {};
      try {
        // Attempt to parse if data is a JSON string
        data = JSON.parse(config.data);
      } catch {
        // If not a JSON string, use as is
        data = config.data;
      }

      // Append user_id and token if not already present
      if (!data.user_id && !data.token) {
        data.user_id = userData.id;
        data.token = userData.token;
        // Reassign the modified data back to config.data
        config.data = JSON.stringify(data); // Assuming the content type is application/json
      }
    } else {
      // Original logic for non-POST requests
      const url = new URL(config.url, window.location.origin);
      if (!url.searchParams.has('user_id') && !url.searchParams.has('token')) {
        url.searchParams.append('user_id', userData.id);
        url.searchParams.append('token', userData.token);
        config.url = url.toString();
      }
    }
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// The rest of your setup remains unchanged

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(store);

// Attach Axios to the Vue instance as a global property
app.config.globalProperties.$axios = Axios;

// Attach globaldata to the Vue instance as a global property
app.config.globalProperties.$globaldata = globaldata;

router.isReady().then(() => {
  app.mount('#app');
});
