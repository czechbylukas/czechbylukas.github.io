/**
 * HáCZech Collaboration Script
 * Handles bi-directional sync between Teacher and Student
 */

// --- 1. SESSION & AUTH CONFIG ---
const urlParams = new URLSearchParams(window.location.search);
const rawName = urlParams.get('sid') || "room1"; 

// Create Safe ID for Firebase
window.sessionId = rawName.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
window.dbRef = firebase.database().ref('sessions/' + window.sessionId);

// UI Setup: Show Teacher Sidebar only for Admin
firebase.auth().onAuthStateChanged((user) => {
    const sidebar = document.getElementById('teacher-sidebar');
    if (sidebar) {
        sidebar.style.display = (user && user.email === 'lukas@hackczech.com') ? 'block' : 'none';
    }
});

// --- 2. BROADCASTERS (Sending data to cloud) ---

// Sync Gender Selection
document.getElementById('gender-switch').addEventListener('change', (e) => {
    syncToCloud({ gender: e.target.value });
    if (window.showVerbInput) window.showVerbInput();
});

// Sync Real-time Typing
document.getElementById('verb-input').addEventListener('input', (e) => {
    syncToCloud({ liveInput: e.target.value });
});

// Helper to push updates
function syncToCloud(data) {
    window.dbRef.update(data);
}

// --- 3. RECEIVER (Listening for changes) ---

window.dbRef.on('value', (snapshot) => {
    const data = snapshot.val();
    if (!data) return;

    const inputField = document.getElementById('verb-input');
    const genderField = document.getElementById('gender-switch');
    const infoDisplay = document.getElementById('verb-info-display');
    const lessonSection = document.getElementById('lesson-section');
    const inputSection = document.getElementById('input-section');

    // Sync Day Index
    if (data.dayIdx !== undefined) window.dayIdx = data.dayIdx;

    // Sync Gender
    if (data.gender && genderField.value !== data.gender) {
        genderField.value = data.gender;
        inputSection.style.display = 'block';
    }

    // Sync Live Typing (Only update if different to prevent cursor jumping)
    if (data.liveInput !== undefined && inputField.value !== data.liveInput) {
        inputField.value = data.liveInput;
        if (window.checkInputForButton) window.checkInputForButton();
    }

    // Sync State (Lesson Start/Next Step)
    if (data.lessonStarted) {
        window.currentVerb = data.liveInput;
        inputSection.style.display = 'none';
        lessonSection.style.display = 'block';
        
        let displayHtml = data.liveInput.replace(/t(\s|$)/, '<b style="color:red">t</b>$1');
        if (infoDisplay) infoDisplay.innerHTML = " | " + displayHtml;

        if (data.currentStep !== undefined && window.step !== data.currentStep) {
            window.step = data.currentStep;
            if (window.renderStepUI) window.renderStepUI(data.currentStep);
        }
    } else {
        // Reset to input view
        inputSection.style.display = 'block';
        lessonSection.style.display = 'none';
        if (infoDisplay) infoDisplay.innerHTML = "";
        window.step = 0;
    }
});

// --- 4. OVERRIDE CORE APP FUNCTIONS FOR SYNC ---

// We "wrap" your existing functions to ensure they update Firebase
const originalStartLesson = window.startLesson;
window.startLesson = function() {
    // The original function handles validation & DB check
    originalStartLesson(); 
    // If successful, currentVerb is set; now broadcast
    syncToCloud({ 
        lessonStarted: true, 
        liveInput: window.currentVerb, 
        currentStep: 1,
        dayIdx: window.dayIdx 
    });
};

const originalNextStep = window.nextStep;
window.nextStep = function() {
    // Determine what the next step will be
    let nextStepVal = (window.step < 4) ? window.step + 1 : 0;
    
    if (nextStepVal === 0) {
        // Resetting for next verb
        const nextDay = (window.dayIdx + 1) % window.days.length;
        syncToCloud({ 
            lessonStarted: false, 
            currentStep: 0, 
            liveInput: "",
            dayIdx: nextDay 
        });
    } else {
        syncToCloud({ currentStep: nextStepVal });
    }
    originalNextStep();
};