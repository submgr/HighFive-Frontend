<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
</script>

<style>
ion-title.title-large {
  font-size: min(1.8em, 55.2px) !important;
}
</style>
