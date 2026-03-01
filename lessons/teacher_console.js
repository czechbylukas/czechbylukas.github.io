window.enableTeacherMode = function(roomName) {
    // 1. Create the Sidebar UI dynamically
    const sidebar = document.createElement('div');
    sidebar.id = "teacher-sidebar-dynamic";
    // ADDED: box-sizing: border-box
    sidebar.style = "position:fixed; right:0; top:0; width:300px; height:100%; background:#fff; border-left:3px solid #007bff; padding:20px; z-index:10000; overflow-y:auto; box-shadow:-5px 0 15px rgba(0,0,0,0.1); font-family:sans-serif; box-sizing: border-box;";
    
    sidebar.innerHTML = `
        <h3 style="margin-top:0; color: #007bff;">Teacher Console: ${roomName}</h3>
        <div style="background:#f8f9fa; padding:10px; border:1px dashed #ccc; font-size:13px; margin-bottom:15px;">
            <b>Active Room:</b> ${roomName}<br>
            <b>Status:</b> <span id="sync-status" style="color:green">Connected</span>
        </div>
        
        <label style="font-weight:bold; font-size:12px;">INSTRUCTION LANGUAGE:</label>
        <select id="lang" style="width:100%; margin-bottom:15px; padding:8px;">
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="es">Spanish</option>
        </select>

        <label style="font-weight:bold; font-size:12px;">SEARCH VERB:</label>
        <input type="text" id="v-search" onkeyup="window.filterVerbs()" placeholder="Search..." style="width:100%; padding:8px; margin-bottom:10px; box-sizing:border-box; border: 1px solid #ccc; border-radius: 4px;">
        
        <ul id="v-list" style="padding:0; list-style:none; max-height:300px; overflow-y:auto; border:1px solid #ddd; background:#fff; border-radius: 4px;">
            <li style="padding:10px; color:#999;">Loading verbs...</li>
        </ul>

        <button onclick="window.openGoogleModal()" style="width:100%; margin-top:20px; background:#28a745; color:white; padding:12px; border:none; border-radius:5px; cursor:pointer; font-weight:bold;">
            Finish & Send to Doc
        </button>
    `;
    document.body.appendChild(sidebar);

    // 2. Initialize Firebase Session
    const safeId = roomName.toLowerCase().replace(/[^a-z0-9]/g, '');
    window.dbRef = firebase.database().ref('sessions/' + safeId);

    // 3. Re-attach the Verb Database logic
    if (typeof initDatabase === 'function') {
        initDatabase(); 
    }

    // 4. Bi-directional Sync Listener
    // ADDED: .off() to prevent multiple listeners if called again
    window.dbRef.off(); 
    window.dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        if (!data) return;

        const inputField = document.getElementById('verb-input');
        if (inputField && data.liveInput !== undefined && document.activeElement !== inputField) {
            inputField.value = data.liveInput;
            // Trigger local check so the student's blue button lights up
            if(window.checkInputForButton) window.checkInputForButton();
        }
    });

    // 5. Adjust main layout
    const mainLayout = document.querySelector('.main-layout');
    if (mainLayout) {
        mainLayout.style.marginRight = "300px";
    }
};