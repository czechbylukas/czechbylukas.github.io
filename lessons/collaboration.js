/**
 * Teacher-Student Collaboration View Module
 * Handles real-time syncing via Firebase
 */
class CollaborationView {
    constructor(sid) {
        // 1. Create a "Safe" ID for Firebase
        this.sessionId = sid.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
        
        this.dbRef = firebase.database().ref('sessions/' + this.sessionId);
        console.log("Room initialized:", this.sessionId);
    }

    // Sends local updates to the cloud
    sync(data) {
        this.dbRef.update(data);
    }

    // Listens for changes from the other person
    listen(callback) {
        this.dbRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) callback(data);
        });
    }
}