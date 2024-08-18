<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Стать волонтером</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense" style="visibility:hidden;">
                <ion-toolbar>
                    <ion-title size="large"></ion-title>
                </ion-toolbar>
            </ion-header>
            <h1 style="margin-left: 1.1rem; margin-top: -2rem; font-weight: 700; font-size: 34px; z-index: 9999999 !important;">Стать волонтером</h1>

      <div class="card card-full rounded-l">
        <div class="content">
          <p class="font-600 color-highlight mb-n1">Давайте приступим</p>
          <p>
            Вы можете стать волонтером Всероссийского проекта Дай&nbsp;Пять. Это отличная возможность поделиться своими
            знаниями с теми, кому это нужно. Заполните простую заявку, чтобы мы узнали Вас получше.
          </p>
          <div class="input-style has-borders no-icon validate-field input-style-always-active mb-4">
            <input type="text" id="dobro_id_input" placeholder="ID" v-model="dobroRuIdEntered">
            <label for="form1" class="color-highlight font-500">ID на Добро.ру</label>
            <i class="fa fa-times disabled invalid color-red-dark"></i>
            <i class="fa fa-check disabled valid color-green-dark"></i>
            <em>(обязательно)</em>
          </div>
          <div class="divider mb-2"></div>
          <p class="font-600 mb-n1 color-highlight">Дополнительные</p>
          <h1 class="mb-0">Шаги</h1>
          <p>
            Пройдите некоторые шаги и тесты, чтобы проверить, готовы ли Вы стать репетитором и волонтером на нашей
            платформе.<br>Шаги не займут много времени, - они простые и интересные!
          </p>

          <div class="d-flex mb-4" v-if="AboutUser_volunteer_status && AboutUser_volunteer_status.passed_quizes">
            <div class="align-self-center">
              <h1 class="font-40 opacity-20 mb-n1 icon-80">01</h1>
            </div>
            <div class="align-self-center">
              <h5 class="font-12 mb-n1 opacity-30">10 минут</h5>
              <h5 class="mb-0">Подготовка</h5>
            </div>
            <div class="align-self-center ms-auto">
              <h1 class="font-30"><button><i v-if="hasPassedQuiz('videos')"
                    id="marker-1"  class="fa fa-play-circle color-highlight opacity-30"></i>
                  <i @click="step_run(1)" v-else id="marker-1-checked" class="fa fa-play-circle color-highlight"></i></button>
              </h1>
            </div>
          </div>
          <div class="d-flex mb-4">
            <div class="align-self-center">
              <h1 class="font-40 opacity-20 mb-n1 icon-80">02</h1>
            </div>
            <div class="align-self-center">
              <h5 class="font-12 mb-n1 opacity-30">9 минут</h5>
              <h5 class="mb-0">Тест. Поведение в ситуациях</h5>
            </div>
            <div class="align-self-center ms-auto">
              <h1 class="font-30"><button>
                  <i  v-if="hasPassedQuiz('test_situations')" id="marker-2"
                     class="fa fa-play-circle color-highlight opacity-30"></i>
                  <i @click="step_run(2);" id="marker-2-checked" v-else class="fa fa-play-circle color-highlight"></i></button>
              </h1>
            </div>
          </div>
          <div class="d-flex mb-4">
            <div class="align-self-center">
              <h1 class="font-40 opacity-20 mb-n1 icon-80">03</h1>
            </div>
            <div class="align-self-center">
              <h5 class="font-12 mb-n1 opacity-30">5 минут</h5>
              <h5 class="mb-0">Тест. Психологический тест</h5>
            </div>
            <div class="align-self-center ms-auto">
              <h1 class="font-30"><button>
                  <i v-if="hasPassedQuiz('test_psycho')"  id="marker-3"
                     class="fa fa-play-circle color-highlight opacity-30"></i>
                  <i @click="step_run(3);" id="marker-3-checked" v-else class="fa fa-play-circle color-highlight"></i></button>
              </h1>
            </div>
          </div>
          <div class="d-flex mb-4">
            <div class="align-self-center">
              <h1 class="font-40 opacity-20 mb-n1 icon-80">04</h1>
            </div>
            <div class="align-self-center">
              <h5 class="font-12 mb-n1 opacity-30">5 минут</h5>
              <h5 class="mb-0">Подайте заявку на ДоброRU</h5>
              <p id="dobroru_request_message" style="margin-right: 10%; line-height: 1.35; display: none;">Если шаг
                отмечен как выполненный, но вам все еще нужна ссылка для подачи заявки на ДоброRU, <a href="#"
                  onclick="step_run(4);">нажмите сюда</a>.</p>
            </div>
            <div class="align-self-center ms-auto">
              <h1 class="font-30"><button>
                  <i id="marker-4" v-if="hasPassedQuiz('dobroru_request')"
                    class="fa fa-play-circle color-highlight opacity-30"></i>
                  <i @click="step_run(4);" id="marker-4-checked" v-else class="fa fa-play-circle color-highlight"></i></button>
              </h1>

            </div>
          </div>
          <div class="d-flex mb-4">
            <div class="align-self-center">
              <h1 class="font-40 opacity-20 mb-n1 icon-80">05</h1>
            </div>
            <div class="align-self-center">
              <h5 class="font-12 mb-n1 opacity-30">15 минут</h5>
              <h5 class="mb-0">Собеседование</h5>
              <p id="interview_message" style="margin-right: 10%; line-height: 1.35; display: none;">Пожалуйста,
                присоединитесь к беседе собеседования. В беседе модераторы проекта назначат Вам собеседование. Не
                переживайте: это не сложно, все подробные инструкции Вы найдете прямо там.</p>
            </div>
            <div class="align-self-center ms-auto">
              <h1 class="font-30"><button>
                  <i  v-if="hasPassedQuiz('interview')" id="marker-5"
                    class="fa fa-play-circle color-highlight opacity-30"></i>
                  <i @click="step_run(5);" v-else id="marker-5-checked" class="fa fa-play-circle color-highlight"></i></button>
              </h1>
            </div>
          </div>

          <div class="divider"></div>

          <p class="font-600 mb-n1 color-highlight" id="status_preMessage">
            <span v-if="passedSubjectInvolvement < 5">
              Еще чуть-чуть!
            </span>
            <span v-else>
              Почти готово
            </span>
          </p>
          <h1 class="mb-0">Подтверждение</h1>
          <p id="status_Message">
            <span v-if="passedSubjectInvolvement < 5">
              Выполните все шаги, чтобы продолжить!
            </span>
            <span v-else>
              Вы прошли все необходимые этапы и находитесь в одном нажатии, чтобы стать волонтером Всероссийского
              проекта «Дай пять». Проверьте правильность указанного ID в системе Добро.ру. Смело продолжайте, когда
              будете готовы.
            </span>
          </p>
          <a @click="completeEnrollment" v-if="passedSubjectInvolvement >= 5"
            class="btn btn-full btn-m rounded-sm gradient-blue font-600">Продолжить</a>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, toastController } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

