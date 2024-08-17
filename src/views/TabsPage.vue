<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/webapp/Home">
          <ion-icon aria-hidden="true" :icon="triangle" />
          <ion-label>Главная</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/webapp/Beneficiary/MyRequests">
          <ion-icon aria-hidden="true" :icon="ellipse" />
          <ion-label>Получить помощь</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/webapp/Volunteer/MyRequests">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>Помочь другим</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab4" href="/webapp/AboutApp">
          <ion-icon aria-hidden="true" :icon="square" />
          <ion-label>О приложении</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square, triangle } from 'ionicons/icons';
</script>
