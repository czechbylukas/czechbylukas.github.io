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


// --- LOGIC GATE CONFIG ---
// This respects the <script>window.isLoginOnlyPage = true;</script> in your HTML
window.isPremiumPage = window.isPremiumPage || false;
window.isLoginOnlyPage = window.isLoginOnlyPage || false;









async function applyAccessControl(user) {
    if (!document.body) {
        setTimeout(() => applyAccessControl(user), 50);
        return;
    }

    // Define these properly at the start
    const authOverlay = document.getElementById('auth-overlay');
    const authTitle = document.getElementById('auth-title');
    let authIcon = document.getElementById('auth-icon'); // Added 'let' here

    // 1. Logic to show/hide the overlay container
    if (!user || window.isLoginOnlyPage || window.isPremiumPage) {
        ensureAuthOverlay();
    }

    // IMPORTANT: Redefine overlay here in case ensureAuthOverlay just created it
    const activeOverlay = document.getElementById('auth-overlay');
    
    if (activeOverlay && !window.isLoginOnlyPage && !window.isPremiumPage) {
        activeOverlay.style.display = 'none';
    }

    // 1. Icon Management
    if (!authIcon) {
        authIcon = document.createElement('div');
        authIcon.id = 'auth-icon';
        authIcon.style = "cursor:pointer; font-size:24px; display:inline-block; margin-left:15px; vertical-align:middle; line-height:1;";
        
        const rightGroup = document.getElementById('auth-status-container') || 
                           document.getElementById('language-selector-container') || 
                           document.getElementById('header-right-group');
        const header = document.querySelector('header');

        if (rightGroup) { rightGroup.appendChild(authIcon); } 
        else if (header) { header.appendChild(authIcon); }
    }





    
authIcon.innerText = user ? '🚪' : '👤';
    authIcon.onclick = (e) => {
        e.stopPropagation();
        if (user) { 
            if (confirm("Logout?")) window.signOutUser(); 
        } 
        else { 
            // FIX: Re-find or ensure the overlay exists before showing it
            ensureAuthOverlay(); 
            const targetOverlay = document.getElementById('auth-overlay');
            if (targetOverlay) {
                targetOverlay.style.display = 'flex';
                // Ensure the 'X' button is visible so people can close it on free pages
                const closeBtn = document.getElementById('close-x');
                if (closeBtn) {
                    closeBtn.style.display = 'block';
                    // On free pages, just hide it; on restricted, go home
                    closeBtn.onclick = (window.isLoginOnlyPage || window.isPremiumPage) 
                        ? () => window.location.href = 'https://www.hackczech.com'
                        : () => targetOverlay.style.display = 'none';
                }
            }
        }
    };




    // 2. The Logic Gate
    if (user) {
        if (window.isPremiumPage) {
            // Check database for 'active' status on premium pages
            const snapshot = await firebase.database().ref('users/' + user.uid + '/status').get();
            const status = snapshot.val();

            if (status === 'paid') {
                document.body.classList.add('logged-in');
                if (authOverlay) authOverlay.style.display = 'none';
                } else {
                // Logged in but not approved by teacher
                document.body.classList.remove('logged-in');
                if (authOverlay) {
                    authOverlay.style.display = 'flex';
                    
                    // Show contact message and hide login fields
                    if (authTitle) authTitle.innerHTML = "Premium Access Required<br><span style='font-size: 0.9rem; font-weight: normal;'>Please contact: lukas@hackczech.com</span>";
                    
                    if (document.getElementById('auth-email')) document.getElementById('auth-email').style.display = 'none';
                    if (document.getElementById('auth-pass')) document.getElementById('auth-pass').style.display = 'none';
                    const mainBtn = authOverlay.querySelector('button:not(#close-x)');
                    if (mainBtn) mainBtn.style.display = 'none';
                    if (document.getElementById('toggle-link')) document.getElementById('toggle-link').style.display = 'none';

                    const closeBtn = document.getElementById('close-x');
                    if (closeBtn) {
                        closeBtn.style.display = 'block';
                        closeBtn.onclick = () => window.location.href = 'https://www.hackczech.com';
                    }
                }
            }
        } else {
            // Normal logged-in page (not premium)
            document.body.classList.add('logged-in');
            if (authOverlay) authOverlay.style.display = 'none';
        }
    } else { 
        // Not logged in section
        document.body.classList.remove('logged-in');
        if ((window.isLoginOnlyPage || window.isPremiumPage) && authOverlay) {
            authOverlay.style.display = 'flex';
            const closeBtn = document.getElementById('close-x');
            if (closeBtn) closeBtn.style.display = 'block'; 
        }
    }

    const adminBtn = document.getElementById('admin-trigger');
    if (adminBtn) adminBtn.style.display = (user && user.email === 'lukas@hackczech.com') ? 'block' : 'none';
}


