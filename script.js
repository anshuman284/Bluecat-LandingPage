document.addEventListener('DOMContentLoaded', () => {
    // ---- Elements ----
    const navbar = document.querySelector('.navbar');
    const notifyBtn = document.getElementById('notify-btn');
    const emailInput = document.getElementById('email-input');
    const formGroup = document.querySelector('.form-group');
    const sections = document.querySelectorAll('.reveal');

    // ---- Navbar Scroll Effect ----
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- Intersection Observer (Reveal on Scroll) ----
    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    sections.forEach(section => {
        revealObserver.observe(section);
    });

    // ---- Newsletter Logic ----
    const successTexts = [
        "You're in.",
        "Landed safely.",
        "Clarity incoming.",
        "Welcome to the cat club."
    ];

    if (notifyBtn) {
        notifyBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Success State with animation
                const randomSuccess = successTexts[Math.floor(Math.random() * successTexts.length)];
                
                notifyBtn.textContent = randomSuccess;
                notifyBtn.disabled = true;
                notifyBtn.style.opacity = '0.8';
                
                emailInput.value = '';
                emailInput.placeholder = "Stay tuned.";
                emailInput.disabled = true;
                
                formGroup.style.opacity = '0.6';
                formGroup.style.pointerEvents = 'none';
                
                console.log(`Email captured: ${email}`);
                
            } else {
                // Improved Error State
                formGroup.classList.add('shake');
                const originalText = notifyBtn.textContent;
                notifyBtn.textContent = "Check email";
                
                setTimeout(() => {
                    formGroup.classList.remove('shake');
                    notifyBtn.textContent = originalText;
                }, 2000);
            }
        });
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ---- Smooth Cursor Parallax ----
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 40;
        const y = (window.innerHeight / 2 - e.pageY) / 40;
        
        const glow1 = document.querySelector('.glow-1');
        const glow2 = document.querySelector('.glow-2');
        const glow3 = document.querySelector('.glow-3');
        
        if (glow1) glow1.style.transform = `translate(${x}px, ${y}px)`;
        if (glow2) glow2.style.transform = `translate(${-x}px, ${-y}px)`;
        if (glow3) glow3.style.transform = `translate(${x*0.5}px, ${-y*0.5}px)`;
    });
});
