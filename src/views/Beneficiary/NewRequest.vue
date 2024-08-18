<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Новая заявка</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-header collapse="condense" style="visibility:hidden;">
                <ion-toolbar>
                    <ion-title size="large"></ion-title>
                </ion-toolbar>
            </ion-header>
            <h1 style="margin-left: 1.1rem; margin-top: -2rem; font-weight: 700; font-size: 34px; z-index: 9999999 !important;">Новая заявка</h1>

            <div class="card card-style" style="margin-top: 20px;">
                <div class="content">
                    <p>
                        Расскажите нам о том, с чем и какая помощь Вам нужна, чтобы мы подобрали Вам подходящих
                        волонтеров!
                    </p>
                    <div class="row mb-0">
                        <div class="col-4">
                            <div class="input-style has-borders no-icon input-style-always-active mb-4">
                                <label for="request_grade" class="color-highlight">Класс</label>
                                <select id="request_grade" v-model="selectedGrade">
                                    <option value="default" selected="false">Выберите класс</option>
                                    <option v-for="a in 11" :key="a" :value="a">{{ `${a} класс` }}</option>
                                </select>
                                <span><i class="fa fa-chevron-down"></i></span>
                                <em></em>
                            </div>
                        </div>
                        <div class="col-8">
                            <div class="input-style has-borders no-icon input-style-always-active mb-4">
                                <label for="request_subject" class="color-highlight">Предмет</label>
                                <select id="request_subject" v-model="selectedSubject">
                                    <option value="default" selected="false">Выберите предмет</option>
                                    <option v-for="a in availableSubjects" :key="a" :value="a">{{ `${a}` }}</option>
                                </select>
                                <span><i class="fa fa-chevron-down"></i></span>
                                <em></em>
                            </div>
                        </div>
                    </div>
                    <p>Расскажите о проблемной теме/вопросе, которые Вы хотите чтобы объяснил Вам волонтер:</p>
                    <div class="input-style has-borders no-icon mb-4 input-style-active">
                        <textarea id="request_notes" v-model="newRequestText"
                            placeholder="В этом поле Вы можете указать дополнительные сведения и заметки, если они необходимы.&#10;Не более 2000 символов."
                            style="height: 190px; line-height: 1.55 !important;" maxlength="2000"></textarea>
                        <label for="request_notes" class="color-highlight">Описание запроса</label>
                        <em class="mt-n3 disabled">(required)</em>
                    </div>
                    <FilePond :credits="false" :server="{
                        process: (fieldName: any, file: any, metadata: any, load: any, error: any, progress: any, abort: any, transfer: any, options: any) => {
                            handleFileUpload(fieldName, file, metadata, load, error, progress, abort);
                        },
                    }" label-idle="Перетащите или загрузите изображения здесь..." allow-multiple="true"
                        max-files="3" />
                    <button @click="precheckRequestCreation" id="complete_button" style="width: 99% !important;"
                        class="btn btn-center-l gradient-highlight rounded-sm btn-l font-13 font-600 mt-5 border-0 mb-2">Создать
                        заявку</button>
                </div>
            </div>
            <ion-modal @willDismiss="closeModal" trigger="open-modal" :initial-breakpoint="0.9" :breakpoints="[0, 0.9]"
                handle-behavior="cycle" :is-open="showModal == 'captchaRequestBeforeNewRequestCreated'">
                <div class="modal-content" style="margin-top: 30px;">
                    <img src="../../assets/graphics/robot-3dfluence.webp" alt="Are you a robot?"
                        style="display: block; margin: 0 auto; width: 50%;">
                    <p style="text-align: center; font-weight: 600; font-size: 20px; margin-top: 20px">А вы робот?</p>
                    <p style="text-align: center; font-weight: 400; font-size: 16px; margin-top: 10px;">Пожалуйста,
                        пройдите проверку на человека, чтобы создать запрос. Так мы защищаем волонтеров от спам-заявок.
                    </p>
                    <!-- Captcha placeholder -->
                    <div id="captcha" style="display: flex; justify-content: center; margin-top: 0px;">
                        <Turnstile :sitekey="turnstileSitekey" @verify="captchaReady" />
                    </div>
                    <ion-button @click="closeModal" style="margin-top: 20px;">Отмена</ion-button>
                </div>
            </ion-modal>
        </ion-content>
    </ion-page>
</template>


<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonModal, IonButton, toastController } from '@ionic/vue';
import RequestFullView from '@/components/RequestFullView.vue';

import vueFilePond from 'vue-filepond';

// Import plugins
//@ts-ignore
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type/dist/filepond-plugin-file-validate-type.esm.js';
//@ts-ignore
import FilePondPluginImagePreview from 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.esm.js';

// Import styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';

// Create FilePond component
const FilePond = vueFilePond(FilePondPluginFileValidateType, FilePondPluginImagePreview);


import globaldata from '../../modules/global';

import Turnstile from 'cfturnstile-vue3'

