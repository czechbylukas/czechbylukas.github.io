(() => {
  const legacyKey = 'czechPracticeKnownWords';
  let selections = {};
  let user = null;
  let ready = false;
  let authGeneration = 0;
  const pendingWrites = new Map();
  const failedWrites = new Set();

  const bar = document.createElement('div');
  bar.className = 'practice-account';
  bar.innerHTML = '<div id="auth-status-container"></div><div><p id="practice-account-status" role="status" aria-live="polite">Načítání přihlášení…</p><div id="practice-import-controls" hidden><button type="button" id="practice-import">Importovat předchozí výběr</button> <button type="button" id="practice-import-dismiss">Neimportovat</button></div></div>';
  document.body.insertBefore(bar, document.body.firstChild);
  const status = document.getElementById('practice-account-status');
  const importControls = document.getElementById('practice-import-controls');
  const importButton = document.getElementById('practice-import');
  const dismissButton = document.getElementById('practice-import-dismiss');

  function notify() {
    window.dispatchEvent(new Event('practiceSelectionsChanged'));
  }

  function readLegacySelections() {
    const saved = localStorage.getItem(legacyKey);
    if (saved === null) return {};
    const parsed = JSON.parse(saved);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      throw new TypeError('Saved vocabulary selections must be an object.');
    }
    return Object.fromEntries(Object.entries(parsed).filter(([key, value]) =>
      /^(animal|verb|question):/.test(key) && typeof value === 'boolean'
    ));
  }

  function displayImportChoice() {
    const dismissed = localStorage.getItem(`czechPracticeImport:${user.uid}`);
    importControls.hidden = dismissed === 'decided' || Object.keys(readLegacySelections()).length === 0;
  }

  function showError(message, error) {
    console.error(message, error);
    status.textContent = message;
  }

  window.isPracticeSelectionsReady = () => ready;
  window.isPracticeWordKnown = (type, id, defaultKnown) => {
    const value = selections[`${type}:${id}`];
    return typeof value === 'boolean' ? value : Boolean(user && ready && defaultKnown);
  };

  window.setPracticeWordKnown = (type, id, isKnown) => {
    if (!ready) throw new Error('Vocabulary selections are still loading.');
    const key = `${type}:${id}`;
    selections[key] = isKnown;
    if (!user) return;

    const uid = user.uid;
    const generation = authGeneration;
    const ref = firebase.database().ref(`users/${uid}/exercise_selections/${key}`);
    const previous = pendingWrites.get(key) || Promise.resolve();
    const write = previous.then(() => ref.set(isKnown), () => ref.set(isKnown));
    pendingWrites.set(key, write);
    importButton.disabled = true;
    status.textContent = 'Ukládání výběru…';
    write.then(() => {
      if (generation !== authGeneration) return;
      if (pendingWrites.get(key) === write) pendingWrites.delete(key);
      failedWrites.delete(key);
      if (pendingWrites.size === 0) {
        importButton.disabled = failedWrites.size > 0;
        if (failedWrites.size === 0) status.textContent = 'Přihlášeno. Výběr je uložen.';
      }
    }, error => {
      if (generation !== authGeneration) return;
      if (pendingWrites.get(key) === write) pendingWrites.delete(key);
      failedWrites.add(key);
      importButton.disabled = true;
      showError('Výběr se nepodařilo uložit. Zkontrolujte připojení a zkuste výběr změnit znovu.', error);
    });
  };

  importButton.addEventListener('click', async () => {
    if (!user || !ready || pendingWrites.size || failedWrites.size) return;
    const uid = user.uid;
    const generation = authGeneration;
    importButton.disabled = dismissButton.disabled = true;
    ready = false;
    notify();
    try {
      const additions = Object.fromEntries(Object.entries(readLegacySelections()).filter(([key]) =>
        !Object.prototype.hasOwnProperty.call(selections, key)
      ));
      await firebase.database().ref(`users/${uid}/exercise_selections`).update(additions);
      if (generation !== authGeneration) return;
      Object.assign(selections, additions);
      localStorage.setItem(`czechPracticeImport:${uid}`, 'decided');
      importControls.hidden = true;
      status.textContent = 'Předchozí výběr byl importován.';
      notify();
    } catch (error) {
      if (generation === authGeneration) showError('Předchozí výběr se nepodařilo importovat.', error);
    } finally {
      if (generation === authGeneration) {
        importButton.disabled = dismissButton.disabled = false;
        ready = true;
        notify();
      }
    }
  });

  dismissButton.addEventListener('click', () => {
    if (!user) return;
    localStorage.setItem(`czechPracticeImport:${user.uid}`, 'decided');
    importControls.hidden = true;
  });

  if (typeof firebase === 'undefined' || !firebase.apps.length) {
    ready = true;
    status.textContent = 'Přihlášení není dostupné. Výběr hosta se neukládá.';
    console.error('Firebase authentication is unavailable.');
    notify();
    return;
  }

  firebase.auth().onAuthStateChanged(async currentUser => {
    const generation = ++authGeneration;
    ready = false;
    user = currentUser;
    selections = {};
    pendingWrites.clear();
    failedWrites.clear();
    importButton.disabled = dismissButton.disabled = false;
    importControls.hidden = true;
    status.textContent = currentUser ? 'Načítání uloženého výběru…' : 'Nepřihlášeno: výběr se neukládá. Přihlaste se pomocí ikony 👤.';
    notify();
    if (!currentUser) {
      ready = true;
      notify();
      return;
    }
    try {
      const snapshot = await firebase.database().ref(`users/${currentUser.uid}/exercise_selections`).get();
      if (generation !== authGeneration) return;
      const stored = snapshot.val();
      if (stored !== null && (typeof stored !== 'object' || Array.isArray(stored))) {
        throw new TypeError('Saved vocabulary selections must be an object.');
      }
      selections = stored || {};
      ready = true;
      status.textContent = 'Přihlášeno. Výběr se ukládá do účtu.';
      displayImportChoice();
      notify();
    } catch (error) {
      if (generation !== authGeneration) return;
      showError('Uložený výběr se nepodařilo načíst. Obnovte stránku a zkuste to znovu.', error);
      notify();
    }
  }, error => {
    ready = false;
    showError('Přihlášení se nepodařilo ověřit. Obnovte stránku a zkuste to znovu.', error);
    notify();
  });
})();
