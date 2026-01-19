document.addEventListener('DOMContentLoaded', () => {
    // --- Custom Cursor Logic ---
    const cursor = document.getElementById('cursor-spark');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    // --- Scroll Reveal Logic ---
    const revealElements = document.querySelectorAll('.scroll-reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Language Switcher Logic ---
    const langBtn = document.getElementById('lang-toggle');
    const currentLangSpan = document.getElementById('current-lang');
    const nextLangSpan = document.getElementById('next-lang');
    const htmlTag = document.documentElement;

    // Order: EN -> FR -> AR -> EN
    const langs = ['en', 'fr', 'ar'];
    let currentIndex = 0;

    function updateLanguage(lang) {
        // Update Text Content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.innerText = translations[lang][key];
            }
        });

        // Handle RTL/LTR
        if (lang === 'ar') {
            htmlTag.setAttribute('dir', 'rtl');
            htmlTag.lang = 'ar';
        } else {
            htmlTag.setAttribute('dir', 'ltr');
            htmlTag.lang = lang;
        }

        // Update Button Labels
        const nextIndex = (currentIndex + 1) % langs.length;
        currentLangSpan.innerText = langs[currentIndex].toUpperCase();
        nextLangSpan.innerText = langs[nextIndex].toUpperCase();
    }

    langBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % langs.length;
        updateLanguage(langs[currentIndex]);
    });

    // Initialize
    updateLanguage('en');

    // --- Glow/Circuit Effect on Team Cards ---
    // Simple JS to enhance the hover effect if needed, but CSS is doing most of the work.
    // Adding a small magnetic effect or random flicker could be cool.
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', x + 'px');
            card.style.setProperty('--y', y + 'px');
        });
    });
});
