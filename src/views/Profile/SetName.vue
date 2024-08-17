<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Укажите имя</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Ваше имя</ion-title>
                </ion-toolbar>
            </ion-header>

            <div class="input-style has-borders no-icon mb-4 input-style-active"
                style="margin-left: 15px; margin-right: 15px; margin-top: 40px;">
                <textarea id="request_notes" @input="validateAndFormatInput" placeholder="Иванов Иван"
                    v-model="fullName" style="height: 59px; font-size: 18px; line-height: 1.9 !important;"
                    maxlength="64"></textarea>
                <label for="request_notes" class="color-highlight">Ваши <b>имя</b> и <b>фамилия</b></label>
                <em class="mt-n3 disabled">(обязательно)</em>
                <div v-if="!isValid">
                    <i>
                        Пожалуйста, укажите ваши имя и фамилия (<b>имя</b> и <b>фамилия</b> через пробел, только символы
                        алфавита).
                    </i>
                </div>
                <ion-button expand="block" @click="submitData" :disabled="!isValid">Отправить</ion-button>
            </div>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import bridge from '@vkontakte/vk-bridge';

export default defineComponent({
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput },
    data(vm) {
        return {
            fullName: '',
            isValid: true
        }
    },
    mounted() {
        // eslint-disable-next-line
        const parent_this = this;

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = true;
            tabsEl.style.height = "1";
        }

        const platform = this.$globaldata.instanceInfo.platform;
        switch (platform) {
            case "VKMiniApps":
                bridge.send('VKWebAppGetUserInfo', {

                })
                    .then((data) => {
                        if (data.id) {
                            // Данные пользователя получены
                            const fullname = `${data.first_name} ${data.last_name}`
                            parent_this.fullName = fullname;
                        }
                    })
                    .catch((error) => {
                        // Ошибка
                        console.log(error);
                    });
                break;

            default:
                break;
        }
    },
    methods: {
        validateAndFormatInput() {
            // Automatically capitalize the first letter of each word
            this.fullName = this.fullName.replace(/\b\w/g, l => l.toUpperCase());

            // Validate for two words and alphabet characters only
            this.isValid = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/.test(this.fullName);
        },
        submitData() {
            if (this.isValid) {
                this.$axios.get(this.$globaldata.api.hostname + 'access/user/updateName', {
                    params: {
                        fullname: this.fullName // Replace YOUR_APP_URL_HERE with your actual app URL
                    }
                })
                    .then((response: AxiosResponse) => {
                        // Handle successful response
                        console.log(response.data); // Log or process the response data
                        if (response.data.status == "okay") {
                            this.$router.push({ path: '/webapp/Home', replace: true });
                        }
                    })
                    .catch((error: any) => {
                        // Handle error
                        console.error(error); // Log or process the error
                    });
            } else {
                console.log("validation of the name failed")
            }
        }
    }
});
</script>