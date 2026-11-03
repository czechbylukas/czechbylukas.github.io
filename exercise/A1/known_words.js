(() => {
  const storageKey = 'czechPracticeKnownWords';

  function readSelections() {
    const savedSelections = localStorage.getItem(storageKey);
    if (savedSelections === null) return {};

    const selections = JSON.parse(savedSelections);
    if (typeof selections !== 'object' || selections === null || Array.isArray(selections)) {
      throw new TypeError('Saved vocabulary selections must be an object.');
    }

    return selections;
  }

  window.isPracticeWordKnown = (type, id, defaultKnown) => {
    const selections = readSelections();
    const savedValue = selections[`${type}:${id}`];
    return typeof savedValue === 'boolean' ? savedValue : defaultKnown;
  };

  window.setPracticeWordKnown = (type, id, isKnown) => {
    const selections = readSelections();
    selections[`${type}:${id}`] = isKnown;
    localStorage.setItem(storageKey, JSON.stringify(selections));
  };
})();
