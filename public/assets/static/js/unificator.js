var params;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);
  
        params = {};
    while (match = search.exec(query))
    params[decode(match[1])] = decode(match[2]);
})();

;(function () {
    var src = '//cdn.jsdelivr.net/npm/eruda';
    if (!/eruda=true/.test(window.location) && localStorage.getItem('active-eruda') != 'true') return;
    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
    document.write('<scr' + 'ipt>eruda.init();</scr' + 'ipt>');
})();

var data_conditions = {}

var api_server;

if(params.enable_localhost || localStorage.getItem("enable_localhost") == "true"){
    api_server = "http://192.168.1.38:3000";
}else{
    api_server = "https://highfive-backend.deqstudio.com";
}

function retriveUserData(callback){
    $.get(api_server + '/access/hello', {
        user_id: localStorage.getItem("access_id"),
        token: localStorage.getItem("access_token")
    }).done(function (data) {
        if (data.status == "okay") {
            console.log("retriveUserData.->okay")
            //okay
            localStorage.setItem('tempdata_shortAboutUser', JSON.stringify(data.data));
            //alert("Вызываю vkapi_RequestToken()")
            //vkapi_RequestToken();

            //myResolve();
            callback("okay");
        } else {
            console.log("retriveUserData.->notOKAY")

            //myResolve();
            callback("okay");
        }
    }).fail(function (data, textStatus, xhr) {
        console.log("Unable to fetch User Data. XHR: " + xhr)

        //myResolve();
        callback("error");
    });
};

var SubjectsEncoding = {
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
};

const AvailableStatuses = {
    open: "Свободна",
    inprogress: "Взята в работу",
    canceled: "Отменена",
    completed: "Помощь оказана"
}

const AvailableStatuses_Descriptions = {
    open: "Заявка свободна и любой волонтер может взять ее в работу.",
    inprogress: "Заявку взял в работу волонтер и прямо сейчас оказывается помощь ее автору.",
    canceled: "Заявка была отменена и теперь, работа в рамках нее невозможна.",
    completed: "Помощь в рамках заявки была оказана, заявка более неактуальна."
}

function notification(message = "Текст уведомления.", title = "Уведомление", subtitle = "Системное уведомление"){
    $("#notificator_block").show();
    notificator_block_bootstrap = new bootstrap.Toast(notificator_block);
    $("#notificator_block_message").html(message);
    $("#notificator_block_title").html(title);
    $("#notificator_block_subtitle").html(subtitle);
    notificator_block_bootstrap.show();
    $("#notificator_block").click(function(){
        $("#notificator_block").hide();
    });
    setTimeout(() => {
        $("#notificator_block").hide();
    }, 6000);
}

function unificatorModule_getReadableNameOfSubject(encoded){
    let EXIST_Value = SubjectsEncoding[encoded];
    if(EXIST_Value != undefined){
        return EXIST_Value;
    }else{
        return encoded;
    }
}

// store url on load
let currentPage = location.href;

//the function below helps to debug by providing alerts on any URL update!
// listen for changes
/* setInterval(function()
{
    if (currentPage != location.href)
    {
        // page has changed, set new page as 'current'
        currentPage = location.href;
        
        alert(currentPage)
    }
}, 500); */