// THIS IS THE CRITICAL CHANGE
// --- ENFORCEMENT ---
document.addEventListener('DOMContentLoaded', function() {
    // 1. Create the overlay in the background, but keep it hidden (display:none)
    ensureAuthOverlay();

    if (typeof firebase !== 'undefined') {
        // 2. Listen for the user status. 
        // This is the ONLY place that should decide to show the overlay.
        firebase.auth().onAuthStateChanged(user => {
            applyAccessControl(user);
        });
    }

    // 3. Logic for FREE pages
    if (!window.isLoginOnlyPage && !window.isPremiumPage) {
        document.body.classList.add('logged-in');
        const overlay = document.getElementById('auth-overlay');
        if (overlay) overlay.style.display = 'none';
    } 
    else {
        // 4. Logic for RESTRICTED pages
        // Instead of showing it immediately, we wait 1.5 seconds.
        // If Firebase hasn't logged the user in by then, we show the login box.
        setTimeout(() => {
            const user = firebase.auth().currentUser;
            if (!user) {
                const overlay = document.getElementById('auth-overlay');
                if (overlay) overlay.style.display = 'flex';
            }
        }, 1500); // 1.5 second "grace period" for Firebase to wake up
    }
});








/** * MASTER HEADER SCRIPT + COOKIE BANNER + PRIVACY LINK
 */


// 0. FUNCTION TO LOAD ADSENSE
function loadAdSense() {
    // 1. Strict block for specific pages (like your Dashboard)
    if (window.canShowAds === false) {
        console.log("Ads are disabled for this page.");
        return; 
    }

    // 2. Load the script if it's not already there
    if (!document.querySelector('script[src*="pagead2"]')) {
        var adsenseScript = document.createElement('script');
        adsenseScript.async = true;
        adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9067674021614925';
        adsenseScript.crossOrigin = 'anonymous';
        document.head.appendChild(adsenseScript);
    }
}

// 1. RUN IMMEDIATELY FOR EVERYONE (unless it's the dashboard)
loadAdSense();



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






// --- AUTO-INJECT & ACTIVATE LOGO ---
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('header');
    
    if (header) {
        const logoImg = document.createElement('img');
        
        logoImg.src = '/images/hackczech-logo.png'; 
        logoImg.id = 'dynamic-main-logo';
        logoImg.title = "Go to Home";
        
        logoImg.style.cssText = `
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            width: 100px;
            height: auto;
            cursor: pointer;
            z-index: 100;
            pointer-events: auto;
        `;

        // 1. Handle standard Left-Click
        logoImg.addEventListener('click', function(e) {
            // e.button === 0 is the left mouse button
            if (e.button === 0) {
                window.location.href = window.location.origin;
            }
        });

        // 2. Handle Middle-Click (Scroll wheel)
        logoImg.addEventListener('auxclick', function(e) {
            // e.button === 1 is the middle mouse button
            if (e.button === 1) {
                window.open(window.location.origin, '_blank');
                e.preventDefault(); // Prevents the autoscroll icon from appearing
            }
        });

        header.prepend(logoImg);
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
    // Remove the class immediately so the CSS shield hides the content
    document.body.classList.remove('logged-in');
    firebase.auth().signOut().then(() => {
        window.location.reload();
    }); 
};


window.handleAuth = async function() {
    const email = document.getElementById('auth-email').value;
    const pass = document.getElementById('auth-pass').value;
    try {
        if (window.isSignUp) {
            const name = document.getElementById('reg-name').value;
            const c = await firebase.auth().createUserWithEmailAndPassword(email, pass);
            // This sets the default status to pending
        await firebase.database().ref('users/' + c.user.uid).set({ 
            name, 
            email, 
            status: 'pending' // This must match the status check in applyAccessControl
            });
            alert("Account created. Please ask Lukas for premium approval.");
        } else {
            await firebase.auth().signInWithEmailAndPassword(email, pass);
        }
    } catch (e) { alert(e.message); }
};


