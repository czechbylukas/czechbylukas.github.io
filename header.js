document.addEventListener("DOMContentLoaded", function() {
    const headerHTML = `
        <header>
            <h1 id="page-title">${document.title}</h1>
            <div id="language-selector-container"></div>
        </header>
    `;
    const wrapper = document.querySelector('.main-wrapper');
    if (wrapper) {
        wrapper.insertAdjacentHTML('afterbegin', headerHTML);
    }
});