import {
    defineComponent
} from 'vue';

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonModal,
        IonButton,
        Turnstile,
        //@ts-ignore
        FilePond: vueFilePond(),
    },
    mounted() {
        // eslint-disable-next-line
        const parent_this = this;

        this.availableSubjects = globaldata.appConstData.SubjectsEncoding;
        this.turnstileSitekey = globaldata.config.turnstileSitekey;
        // alert(this.turnstileSitekey)

        console.log(window); // Should log the global window object
        console.log(window.FormData); // Should log the FormData constructor function
        document.addEventListener('FilePond:processfile', (e) => {
            //@ts-ignore
            console.log('FilePond Widget Info: File Process Event', e.detail);
            //@ts-ignore
            if (e.detail.error == null) {
                console.log('File Uploaded Successfully.');
                //@ts-ignore
                parent_this.attachedFiles.push(JSON.parse(e.detail.file.serverId).fileid);
            }
        });

    },
    data() {
        return {
            newRequestText: "",
            selectedGrade: 'default',
            selectedSubject: 'default',
            attachedFiles: [],
            showModal: "",
            availableSubjects: [],
            turnstileSitekey: "",
            request:
            {
                id: 1,
                owner_name: "Aram Virabyan",
                owner_avatar: "Aram Virabyan",
                volunteer_name: "Jon Mackwell",
                volunteer_avatar: "https://randomuser.me/api/portraits/women/67.jpg",
                status: "open"
            }

        }
    },
    methods: {
        handleFileUpload(fieldName: any, file: any, metadata: any, load: any, error: any, progress: any, abort: any) {
            console.log(window.FormData); // Debug: Check if FormData is available
            const formData = new window.FormData(); // Explicitly use the window object
            formData.append(fieldName, file, file.name);

            const userData = this.$store.getters.getUserData;

            // Add your custom field here
            formData.append("user_id", userData.id);
            formData.append("token", userData.token);

            const request = new XMLHttpRequest();
            request.open('POST', this.$globaldata.api.hostname + 'service/upload_file');

            // Use the progress event to update the progress
            request.upload.onprogress = (e) => {
                progress(e.lengthComputable, e.loaded, e.total);
            };

            // Call the load method when the request is successful
            request.onload = () => {
                if (request.status >= 200 && request.status < 300) {
                    load(request.responseText);
                } else {
                    error('Upload failed');
                }
            };

            request.send(formData);

            // Return the abort method to abort the request if needed
            return {
                abort: () => {
                    request.abort();
                    abort();
                },
            };
        },
        showCaptchaModal() {
            this.showModal = "captchaRequestBeforeNewRequestCreated";
        },
        closeModal() {
            this.showModal = "";
        },
        captchaReady(token = null) {
            alert(token)
        },
        precheckRequestCreation(){

            let error = false;

            if(this.selectedGrade == 'default'){
                this.showToast("error", "Пожалуйста, выберите класс");
                error = true;
            }

            if(this.selectedSubject == 'default'){
                this.showToast("error", "Пожалуйста, выберите предмет");
                error = true;
            }

            if(this.newRequestText.length < 10){
                this.showToast("error", "Описание запроса слишком короткое. Минимум 10 символов.");
                error = true;
            }

            if(this.newRequestText.length > 1024){
                this.showToast("error", "Описание запроса слишком длинное. Максимум 1024 символов.");
                error = true;
            }

            if(!error){
                this.sendCreationRequest()
            }
        },
        sendCreationRequest() {
            // eslint-disable-next-line
            const parent_this = this;

            console.log("Sending request to create new request in the system, request has the following files as attachments: ", parent_this.attachedFiles)

            let preparedFiles = [] as any;
            parent_this.attachedFiles.forEach(element => {
                let arrel = {
                    fileid: element + ""
                }
                preparedFiles.push(arrel);
            });


            this.$axios.get(this.$globaldata.api.hostname + 'access/requests/create', {
                params: {
                    grade: parent_this.selectedGrade,
                    subject: parent_this.selectedSubject,
                    notes: parent_this.newRequestText,
                    files: JSON.stringify(preparedFiles)
                }
            })
                .then(response => {
                    const data = response.data;
                    if (data.status == "okay") {
                        console.info("Created new request for volunteering. ID: " + data.requestid);
                        this.showToast("success", "Успешно создан новый запрос №" + data.requestid);
                        parent_this.$router.push({ path: "/webapp/Beneficiary/ViewRequest/" + data.requestid, query: {  }, replace: true });
                    } else {
                        this.showToast("error", "Ошибка сервера"); // Assuming `notification` is a method in this Vue component
                    }
                })
                .catch(error => {
                    console.error("Request failed", error);
                    this.showToast("error");
                })
        },
        async showToast(type = "error", message = "Unknown error") {
            const toast = await toastController.create({
                message: message,
                duration: 2000,
                position: 'top',
                color: type === "error" ? "danger" : "success"
            });

            await toast.present();
        }
    },
    setup() {
        return {
        }
    }
});
</script>

<style scoped>
textarea::placeholder {
    z-index: 0;
}

.dropzone {
    border-radius: 10px;
    border-left-width: 1px !important;
    border-right-width: 1px !important;
    border-top-width: 1px !important;
    border-color: rgb(235, 235, 235)
}

.modal-content {
    padding: 20px;
}
</style>