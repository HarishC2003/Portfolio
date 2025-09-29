document.addEventListener("DOMContentLoaded", () => {
    // --- Preloader Logic ---
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.classList.add("hidden");
    });

    // --- Initialize AOS for Scroll Animations ---
    AOS.init({ duration: 1000, once: true, offset: 120 });

    // --- Element Selections ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");
    const backToTopBtn = document.querySelector(".back-to-top");
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    // --- Mobile Menu Toggle ---
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- UPDATED: Combined scroll event listener for performance ---
    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // 1. Sticky header background
        header.classList.toggle("scrolled", scrollY > 50);

        // 2. Back to Top Button visibility
        backToTopBtn.classList.toggle("visible", scrollY > 300);

        // 3. Active link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    });

    // --- REFACTORED: Cleaner Dark Mode Logic ---
    const applyTheme = (theme) => {
        if (theme === "light") {
            document.body.classList.add("light-mode");
            themeIcon.classList.replace("fa-moon", "fa-sun");
        } else {
            document.body.classList.remove("light-mode");
            themeIcon.classList.replace("fa-sun", "fa-moon");
        }
        localStorage.setItem("theme", theme);
    };

    const savedTheme = localStorage.getItem("theme") || "dark"; // Default to dark mode
    applyTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
        applyTheme(newTheme);
    });

    // --- Typing Effect ---
    new Typed(".typing-effect", {
        strings: ["Web Developer", "Full Stack Developer", "MERN Stack Developer", "UI/UX Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // --- Skills Filter ---
    const setupFilter = (filterButtonsSelector, cardsSelector) => {
        const filterBtns = document.querySelectorAll(filterButtonsSelector);
        const cards = document.querySelectorAll(cardsSelector);
        if(!filterBtns.length) return;
        
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const filter = btn.dataset.filter;
                cards.forEach(card => {
                    if (filter === "all" || card.dataset.category === filter) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    };
    setupFilter(".skills-section .filter-btn", ".skill-card");
    
    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('timeline')) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.timeline').forEach(el => observer.observe(el));

    // --- Project Modal ---
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.querySelector(".close-btn");
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("click", () => {
            document.getElementById("modal-img").src = card.querySelector("img").src;
            document.getElementById("modal-title").innerText = card.querySelector("h3").innerText;
            document.getElementById("modal-desc").innerText = card.querySelector("p").innerText;
            document.getElementById("modal-tags").innerHTML = card.querySelector(".project-tags").innerHTML;
            document.getElementById("modal-links").innerHTML = card.querySelector(".project-links").innerHTML;
            modal.style.display = "block";
        });
    });
    closeModalBtn.addEventListener("click", () => modal.style.display = "none");
    window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

    // --- UPDATED: Contact Form with Auto-Hiding Message ---
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const SERVICE_ID = "service_htu4n6a";
        const TEMPLATE_ID = "template_vwj8qcy";
        const PUBLIC_KEY = "6evT1RRKGOkwyBges";

        formStatus.textContent = "Sending...";
        formStatus.style.color = "var(--text-color)";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, PUBLIC_KEY)
            .then(() => {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "#22c55e";
                contactForm.reset();
                setTimeout(() => { formStatus.textContent = ""; }, 3000); // Clear message after 3 seconds
            }, (error) => {
                formStatus.textContent = `Failed to send message. Error: ${JSON.stringify(error)}`;
                formStatus.style.color = "#ef4444";
                setTimeout(() => { formStatus.textContent = ""; }, 3000); // Clear message after 3 seconds
            });
    });
});