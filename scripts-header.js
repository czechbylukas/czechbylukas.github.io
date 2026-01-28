/** * MASTER HEADER SCRIPT + COOKIE BANNER
 */

// 1. INITIAL CONSENT (Denied by default)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

if (!localStorage.getItem("cookieConsent")) {
    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'granted'
    });
} else {
    gtag('consent', 'default', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',
        'ad_personalization': 'granted',
        'analytics_storage': 'granted'
    });
}

// 2. LOAD GOOGLE TAG
var script = document.createElement('script');
script.async = true;
script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1BCW5XQ0X5';
document.head.appendChild(script);

gtag('js', new Date());
const savedLang = (localStorage.getItem("selectedLanguage") || "en").toUpperCase();
gtag('config', 'G-1BCW5XQ0X5', {
    'language_code': savedLang.toLowerCase(),
    'page_title': '[' + savedLang + '] ' + document.title
});

// 3. COOKIE BANNER LOGIC & APPEARANCE
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("cookieConsent")) return; // Don't show if already accepted

    // Create the Banner HTML
    const banner = document.createElement('div');
    banner.id = "cookie-banner";
    banner.style = "position:fixed; bottom:0; left:0; width:100%; background:#2b593e; color:white; padding:20px; text-align:center; z-index:9999; font-family:sans-serif;";
    
    // Choose text based on language
    const isCzech = (localStorage.getItem("selectedLanguage") === "cs");
    const msg = isCzech ? "Tento web používá cookies pro lepší zkušenost." : "This website uses cookies to improve your experience.";
    const btnText = isCzech ? "Rozumím" : "I understand";

    banner.innerHTML = `<span>${msg}</span> <button id='accept-cookies' style='margin-left:15px; padding:8px 15px; cursor:pointer; background:white; color:#2b593e; border:none; border-radius:5px; font-weight:bold;'>${btnText}</button>`;
    document.body.appendChild(banner);

    // Handle Click
    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem("cookieConsent", "true");
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted'
        });
        banner.style.display = "none";
    });
});