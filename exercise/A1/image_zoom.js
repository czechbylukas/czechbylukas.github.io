(() => {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-dialog';
    dialog.setAttribute('aria-label', 'Zvětšený obrázek');
    const image = document.createElement('img');
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Zavřít';
    close.addEventListener('click', () => dialog.close());
    dialog.append(image, close);
    document.body.appendChild(dialog);

    function enableZoom(img) {
        img.classList.add('exercise-image-zoom');
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `Zvětšit obrázek ${img.alt || ''}`.trim());
    }

    function openImage(img) {
        image.src = img.currentSrc || img.src;
        image.alt = img.alt;
        img.setAttribute('aria-label', `Zvětšit obrázek ${img.alt || ''}`.trim());
        dialog.showModal();
    }

    const zoomSelector = '#animalImage, #verbImage, #questionImage';
    document.addEventListener('click', event => {
        const img = event.target.closest(zoomSelector);
        if (!img || !img.getAttribute('src')) return;
        event.stopPropagation();
        enableZoom(img);
        openImage(img);
    }, true);

    document.addEventListener('keydown', event => {
        if ((event.key === 'Enter' || event.key === ' ') &&
            event.target.matches('.exercise-image-zoom') && event.target.getAttribute('src')) {
            event.preventDefault();
            openImage(event.target);
        }
    });

    document.querySelectorAll('#animalImage, #verbImage, #questionImage').forEach(img => {
        enableZoom(img);
        new MutationObserver(() => enableZoom(img)).observe(img, {
            attributes: true,
            attributeFilter: ['alt']
        });
    });
    document.querySelectorAll('.word-dialog').forEach(dialog => {
        dialog.addEventListener('click', event => {
            if (event.target === dialog) dialog.close();
        });
    });
})();
