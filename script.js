/**
 * VINTAGE SCRAPBOOK THEME MAIN JAVASCRIPT
 * SMK Darul Musyawaroh Bangsri
 */

document.addEventListener("DOMContentLoaded", function () {

    // 1. Preloader Handler
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", function () {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        });
        // Safety timeout if window load event already passed
        setTimeout(() => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }, 1500);
    }

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjust for navbar height
                const navHeight = document.querySelector('.navbar-custom').offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Scroll Reveal Animation Engine
    const revealElements = document.querySelectorAll(".scroll-reveal");
    
    function checkReveal() {
        const triggerBottom = (window.innerHeight / 5) * 4.5;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add("revealed");
                // Trigger statistics counter if element contains standard counter class
                if(el.querySelector('.counter')) {
                    startCounters(el);
                }
            }
        });
    }

    window.addEventListener("scroll", checkReveal);
    checkReveal(); // Run once initially

    // 4. Statistics Counter Mechanism
    function startCounters(container) {
    const counters = container.querySelectorAll('.counter');
    if (counters.length === 0) return;
    
    counters.forEach(counter => {
        // Cek apakah elemen ini SUDAH PERNAH mulai berhitung?
        // Jika sudah, lewati elemen ini agar tidak terjadi double-animation
        if (counter.dataset.started === "true") return;
        
        // Tandai bahwa elemen spesifik ini SUDAH mulai berhitung
        counter.dataset.started = "true";
        
        const target = +counter.getAttribute('data-target');
        const speed = 200; 
        
        const updateCount = () => {
            const initialCount = +counter.innerText;
            const increment = Math.ceil(target / speed);
            
            if (initialCount < target) {
                counter.innerText = initialCount + increment;
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target;
            }
        };

        updateCount(); 
    });
}



    // 5. PPDB Countdown Timer Target Configuration
    // Set Target Date to July 7th 2026 (matching requirement theme)
    const targetDateStr = "July 7, 2026 23:59:59";
    const countdownDate = new Date(targetDateStr).getTime();

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            if(daysEl) {
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minutesEl.innerText = "00";
                secondsEl.innerText = "00";
            }
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) {
            daysEl.innerText = days < 10 ? "0" + days : days;
            hoursEl.innerText = hours < 10 ? "0" + hours : hours;
            minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 6. Lightbox for Gallery Elements
    const galleryItems = document.querySelectorAll(".gallery-item-vintage");
    const lightboxModal = document.getElementById("galleryLightbox");
    const lightboxBody = document.getElementById("lightbox-body");

    if (galleryItems.length > 0 && lightboxModal && lightboxBody) {
        const bsLightbox = new bootstrap.Modal(lightboxModal);
        
        galleryItems.forEach(item => {
            item.addEventListener("click", function() {
                const svgClone = this.querySelector("svg").cloneNode(true);
                svgClone.setAttribute("class", "img-fluid w-100 rounded border-vintage-box");
                lightboxBody.innerHTML = "";
                lightboxBody.appendChild(svgClone);
                bsLightbox.show();
            });
        });
    }

    // 7. Back To Top Mechanics
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        window.addEventListener("scroll", function () {
            if (window.pageYOffset > 400) {
                backToTopBtn.style.display = "flex";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        backToTopBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
