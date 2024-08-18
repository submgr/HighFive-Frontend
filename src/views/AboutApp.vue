<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>О приложении</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">О приложении</ion-title>
                </ion-toolbar>
            </ion-header>
            <!-- card in this page format must have the class card-full to avoid seeing behind it-->
            <div class="card card-full rounded-l pb-4">
                <a href="https://vk.com/vol.highfive">
                    <div class="text-center" style="margin: 0px 12%; margin-top: 9%; margin-left: 18.5%;">
                        <img src="../assets/graphics/hf_logo_blue.png" class="img-fluid">
                    </div>
                </a>
                <!-- <div class="text-center" style="margin: 0px 15%; margin-top: -8%;">
        <img src="./static/images/graphics/rosmol_grants.png" class="img-fluid">
    </div> -->
                <div class="content mt-0">
                    <img src="">
                    <p class="mb-n1 color-highlight font-600 mb-n1">Добро пожаловать!</p>
                    <h2>О приложении</h2>
                    <p style="line-height: 1.45; font-family: Helvetica;">
                        <span style="display: block; margin-top: 14px;">
                            Приложение «Дай пять» было разработано для того, чтобы помочь школьникам найти человека,
                            который с радостью поможет им в изучении школьного предмета.
                        </span>
                        <span style="display: block; margin-top: 10px;">
                            Часто бывает так, что разобраться в новой теме сложно, но необходимо: впереди контрольная
                            или неудержимый интерес. Каждый школьник может воспользоваться приложением и создать запрос
                            на помощь. Волонтеры «Дай пять» придут на помощь!
                        </span>
                        <span style="display: block; margin-top: 10px;">
                            Вы хороши в каком-то предмете? Станьте волонтером нашего проекта и помогайте мотивированным
                            ученикам со всей страны!
                        </span>
                    </p>
                    <div class="card card-style mx-0 mt-3" data-card-height="100"
                        style="height: 100px; background-image: url(./static/images/unsplash/photo-1608306448197-e83633f1261c.avif);">
                        <div class="card-center px-3 no-click">
                            <h1 class="color-white mb-n2 font-24">Разработчик</h1>
                            <h5 class="color-white mt-n1 opacity-80 font-16">Арам Вирабян</h5>
                            <h6 class="color-white mt-n1 opacity-80 font-12"
                                style="font-style: italic; font-weight: 400;">Разработчик этого приложения</h6>
                        </div>
                        <div class="card-center">
                            <a href="#"
                                class="float-end mx-3 gradient-highlight btn-s rounded-sm shadow-xl text-uppercase font-800">Подробнее</a>
                        </div>
                        <div class="card-overlay bg-black opacity-60"></div>
                    </div>
                    <div @click="copyAdminLink">
                        Ссылка для авторизации в Центре администратора (нажмите, чтобы скопировать):
                        <textarea id="adminLink" :value="adminAuthLink" style="width: 100%; height: 20vh;"></textarea>
                    </div>
                </div>
            </div>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import store from "../store";

import bridge from '@vkontakte/vk-bridge';

export default defineComponent({
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput },
    data(vm) {
        return {
            fullName: '',
            isValid: true,
            elevatedRole: false,
            adminAuthLink: ""
        }
    },
    mounted() {
        // eslint-disable-next-line
        const parent_this = this;

        const userData = store.getters.getUserData;

        const tabsEl = document.querySelector('ion-tab-bar');
        if (tabsEl) {
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }

        if (userData.role !== "user") {
            this.elevatedRole = true;
            var id = userData.id;
            var token = userData.token;
            this.adminAuthLink = `https://frontend.highfive.deqstudio.com/admin/forceAuth.html?access_token=${token}&access_id=${id}`
        }

    },
    methods: {
        async copyAdminLink() {
            // Get the text field
            var copyText = document.getElementById("adminLink");

            try {
                // Copy the text inside the text field using Clipboard API
                await navigator.clipboard.writeText(copyText.value);

            } catch {
                // Select the text field
                copyText.select();
                copyText.setSelectionRange(0, 99999); // For mobile devices

                // Copy the text inside the text field
                document.execCommand("copy");
            }

            alert("Скопировано в буфер обмена этого устройства. Используйте CTRL-V, чтобы вставить в нужном месте.")

        },
        goto(page: string) {
            switch (key) {
                case "beneficiary":
                    this.$router.push({ path: '/webapp/Beneficiary/', replace: true });
                    break;

                default:
                    break;
            }

        }
    }
});

</script>