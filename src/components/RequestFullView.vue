<template>

    <RequestPreviewCard :request="request" />

    <div class="card card-style mt-n3">
        <div class="content mb-2 mt-3">
            <div class="list-group list-custom-small list-icon-0">
                <a v-if="isVolunteer == false && request.status != 'open'"
                    id="actionslist_OpenChatWithVolunteer" @click="actionpoint('openChatWithVolunteer');"><i
                        class="fa bi-chat-dots rounded-sm bg-blue-dark"></i><span>Перейти в чат с волонтером</span><i
                        class="fa fa-angle-right"></i></a>
                <a v-if="isVolunteer == true && request.status != 'open'" 
                    @click="actionpoint('openChatWithBeneficial');"><i
                        class="fa bi-chat-dots rounded-sm bg-blue-dark"></i><span>Перейти в чат с вашим
                        учеником</span><i class="fa fa-angle-right"></i></a>
                <a @click="changeRequestStatus(request.id)" id="actionslist_ChangeRequestStatus"
                    data-menu="menu-change-status"><i class="fa bi-activity rounded-sm bg-red-dark"></i><span>Изменить
                        статус заявки</span><i class="fa fa-angle-right"></i></a>
            </div>
            <p class="font-11 opacity-70 font-italic line-height-s pt-4 pb-4"><strong
                    class="color-highlight">Информация</strong>.
                <span v-if="request.status == 'open'">
                    Мы уже подбираем волонтера для этой заявки! Статус вашей заявки изменится, как только мы найдем для
                    вас подходящего помощника-волонтера.
                </span>
                <span v-if="request.status == 'inprogress'">
                    <span v-if="isVolunteer == true">
                        Вы приняли эту заявку для работы. Перейдите в чат со своим учеником, чтобы начать работу. Как
                        только заявка будет выполнена, не забудьте изменить ее статус, но перед этим обязательно
                        проверьте, полностью ли она выполнена.
                    </span>
                    <span v-else>
                        Свяжитесь с волонтером как можно скорее, чтобы начать работу! После получения помощи не забудьте
                        изменить статус заявки на "Помощь оказана". В случаях, когда помощь больше не нужна и не была
                        оказана, а запрос больше не актуален, измените статус на "Отменен".
                    </span>
                </span>
                <span v-if="request.status == 'canceled'">
                    <span v-if="isVolunteer == true">
                        Похоже, что заявка была отменена и больше не актуалена. Вы можете взять новую заявку в работу!
                    </span>
                    <span v-else>
                        Похоже, заявка была отменен и больше не актуальна. Если вы хотите получить новую помощь,
                        пожалуйста, создайте новую заявку.
                    </span>
                </span>
                <span v-if="request.status == 'completed'">
                    <span v-if="isVolunteer == true">
                        Так держать! Эта заявка была выполнена. Вы можете взять новый запрос на работу.
                    </span>
                    <span v-else>
                        Эта заявка была выполнена. Если вам нужна новая помощь, создайте новую заявку.
                    </span>
                </span>

            </p>
        </div>
    </div>
    <div class="card card-style bg-blue-dark" v-if="isVolunteer == true && request.status == 'inprogress'">
        <div class="content">
            <h1 class="color-white">Не забудьте</h1>
            <p class="color-white opacity-60" style="line-height: 1.5;">
                После заполнения заявки вам нужно будет указать в ней количество отработанных часов и приложить к ней
                фотографии (например, скриншот урока Zoom) для проверки, чтобы ваши часы волонтерской работы были
                зачислены в вашу книжку волонтера.
            </p>
        </div>
    </div>
    <div class="card card-style">
        <div class="content">
            <h2>Детали заявки</h2>
            <div>
                <div class="gallery" @click="viewImagesGallery" v-if="galleryImages"
                    style="margin-bottom: 18px; margin-top: 15px;">
                    <div class="image-container" v-for="(image, index) in galleryImages" :key="index">
                        <img :src="image.mainUrl" alt="Gallery Image">
                    </div>
                </div>
            </div>
            <p id="data_notes" v-if="request.notes" style="margin-bottom: 5px;">
            <p id="data_notes" style="display: block;">
                <b><i>Описание от автора заявки:</i></b><br>
                {{ request.notes }}
            </p>
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

