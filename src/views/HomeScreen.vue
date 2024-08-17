<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Главная</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Главная</ion-title>
                </ion-toolbar>
            </ion-header>
            <div class="card card-style card-full"
                style="margin-top: 30px; margin-bottom: 15px; background-image: url('https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'); height: 270px;">
                <div class="card-top pt-4 ps-3">
                    <h1 class="color-white font-14 mb-0">Нужна помощь от волонтеров?</h1>
                    <h1 class="color-white font-800 font-32 mb-0">тебе помогут</h1>
                    <h1 class="color-white font-800 font-40 mb-4">волонтеры</h1>
                    <p class="color-white font-700 font-15 opacity-80">
                        Волонтеры готовы абсолютно бесплатно объяснить тебе возникшие вопросы по школьным предметам!<br>
                    </p>
                </div>
                <div class="card-bottom pe-3 mb-3">
                    <div class="float-end">
                        <button @click="goto('beneficiary')"
                            data-menu="menu-join"
                            class="btn btn-s bg-white color-black font-600 rounded-s"
                            onclick='$(".active-nav").removeClass("active-nav"); $(".btn_footer_beneficial").addClass("active-nav");'
                            data-link>Получить помощь</button>
                    </div>
                </div>
                <div class="card-overlay bg-black opacity-60"></div>
            </div>

            <div class="card card-style card-full"
                style="background-image: url('https://images.unsplash.com/photo-1580894732930-0babd100d356?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'); height: 270px;">
                <div class="card-top pt-4 ps-3">
                    <h1 class="color-white font-14 mb-0">Хорошо разбираешься в каком-либо предмете?</h1>
                    <h1 class="color-white font-800 font-32 mb-0">помоги другим</h1>
                    <h1 class="color-white font-800 font-40 mb-4">с учебой</h1>
                    <p class="color-white font-700 font-15 opacity-80">
                        У тебя есть возможность стать волонтером нашего проекта!<br>
                    </p>
                </div>
                <div class="card-bottom pe-3 mb-3">
                    <div class="float-end">
                        <button  @click="goto('volunteer')" data-menu="menu-join"
                            class="btn btn-s bg-white color-black font-600 rounded-s"
                            onclick='$(".active-nav").removeClass("active-nav"); $(".btn_footer_volunteer").addClass("active-nav");'
                            data-link>Стать волонтером</button>
                    </div>
                </div>
                <div class="card-overlay bg-black opacity-60"></div>
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
            tabsEl.hidden = false;
            tabsEl.style.height = "1";
        }

    },
    methods: {
        goto(page: string) {
            switch (key) {
                case "beneficiary":
                    this.$router.push({path:'/webapp/Beneficiary/', replace: true });
                    break;
            
                default:
                    break;
            }
            
        }
    }
});

</script>