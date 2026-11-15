// Accept either an Unsplash photo ID or the full image address copied from Unsplash.
window.exerciseImageUrl = function(image) {
    if (/^photo-[\w-]+$/.test(image)) {
        return `https://images.unsplash.com/${image}?auto=format&fit=crop&w=600&q=80`;
    }

    if (image.startsWith('https://images.unsplash.com/')) {
        const url = new URL(image);
        url.search = '?auto=format&fit=crop&w=600&q=80';
        url.hash = '';
        return url.href;
    }

    return image;
};
