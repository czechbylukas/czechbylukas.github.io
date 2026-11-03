(function () {
    'use strict';

    const userRoot = 'users';
    const statusEl = document.getElementById('app-message');
    const checklistEl = document.getElementById('checklist');
    const groupsEl = document.getElementById('exercise-groups');
    const testPanelEl = document.getElementById('test-panel');
    const questionsEl = document.getElementById('questions');
    const saveStatusEl = document.getElementById('save-status');
    const pendingSaves = new Map();
    const saveTimers = new Map();
    let exerciseData;
    let currentUser;
    let currentTest;
    let studentTests = {};
    let publishedFeedback = {};

    function setMessage(message, isError) {
        statusEl.textContent = message;
        statusEl.classList.toggle('error', Boolean(isError));
        statusEl.hidden = !message;
    }

    function getSavedAnswer(testId, itemId) {
        const test = studentTests[testId];
        const answers = test && test.answers;
        return answers && answers[itemId] ? answers[itemId] : null;
    }

    function getTestItems(test) {
        return test.items.flatMap(function (item) {
            if (!Array.isArray(item.forms)) return [item];
            return item.forms.map(function (form) {
                return Object.assign({}, item, form);
            });
        });
    }

    function getPublishedReview(testId, itemId, answerValue) {
        const review = publishedFeedback[testId] && publishedFeedback[testId].items &&
            publishedFeedback[testId].items[itemId];
        return review && review.studentAnswer === String(answerValue || '').trim() ? review : null;
    }

    function getProgress(test) {
        let answered = 0;
        let reviewed = 0;
        let correct = 0;
        getTestItems(test).forEach(function (item) {
            const answer = getSavedAnswer(test.id, item.id);
            if (answer && String(answer.value || '').trim()) {
                answered += 1;
                const review = getPublishedReview(test.id, item.id, answer.value);
                if (review && (review.result === 'correct' || review.result === 'incorrect')) {
                    reviewed += 1;
                    if (review.result === 'correct') correct += 1;
                }
            }
        });
        return { answered: answered, total: getTestItems(test).length, reviewed: reviewed, correct: correct };
    }

    function getTestLabel(test) {
        if (test.group === 'cases') {
            if (test.stage === 'names') return test.caseTitle;
            const caseNumber = test.caseId.slice('case-'.length);
            const number = test.stage.indexOf('singular') !== -1 ? 'singular' : 'plural';
            const adjective = test.stage.indexOf('adjective') !== -1 ? ' adjective' : '';
            return caseNumber + 'p ' + number + adjective;
        }
        return test.title;
    }

    function renderChecklist() {
        groupsEl.replaceChildren();
        exerciseData.groups.forEach(function (group) {
            const groupSection = document.createElement('section');
            groupSection.className = 'exercise-group';
            const heading = document.createElement('h3');
            heading.className = 'group-title';
            heading.textContent = group.title;
            const list = document.createElement('div');
            list.className = 'exercise-list';

            exerciseData.tests.filter(function (test) {
                return test.group === group.id;
            }).sort(function (left, right) {
                if (group.id !== 'cases') return 0;
                const leftCase = Number(left.caseId.slice('case-'.length));
                const rightCase = Number(right.caseId.slice('case-'.length));
                if (leftCase !== rightCase) return leftCase - rightCase;
                const stages = ['singular', 'plural', 'adjective-singular', 'adjective-plural', 'names'];
                return stages.indexOf(left.stage) - stages.indexOf(right.stage);
            }).forEach(function (test) {
                const progress = getProgress(test);
                const complete = progress.answered === progress.total;
                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'exercise-card' + (complete ? ' is-complete' : '');
                button.setAttribute('aria-label', getTestLabel(test) + ': ' + progress.answered + ' of ' + progress.total + ' answered');

                const check = document.createElement('span');
                check.className = 'check-mark';
                check.textContent = complete ? '✓' : '';
                const copy = document.createElement('span');
                copy.className = 'exercise-card-copy';
                const title = document.createElement('strong');
                title.textContent = getTestLabel(test);
                const detail = document.createElement('span');
                detail.textContent = progress.answered + ' / ' + progress.total + ' answered';
                copy.append(title, detail);
                button.append(check, copy);
                button.addEventListener('click', function () {
                    openTest(test);
                });
                list.appendChild(button);
            });

            groupSection.append(heading, list);
            groupsEl.appendChild(groupSection);
        });
    }

    function itemPrompt(item, test) {
        if (test.group === 'tenses') {
            return item.person + ' + ' + item.verb;
        }
        if (test.stage === 'names') {
            return 'Oslovte: ' + item.base;
        }
        const adjective = item.adjective ? ' (' + item.adjective + ')' : '';
        return item.prep + adjective + ' ____';
    }

    function itemHint(item, test) {
        if (test.group === 'tenses') {
            return item.meaning || item.aspect || '';
        }
        return item.base + (item.pattern ? ' · ' + item.pattern : '');
    }

    function renderQuestionPage() {
        const test = currentTest;
        questionsEl.replaceChildren();

        const table = document.createElement('table');
        table.className = 'question-table';
        const head = document.createElement('thead');
        const headingRow = document.createElement('tr');
        ['#', 'Prompt', 'Word / hint', 'Your answer', 'Correct answer', 'Teacher feedback'].forEach(function (label) {
            const cell = document.createElement('th');
            cell.scope = 'col';
            cell.textContent = label;
            headingRow.appendChild(cell);
        });
        head.appendChild(headingRow);
        table.appendChild(head);

        const body = document.createElement('tbody');
        getTestItems(test).forEach(function (item, index) {
            const saved = getSavedAnswer(test.id, item.id);
            const review = saved && getPublishedReview(test.id, item.id, saved.value);
            const row = document.createElement('tr');
            setStudentReviewRow(row, review);
            const number = document.createElement('td');
            number.className = 'question-number';
            number.textContent = String(index + 1);

            const promptCell = document.createElement('td');
            const prompt = document.createElement('label');
            prompt.className = 'question-prompt';
            prompt.htmlFor = 'answer-' + item.id;
            prompt.textContent = itemPrompt(item, test);
            promptCell.appendChild(prompt);

            const hint = document.createElement('td');
            hint.className = 'question-hint';
            hint.textContent = itemHint(item, test) || '—';

            const input = document.createElement('input');
            input.className = 'answer-input';
            input.id = 'answer-' + item.id;
            input.type = 'text';
            input.maxLength = 200;
            input.autocomplete = 'off';
            input.value = saved ? saved.value : '';
            input.setAttribute('aria-label', 'Answer for ' + itemPrompt(item, test));

            const answerCell = document.createElement('td');
            answerCell.className = 'answer-cell';
            answerCell.appendChild(input);

            const correctAnswerCell = document.createElement('td');
            correctAnswerCell.className = 'correct-answer-cell';
            correctAnswerCell.textContent = review ? review.correctAnswer || '' : '';

            const feedbackCell = document.createElement('td');
            feedbackCell.className = 'teacher-feedback-cell';
            feedbackCell.textContent = review ? review.comment || '' : '';

            input.addEventListener('input', function () {
                const value = input.value;
                queueSave(test, item, value);
                updateQuestionRow(row, test, item, value, correctAnswerCell, feedbackCell);
                updateTestProgress();
            });

            input.addEventListener('blur', function () {
                saveQuestion(test, item, input.value);
            });

            row.append(number, promptCell, hint, answerCell, correctAnswerCell, feedbackCell);
            body.appendChild(row);
        });

        table.appendChild(body);
        questionsEl.appendChild(table);
        document.getElementById('question-filter').value = 'all';
        applyQuestionFilter();
        saveStatusEl.textContent = 'Answers save automatically.';
        updateTestProgress();
    }

    function applyQuestionFilter() {
        const filter = document.getElementById('question-filter').value;
        questionsEl.querySelectorAll('tbody tr').forEach(function (row) {
            row.hidden = filter === 'comment'
                ? row.dataset.comment !== 'yes'
                : filter !== 'all' && row.dataset.review !== filter;
        });
    }

    function setStudentReviewRow(row, review) {
        row.classList.remove('is-approved-correct', 'is-approved-incorrect');
        row.dataset.review = review ? review.result : 'pending';
        row.dataset.comment = review && review.comment ? 'yes' : 'no';
        if (review && review.result === 'correct') row.classList.add('is-approved-correct');
        if (review && review.result === 'incorrect') row.classList.add('is-approved-incorrect');
    }

    function updateQuestionRow(row, test, item, value, correctAnswerCell, feedbackCell) {
        const review = getPublishedReview(test.id, item.id, value);
        setStudentReviewRow(row, review);
        correctAnswerCell.textContent = review ? review.correctAnswer || '' : '';
        feedbackCell.textContent = review ? review.comment || '' : '';
        applyQuestionFilter();
    }

    function syncCurrentTestFeedback() {
        if (currentTest) {
            const items = getTestItems(currentTest);
            questionsEl.querySelectorAll('tbody tr').forEach(function (row, index) {
                const item = items[index];
                const input = row.querySelector('.answer-input');
                updateQuestionRow(
                    row,
                    currentTest,
                    item,
                    input.value,
                    row.querySelector('.correct-answer-cell'),
                    row.querySelector('.teacher-feedback-cell')
                );
            });
            updateTestProgress();
        }
        renderChecklist();
    }

    function watchPublishedFeedback(uid) {
        firebase.database().ref(userRoot + '/' + uid + '/grammar_practice/teacher_feedback').on('value', function (snapshot) {
            publishedFeedback = snapshot.val() || {};
            syncCurrentTestFeedback();
        }, function (error) {
            console.error('Could not watch released teacher feedback:', error);
            setMessage('Released teacher feedback could not be loaded. Refresh the page to try again.', true);
        });
    }

    function updateTestProgress() {
        if (!currentTest) return;
        const items = getTestItems(currentTest);
        const rows = questionsEl.querySelectorAll('tbody tr');
        let answered = 0;
        let reviewed = 0;
        let correct = 0;
        items.forEach(function (item, index) {
            const input = rows[index] && rows[index].querySelector('.answer-input');
            const saved = getSavedAnswer(currentTest.id, item.id);
            const value = input ? input.value : saved && saved.value;
            if (!String(value || '').trim()) return;
            answered += 1;
            const review = getPublishedReview(currentTest.id, item.id, value);
            if (review && (review.result === 'correct' || review.result === 'incorrect')) {
                reviewed += 1;
                if (review.result === 'correct') correct += 1;
            }
        });
        let score = answered + ' / ' + items.length + ' answered';
        if (publishedFeedback[currentTest.id]) {
            score += reviewed
                ? ' · Score ' + correct + ' / ' + reviewed
                : ' · Teacher feedback sent';
            const pending = answered - reviewed;
            if (pending > 0) score += ' · ' + pending + ' changed or awaiting review';
        }
        document.getElementById('test-score').textContent = score;
        document.getElementById('test-progress-bar').style.width =
            (items.length ? answered / items.length * 100 : 0) + '%';
    }

    function openTest(test) {
        currentTest = test;
        document.getElementById('test-category').textContent =
            test.group === 'cases' ? test.caseTitle : 'Verb tenses';
        document.getElementById('test-title').textContent = getTestLabel(test);
        document.getElementById('test-description').textContent = test.description;
        checklistEl.hidden = true;
        testPanelEl.hidden = false;
        renderQuestionPage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function queueSave(test, item, value) {
        const key = test.id + '/' + item.id;
        saveStatusEl.textContent = 'Saving…';
        if (saveTimers.has(key)) clearTimeout(saveTimers.get(key));
        saveTimers.set(key, setTimeout(function () {
            saveTimers.delete(key);
            saveQuestion(test, item, value);
        }, 450));
    }

    function saveQuestion(test, item, value) {
        if (!currentUser || !test) return Promise.resolve();
        const testId = test.id;
        const key = testId + '/' + item.id;
        if (saveTimers.has(key)) {
            clearTimeout(saveTimers.get(key));
            saveTimers.delete(key);
        }
        const trimmedValue = String(value || '').trim();
        if (!trimmedValue) {
            const testData = studentTests[testId];
            const existingAnswer = testData && testData.answers && testData.answers[item.id];
            if (!existingAnswer) return Promise.resolve();
            if (testData && testData.answers) delete testData.answers[item.id];
            renderChecklist();
            updateTestProgress();
            saveStatusEl.textContent = 'Removing blank answer…';
            const answerPath = userRoot + '/' + currentUser.uid + '/grammar_practice/tests/' + testId + '/answers/' + item.id;
            const previousSave = pendingSaves.get(key) || Promise.resolve();
            const removePromise = previousSave.then(function () {
                return firebase.database().ref(answerPath).remove();
            }).then(function () {
                saveStatusEl.textContent = 'Blank answer removed.';
            }).catch(function (error) {
                console.error('Could not remove blank practice answer:', error);
                saveStatusEl.textContent = 'Could not remove the blank answer. Check your connection and try again.';
                setMessage('An answer could not be updated in your account. Your progress may be incomplete until it saves.', true);
            });
            pendingSaves.set(key, removePromise);
            removePromise.finally(function () {
                if (pendingSaves.get(key) === removePromise) pendingSaves.delete(key);
            });
            return removePromise;
        }

        const answer = {
            value: trimmedValue,
            updatedAt: firebase.database.ServerValue.TIMESTAMP
        };
        if (!studentTests[testId]) studentTests[testId] = { answers: {} };
        if (!studentTests[testId].answers) studentTests[testId].answers = {};
        studentTests[testId].answers[item.id] = answer;

        const path = userRoot + '/' + currentUser.uid + '/grammar_practice/tests/' + testId + '/answers/' + item.id;
        const previousSave = pendingSaves.get(key) || Promise.resolve();
        const savePromise = previousSave.then(function () {
            return firebase.database().ref(path).set(answer);
        }).then(function () {
            saveStatusEl.textContent = 'Saved.';
            renderChecklist();
            updateTestProgress();
        }).catch(function (error) {
            console.error('Could not save practice answer:', error);
            saveStatusEl.textContent = 'Could not save your answer. Check your connection and try again.';
            setMessage('An answer could not be saved to your account. Your progress may be incomplete until it saves.', true);
        });
        pendingSaves.set(key, savePromise);
        savePromise.finally(function () {
            if (pendingSaves.get(key) === savePromise) pendingSaves.delete(key);
        });
        return savePromise;
    }

    function saveVisibleAnswers() {
        const saves = [];
        const test = currentTest;
        questionsEl.querySelectorAll('.answer-input').forEach(function (input) {
            const itemId = input.id.slice('answer-'.length);
            const item = getTestItems(test).find(function (question) {
                return question.id === itemId;
            });
            if (item) saves.push(saveQuestion(test, item, input.value));
        });
        return Promise.all(saves);
    }

    function showChecklist() {
        saveVisibleAnswers().then(function () {
            currentTest = null;
            testPanelEl.hidden = true;
            checklistEl.hidden = false;
            renderChecklist();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function initializeForUser(user) {
        currentUser = user;
        if (!user) {
            checklistEl.hidden = true;
            setMessage('Please sign in to access and save your practice.', true);
            return;
        }

        document.getElementById('signed-in-as').textContent = 'Signed in as ' + (user.email || 'student');
        document.getElementById('teacher-link').hidden = user.email !== 'lukas@hackczech.com';
        setMessage('Loading your saved progress…', false);
        firebase.database().ref(userRoot + '/' + user.uid + '/grammar_practice/tests').get()
            .then(function (snapshot) {
                studentTests = snapshot.val() || {};
                watchPublishedFeedback(user.uid);
                renderChecklist();
                checklistEl.hidden = false;
                setMessage('', false);
            })
            .catch(function (error) {
                console.error('Could not load student practice progress:', error);
                setMessage('Your saved progress could not be loaded. Please refresh or try again later.', true);
            });
    }

    function startApp() {
        fetch('./data/exercises.json')
            .then(function (response) {
                if (!response.ok) throw new Error('Exercise data request failed: ' + response.status);
                return response.json();
            })
            .then(function (data) {
                exerciseData = data;
                firebase.auth().onAuthStateChanged(initializeForUser);
            })
            .catch(function (error) {
                console.error('Could not load grammar exercises:', error);
                setMessage('The exercise list could not be loaded. Please refresh the page.', true);
            });
    }

    document.getElementById('back-to-list').addEventListener('click', showChecklist);
    document.getElementById('question-filter').addEventListener('change', applyQuestionFilter);
    window.addEventListener('beforeunload', function () {
        if (currentTest) saveVisibleAnswers();
    });

    startApp();
}());
