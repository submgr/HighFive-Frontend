<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Заявка №{{ request_id }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense" style="line-height: 26px !important;">
                <ion-toolbar>
                    <ion-title size="large">Заявка №{{ request_id }}</ion-title>
                </ion-toolbar>
            </ion-header>

            <div v-if="request && request != 'NetworkError'">
                <RequestFullView :request="request" :isVolunteer="false" @refreshCallback="getRequestData" />
            </div>
            <div v-else-if="request == 'NetworkError'">
                <p style="font-size: 18px; font-weight: 600;">Ошибка сервера
                    <br /><br />
                <p style="font-weight: 400; line-height: 1.7 !important; font-size: 14px;">Сервер не вернул
                    данные.<br />Попробуйте еще раз через
                    пару минут.</p>
                </p>


                <button @click="getRequestData" id="accept_btn_id${i}"
                    style="height: 42px; line-height: 15px; margin-bottom: 12px; width: 100%;"
                    class="btn btn-full btn-m font-11 font-600 rounded-sm gradient-highlight">Повторить
                    запрос</button>
            </div>
        </ion-content>
    </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import RequestFullView from '@/components/RequestFullView.vue';

import { getSingleRequest } from '../../modules/getRequestData.ts';

import {
    defineComponent
} from 'vue';

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, RequestFullView
    },
    methods: {
        async getRequestData() {
            // Implement the logic to get the request data
            console.log('Getting request data...');

            this.request = await getSingleRequest(this, { isVolunteer: false })

        }
    },
    mounted() {
        // eslint-disable-next-line
        const parent_this = this;

        this.request_id = +this.$route.params.id;

        this.getRequestData();

    },
    data() {
        return {
            request_id: 0,
            request: null

        }
    },
    setup() {
        return {
        }
    }
});
</script>

<style scoped></style>