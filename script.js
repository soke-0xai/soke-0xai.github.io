// Responsive JavaScript for both desktop and mobile layouts
document.addEventListener('DOMContentLoaded', function() {
    // Copy functionality for both desktop and mobile
    const copyButtons = document.querySelectorAll('.copy-btn-desktop, .copy-btn-mobile');
    const copyableElements = document.querySelectorAll('[data-copy]');
    const notification = document.getElementById('copy-notification');

    // Add click handlers for copy buttons
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            copyToClipboard(textToCopy);
        });
    });

    // Add click handlers for copyable elements (session IDs)
    const sessionIds = document.querySelectorAll('.session-id-desktop, .session-id-mobile');
    sessionIds.forEach(element => {
        element.style.cursor = 'pointer';
        element.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            copyToClipboard(textToCopy);
        });
    });

    // Copy to clipboard function
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(function() {
                showCopyNotification();
            }).catch(function(err) {
                console.error('Failed to copy: ', err);
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
    }

    // Fallback copy method for older browsers
    function fallbackCopy(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            showCopyNotification();
        } catch (err) {
            console.error('Failed to copy: ', err);
        }

        document.body.removeChild(textArea);
    }

    // Show copy notification
    function showCopyNotification() {
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Enhanced hover effects for desktop
    const desktopInteractiveElements = document.querySelectorAll(
        '.social-item-desktop, .business-link-desktop, .pgp-download'
    );

    desktopInteractiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 1024) {
                this.style.transform = 'translateY(-2px)';
            }
        });

        element.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 1024) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Enhanced hover effects for mobile
    const mobileInteractiveElements = document.querySelectorAll(
        '.social-link-mobile, .business-link-mobile, .pgp-link-mobile'
    );

    mobileInteractiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (window.innerWidth < 1024) {
                this.style.transform = 'translateY(-1px)';
            }
        });

        element.addEventListener('mouseleave', function() {
            if (window.innerWidth < 1024) {
                this.style.transform = 'translateY(0)';
            }
        });
    });

    // Desktop card hover effects
    const desktopCards = document.querySelectorAll('.contact-card-desktop');
    desktopCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (window.innerWidth >= 1024) {
                this.style.transform = 'translateY(-2px)';
                this.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (window.innerWidth >= 1024) {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
            }
        });
    });

    // Add click effect for copy buttons
    const allCopyButtons = document.querySelectorAll('.copy-btn-desktop, .copy-btn-mobile');
    allCopyButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.9)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // Smooth entrance animation for desktop
    const desktopLayout = document.querySelector('.desktop-layout');
    const mobileLayout = document.querySelector('.mobile-layout');

    if (window.innerWidth >= 1024 && desktopLayout) {
        const sidebar = document.querySelector('.sidebar');
        const cards = document.querySelectorAll('.contact-card-desktop');

        if (sidebar) {
            sidebar.style.opacity = '0';
            sidebar.style.transform = 'translateX(-20px)';
            sidebar.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                sidebar.style.opacity = '1';
                sidebar.style.transform = 'translateX(0)';
            }, 100);
        }

        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 + index * 100);
        });
    }

    // Smooth entrance animation for mobile
    if (window.innerWidth < 1024 && mobileLayout) {
        const contactCard = document.querySelector('.contact-card-mobile');
        if (contactCard) {
            contactCard.style.opacity = '0';
            contactCard.style.transform = 'translateY(20px)';
            contactCard.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                contactCard.style.opacity = '1';
                contactCard.style.transform = 'translateY(0)';
            }, 100);
        }
    }

    // Handle window resize to ensure proper layout switching
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset any transforms that might interfere with layout switching
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.style.transform && !element.classList.contains('copy-notification')) {
                    element.style.transform = '';
                }
            });
        }, 250);
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && notification.classList.contains('show')) {
            notification.classList.remove('show');
        }
    });

    // Enhanced focus management for accessibility
    const focusableElements = document.querySelectorAll(
        'a, button, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #4f46e5';
            this.style.outlineOffset = '2px';
        });

        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add subtle pulse animation to status indicators
    const statusIndicators = document.querySelectorAll(
        '.status-indicator-desktop, .status-indicator-mobile, .status-dot-desktop, .status-dot-mobile'
    );

    statusIndicators.forEach(indicator => {
        setInterval(() => {
            const originalBoxShadow = indicator.style.boxShadow;
            indicator.style.boxShadow = '0 2px 12px rgba(16, 185, 129, 0.6)';
            setTimeout(() => {
                indicator.style.boxShadow = originalBoxShadow;
            }, 500);
        }, 4000);
    });

    // Console log for developers
    console.log('%cSoke-0xAI Contact Page', 'color: #4f46e5; font-size: 18px; font-weight: bold;');
    console.log('%cResponsive design with separate desktop and mobile layouts', 'color: #64748b; font-size: 12px;');
    console.log('GitHub: https://github.com/soke-0xai');

    // Log successful initialization
    const isDesktop = window.innerWidth >= 1024;
    console.log(`Contact page initialized successfully! Layout: ${isDesktop ? 'Desktop' : 'Mobile'}`);
});