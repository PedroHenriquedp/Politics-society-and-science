// Cyberpunk Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    
    // YouTube Video Loading Management
    const iframe = document.getElementById('youtubeVideo');
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate video loading
    setTimeout(() => {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        if (iframe) {
            iframe.classList.add('loaded');
        }
    }, 2000);
    
    // Real iframe load event
    iframe.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
            iframe.classList.add('loaded');
        }, 500);
    });
    
    // Dynamic Particle Animation
    function createRandomParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        
        const colors = ['var(--neon-purple)', 'var(--neon-cyan)', 'var(--neon-pink)', 'var(--neon-green)'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.background = color;
        particle.style.boxShadow = `0 0 20px ${color}`;
        
        return particle;
    }
    
    // Add more particles dynamically
    const particleContainer = document.querySelector('.floating-particles');
    if (particleContainer) {
        setInterval(() => {
            if (particleContainer.children.length < 10) {
                const newParticle = createRandomParticle();
                particleContainer.appendChild(newParticle);
                
                // Remove particle after animation
                setTimeout(() => {
                    if (newParticle.parentNode) {
                        newParticle.parentNode.removeChild(newParticle);
                    }
                }, 8000);
            }
        }, 3000);
    }
    
    // Cyber Glitch Effect on Title
    const title = document.querySelector('.main-title');
    if (title) {
        setInterval(() => {
            title.style.textShadow = `
                ${Math.random() * 5}px ${Math.random() * 5}px 0 var(--neon-purple),
                ${Math.random() * -5}px ${Math.random() * 5}px 0 var(--neon-cyan),
                ${Math.random() * 5}px ${Math.random() * -5}px 0 var(--neon-pink)
            `;
            
            setTimeout(() => {
                title.style.textShadow = '0 0 20px var(--neon-purple)';
            }, 100);
        }, 5000);
    }
    
    // Interactive Video Frame Glow
    const videoContainer = document.getElementById('videoContainer');
    if (videoContainer) {
        videoContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        videoContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    // Cyber Sound Effects (Optional - commented out for accessibility)
    /*
    function playBeep() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    }
    */
    
    // Scroll-based Animations
    function handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            const speed = 1 + (index * 0.1);
            particle.style.transform = `translateY(${rate * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Status Indicator Updates
    const statusItems = document.querySelectorAll('.status-item span');
    const statusMessages = [
        ['ONLINE', 'ACTIVE', 'READY'],
        ['STREAMING', 'LOADING', 'BUFFERING'],
        ['CONNECTED', 'SYNCED', 'LINKED']
    ];
    
    statusItems.forEach((item, index) => {
        if (statusMessages[index]) {
            setInterval(() => {
                const messages = statusMessages[index];
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                item.textContent = randomMessage;
            }, 3000 + (index * 1000));
        }
    });
    
    // Matrix Rain Effect (Easter Egg)
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.1';
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const drops = [];
        
        for (let x = 0; x < canvas.width / 10; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(10, 0, 32, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ffff';
            ctx.font = '10px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * 10, drops[i] * 10);
                
                if (drops[i] * 10 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        document.body.appendChild(canvas);
        setInterval(draw, 35);
        
        // Clean up on resize
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Activate matrix rain on konami code or special key combo
    let konamiSequence = [];
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    document.addEventListener('keydown', function(e) {
        konamiSequence.push(e.code);
        konamiSequence = konamiSequence.slice(-konamiCode.length);
        
        if (JSON.stringify(konamiSequence) === JSON.stringify(konamiCode)) {
            createMatrixRain();
            console.log('🔥 Cyber Mode Activated! 🔥');
        }
    });
    
    // YouTube Video ID Updater (for easy customization)
    window.updateVideoId = function(newVideoId) {
        const iframe = document.getElementById('youtubeVideo');
        if (iframe && newVideoId) {
            iframe.src = `https://www.youtube.com/embed/${newVideoId}?autoplay=0&mute=0&controls=1&showinfo=1&modestbranding=1&rel=0`;
            
            // Show loading screen again
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.classList.remove('hidden');
                iframe.classList.remove('loaded');
            }
        }
    };
    
    // Console Easter Egg
    console.log(`
    ╔══════════════════════════════════════╗
    ║           CYBERTECH v1.0             ║
    ║      Ciência, Tecnologia e Sociedade ║
    ║                                      ║
    ║ Created by: Pedro Henrique Dias      ║
    ║                                      ║
    ║ 🔮 Explore the AI-powered future     ║
    ║ 🚀 Built with HTML, CSS & JS         ║
    ║ ⚡ Try the Konami Code!              ║
    ╚══════════════════════════════════════╝
    `);
    
    console.log('💡 Tip: Use updateVideoId("YOUR_VIDEO_ID") to change the video!');
});

// Service Worker Registration (for offline capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('🔧 ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('❌ ServiceWorker registration failed: ', err);
            });
    });
}

// Prevent right-click context menu for immersive experience (optional)
// document.addEventListener('contextmenu', e => e.preventDefault());