import { hourglassOutline, closeCircleOutline, rocketOutline, checkmarkOutline } from 'ionicons/icons';

import RequestPreviewCard from '@/components/RequestPreviewCard.vue';

import ImageViewer from 'awesome-image-viewer'

import { IonButton, alertController, actionSheetController } from '@ionic/vue';

import {
    defineComponent
} from 'vue';

export default defineComponent({
    name: 'Tab1Page',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, RequestPreviewCard, ImageViewer
    },
    props: {
        // Define a prop named 'request'. The type can be specified as well.
        request: {
            type: Object, // Specify the type, e.g., Object, String, Number, etc.
            required: true, // Whether this prop is required or optional
            // default: () => ({}) // You can also provide a default value if it's optional
        },
        isVolunteer: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    methods: {

        async actionpoint(source = "none") {

            var TelegramChatID = "";
            var VKChatID = "";
            if(this.request.vk_userid){
                VKChatID = VKChatID + this.request.vk_userid
            }
            

            var isTelegramChatAvailable = false;
            var isVKChatAvailable = true;
            var buttons = [

                {
                    text: 'Назад',
                    role: 'cancel',
                    data: {
                        action: 'cancel',
                    },
                }
            ]
            if (isTelegramChatAvailable) {
                buttons.unshift(
                    {
                        text: 'Телеграм',
                        role: "",
                        data: {
                            action: 'open_telegramchat',
                        },
                    },
                )
            }
            if (isVKChatAvailable) {
                buttons.unshift(
                    {
                        text: 'ВКонтакте',
                        role: "",
                        data: {
                            action: 'open_vkchat',
                        },
                    },
                )
            }

            const actionSheet = await actionSheetController.create({
                header: 'Способы связи',
                buttons: buttons,
            });

            actionSheet.present();

            const { data } = await actionSheet.onWillDismiss();

            if (data.action === 'open_telegramchat') {
                // Создаём новый элемент <a>
                const a = document.createElement('a');

                // Задаём ему нужный URL
                a.href = 'https://t.me/' + TelegramChatID;

                // Устанавливаем атрибут target, если нужно открыть в новой вкладке
                a.target = '_blank'; // опционально, если нужно открыть в новом окне

                // Добавляем элемент в DOM (можно добавить его в body)
                document.body.appendChild(a);

                // Программно кликаем на элемент
                a.click();

                // Удаляем элемент после клика, если он больше не нужен
                document.body.removeChild(a);
            }
            if (data.action === 'open_vkchat') {
                // Создаём новый элемент <a>
                const a = document.createElement('a');

                // Задаём ему нужный URL
                a.href = 'https://vk.me/id' + TelegramChatID;

                // Устанавливаем атрибут target, если нужно открыть в новой вкладке
                a.target = '_blank'; // опционально, если нужно открыть в новом окне

                // Добавляем элемент в DOM (можно добавить его в body)
                document.body.appendChild(a);

                // Программно кликаем на элемент
                a.click();

                // Удаляем элемент после клика, если он больше не нужен
                document.body.removeChild(a);
            }
        },

        async checkIfCreatedOnOldVersion() {

            if (+this.request.id <= 1450) {
                console.log("Looks like that this request was created on the old version of the system.")
                const alert = await alertController.create({
                    header: 'А, ой! Не доехало',
                    subHeader: 'Эта заявка была создана очень давно: до обновления системы. ',
                    message: 'После глобального обновления некоторые данные, такие как имена людей, не перенеслись. ',
                    buttons: ['Хорошо'],
                });

                await alert.present();
            }
        },
        async changeRequestStatus(id = -1) {
            const actionSheet = await actionSheetController.create({
                header: 'Действия',
                buttons: [
                    {
                        text: 'Отменить',
                        role: 'destructive',
                        data: {
                            action: 'to_canceled',
                        },
                    },
                    {
                        text: 'Помощь оказана',
                        data: {
                            action: 'to_completed',
                        },
                    },
                    {
                        text: 'Назад',
                        role: 'cancel',
                        data: {
                            action: 'cancel',
                        },
                    },
                ],
            });

            actionSheet.present();

            const { data } = await actionSheet.onWillDismiss();

            let needToChangeStatusOnServer = false;
            let ifNeeded_NewStatus = '';

            if (data.action === 'to_canceled') {
                needToChangeStatusOnServer = true;
                ifNeeded_NewStatus = "cancel";
            }

            if (data.action === 'to_completed') {
                needToChangeStatusOnServer = true;
                ifNeeded_NewStatus = "complete";
            }

            if (needToChangeStatusOnServer) {
                this.$axios.get(this.$globaldata.api.hostname + 'access/requests/change_status', {
                    params: {
                        request_id: this.request.id,
                        new_status: ifNeeded_NewStatus
                    }
                })
                    .then((response: AxiosResponse) => {
                        this.$emit('refreshCallback', 'RefreshNeeded');
                    })
                    .catch((error: any) => {
                        // Handle error
                        console.error(error); // Log or process the error
                    });
            }
        },

        prepareRequestImages() {
            // eslint-disable-next-line
            const parent_this = this;

            let readyFilesPropertie = JSON.parse(this.request.files);

            readyFilesPropertie.forEach(element => {

                parent_this.filesIds.push(element.fileid);

                let preparedImage = {
                    mainUrl: `${parent_this.$globaldata.api.hostname}service/download_file?fileid=${element.fileid}`,
                    description: 'Просмотр файла',
                }

                parent_this.galleryImages.push(preparedImage);

            });
        },

        viewImagesGallery() {
            // eslint-disable-next-line
            const parent_this = this;


            this.imageViewerInstance = new ImageViewer({
                images: parent_this.galleryImages,
                buttons: [
                    {
                        name: 'Download',
                        iconSize: '24px auto',
                        iconSrc: 'https://img.icons8.com/ios/50/FFFFFF/download--v1.png',
                        onSelect: function () {
                            console.log(`Download selected image: `, parent_this.imageViewerInstance.currentSelected);
                            let url = parent_this.galleryImages[parent_this.imageViewerInstance.currentSelected].mainUrl; // Assuming this is the URL of the image you want to download
                            let filename = `downloadedImage_x${parent_this.filesIds[parent_this.imageViewerInstance.currentSelected]}.webp`; // Specify the filename you want

                            // Use fetch to get the file as a Blob
                            fetch(url).then(response => response.blob()).then(blob => {
                                // Create an object URL for the blob
                                let blobUrl = window.URL.createObjectURL(blob);

                                // Create an anchor element and use the blob URL
                                let a = document.createElement('a');
                                a.href = blobUrl;
                                a.download = filename; // Set the filename for download
                                document.body.appendChild(a); // Append to the document
                                a.click(); // Simulate click to start download

                                // Clean up
                                document.body.removeChild(a);
                                window.URL.revokeObjectURL(blobUrl); // Release the object URL
                            }).catch(error => console.error('Error downloading the file:', error));
                        }
                    },
                ]
            })
        }
    },

    data() {
        return {
            imageViewerInstance: null as ImageViewer | null, // To store the ImageViewer instance
            filesIds: [],
            galleryImages: [],
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

        this.checkIfCreatedOnOldVersion();

        this.prepareRequestImages();


    },
    setup() {
        return {
        }
    }
});
</script>

<style scoped>
.gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    /* Adjust the gap between images as needed */
}

.image-container {
    width: 100px;
    /* Adjust the size of the square as needed */
    height: 100px;
    /* Adjust the size of the square as needed */
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
}
</style>