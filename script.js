// Performance optimized script with proper event delegation and lazy loading

// Constants
const BREAKPOINT_MOBILE = 768;

// Utility Functions
const debounce = (fn, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
};

// Modal Component
const Modal = {
    demoModal: null,
    pricingModal: null,
    openButtons: null,
    closeButtons: null,
    demoForm: null,
    pricingForm: null,
    currentModal: null,
    lastActiveElement: null,
    focusableElements: null,
    firstFocusable: null,
    lastFocusable: null,

    init() {
        this.demoModal = document.getElementById('demo-modal');
        this.pricingModal = document.getElementById('pricing-modal');
        if (!this.demoModal) return;

        this.openButtons = document.querySelectorAll('[data-modal]');
        this.closeButtons = document.querySelectorAll('.close-modal');
        this.demoForm = document.getElementById('demo-form');
        this.pricingForm = document.getElementById('pricing-form');
        
        this.addEventListeners();
    },

    addEventListeners() {
        // Open modal based on data attribute
        this.openButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const modalType = button.getAttribute('data-modal');
                const plan = button.getAttribute('data-plan');
                this.open(modalType, plan);
            });
        });

        // Close modals
        this.closeButtons.forEach(button => {
            button.addEventListener('click', () => this.close());
        });
        
        // Close on backdrop click
        [this.demoModal].filter(Boolean).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.close();
            });

            // Keyboard interactions
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.close();
                } else if (e.key === 'Tab') {
                    this.handleTabKey(e);
                }
            });
        });

        // Form submissions
        if (this.demoForm) {
            this.demoForm.addEventListener('submit', (e) => this.handleSubmit(e, 'demo'));
        }
        if (this.pricingForm) {
            this.pricingForm.addEventListener('submit', (e) => this.handleSubmit(e, 'pricing'));
        }
    },

    open(modalType, plan = null) {
        this.lastActiveElement = document.activeElement;
        
        if (modalType === 'demo') {
            this.currentModal = this.demoModal;
        } else if (modalType === 'pricing') {
            this.currentModal = this.pricingModal;
            // Pre-select plan if provided
            if (plan) {
                const planSelect = this.pricingForm.querySelector('#pricing-plan');
                if (planSelect) planSelect.value = plan;
            }
        }
        
        this.currentModal.classList.remove('hidden');
        this.currentModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        // Set focus trap
        this.focusableElements = this.currentModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        this.firstFocusable = this.focusableElements[0];
        this.lastFocusable = this.focusableElements[this.focusableElements.length - 1];
        
        requestAnimationFrame(() => this.firstFocusable.focus());
    },

    close() {
        if (this.currentModal) {
            this.currentModal.classList.add('hidden');
            this.currentModal.classList.remove('flex');
            this.currentModal = null;
        }
        document.body.style.overflow = '';
        this.lastActiveElement?.focus();
    },

    handleTabKey(e) {
        if (!this.focusableElements.length) return;

        const isTabPressed = e.key === 'Tab';
        
        if (!isTabPressed) return;
        
        if (e.shiftKey) {
            if (document.activeElement === this.firstFocusable) {
                e.preventDefault();
                this.lastFocusable.focus();
            }
        } else {
            if (document.activeElement === this.lastFocusable) {
                e.preventDefault();
                this.firstFocusable.focus();
            }
        }
    },

    async handleSubmit(e, formType) {
        e.preventDefault();
        
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        try {
            submitButton.disabled = true;
            submitButton.textContent = 'Submitting...';
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call - replace with actual endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log(`${formType} request submitted:`, data);
            
            this.showSuccess(form, formType);
            setTimeout(() => this.close(), 3000);
            
        } catch (error) {
            console.error('Error submitting form:', error);
            submitButton.textContent = 'Try Again';
        } finally {
            submitButton.disabled = false;
        }
    },

    showSuccess(form, formType) {
        const message = formType === 'demo' 
            ? 'Our team will contact you within 24 hours to schedule your demo.'
            : 'Our sales team will send you detailed pricing information within 24 hours.';
            
        form.innerHTML = `
            <div class="text-center py-8" role="alert">
                <div class="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                </div>
                <h4 class="text-xl font-bold mb-2 text-white">Thank you!</h4>
                <p class="text-gray-300">${message}</p>
            </div>
        `;
    }
};

// Network Animation Component
const NetworkAnimation = {
    canvas: null,
    ctx: null,
    container: null,
    nodes: [],
    animationId: null,
    isVisible: true,

    init() {
        this.container = document.getElementById('network-animation');
        if (!this.container) return;

        this.setup();
        this.createNodes();
        this.addEventListeners();
        this.animate();
        this.setupVisibilityCheck();
    },

    setup() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.container.appendChild(this.canvas);
        this.resizeCanvas();
    },

    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = this.container.getBoundingClientRect();
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = `${rect.width}px`;
        this.canvas.style.height = `${rect.height}px`;
        
        this.ctx.scale(dpr, dpr);
    },

    createNodes() {
        const nodeCount = window.innerWidth < BREAKPOINT_MOBILE ? 25 : 50;
        this.nodes = Array.from({ length: nodeCount }, () => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1
        }));
    },

    addEventListeners() {
        const resizeHandler = debounce(() => {
            this.resizeCanvas();
            this.createNodes();
        }, 250);

        window.addEventListener('resize', resizeHandler, { passive: true });
    },

    setupVisibilityCheck() {
        const observer = new IntersectionObserver(
            (entries) => {
                this.isVisible = entries[0].isIntersecting;
            },
            { threshold: 0 }
        );
        
        observer.observe(this.container);
    },

    updateNode(node) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > this.canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > this.canvas.height) node.vy *= -1;
    },

    drawConnections(node, index) {
        for (let i = index + 1; i < this.nodes.length; i++) {
            const otherNode = this.nodes[i];
            const dx = node.x - otherNode.x;
            const dy = node.y - otherNode.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const alpha = 1 - distance / 100;
                this.ctx.beginPath();
                this.ctx.moveTo(node.x, node.y);
                this.ctx.lineTo(otherNode.x, otherNode.y);
                this.ctx.strokeStyle = `rgba(37, 99, 235, ${alpha * 0.5})`;
                this.ctx.stroke();
            }
        }
    },

    render() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.nodes.forEach((node, index) => {
            this.updateNode(node);
            
            // Draw node
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = '#2563EB';
            this.ctx.fill();
            
            // Draw connections
            this.drawConnections(node, index);
        });
    },

    animate() {
        if (this.isVisible) {
            this.render();
        }
        this.animationId = requestAnimationFrame(() => this.animate());
    }
};

