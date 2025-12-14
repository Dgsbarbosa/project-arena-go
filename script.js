document.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.menu-toggle');
    const links = document.querySelectorAll('.menu-link');
    const backToTop = document.getElementById('backToTop');
    const headerHeight = document.querySelector('.header').offsetHeight;

    /* ===============================
       MENU EXPANDIR / RETRAIR
    =============================== */
    toggles.forEach(toggle => {
        toggle.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const item = toggle.closest('.menu-item');
            const submenu = item.querySelector(':scope > .submenu');

            if (!submenu) return;

            submenu.classList.toggle('expanded');
            toggle.classList.toggle('expanded');
        });
    });

    /* ===============================
       SCROLL SUAVE + ATIVO
    =============================== */
    links.forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href');
            if (!id.startsWith('#')) return;

            e.preventDefault();
            const target = document.querySelector(id);
            if (!target) return;

            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            window.scrollTo({
                top: target.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });

            let parent = link.parentElement;
            while (parent) {
                if (parent.classList.contains('submenu')) {
                    parent.classList.add('expanded');
                    const t = parent.previousElementSibling;
                    if (t?.classList.contains('menu-toggle')) {
                        t.classList.add('expanded');
                    }
                }
                parent = parent.parentElement;
            }
        });
    });

    /* ===============================
       HIGHLIGHT AUTOMÁTICO
    =============================== */
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', () => {
        const pos = window.scrollY + headerHeight + 120;

        sections.forEach(sec => {
            if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
                const link = document.querySelector(`.menu-link[href="#${sec.id}"]`);
                if (link) {
                    links.forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            }
        });

        /* Botão topo */
        backToTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
    });

    /* ===============================
       BOTÃO TOPO
    =============================== */
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
