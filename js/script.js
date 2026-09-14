document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const header = document.getElementById('header');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNavigation = document.getElementById('primary-navigation');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // 1. Sticky Header
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active section highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Account for header height
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    // 2. Mobile Navigation Toggle
    mobileNavToggle.addEventListener('click', () => {
        const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
        
        mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
        primaryNavigation.classList.toggle('active');
        
        // Toggle icon between bars and xmark
        const icon = mobileNavToggle.querySelector('i');
        if (primaryNavigation.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // 3. Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (primaryNavigation.classList.contains('active')) {
                primaryNavigation.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 4. Smooth Scrolling (for browsers that don't support CSS scroll-behavior)
    // Most modern browsers support scroll-behavior: smooth in CSS, but this is a fallback
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply custom smooth scroll if it's a section link and not a placeholder
            if (this.getAttribute('href') !== '#' && this.getAttribute('href').startsWith('#')) {
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    // Calculate header height dynamically or use fixed value (e.g., 80)
                    const headerHeight = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


});
