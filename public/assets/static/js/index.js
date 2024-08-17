import Home from "./views/Home.js";
import CookiesAreLocked from "./views/CookiesAreLocked.js";
import VkAccessIsRequired from "./views/VkAccessIsRequired.js";
import SetupProfile from "./views/SetupProfile.js";
import BeneficialHome from "./views/BeneficialHome.js";
import BeneficialNewRequest from "./views/BeneficialNewRequest.js";
import ViewRequest from "./views/ViewRequest.js";
import BecameVolunteer_Init from "./views/BecameVolunteer_Init.js";
import BecameVolunteer_VideoWatch from "./views/BecameVolunteer_VideoWatch.js";
import BecameVolunteer_PassQuiz from "./views/BecameVolunteer_PassQuiz.js";
import VolunteerHome from "./views/VolunteerHome.js";
import VolunteerAvailableRequests from "./views/VolunteerAvailableRequests.js";
import VolunteerViewRequest from "./views/VolunteerViewRequest.js";
import VolunteerRequestComplete from "./views/VolunteerRequestComplete.js";
import appInfo from "./views/appInfo.js";

console.log("This is main module. If you see this message, this module has been loaded successfully. \nPlease, do not paste anything into console input, it may be dangerous for your data, - this tool used only by developers. Have a good day! :)")
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = match => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }));
};

localStorage.setItem("temp_initial_url", window.location.href)

function fullscreen_message(){
    $("body").html(`
                <div style="margin: 30% 10%;">
                    <i style="font-size: 99px;" class="bi bi-emoji-frown"></i>
                    <span style="display: block; font-size: 44px; font-weight: 600; margin-top: 10%; line-height: 0.7;">Сессия истекла.</span>
                    <span style="display: block; font-size: 24px; font-weight: 400; margin-top: 5%; line-height: 1.2;">Чтобы продолжить, перезайдите в приложение.</span>
                    <a href="#" onclick="vkBridge.send('VKWebAppClose');" class="btn btn-m font-13 mb-3 rounded-xs text-uppercase font-700 shadow-s bg-dark-dark" style="margin-top: 6%; width: 55%;">Закрыть приложение</a>
                </div>
            `)
}

const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

const router = async () => {
    const routes = [{
            path: "/",
            view: SetupProfile
        },
        {
            path: "/appInfo",
            view: appInfo
        },
        {
            path: "/cookiesAreLocked",
            view: CookiesAreLocked
        },
        {
            path: "/vkAccessIsRequired",
            view: VkAccessIsRequired
        },
        {
            path: "/beneficial",
            view: BeneficialHome
        },
        {
            path: "/beneficialNewRequest",
            view: BeneficialNewRequest
        },
        {
            path: "/viewRequest",
            view: ViewRequest
        },
        {
            path: "/setup-profile",
            view: SetupProfile
        },
        {
            path: "/became-volunteer-init",
            view: BecameVolunteer_Init
        },
        {
            path: "/became-volunteer-pass-quiz",
            view: BecameVolunteer_PassQuiz
        },
        {
            path: "/became-volunteer-video",
            view: BecameVolunteer_VideoWatch
        },
        {
            path: "/volunteer",
            view: VolunteerHome
        },
        {
            path: "/volunteerAvailableRequests",
            view: VolunteerAvailableRequests
        },
        {
            path: "/volunteerViewRequest",
            view: VolunteerViewRequest
        },
        {
            path: "/volunteerCompleteRequest",
            view: VolunteerRequestComplete
        }
    ];

    // Test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

    if (!match) {
        match = {
            route: routes[0],
            result: [location.pathname]
        };
    }

    const view = new match.route.view(getParams(match));

    await view.getHtml().then((value) => $("#page-content").html(value));
};

function error_handler(level = "warn", message, redir = "no") {
    console.warn("ERROR (level " + level + "): " + message)
    /* if (redir == "reload") {
        window.location.href = "/";
    } */
    fullscreen_message();
}

window.addEventListener("popstate", router);