import bridge from '@vkontakte/vk-bridge';

export default defineComponent({
  components: { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput },
  data() {
    return {
      passedSubjectInvolvement: -1,
      dobroRuIdEntered: "",
      AboutUser_volunteer_status: {} as any
    }
  },
  watch: {
    dobroRuIdEntered(newVal) { // Step 3: Watch for changes
      localStorage.setItem('tempPresaved_dobroRuIdEntered', newVal); // a. Save to localStorage
    },
  },
  mounted() {
    // eslint-disable-next-line
    const parent_this = this;

    const tabsEl = document.querySelector('ion-tab-bar');
    if (tabsEl) {
      tabsEl.hidden = false;
      tabsEl.style.height = "1";
    }

    this.getData();

    const savedValue = localStorage.getItem('tempPresaved_dobroRuIdEntered');
    if (savedValue) { // a. Check for saved value
      this.dobroRuIdEntered = savedValue; // b. Restore saved value
    }

  },
  methods: {
    async completeEnrollment() {
      console.log("completeEnrollment::reached")
      // eslint-disable-next-line
      const parent_this = this;

      this.$axios.get(this.$globaldata.api.hostname + 'access/volunteer/init/enroll', {
        params: {
          // Replace YOUR_APP_URL_HERE with your actual app URL
        }
      })
        .then((response: AxiosResponse) => {
          // Handle successful response
          console.log(response.data); // Log or process the response data
          if (response.data.status == "enrolled") {
            parent_this.$store.dispatch("fetchUserData").then(() => {
              //done! updated user's data so in other parts of app there will be updated information with New User's Premium Status!!! yay! :D
              console.log("User's data updated!");
              parent_this.$router.push({ path: "/webapp/Volunteer/MyRequests", query: { justEnrolled: "true" }, replace: true });
            });

          }
        })
        .catch((error: any) => {
          // Handle error
          console.error(error); // Log or process the error
        });
    },
    async getData() {
      // var response = await this.$axios.get(this.$globaldata.api.hostname + 'access/volunteer/init/enroll', {
      //   params: {
      //      //params
      //   }
      // });

      var AboutUser_volunteer_status = JSON.parse(this.$store.getters.getUserData.volunteer_status);
      if (AboutUser_volunteer_status.status == "enrolled") {
        // PROCESS IT! DONT FORGET! THAT'S THE CASE WHEN ALREADY ENROLLED IN PROGRAM
      }

      this.AboutUser_volunteer_status = AboutUser_volunteer_status;

      console.log("Current Volunteer Enrollment Status: ", AboutUser_volunteer_status)

      var passed_subject_involvement = 0;

      if ('videos' in AboutUser_volunteer_status.passed_quizes) {
        passed_subject_involvement++;
      }

      if ('test_situations' in AboutUser_volunteer_status.passed_quizes) {
        passed_subject_involvement++;
      }

      if ('test_psycho' in AboutUser_volunteer_status.passed_quizes) {
        passed_subject_involvement++;
      }

      if ('dobroru_request' in AboutUser_volunteer_status.passed_quizes) {
        passed_subject_involvement++;
      }

      if ('interview' in AboutUser_volunteer_status.passed_quizes) {
        passed_subject_involvement++;
      }

      this.passedSubjectInvolvement = passed_subject_involvement;

      console.log("Passed Subject Involvement: ", passed_subject_involvement)

      // if (passed_subject_involvement < 5) {
      //   $('#status_preMessage').text("Еще чуть-чуть!");
      //   $('#status_Message').text("Выполните все шаги, чтобы продолжить!");
      // } else {
      //   $('#status_preMessage').text("Почти готово");
      //   $('#status_Message').text("Вы прошли все необходимые этапы и находитесь в одном нажатии, чтобы стать волонтером Всероссийского проекта «Дай пять». Проверьте правильность указанного ID в системе Добро.ру. Смело продолжайте, когда будете готовы.");
      //   $('#continue_btn').show();
      // }
    },
    step_run(step = -1) {
      switch (step) {
        case 1:
          this.$router.push({ path: "/webapp/Volunteer/WatchVideos", query: {}, replace: false });
          break;
        case 2:
          this.$router.push({ path: "/webapp/Volunteer/PassQuiz", query: { load_quiz_name: "situations" }, replace: false });
          break;
        case 3:
          this.$router.push({ path: "/webapp/Volunteer/PassQuiz", query: { load_quiz_name: "psycho" }, replace: false });
          break;
        case 4:
          const a = document.createElement("a");
          a.setAttribute("href", 'https://dobro.ru/event/10214466#10288333');
          a.setAttribute("target", "_blank");
          a.click();
          this.$axios.get(this.$globaldata.api.hostname + 'access/volunteer/init/step_complete', {
            params: {
              step: "dobroru_request",
              state: "completed"
            }
          });
          break;
        case 5:
          if (this.passedSubjectInvolvement < 4) {
            this.showToast("Пройдите предыдущие шаги перед тем, как перейти к Собеседованию.");
          } else {
            const a = document.createElement("a");
            a.setAttribute("href", 'https://vk.me/join/OCfRIyWXIPHV_w6PMgtkyrrw6s11Bx3505Y=');
            a.setAttribute("target", "_blank");
            a.click();
          }
          this.$router.push({ path: "/webapp/Volunteer/PassQuiz", query: { load_quiz_name: "psycho" }, replace: false });
          break;
        default:
          break;
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
    },
    hasPassedQuiz(quizName: string) {
      return this.AboutUser_volunteer_status && this.AboutUser_volunteer_status.passed_quizes && (quizName in this.AboutUser_volunteer_status.passed_quizes);
    }
  }
});

</script>