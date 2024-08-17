<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tab 1</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Пункт волонтера</ion-title>
        </ion-toolbar>
      </ion-header>

      <div v-if="!hasLoadFinished" style="text-align: center; margin-top: 30vh;">
        <ion-spinner></ion-spinner>
      </div>
      <div else>
        <RequestPreviewCard v-for="request in requestsToDisplay" :key="request.id" :request="request"
          @click.native="goToRequest(request.id)" />
      </div>

      <div v-if="hasLoadFinished && (requestsToDisplay == 'NetworkError' || requestsToDisplay === undefined)"
        style="text-align: center; margin-top: 30vh; margin-left: 6vw; margin-right: 6vw;">
        <p style="font-size: 18px; font-weight: 600;">Ошибка сервера
          <br /><br />
        <p style="font-weight: 400; line-height: 1.7 !important; font-size: 14px;">Сервер не вернул
          данные.<br />Попробуйте еще раз через
          пару минут.</p>
        </p>


        <button @click="getDataFromServer" id="accept_btn_id${i}"
          style="height: 42px; line-height: 15px; margin-bottom: 12px; width: 100%;"
          class="btn btn-full btn-m font-11 font-600 rounded-sm gradient-highlight">Повторить запрос</button>
      </div>



      <!-- Floating Action Button -->
      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="addNewEntry">
          <ion-icon :icon="addOutline"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import RequestPreviewCard from '@/components/RequestPreviewCard.vue';

import { addOutline } from 'ionicons/icons';

import { getAllVolunteerRequestData } from '../../modules/getRequestData.ts';
import {
  defineComponent
} from 'vue';
import axios from 'axios';

export default defineComponent({
  name: 'Tab1Page',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, RequestPreviewCard,
    IonFab, IonFabButton, IonIcon // Make sure to import IonFab, IonFabButton, and IonIcon
  },
  mounted() {
    // eslint-disable-next-line
    const parent_this = this;

    this.getDataFromServer();
  },
  methods: {
    goToRequest(id: number) {
      // Implement the logic to navigate to the request details page
      console.log('Go to request with id:', id);
      this.$router.push(`/webapp/Volunteer/ViewRequest/${id}`);
    },
    addNewEntry() {
      // Implement the logic to add a new entry
      // For example, navigate to a new page or open a modal
      console.log('Add new entry');
    },
    async getDataFromServer() {
      this.requestsToDisplay = await getAllVolunteerRequestData(this);
      this.hasLoadFinished = true;

    }
  },
  data() {
    return {
      addOutline,
      hasLoadFinished: false,
      requestsToDisplay: [

      ]
    }
  },
  setup() {
    return {
    }
  }
});
</script>

<style scoped></style>