document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navigasi Responsif (Hamburger Menu) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-list a');

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('active');
        // Toggle icon: bars <-> times
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times');
    });

    // Close menu when a navigation link is clicked (for smooth scrolling & mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- 2. Validasi Formulir Kontak ---
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = true; // Flag for form validity

            // Helper function to show error messages
            const showError = (elementId, message) => {
                const errorElement = document.getElementById(elementId);
                if (errorElement) {
                    errorElement.textContent = message;
                    errorElement.style.display = 'block';
                }
            };

            // Helper function to hide error messages
            const hideError = (elementId) => {
                const errorElement = document.getElementById(elementId);
                if (errorElement) {
                    errorElement.textContent = '';
                    errorElement.style.display = 'none';
                }
            };

            // Validate Name
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                showError('nameError', 'Nama lengkap wajib diisi.');
                isValid = false;
            } else {
                hideError('nameError');
            }

            // Validate Email
            const emailInput = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                showError('emailError', 'Email wajib diisi.');
                isValid = false;
            } else if (!emailPattern.test(emailInput.value.trim())) {
                showError('emailError', 'Format email tidak valid.');
                isValid = false;
            } else {
                hideError('emailError');
            }

            // Validate Subject
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value.trim() === '') {
                showError('subjectError', 'Subjek pesan wajib diisi.');
                isValid = false;
            } else {
                hideError('subjectError');
            }

            // Validate Message
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                showError('messageError', 'Pesan tidak boleh kosong.');
                isValid = false;
            } else {
                hideError('messageError');
            }

            // If all fields are valid, simulate submission
            if (isValid) {
                alert('Pesan Anda berhasil dikirim! Kami akan merespons secepatnya.');
                this.reset(); // Clear the form
            }
        });
    }

    // --- 3. Galeri Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item .gallery-img');
    const lightboxOverlay = document.getElementById('lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.close-btn');

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            lightboxOverlay.classList.add('active'); // Show overlay
            lightboxImg.src = item.src; // Set image source
            lightboxImg.alt = item.alt; // Set alt text
            // Prevent body scrolling when lightbox is active
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        lightboxOverlay.classList.remove('active'); // Hide overlay
        document.body.style.overflow = ''; // Re-enable body scrolling
    });

    // Close lightbox if clicking outside the image (on the overlay itself)
    lightboxOverlay.addEventListener('click', (e) => {
        if (e.target === lightboxOverlay) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close lightbox with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxOverlay.classList.contains('active')) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

   // --- 4. Navigasi Aktif (Highlight active navigation link) ---
    // Di halaman ini, kita hanya akan highlight link utama atau link halaman itu sendiri
    // Fungsi scroll spy section-by-section hanya relevan di index.html
    const highlightActiveNav = () => {
        const currentPath = window.location.pathname.split('/').pop(); // Get current filename (e.g., "index.html", "ppdb.html")

        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
            const linkHref = link.getAttribute('href');

            if (linkHref === currentPath) {
                // For direct page links (e.g., ppdb.html, announcements.html)
                link.classList.add('active-nav-link');
            } else if (currentPath === 'index.html' || currentPath === '') {
                // For index.html, handle scroll spy for sections
                const sections = document.querySelectorAll('section[id]');
                const header = document.querySelector('header');
                const headerHeight = header.offsetHeight;
                let currentActiveSection = '';

                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerHeight - 1;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                        currentActiveSection = section.getAttribute('id');
                    }
                });

                if (linkHref.includes(currentActiveSection) && linkHref.startsWith('index.html')) {
                    link.classList.add('active-nav-link');
                }
            }
        });
    };

    // Initial call on page load
    highlightActiveNav();

    // Re-call on scroll for index.html only (for section highlighting)
    // Note: This won't affect ppdb.html or announcements.html as they don't have internal scrolling sections for nav
    if (window.location.pathname.split('/').pop() === 'index.html' || window.location.pathname.split('/').pop() === '') {
        window.addEventListener('scroll', highlightActiveNav);
    }

    window.addEventListener('scroll', () => {
        let currentActiveSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 1; // Adjust for header height
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentActiveSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-nav-link');
            if (link.getAttribute('href').includes(currentActiveSection)) {
                link.classList.add('active-nav-link');
            }
        });
    });

    // --- 5. Scroll To Top Button (Optional) ---
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });
});