// Mobile Navigation Component
const MobileNav = {
    nav: null,
    mobileMenuButton: null,
    mobileMenu: null,
    lastScroll: 0,
    ticking: false,

    init() {
        this.nav = document.querySelector('nav');
        this.mobileMenuButton = document.getElementById('mobile-menu-button');
        this.mobileMenu = document.getElementById('mobile-menu');
        
        if (!this.nav || !this.mobileMenuButton || !this.mobileMenu) return;
        
        this.addEventListeners();
    },

    addEventListeners() {
        // Toggle mobile menu
        this.mobileMenuButton.addEventListener('click', () => this.toggleMenu());
        
        // Handle scroll behavior
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        
        // Close menu on resize if entering desktop view
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth >= BREAKPOINT_MOBILE) {
                this.closeMenu();
            }
        }, 250), { passive: true });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu.contains(e.target) && 
                !this.mobileMenuButton.contains(e.target) && 
                this.mobileMenu.classList.contains('show')) {
                this.closeMenu();
            }
        });
    },

    toggleMenu() {
        const isExpanded = this.mobileMenuButton.getAttribute('aria-expanded') === 'true';
        this.mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        this.mobileMenu.classList.toggle('show');
    },

    closeMenu() {
        this.mobileMenuButton.setAttribute('aria-expanded', 'false');
        this.mobileMenu.classList.remove('show');
    },

    handleScroll() {
        if (!this.ticking) {
            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;
                
                if (currentScroll > 100 && currentScroll > this.lastScroll) {
                    this.nav.style.transform = 'translateY(-100%)';
                    this.closeMenu();
                } else {
                    this.nav.style.transform = 'translateY(0)';
                }
                
                this.lastScroll = currentScroll;
                this.ticking = false;
            });
            
            this.ticking = true;
        }
    }
};

// Force scroll to top on page load/refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Ensure page starts at top
    window.scrollTo(0, 0);
    
    Modal.init();
    NetworkAnimation.init();
    MobileNav.init();
    Reveal.init();
    Counters.init();
    Tilt.init();
    VideoModal.init();
    
    // Add Analytics
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    }
});

// Scroll Reveal Module
const Reveal = {
    observer: null,
    init() {
        const elements = document.querySelectorAll('.reveal');
        if (!elements.length) return;
        this.observer = new IntersectionObserver(this.onIntersect.bind(this), { threshold: 0.15 });
        elements.forEach(el => this.observer.observe(el));
    },
    onIntersect(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                this.observer.unobserve(entry.target);
            }
        });
    }
};

// Animated Counters Module
const Counters = {
    init() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });
        counters.forEach(c => observer.observe(c));
    },
    animate(el) {
        const to = parseFloat(el.dataset.to || '0');
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1200;
        const start = performance.now();
        const decimals = (el.dataset.to || '').includes('.') ? 1 : 0;
        const tick = (now) => {
            const progress = Math.min(1, (now - start) / duration);
            const value = to * progress;
            el.innerHTML = `${prefix}${value.toFixed(decimals)}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    }
};

// Subtle Tilt on Hover
const Tilt = {
    maxTilt: 6,
    init() {
        const tiltEls = document.querySelectorAll('[data-tilt]');
        if (!tiltEls.length) return;
        tiltEls.forEach(el => {
            el.style.transformStyle = 'preserve-3d';
            el.addEventListener('mousemove', (e) => this.handleMove(e, el));
            el.addEventListener('mouseleave', () => this.reset(el));
        });
    },
    handleMove(e, el) {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * this.maxTilt * 2;
        const rotateX = (0.5 - py) * this.maxTilt * 2;
        el.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
    },
    reset(el) {
        el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
};

// Video Modal Controller
const VideoModal = {
    modal: null,
    iframe: null,
    trigger: null,
    init() {
        this.modal = document.getElementById('video-modal');
        this.iframe = document.getElementById('video-iframe');
        this.trigger = document.getElementById('video-trigger');
        if (!this.modal || !this.iframe || !this.trigger) return;

        this.trigger.addEventListener('click', () => this.open());
        this.modal.addEventListener('click', (e) => { if (e.target === this.modal) this.close(); });
        const closeBtn = this.modal.querySelector('.close-video');
        closeBtn?.addEventListener('click', () => this.close());
    },
    open() {
        const src = this.trigger.getAttribute('data-video-src');
        if (src) this.iframe.src = src;
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    },
    close() {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('flex');
        this.iframe.src = '';
        document.body.style.overflow = '';
    }
};