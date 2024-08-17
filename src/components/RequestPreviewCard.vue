<template>

  <div class="card card-style bg-black"
    style="background-image:url('/assets/graphics/wave-bg-purple.svg'); background-size: cover; /* Cover the entire area of the element */
  background-position: center; /* Center the background image */ background-attachment: fixed; background-size: 45%; background-repeat: no-repeat; background-position: right bottom !important; height: 200px; margin-top: 20px;"
    data-card-height="200">
    <div class="card-top p-3">
      <div class="d-flex">
        <div>
          <h6 id="data_assignedvolunteer_text" class="font-600 color-white font-18 pt-1" style="white-space: pre;">
            <i class="bi far fa-compass color-yellow-dark pe-1"></i>
            <span class="color-yellow-dark">
              {{ statuses[request.status].text }}<br />
            </span>
          </h6>

          <img id="data_assignedvolunteer_img" :src="request.volunteer_avatar" style="margin-top: 10px;"
            class="rounded-xl border border-gray-dark bg-green-dark" width="60">

        </div>
        <div class="ms-auto" style="text-align: right;">
          <h6 class="font-500 color-white font-11 pt-1 mb-0">Заявка</h6>
          <h5 class="font-20 mb-1 color-white pt-1">№ <span id="data_requestid">
              {{ request.id }}
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
          <button @click="catchRequest" v-if="request.availableForCatch" href="#" id="accept_btn_id${i}"
            style="height: 42px; line-height: 15px; margin-bottom: 12px;"
            class="btn btn-full btn-m font-11 font-600 rounded-sm gradient-highlight">Взять в работу</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, toastController } from '@ionic/vue';

import { hourglassOutline, closeCircleOutline, rocketOutline, checkmarkOutline } from 'ionicons/icons';

import {
  defineComponent
} from 'vue';

export default defineComponent({
  name: 'Tab1Page',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent
  },
  props: {
    // Define a prop named 'request'. The type can be specified as well.
    request: {
      type: Object, // Specify the type, e.g., Object, String, Number, etc.
      required: true, // Whether this prop is required or optional
      // default: () => ({}) // You can also provide a default value if it's optional
    }
  },
  methods: {
    async catchRequest() {
      const response = await this.$axios.get(this.$globaldata.api.hostname + 'access/volunteer/requests/pickup', {
        params: {
          //params here
          request_id: this.request.id
        }
      }).catch((error: any) => {
        // Handle error
        console.error(error); // Log or process the error
      });

      // Assuming response.data.result is the array of requests
      const data = response.data;

      if(data.result.affectedRows > 0){
        this.showToast("success", "Теперь вы волонтер заявки №" + this.request.id)
        setTimeout(() => {
          this.$router.push(`/webapp/Volunteer/ViewRequest/${this.request.id}`);
        }, 1000);
      }else{
        this.showToast();
      }
      
    },
    async showToast(type = "error", message = "Unknown error") {
      const toast = await toastController.create({
        message: message,
        duration: 4000,
        position: 'top',
        color: type === "error" ? "danger" : "success"
      });

      await toast.present();
    }
  },
  data() {
    return {
      statuses: {
        "open": {
          text: "Поиск волонтера",
          color: "yellow",
          iconClass: "bi fa bi-hourglass color-yellow-dark font-14 pe-1"
        },
        "inprogress": {
          text: "В процессе",
          color: hourglassOutline,
          iconClass: "bi fa bi-hourglass color-yellow-dark font-14 pe-1"
        },
        "canceled": {
          text: "Отменена",
          color: closeCircleOutline,
          iconClass: "bi fa bi-hourglass color-yellow-dark font-14 pe-1"
        },
        "completed": {
          text: "Завершена",
          color: checkmarkOutline,
          iconClass: "bi fa bi-hourglass color-yellow-dark font-14 pe-1"
        }
      }
    }
  },
  mounted() {
    // eslint-disable-next-line
    const parent_this = this;


  },
  setup() {
    return {
    }
  }
});
</script>

<style scoped>
.card-style {
  position: relative;
  /* Required for pseudo-element positioning */
}

.card-style::before {
  content: '';
  /* Required for pseudo-elements */
  position: absolute;
  /* Position relative to .card-style */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  /* Semi-transparent black */
  z-index: 1;
  /* Ensure it's above the background image but below content */
}

/* Ensure content is above the overlay */
.card-top,
.d-flex,
#data_assignedvolunteer_text,
#data_assignedvolunteer_img {
  position: relative;
  z-index: 2;
}
</style>
