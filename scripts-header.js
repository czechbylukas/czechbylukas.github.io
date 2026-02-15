// --- GLOBAL FIREBASE CONFIG ---
const firebaseConfig = {
    apiKey: "AIzaSyAGCKtAQkj9bsrSpJ1IQWLAm_PA20vTluM",
    authDomain: "vocabsql-database.firebaseapp.com",
    databaseURL: "https://vocabsql-database-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "vocabsql-database",
    storageBucket: "vocabsql-database.firebasestorage.app",
    messagingSenderId: "122357206206",
    appId: "1:122357206206:web:bc6a3b03e4f87c910ae2ef"
};

// Start Firebase if it hasn't been started yet
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
// ------------------------------


const path = window.location.pathname;
window.isPremiumPage = path.includes('/premium/');
window.isLoginOnlyPage = path.includes('/members/') || path.includes('grammar-guide');




function ensureAuthOverlay() {
    if (document.getElementById('auth-overlay')) return;
    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    overlay.style = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); display:none; justify-content:center; align-items:center; z-index:10000; font-family:sans-serif;";
    overlay.innerHTML = `
        <div style="background:white; padding:30px; border-radius:12px; width:90%; max-width:350px; text-align:center; position:relative;">
            <span onclick="document.getElementById('auth-overlay').style.display='none'" style="position:absolute; right:15px; top:10px; cursor:pointer; font-size:20px;">&times;</span>
            <h2 id="auth-title" style="color:#2c3e50;">Log In</h2>
            <div id="signup-fields" style="display:none;">
                <input type="text" id="reg-name" placeholder="Full Name" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;">
            </div>
            <input type="email" id="auth-email" placeholder="Email" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;">
            <input type="password" id="auth-pass" placeholder="Password" style="width:100%; padding:10px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;">
            <button onclick="handleAuth()" style="width:100%; padding:12px; background:#2c3e50; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">Confirm</button>
            <p style="margin-top:15px; font-size:0.85rem;">
                <span id="toggle-link" style="color:#3498db; cursor:pointer;" onclick="toggleAuth()">Need an account? Sign Up</span><br><br>
                <span style="color:#e67e22; cursor:pointer;" onclick="forgotPassword()">Forgot Password?</span>
            </p>
        </div>`;
    document.body.appendChild(overlay);
}




function applyAccessControl(user) {
    ensureAuthOverlay(); // <--- Add this line
    const authOverlay = document.getElementById('auth-overlay');
    let authIcon = document.getElementById('auth-icon');


    // 1. If the icon doesn't exist yet, create it
    if (!authIcon) {
        authIcon = document.createElement('div');
        authIcon.id = 'auth-icon';
        // Styling to make it fit nicely in your flex-header
        authIcon.style = "cursor:pointer; font-size:24px; display:inline-block; margin-left:15px; vertical-align:middle; line-height:1;";
        
        // Find the header or the welcome heading
        // Find the right-side group div
// 1. Find a place to put the icon (Checks all your different page layouts)
const rightGroup = document.getElementById('auth-status-container') || 
                   document.getElementById('language-selector-container') || 
                   document.getElementById('header-right-group');
                   
const header = document.querySelector('header');

if (rightGroup) {
    rightGroup.appendChild(authIcon); 
} else if (header) {
    header.appendChild(authIcon); 
}
        }

    // 2. Set the icon and the click action
    authIcon.innerText = user ? '🚪' : '👤';
    authIcon.title = user ? 'Logout' : 'Login';
    
authIcon.onclick = (e) => {
    e.stopPropagation();
    if (user) {
        if (confirm("Logout?")) window.signOutUser();
    } else {
        document.getElementById('auth-overlay').style.display = 'flex';
    }
};

    // 3. Page Access Control
// Fixed code
if (!user && (window.isLoginOnlyPage || window.isPremiumPage)) {
    if (authOverlay) authOverlay.style.display = 'flex';
}
// ADD THESE TWO LINES HERE:
    const adminBtn = document.getElementById('admin-trigger');
    if (adminBtn) adminBtn.style.display = (user && user.email === 'lukas@hackczech.com') ? 'block' : 'none';
} // This is the end of the function



// THIS IS THE CRITICAL CHANGE
document.addEventListener('DOMContentLoaded', function() {
    if (typeof firebase !== 'undefined') {
        firebase.auth().onAuthStateChanged(user => {
            // 1. Re-run the logic to update the icon (👤 -> 🚪) and show/hide the Admin button
            applyAccessControl(user);

            // 2. Hide the login window if the user is now logged in
            const overlay = document.getElementById('auth-overlay');
            if (user && overlay) overlay.style.display = 'none';
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




// --- PAGE TIME TRACKER ---
let startTime = Date.now();
let currentPage = window.location.pathname.split('/').pop() || 'index.html';

function logTimeSpent() {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000); 
    
    // Check if firebase and auth are ready
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser && timeSpent > 2) {
        const user = firebase.auth().currentUser;
        const dateKey = new Date().toISOString().split('T')[0];
        const cleanPageName = currentPage.replace(/\./g, '_');
        
        // Using firebase.database() directly to ensure it works globally
        const path = `usage_logs/${user.uid}/${dateKey}/${cleanPageName}`;
        firebase.database().ref(path).transaction((currentValue) => {
            return (currentValue || 0) + timeSpent;
        });
    }
}

window.addEventListener('beforeunload', logTimeSpent);
window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        logTimeSpent();
    } else {
        startTime = Date.now(); 
    }
});