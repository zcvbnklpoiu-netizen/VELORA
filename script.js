/* ==========================================================================
   VELORA LUXURY WATCHES - PRESTIGE ENGINE LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // قفل السكرول مؤقتاً لحين انتهاء شاشة التحميل الفاخرة
    document.body.style.overflowY = 'hidden';
    
    initPreloader();
    initMobileMenu();
    initScrollReveal();
    initFaqAccordion();
    initThreeDEffects();
    initParticleBackground();
});

/**
 * 1. شاشة التحميل الذكية والآمنة (Preloader Engine)
 */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
        fadeOutPreloader(preloader);
    });
    
    // نظام حماية احتياطي (Fallback) في حال تأخر تحميل السيرفر أو الصور الخارجية
    setTimeout(() => {
        if (preloader.style.display !== 'none') {
            fadeOutPreloader(preloader);
        }
    }, 1500);
}

function fadeOutPreloader(preloader) {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflowY = 'auto'; // إعادة تفعيل السكرول بسلاسة
    }, 600);
}

/**
 * 2. قائمة الموبايل المتجاوبة الذكية (Mobile Navigation Menu)
 */
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    if (!menuBtn || !navLinks) return;

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('show');
        
        // تحويل أيقونة الـ Burger Menu إلى X والعكس (FontAwesome)
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    // غلق القائمة فوراً عند الضغط على أي رابط للتنقل الداخلي
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        });
    });

    // غلق القائمة عند الضغط خارجها في أي مكان فارغ بالشاشة
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
            navLinks.classList.remove('show');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        }
    });
}

/**
 * 3. نظام ظهور العناصر الفاخر أثناء النزول (Advanced Scroll Reveal Engine)
 */
function initScrollReveal() {
    const hiddenElements = document.querySelectorAll('.reveal-hidden');
    if (hiddenElements.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // تحسين أداء الذاكرة (Memory Leaks)
                }
            });
        }, observerOptions);

        hiddenElements.forEach(el => revealObserver.observe(el));
    } else {
        // حماية ودعم للمتصفحات القديمة جداً
        hiddenElements.forEach(el => el.classList.add('active'));
    }
}

/**
 * 4. نظام الأسئلة الشائعة الأكورديون (Premium FAQ Accordion System)
 */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            if (!answer) return;

            const isOpen = answer.style.maxHeight && answer.style.maxHeight !== '0px';

            // غلق بقية الأسئلة تلقائياً للحفاظ على مظهر الصفحة ونظافتها
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.maxHeight = '0px';
                const dynamicIcon = ans.previousElementSibling.querySelector('i');
                if (dynamicIcon) {
                    dynamicIcon.classList.replace('fa-minus', 'fa-plus');
                }
            });

            // التحكم في فتح وقفل السؤال الحالي بحساب الارتفاع الحقيقي (scrollHeight)
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
                if (icon) icon.classList.replace('fa-plus', 'fa-minus');
            } else {
                answer.style.maxHeight = "0px";
                if (icon) icon.classList.replace('fa-minus', 'fa-plus');
            }
        });
    });
}

/**
 * 5. التأثيرات البصرية ثلاثية الأبعاد لحركة الكروت وصورة الواجهة (3D Visual Effects)
 */
function initThreeDEffects() {
    // تأثير حركة الكروت التفاعلية (3D Card Tilt)
    const cards = document.querySelectorAll('.interactive-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (event) => {
            const box = card.getBoundingClientRect();
            const x = event.clientX - box.left;
            const y = event.clientY - box.top;

            const rotateY = ((x / box.width) - 0.5) * 20;
            const rotateX = ((y / box.height) - 0.5) * -20;

            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-15px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `
                perspective(1000px)
                rotateX(0deg)
                rotateY(0deg)
                translateY(0px)
            `;
        });
    });

    // تأثير حركة ساعة الواجهة الرئيسية مع الماوس (Hero Watch 3D Dynamic Move)
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (window.innerWidth / 2 - e.clientX) / 45;
            const moveY = (window.innerHeight / 2 - e.clientY) / 45;

            // تم دمج الـ Float مع حركة الـ Move لتجنب كسر التنسيق
            heroImage.style.transform = `
                translateY(-15px)
                rotateY(${moveX}deg)
                rotateX(${moveY}deg)
            `;
        });
    }
}

/**
 * 6. خلفية الجسيمات المضيئة المتحركة (3D Canvas Particle Background)
 */
function initParticleBackground() {
    const canvas = document.querySelector('#hero-3d-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const maxParticles = 70; // عدد الجسيمات المثالي للحفاظ على سرعة الـ Rendering والأداء

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // بناء مصفوفة الجسيمات الفاخرة باللون الذهبي المطفي
    for (let i = 0; i < maxParticles; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            size: Math.random() * 2 + 0.8,
            speed: Math.random() * 0.4 + 0.1
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.y -= particle.speed;

            // إعادة توليد الجسيم في الأسفل فور خروجه من الشاشة لأعلى
            if (particle.y < 0) {
                particle.y = canvas.height;
                particle.x = Math.random() * window.innerWidth;
            }

            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(197, 168, 128, 0.35)"; // متناسق تماماً مع ذهبي البراند الملكي
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}