function isLocalStorageAvailable() {
    var test = 'test';
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (e) {
        return false;
    }
}

if (isLocalStorageAvailable()) {
    // available - okay!!
} else {
    // unavailable - that is crap!!
    navigateTo("/cookiesAreLocked");

    const box = document.getElementById('footer-bar');
    box.style.display = 'none';
}

/* function ask_vkApiToken(){
    vkBridge.send("VKWebAppGetAuthToken", {
        "app_id": 8034418,
        "scope": ""
    }).then(data => {
        // Обработка события  в случае успеха.
        localStorage.setItem('tempdata_vkapi_token', data.access_token)
    })
    .catch(error => {
        console.log(error);
        if (error.error_data.error_code == 4) {
            navigateTo("/vkAccessIsRequired");
        }
    });
}

ask_vkApiToken(); */

$(function () {
    $(document).ajaxError(function (e, xhr, settings) {
        if (xhr.status == 401) {
            console.log("Catched an 'Unauthorized' server answer.");
            run_auth();
        }
    });
});

window.addEventListener("message", function (event) {
    if (event.data.type == "call_indexjs") {
        if (event.source.location.origin == event.origin) {
            if (event.data.action == "retriveUserData") {
                console.info("Received message sent by the same domain script [type == 'call_indexjs'].\nRequest completed, redirected to URL: " + event.data.url)
                retriveUserData(function(message){
                    //..
                });
            }
        } else {
            console.error("Can't process event I've got, because my politics allow messages only from same domain I work on.")
        }
    }
}, false);

function run_auth() {
    console.log("Trying to log via VK Mini Apps Credentials...");
    $.get(api_server + '/service/auth_sign', {
        app_url: localStorage.getItem("temp_initial_url")
    }, function (data) {
        if (data.status == "okay") {
            localStorage.setItem('access_id', data.userid);
            localStorage.setItem('access_token', data.token);
            retriveUserData(function(message){
                //..
            });
            if(location.pathname == "/" || location.pathname == "/index.html" || location.pathname == "/index"){
                //nothing then!
            }else{
                navigateTo(location.pathname)
            }
            
        }else if(data.status == "error" && data.message == "wrong_sign"){
            fullscreen_message();
        }else {
            alert(JSON.stringify(data))
            error_handler("danger", "Не могу войти, но это обязательно :(", "reload")
        }
        resolve('okay');

    });
}

function service_auth() {
    return new Promise(resolve => {
        if (localStorage.getItem("access_id") != null && localStorage.getItem("access_token") != null) {
            retriveUserData(function(message){
                //..
            });
            resolve('okay');
        } else {
            run_auth();
            resolve('okay');
        }
    });
}

document.addEventListener("DOMContentLoaded", async function () {
    await service_auth();
    document.body.addEventListener("click", e => {
        if (e.target.closest('a[data-link]')) {
            e.preventDefault();
            const link = e.target.closest('a[data-link]');
            if (link) {
                navigateTo(link.href);
            }
        }
    });

    router();
});

window.addEventListener("message", function (event) {
    if (event.data.type == "call_indexjs") {
        if (event.source.location.origin == event.origin) {
            if (event.data.action == "navigateto") {
                console.info("Received message sent by the same domain script [type == 'call_indexjs'].\nRequest completed, redirected to URL: " + event.data.url)
                navigateTo(event.data.url);
            }
        } else {
            console.error("Can't process event I've got, because my politics allow messages only from same domain I work on.")
        }
    }
}, false);

//Removing Preloader
setTimeout(function () {
    var preloader = document.getElementById('preloader')
    if (preloader) {
        preloader.classList.add('preloader-hide');
    }
}, 10);

window.addEventListener('load', function () {
    console.log("Event:pageLoad;")
    var notificator_block = document.getElementById('notificator_block');
})

/* $(function () { //run when the DOM is ready
    $("#footer-bar a").click(function () { //use a class, since your ID gets mangled
        $(".active-nav").removeClass("active-nav");
        $(this).addClass("active-nav");
    });
}); */