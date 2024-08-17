<template>
  <ion-page>
    <ion-content :fullscreen="true">

      <div v-if="!hasLoadCompleted" style="text-align: center; margin-top: 30vh;">
        <ion-spinner></ion-spinner>
      </div>

      <div style="margin-left: 15px; margin-right: 7vw; margin-top: 10vh;">
        <div id="VkIdSdkOneTap"></div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">

import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton } from '@ionic/vue';

import bridge from '@vkontakte/vk-bridge';

import globaldata from '../modules/global';

import {
  defineComponent,
  computed
} from 'vue';

import store from '../store/index';
const getUserData = computed(() => {
  return store.getters.getUserData;
});

import * as VKID from '@vkid/sdk';

export default defineComponent({
  name: 'Tab1Page',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton
  },
  methods: {
    runUserdataPetch() {
      this.$store.dispatch("fetchUserData").then(() => {
        //done! updated user's data so in other parts of app there will be updated information with New User's Premium Status!!! yay! :D
        console.log("User's data updated!");
        if (getUserData.value.fullname == null) {
          this.$router.push({ path: '/webapp/Profile/SetName', replace: true });
        } else {
          this.$router.push({ path: '/webapp/Home', replace: true });
        }
      });
    },
    executePrerequisites() {

      VKID.Config.set({
        app: 52163922,
        redirectUrl: 'https://highfive-backend.deqstudio.com/static/VKOneTapRedirect',
        responseMode: VKID.ConfigResponseMode.Redirect,
        mode: VKID.ConfigAuthMode.Redirect
      });

      switch (this.$globaldata.instanceInfo.platform) {
        case "VKMiniApps":
          bridge.send('VKWebAppInit');
          const fullURL = "https://frontend.highfive.deqstudio.com/?source=vkminiapps&eruda=true&vk_access_token_settings=&vk_app_id=8034418&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=mobile_web&vk_ref=other&vk_ts=1719137210&vk_user_id=253918170&sign=zjVRaKnwV4HDg5J-fImSATfDZsHIx6eVBTW-AhMYlOI" || window.location.href;
          this.$axios.get(this.$globaldata.api.hostname + 'service/auth_vkBridgeSign', {
            params: {
              app_url: fullURL // Replace YOUR_APP_URL_HERE with your actual app URL
            }
          })
            .then((response: AxiosResponse) => {
              // Handle successful response
              console.log(response.data); // Log or process the response data
              if (response.data.status == "okay") {
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('auth_userid', response.data.userid);
                setTimeout(() => {
                  this.runUserdataPetch();
                  this.hasLoadCompleted = true;
                }, 10);
              }
            })
            .catch((error: any) => {
              // Handle error
              console.error(error); // Log or process the error
            });
          break;
        case "Web":
          this.hasLoadCompleted = true;
          this.loadAuthProviders("Web");

          break;
        case "Mobile":
          this.hasLoadCompleted = true;
          this.loadAuthProviders("Mobile");

          break;
        default:

          this.hasLoadCompleted = true;
          this.loadAuthProviders("default");

          break;
      }



    },
    loadAuthProviders(platform = "") {
      const oneTap = new VKID.OneTap();

      const container = document.getElementById('VkIdSdkOneTap');

      if (container) {
        oneTap
          .render({ container })
          .on(VKID.WidgetEvents.ERROR, console.error);
      }
    }
  },
  data() {
    return {
      hasLoadCompleted: false,
      manualAuthRequired: false,
    }
  },
  setup() {
    return {
    }
  },
  mounted() {
    this.executePrerequisites();
  }
});
</script>

<style scoped></style>