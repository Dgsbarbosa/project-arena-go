document.addEventListener('DOMContentLoaded', function() {
    const menuToggles = document.querySelectorAll('.menu-toggle');
    const menuLinks = document.querySelectorAll('.menu-link');

    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const menuItem = this.parentElement;
            const submenu = menuItem.querySelector(':scope > .submenu');

            if (submenu) {
                submenu.classList.toggle('expanded');
                this.classList.toggle('expanded');
            }
        });
    });

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    menuLinks.forEach(l => l.classList.remove('active'));
                    this.classList.add('active');

                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    let parent = this.parentElement;
                    while (parent) {
                        if (parent.classList.contains('submenu')) {
                            parent.classList.add('expanded');
                            const toggle = parent.previousElementSibling;
                            if (toggle && toggle.classList.contains('menu-toggle')) {
                                toggle.classList.add('expanded');
                            }
                        }
                        parent = parent.parentElement;
                    }
                }
            }
        });
    });

    function highlightActiveSection() {
        const sections = document.querySelectorAll('section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        const scrollPosition = window.scrollY + headerHeight + 100;

        let currentSection = null;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const currentId = currentSection.getAttribute('id');
            const correspondingLink = document.querySelector(`.menu-link[href="#${currentId}"]`);

            if (correspondingLink) {
                menuLinks.forEach(link => link.classList.remove('active'));
                correspondingLink.classList.add('active');
            }
        }
    }

    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(highlightActiveSection, 100);
    });

    const firstLevelItems = document.querySelectorAll('.menu > .menu-list > .menu-item');
    firstLevelItems.forEach(item => {
        const submenu = item.querySelector(':scope > .submenu');
        if (submenu) {
            submenu.classList.add('expanded');
            const toggle = item.querySelector(':scope > .menu-toggle');
            if (toggle) {
                toggle.classList.add('expanded');
            }
        }
    });

    highlightActiveSection();
});
