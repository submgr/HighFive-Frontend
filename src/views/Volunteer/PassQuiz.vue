<template>
    <ion-page>
        <ion-content :fullscreen="true">

            <iframe id="survey_iframe" :src="iframeSrc">Sorry, this feauture is not available at this time on
                your device. <br>To use this thing, please enable iFrames on yours device or check out the settings of
                your browser.
                Some old devices are not able to serve such content, - if so, try to use another device.</iframe>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import bridge from '@vkontakte/vk-bridge';

export default defineComponent({
    components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput },
    data() {
        return {
            iframeSrc: ""
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

        var page_hash = this.$route.query.load_quiz_name;

        var load_quiz_name;
        if (page_hash == "situations") {
            load_quiz_name = "situations";
        } else if (page_hash == "psycho") {
            load_quiz_name = "psycho";
        }

        const userData = this.$store.getters.getUserData;

        this.iframeSrc = "assets/static/addons/quiz-engine/index.html?endpoint=" + this.$globaldata.api.hostname + "access/volunteer/init/step_complete&quiz_id=" + load_quiz_name + "&user_id=" + userData.id + "&token=" + userData.token;
        console.log("Requesting iFrame for this address: ", this.iframeSrc)

        window.addEventListener("message", function (event) {
        if (event.data.identifier == "a01_iframesource_quiz") {
            if (event.data.load == "go_forward") {
                console.log("Received message from Iframe: a01_iframesource_quiz>go_forward");
                parent_this.$router.push({ path: "/webapp/Volunteer/GettingReady", replace: true });
            } else {
                console.info("Sorry. Something went wrong.");
            }
        }
    }, false);
    },
    methods: {
        //
    }
});

</script>

<style scoped>
#survey_iframe {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>