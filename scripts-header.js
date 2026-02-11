/** * MASTER HEADER SCRIPT + COOKIE BANNER + PRIVACY LINK
 */


// 0. FUNCTION TO LOAD ADSENSE ONLY AFTER CONSENT
function loadAdSense() {
    if (!document.querySelector('script[src*="pagead2"]')) {
        var adsenseScript = document.createElement('script');
        adsenseScript.async = true;
        adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9067674021614925';
        adsenseScript.crossOrigin = 'anonymous';
        document.head.appendChild(adsenseScript);
    }
}

// Load AdSense immediately if consent was already granted in a previous session
if (localStorage.getItem("cookieConsent") === "granted") {
    loadAdSense();
}



// 1. INITIAL CONSENT (Consent Mode v2 Compliant)
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}

if (!localStorage.getItem("cookieConsent")) {


    gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied' // Matches your policy: Denied by default
    });


} else {
    gtag('consent', 'default', {
        'ad_storage': 'granted',
        'ad_user_data': 'granted',      // New for v2
        'ad_personalization': 'granted',// New for v2
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



const btnAccept = isCzech ? "Přijmout" : "Accept";
    const btnReject = isCzech ? "Odmítnout" : "Reject";
    const policyText = isCzech ? "Zásady ochrany soukromí" : "Privacy Policy";

    banner.innerHTML = `
        <span style="display:inline-block; margin-bottom:10px;">${msg}</span> 
        <div style="display:inline-block; margin-left:15px;">
            <a href="/privacy.html" style="color:white; text-decoration:underline; font-size:14px; margin-right:15px;">${policyText}</a>
            <button id='reject-cookies' style='padding:6px 14px; cursor:pointer; background:transparent; color:white; border:1px solid white; border-radius:5px; margin-right:10px;'>${btnReject}</button>
            <button id='accept-cookies' style='padding:8px 18px; cursor:pointer; background:white; color:#2b593e; border:none; border-radius:5px; font-weight:bold;'>${btnAccept}</button>
        </div>
    `;



    document.body.appendChild(banner);

// Handle Accept
    document.getElementById('accept-cookies').addEventListener('click', function() {
        localStorage.setItem("cookieConsent", "granted");
        gtag('consent', 'update', {
            'ad_storage': 'granted',
            'ad_user_data': 'granted',
            'ad_personalization': 'granted',
            'analytics_storage': 'granted'
        });
     loadAdSense(); 

    // NEW: This triggers any ad placeholders already on the page
    setTimeout(() => {
        const ads = document.querySelectorAll('ins.adsbygoogle');
        ads.forEach(() => {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        });
    }, 500); // Small delay to ensure script is loaded

    banner.style.display = "none";
});




    // Handle Reject
    document.getElementById('reject-cookies').addEventListener('click', function() {
        localStorage.setItem("cookieConsent", "denied");
        // We stay in the 'denied' state (pings only), so we just hide the banner
        banner.style.display = "none";
    });
});


// MAKE LOGO/HEADER CLICKABLE
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    if (header) {
        header.title = "Go to Home";
        header.addEventListener('click', function(e) {
            // Only redirect if they didn't click a specific link inside the header
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                window.location.href = "/";
            }
        });
    }
});


