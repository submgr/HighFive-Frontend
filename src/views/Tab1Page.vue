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
          <ion-title size="large">Ваши заявки</ion-title>
        </ion-toolbar>
      </ion-header>

      <div class="card card-style bg-black"
        style="background-image:url('/admin/assets/media/svg/shapes/wave-bg-dark.svg'); background-attachment: fixed; background-size: 30%; background-repeat: no-repeat; background-position: right bottom !important; height: 200px; margin-top: 20px;"
        data-card-height="250">
        <div class="card-top p-3">
          <div class="d-flex">
            <div>
              <h6 id="data_assignedvolunteer_text" class="font-400 color-white font-11 pt-1" style="white-space: pre;">

              </h6>

            </div>
            <div class="ms-auto" style="text-align: right;">
              <h6 class="font-500 color-white font-11 pt-1 mb-0">Заявка</h6>
              <h5 class="font-20 mb-1 color-white pt-1">№ <span id="data_requestid">

                </span></h5>
            </div>
          </div>
        </div>
        <div class="card-bottom p-3 pb-2">
          <h1 class="color-white mb-0 line-height-m">
            <span id="data_title">

            </span>
          </h1>
          <div class="d-flex">
            <div>
              <h5 class="font-12 color-white font-500 pb-2 pt-2 mb-0"><i
                  class="fa bi bi-app-indicator color-blue-dark pe-1"></i>
                <span id="data_grade">
                </span>
              </h5>
            </div>
            <div class="ms-auto">
              <h5 class="font-12 color-white font-500 pb-h2 pt-2 mb-0"><span id="data_requeststatus"></span></h5>
            </div>
          </div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
</script>
