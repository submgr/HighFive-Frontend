var apiserver_hostname;

function isLocalHost(url) {
  return url.indexOf('localhost') !== -1 || url.indexOf('127.0.0.1') !== -1 || url.indexOf('192.') !== -1;
}

console.log("[GlobalProvider] process.env.NODE_ENV: " + process.env.NODE_ENV)

function isWebpackHotUpdate(){
  if (process.env.NODE_ENV === 'development') {
    return true;
  }else{
    return false;
  }
}

if (isWebpackHotUpdate() == true) {
  apiserver_hostname = "http://" + window.location.hostname + ":3000/";
  console.log("[GlobalProvider] Serving trough LOCAL (DEV) backend all further requests...")
} else {
  apiserver_hostname = "https://highfive-backend.deqstudio.com/";
  console.log("[GlobalProvider] Serving trough PRODUCTION backend all further requests...")
}

const getCurrentPlatform = () => {
    return localStorage.getItem('instanceInfo_Platform') === 'VKMiniApps';
};

function updateInstanceInfoField(field, value){
  data.instanceInfo[field] = value;
}

const data = {
  api: {
    hostname: apiserver_hostname
  },
  instanceInfo: {
    platform: getCurrentPlatform() ?? 'regular'
  },
  language: {
    currentlang: "ru"
  },
  config: {
    turnstileSitekey: "0x4AAAAAAAcx3HtN3Bt7VUrm"
  },
  appConstData: {
    SubjectsEncoding: {
        math_simple: "Математика",
        math_algebra: "Алгебра",
        math_geometry: "Геометрия",
        russian_language: "Русский язык",
        english_language: "Английский язык",
        german_language: "Немецкий язык",
        russian_literature: "Литература (русская)",
        physics: "Физика",
        chemistry: "Химия",
        biology: "Биология",
        geography: "География",
        history_worldwide: "История: Всеобщая",
        history_russia: "История: России",
        socialscience: "Обществознание",
        informatics: "Информатика"
    }
  },
  functions: {
    updateInstanceInfoField: updateInstanceInfoField
  }
}

export default data;