// Handle ads for returning users who already gave consent or rejected
// --- UPDATE THIS BLOCK AT THE END OF YOUR SCRIPT ---
if (localStorage.getItem("cookieConsent") && window.canShowAds !== false) { 
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








// --- SMART PAGE TIME TRACKER (DETAILED VERSION) ---
let totalActiveTime = 0;
let lastActiveTime = Date.now();

function logTimeSpent() {
    const timeToLog = Math.round(totalActiveTime / 1000); 
    
    if (typeof firebase !== 'undefined' && firebase.auth().currentUser && timeToLog > 2) {
        const user = firebase.auth().currentUser;
        const dateKey = new Date().toISOString().split('T')[0];
        
        // 1. Parse the Title: "Vocabulary 1 | Past Tense | HáCZech"
        const titleText = document.title || "General | Main Page | HáCZech";
        const parts = titleText.split('|').map(p => p.trim());
        
        // 2. Extract Category (Group) and Page
        // Result: group = "Vocabulary 1", detail = "Past Tense"
        const group = parts[0] || 'General';
        const detail = parts[1] || 'Main';

        // 3. Sanitize keys for Firebase (remove symbols that break paths)
        const safeGroup = group.replace(/[.#$[\]]/g, "_");
        const safeDetail = detail.replace(/[.#$[\]]/g, "_");

        // 4. Save to a NEW node called 'detailed_usage'
        const path = `users/${user.uid}/detailed_usage/${dateKey}/${safeGroup}/${safeDetail}`;
        firebase.database().ref(path).transaction((currentValue) => (currentValue || 0) + timeToLog);
        
        totalActiveTime = 0; // Reset after logging
    }
}

// Logic to detect if user is active
setInterval(() => {
    if (document.visibilityState === 'visible') {
        const now = Date.now();
        totalActiveTime += (now - lastActiveTime);
        lastActiveTime = now;
    } else {
        lastActiveTime = Date.now();
    }
}, 1000);

window.addEventListener('beforeunload', logTimeSpent);
setInterval(logTimeSpent, 5000); // Auto-save every 5s








// 1. Run immediately on load to catch restricted pages

// --- AT THE VERY END OF scripts-header.js ---



function ensureAuthOverlay() {
    // 1. If it's already there, don't make another one
    if (document.getElementById('auth-overlay')) return;

    // 2. Safety: If body doesn't exist yet, wait and try again
    if (!document.body) {
        setTimeout(ensureAuthOverlay, 50);
        return;
    }

    // 3. Create the element
    const overlay = document.createElement('div');
    overlay.id = 'auth-overlay';
    
    // FORCE visibility for troubleshooting
overlay.style.cssText = "position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); display:none; justify-content:center; align-items:center; z-index:999999; font-family:sans-serif; backdrop-filter: blur(5px);";    
        overlay.innerHTML = `
        <div style="background:white; padding:30px; border-radius:12px; width:90%; max-width:350px; text-align:center; position:relative; box-shadow: 0 10px 25px rgba(0,0,0,0.5); color: #333 !important;">
            <span id="close-x" onclick="window.location.href='https://www.hackczech.com'" style="position:absolute; right:15px; top:10px; cursor:pointer; font-size:24px; color:#000;">&times;</span>
            
            <h2 id="auth-title" style="margin-top:0; color:#2b593e;">Log In</h2>

            <div id="signup-fields" style="display:none;">
                <input type="text" id="reg-name" placeholder="Full Name" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;">
            </div>
            <input type="email" id="auth-email" placeholder="Email" style="width:100%; padding:12px; margin-bottom:10px; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;">
            <input type="password" id="auth-pass" placeholder="Password" style="width:100%; padding:12px; margin-bottom:15px; border:1px solid #ddd; border-radius:5px; box-sizing:border-box;">
            <button onclick="handleAuth()" style="width:100%; padding:12px; background:#2b593e; color:white; border:none; border-radius:5px; cursor:pointer; font-weight:bold; font-size:16px;">Confirm</button>
            <p style="margin-top:20px; font-size:0.9rem;">
                <span id="toggle-link" style="color:#3498db; cursor:pointer;" onclick="toggleAuth()">Need an account? Sign Up</span><br><br>
                <span style="color:#e67e22; cursor:pointer; font-size:0.8rem;" onclick="forgotPassword()">Forgot Password?</span><br><br>
                <a href="https://www.hackczech.com" style="color:#666; text-decoration:none; font-size:0.8rem; display:block; margin-top:10px;">🏠 Back to Home</a>
            </p>
        </div>`;

    document.body.appendChild(overlay);
    console.log("Auth overlay has been appended to body."); // Check your console for this!
}