/**
 * collabo.js - Universal Real-time Sync Engine
 */
const COLLABO_CONFIG = {
    teacherEmail: 'lukas@hackczech.com',
    rootFolder: 'sessions'
};

const urlParams = new URLSearchParams(window.location.search);
const rawName = urlParams.get('sid') || "lobby";
window.sessionId = rawName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');

function initCollabo() {
    if (typeof firebase === 'undefined') return;
    window.dbRef = firebase.database().ref(`${COLLABO_CONFIG.rootFolder}/${window.sessionId}`);

    // 1. Automatic Permissions
    firebase.auth().onAuthStateChanged(user => {
        const isTeacher = user && user.email === COLLABO_CONFIG.teacherEmail;
        document.querySelectorAll('.teacher-only').forEach(el => el.style.display = isTeacher ? 'block' : 'none');
    });

    // 2. Global Sync Listener
    window.dbRef.on('value', snapshot => {
        const data = snapshot.val();
        if (!data) return;

        Object.keys(data).forEach(id => {
            
            // --- CASE A: IMAGE SYNC ---
            if (id === "word-image-src") {
                const img = document.getElementById('word-image');
                if (img) {
                    img.src = data[id];
                    img.style.display = data[id] ? 'block' : 'none';
                }
                return; 
            }

            // --- CASE B: EXPLICIT VISIBILITY SYNC ---
            if (id === "czech-word-hidden") {
                const czechEl = document.getElementById('czech-word');
                if (czechEl) {
                    if (data[id] === true) czechEl.classList.add('hidden');
                    else czechEl.classList.remove('hidden');
                }
                return;
            }

            // --- CASE C: STANDARD SYNC (Text & Inputs) ---
            // --- CASE C: STANDARD SYNC ---
const el = document.getElementById(id);
if (!el) return;

if (el.tagName === 'INPUT' || el.tagName === 'SELECT') { 
    if (data[id] !== undefined && el.value !== data[id]) {
        
        // Save cursor position so it doesn't jump to the end
        const start = el.selectionStart;
        const end = el.selectionEnd;

        el.value = data[id];

        // Restore cursor position if this is the active box
        if (document.activeElement === el) {
            el.setSelectionRange(start, end);
        }

        // Trigger change for dropdowns
        if (el.tagName === 'SELECT' && typeof getRandomWord === 'function') {
            el.dispatchEvent(new Event('change'));
        }
    }
} else {
    el.innerText = data[id];
}
        });
    });

// 3. Global Input Watcher (Optimized)
document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.id === 'word-guess-box' || el.classList.contains('sync')) {
        // Send the update immediately for better "real-time" feel
        if (window.dbRef) {
            window.dbRef.update({ [el.id]: el.value });
        }
    }
});
}

// Global helper for manual broadcasts (used in buttons/game logic)
function broadcast(obj) {
    if (window.dbRef) {
        window.dbRef.update(obj).catch(err => console.error("Broadcast failed:", err));
    }
}

window.addEventListener('load', initCollabo);