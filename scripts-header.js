const path = window.location.pathname;
window.isPremiumPage = path.includes('/premium/') || path.includes('study-tool');
window.isLoginOnlyPage = path.includes('/members/') || path.includes('grammar-guide');

function applyAccessControl(user) {
    const authOverlay = document.getElementById('auth-overlay');
    const unpaidMsg = document.getElementById('unpaid-message');
    const authIcon = document.getElementById('auth-icon');
    if (authIcon) authIcon.innerText = user ? '🚪' : '👤';

    if (!user) {
        if (window.isLoginOnlyPage || window.isPremiumPage) {
            if (authOverlay) authOverlay.style.display = 'flex';
        }
    } else {
        // [CHANGE: Move logic here so user.uid is valid]
        if (authOverlay) authOverlay.style.display = 'none';

        if (window.isPremiumPage && !path.includes('study-tool')) { 
            if (typeof firebase !== 'undefined' && firebase.database) {
                firebase.database().ref('users/' + user.uid + '/status').on('value', snap => {
                    const status = snap.val();
                    if (status !== 'paid') {
                        if (unpaidMsg) unpaidMsg.style.display = 'flex';
                    } else {
                        if (unpaidMsg) unpaidMsg.style.display = 'none';
                    }
                });
            }
        }
    }
}


// THIS IS THE CRITICAL CHANGE
window.addEventListener('load', function() {
    // Wait until EVERYTHING (including Firebase scripts) is loaded
    if (typeof firebase !== 'undefined') {
        firebase.auth().onAuthStateChanged(user => {
            applyAccessControl(user);
        });
    }
});






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

// Load AdSense immediately if a choice (any choice) was made
if (localStorage.getItem("cookieConsent")) {
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
        // Trigger ads even if footer/sidebar are still loading
        let checkAds = setInterval(() => {
            const ads = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status="done"])');
            if (ads.length > 0) {
                ads.forEach(() => (window.adsbygoogle = window.adsbygoogle || []).push({}));
                clearInterval(checkAds);
            }
        }, 500);
        setTimeout(() => clearInterval(checkAds), 5000); // Stop looking after 5s

        banner.style.display = "none";
    }); // <--- FIX 1: Closes Accept Click Listener

// Handle Reject
    document.getElementById('reject-cookies').addEventListener('click', function() {
        localStorage.setItem("cookieConsent", "denied");
        
        // Signal Google to show ONLY non-personalized ads
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
        });

        loadAdSense(); // Still load the script
        
// Trigger non-personalized ads even if footer/sidebar are still loading
        let checkAdsNPA = setInterval(() => {
            const ads = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status="done"])');
            if (ads.length > 0) {
                ads.forEach(() => {
                    (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                });
                clearInterval(checkAdsNPA);
            }
        }, 500);
        setTimeout(() => clearInterval(checkAdsNPA), 5000); // Stop looking after 5s

        banner.style.display = "none";
    });
}); // <--- FIX 2: Closes the Cookie Banner DOMContentLoaded block


// MAKE ONLY LOGO CLICKABLE
document.addEventListener("DOMContentLoaded", function() {
    const logo = document.getElementById('heading-welcome');
    if (logo) {
        logo.style.cursor = "pointer";
        logo.title = "Go to Home";
        logo.addEventListener('click', function() {
            window.location.href = "/";
        });
    }
});


window.isSignUp = false;

window.toggleAuth = function() {
    window.isSignUp = !window.isSignUp;
    const title = document.getElementById('auth-title');
    const fields = document.getElementById('signup-fields');
    const link = document.getElementById('toggle-link');
    if (title) title.innerText = window.isSignUp ? "Sign Up" : "Log In";
    if (fields) fields.style.display = window.isSignUp ? 'block' : 'none';
    if (link) link.innerText = window.isSignUp ? "Already have an account? Log In" : "Need an account? Sign Up";
};

window.forgotPassword = function() {
    const email = document.getElementById('auth-email').value;
    if(!email) return alert("Enter email first.");
    firebase.auth().sendPasswordResetEmail(email).then(()=>alert("Reset sent!")).catch(e=>alert(e.message));
};

window.signOutUser = function() { 
    firebase.auth().signOut().then(() => {
        window.location.reload();
    }); 
}; // <--- FIX 3: Closes the signOutUser function


window.handleAuth = async function() {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-pass').value;
    try {
        if (window.isSignUp) {
            const name = document.getElementById('reg-name').value;
            const c = await firebase.auth().createUserWithEmailAndPassword(email, pass);
            await firebase.database().ref('users/' + c.user.uid).set({ name, email, status: 'pending' });
            alert("Account created. Please ask teacher for approval.");
        } else {
            await firebase.auth().signInWithEmailAndPassword(email, pass);
        }
    } catch (e) { alert(e.message); }
};


// Handle ads for returning users who already gave consent or rejected
if (localStorage.getItem("cookieConsent")) {
    let checkAdsReturning = setInterval(() => {
        const ads = document.querySelectorAll('ins.adsbygoogle:not([data-adsbygoogle-status="done"])');
        if (ads.length > 0) {
            const isNPA = localStorage.getItem("cookieConsent") === "denied";
            ads.forEach(() => {
                if (isNPA) (window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = 1;
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            });
            clearInterval(checkAdsReturning);
        }
    }, 500);
    setTimeout(() => clearInterval(checkAdsReturning), 5000);
}