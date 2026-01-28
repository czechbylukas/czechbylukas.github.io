/** * MASTER HEADER SCRIPT + COOKIE BANNER + PRIVACY LINK
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
(function() {
    const gaLang = (localStorage.getItem("selectedLanguage") || "en").toLowerCase();
    gtag('config', 'G-1BCW5XQ0X5', {
        'language_code': gaLang,
        'page_title': '[' + gaLang.toUpperCase() + '] ' + document.title
    });
})();

// 3. COOKIE BANNER LOGIC
document.addEventListener("DOMContentLoaded", function() {
    if (localStorage.getItem("cookieConsent")) return;

    const banner = document.createElement('div');
    banner.id = "cookie-banner";
    // Styling the banner
    banner.style = "position:fixed; bottom:0; left:0; width:100%; background:#2b593e; color:white; padding:15px 20px; text-align:center; z-index:9999; font-family:sans-serif; box-shadow: 0 -2px 10px rgba(0,0,0,0.3); line-height: 1.5;";
    
    // Logic for language
    const isCzech = (localStorage.getItem("selectedLanguage") === "cs");
    const msg = isCzech ? "Tento web používá cookies pro lepší zkušenost." : "This website uses cookies to improve your experience.";
    const btnText = isCzech ? "Rozumím" : "I understand";
    const policyText = isCzech ? "Zásady ochrany soukromí" : "Privacy Policy";

    banner.innerHTML = `
        <span style="display:inline-block; margin-bottom:10px;">${msg}</span> 
        <div style="display:inline-block; margin-left:15px;">
            <a href="/privacy.html" style="color:white; text-decoration:underline; font-size:14px; margin-right:15px;">${policyText}</a>
            <button id='accept-cookies' style='padding:8px 18px; cursor:pointer; background:white; color:#2b593e; border:none; border-radius:5px; font-weight:bold; transition: 0.3s;'>${btnText}</button>
        </div>
    `;
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