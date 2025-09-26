document.addEventListener("DOMContentLoaded", () => {
    // --- Preloader Logic ---
    const preloader = document.getElementById("preloader");
    window.addEventListener("load", () => {
        preloader.classList.add("hidden");
    });

    // --- Initialize AOS for Scroll Animations ---
    AOS.init({ duration: 1000, once: true, offset: 120 });

    // --- Navbar & Header Logic ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const header = document.querySelector(".header");
    const navLinks = document.querySelectorAll(".nav-link");
    hamburger.addEventListener("click", () => { hamburger.classList.toggle("active"); navMenu.classList.toggle("active"); });
    navLinks.forEach(link => link.addEventListener("click", () => { hamburger.classList.remove("active"); navMenu.classList.remove("active"); }));
    window.addEventListener("scroll", () => { header.classList.toggle("scrolled", window.scrollY > 50); });

    // --- Active Link Highlighting on Scroll ---
    const sections = document.querySelectorAll("section[id]");
    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;
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

    // --- Dark Mode Toggle ---
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = themeToggle.querySelector("i");
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") { document.body.classList.add("dark-mode"); themeIcon.classList.replace("fa-moon", "fa-sun"); }
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        let theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
        themeIcon.classList.toggle("fa-sun", theme === "dark");
        themeIcon.classList.toggle("fa-moon", theme === "light");
        localStorage.setItem("theme", theme);
    });

    // --- Typing Effect ---
    new Typed(".typing-effect", {
        strings: ["Web Developer", "Full Stack Developer", "MERN Stack Developer", "UI/UX Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // --- Skills & Projects Filters ---
    const setupFilter = (filterButtonsSelector, cardsSelector, placeholderSelector) => {
        const filterBtns = document.querySelectorAll(filterButtonsSelector);
        const cards = document.querySelectorAll(cardsSelector);
        const placeholder = document.getElementById(placeholderSelector);
        if(!filterBtns.length) return; // Guard clause
        
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                filterBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const filter = btn.dataset.filter;
                let visibleCount = 0;
                cards.forEach(card => {
                    if (filter === "all" || card.dataset.category === filter) {
                        card.style.display = "block";
                        visibleCount++;
                    } else {
                        card.style.display = "none";
                    }
                });
                if (placeholder) placeholder.style.display = visibleCount === 0 ? "block" : "none";
            });
        });
    };
    setupFilter(".skills-section .filter-btn", ".skill-card");
    setupFilter(".projects-section .project-filter-btn", ".project-card", "project-grid-placeholder");


    // --- Intersection Observer for Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate skill progress bars
                if (entry.target.classList.contains('skills-section')) {
                    entry.target.querySelectorAll('.progress').forEach(bar => {
                        bar.style.width = bar.getAttribute('style').split(':')[1].trim();
                    });
                }
                // Animate SVG timeline
                if (entry.target.classList.contains('timeline')) {
                    entry.target.classList.add('in-view');
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.skills-section, .timeline').forEach(el => observer.observe(el));

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

    // --- Contact Form using EmailJS ---
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");
    
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        // --- ACTION REQUIRED ---
        // Get your credentials from your EmailJS account and replace them here.
        const SERVICE_ID = "YOUR_SERVICE_ID";
        const TEMPLATE_ID = "YOUR_TEMPLATE_ID";
        const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

        formStatus.textContent = "Sending...";
        formStatus.style.color = "var(--text-color)";

        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm, PUBLIC_KEY)
            .then(() => {
                formStatus.textContent = "Message sent successfully!";
                formStatus.style.color = "#22c55e";
                contactForm.reset();
            }, (error) => {
                formStatus.textContent = `Failed to send message. Error: ${JSON.stringify(error)}`;
                formStatus.style.color = "#ef4444";
            });
    });

    // --- Back to Top Button ---
    const backToTopBtn = document.querySelector(".back-to-top");
    window.addEventListener("scroll", () => { backToTopBtn.classList.toggle("visible", window.scrollY > 300); });
});