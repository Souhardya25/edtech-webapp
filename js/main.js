// Course data
const courses = [
    {
        id: 1,
        title: "Complete Web Development Bootcamp",
        category: "programming",
        description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course.",
        price: "$99",
        rating: 4.8,
        students: "12,450",
        icon: "fas fa-code"
    },
    {
        id: 2,
        title: "UI/UX Design Masterclass",
        category: "design",
        description: "Master the art of user interface and user experience design with industry tools.",
        price: "$79",
        rating: 4.9,
        students: "8,320",
        icon: "fas fa-palette"
    },
    {
        id: 3,
        title: "Digital Marketing Strategy",
        category: "marketing",
        description: "Learn to create effective digital marketing campaigns that drive results.",
        price: "$89",
        rating: 4.7,
        students: "6,890",
        icon: "fas fa-bullhorn"
    },
    {
        id: 4,
        title: "Python for Data Science",
        category: "programming",
        description: "Master Python programming for data analysis, visualization, and machine learning.",
        price: "$109",
        rating: 4.8,
        students: "9,560",
        icon: "fab fa-python"
    },
    {
        id: 5,
        title: "Business Strategy & Leadership",
        category: "business",
        description: "Develop essential business skills and leadership qualities for career growth.",
        price: "$95",
        rating: 4.6,
        students: "5,430",
        icon: "fas fa-chart-line"
    },
    {
        id: 6,
        title: "Graphic Design Fundamentals",
        category: "design",
        description: "Learn the principles of graphic design using Adobe Creative Suite.",
        price: "$69",
        rating: 4.7,
        students: "7,210",
        icon: "fas fa-paint-brush"
    },
    {
        id: 7,
        title: "Mobile App Development",
        category: "programming",
        description: "Build native mobile apps for iOS and Android using React Native.",
        price: "$119",
        rating: 4.9,
        students: "4,680",
        icon: "fas fa-mobile-alt"
    },
    {
        id: 8,
        title: "Social Media Marketing",
        category: "marketing",
        description: "Master social media platforms to grow your brand and engage audiences.",
        price: "$59",
        rating: 4.5,
        students: "11,230",
        icon: "fas fa-share-alt"
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load courses
    loadCourses('all');
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize navbar scroll effect
    initializeNavbarScroll();
}

function initializeEventListeners() {
    // Course filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter courses
            const filter = this.getAttribute('data-filter');
            loadCourses(filter);
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleContactForm(this);
        });
    }

    // Auth form submissions
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAuthForm(this);
        });
    });

    // Hero CTA buttons
    const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            document.querySelector('#courses').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Demo video button
    const demoButton = document.querySelector('.hero-buttons .btn-outline');
    if (demoButton) {
        demoButton.addEventListener('click', function() {
            showDemoModal();
        });
    }
}

function loadCourses(filter) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;

    // Filter courses
    const filteredCourses = filter === 'all' 
        ? courses 
        : courses.filter(course => course.category === filter);

    // Generate course cards HTML
    const coursesHTML = filteredCourses.map(course => `
        <div class="course-card" data-category="${course.category}">
            <div class="course-image">
                <i class="${course.icon}"></i>
            </div>
            <div class="course-content">
                <div class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-rating">
                        <div class="stars">
                            ${generateStars(course.rating)}
                        </div>
                        <span>${course.rating}</span>
                        <span>(${course.students})</span>
                    </div>
                    <div class="course-price">${course.price}</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                    <button class="btn-outline" onclick="window.location.href='course-detail.html?id=${course.id}'">View Details</button>
                    <button class="btn-primary" onclick="enrollCourse(${course.id})">Enroll</button>
                </div>
            </div>
        </div>
    `).join('');

    // Update the grid with animation
    coursesGrid.style.opacity = '0';
    setTimeout(() => {
        coursesGrid.innerHTML = coursesHTML;
        coursesGrid.style.opacity = '1';
        
        // Animate course cards
        const courseCards = coursesGrid.querySelectorAll('.course-card');
        courseCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 200);
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let starsHTML = '';
    
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    if (hasHalfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

function enrollCourse(courseId) {
    const course = courses.find(c => c.id === courseId);
    if (course) {
        // Check if user is logged in (simulate)
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (!isLoggedIn) {
            openModal('loginModal');
            showNotification('Please log in to enroll in courses', 'info');
        } else {
            // Simulate enrollment and persist
            const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
            if (!enrolled.find(e => e.id === course.id)) {
                enrolled.push({ id: course.id, title: course.title, category: course.category, progress: 0, price: course.price, icon: course.icon });
                localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
            }
            showNotification(`Successfully enrolled in "${course.title}"!`, 'success');
            // Optional: navigate to dashboard
            // window.location.href = 'dashboard.html';
        }
    }
}

function initializeAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const animatedElements = document.querySelectorAll('.feature-card, .course-card, .about-content, .contact-content');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function switchModal(currentModalId, targetModalId) {
    closeModal(currentModalId);
    setTimeout(() => {
        openModal(targetModalId);
    }, 200);
}

function showDemoModal() {
    // Create and show demo video modal
    const demoModal = document.createElement('div');
    demoModal.className = 'modal';
    demoModal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">&times;</span>
            <h2>EduLearn Platform Demo</h2>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #f0f0f0; border-radius: 8px; margin-top: 1rem;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                    <i class="fas fa-play-circle" style="font-size: 4rem; color: #667eea; margin-bottom: 1rem;"></i>
                    <p>Demo video would play here</p>
                    <p style="font-size: 0.9rem; color: #666;">Experience our interactive learning platform</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(demoModal);
    demoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close when clicking outside
    demoModal.addEventListener('click', function(e) {
        if (e.target === demoModal) {
            demoModal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

// Form handlers
async function handleContactForm(form) {
    try {
        const endpoint = form.getAttribute('data-endpoint');
        const formData = new FormData(form);
        
        if (endpoint && endpoint.startsWith('https://')) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });
            
            if (res.ok) {
                showNotification('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
            } else {
                showNotification('Failed to send message. Please try again later.', 'error');
            }

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        } else {
            // Fallback: simulated submission
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            form.reset();
        }
    } catch (err) {
        showNotification('Something went wrong. Please try again.', 'error');
    }
}

function handleAuthForm(form) {
    const isLogin = form.closest('#loginModal') !== null;
    const formData = new FormData(form);
    
    if (isLogin) {
        // Simulate login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', formData.get('email') || 'User');
        showNotification('Welcome back! You\'re now logged in.', 'success');
        closeModal('loginModal');
        updateAuthUI(true);
    } else {
        // Simulate signup
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userName', formData.get('name') || 'User');
        showNotification('Account created successfully! Welcome to EduLearn.', 'success');
        closeModal('signupModal');
        updateAuthUI(true);
    }
}

function updateAuthUI(isLoggedIn) {
    const navAuth = document.querySelector('.nav-auth');
    const userName = localStorage.getItem('userName') || 'User';
    
    if (isLoggedIn) {
        navAuth.innerHTML = `
            <div class="user-menu">
                <span>Welcome, ${userName}</span>
                <button class="btn-outline" onclick="window.location.href='dashboard.html'">Dashboard</button>
                <button class="btn-secondary" onclick="logout()">Logout</button>
            </div>
        `;
    } else {
        navAuth.innerHTML = `
            <button class="btn-secondary" onclick="openModal('loginModal')">Login</button>
            <button class="btn-primary" onclick="openModal('signupModal')">Sign Up</button>
        `;
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    updateAuthUI(false);
    showNotification('You\'ve been logged out successfully.', 'info');
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        default: return 'fa-info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-left: auto;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
    
    .user-menu {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .user-menu span {
        color: #333;
        font-weight: 500;
    }
`;
document.head.appendChild(notificationStyles);

// Initialize auth state on page load
document.addEventListener('DOMContentLoaded', function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    updateAuthUI(isLoggedIn);
});

// Search functionality (bonus feature)
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search courses...';
    searchInput.className = 'search-input';
    
    // Add search input to navbar (you can customize placement)
    const navAuth = document.querySelector('.nav-auth');
    navAuth.insertBefore(searchInput, navAuth.firstChild);
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const filteredCourses = courses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm) ||
            course.category.toLowerCase().includes(searchTerm)
        );
        
        displaySearchResults(filteredCourses);
    });
}

function displaySearchResults(filteredCourses) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    if (filteredCourses.length === 0) {
        coursesGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #ccc; margin-bottom: 1rem;"></i>
                <h3>No courses found</h3>
                <p>Try adjusting your search terms</p>
            </div>
        `;
        return;
    }
    
    // Use the existing loadCourses logic but with filtered results
    const coursesHTML = filteredCourses.map(course => `
        <div class="course-card" data-category="${course.category}">
            <div class="course-image">
                <i class="${course.icon}"></i>
            </div>
            <div class="course-content">
                <div class="course-category">${course.category.charAt(0).toUpperCase() + course.category.slice(1)}</div>
                <h3 class="course-title">${course.title}</h3>
                <p class="course-description">${course.description}</p>
                <div class="course-meta">
                    <div class="course-rating">
                        <div class="stars">
                            ${generateStars(course.rating)}
                        </div>
                        <span>${course.rating}</span>
                        <span>(${course.students})</span>
                    </div>
                    <div class="course-price">${course.price}</div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                    <button class="btn-outline" onclick="window.location.href='course-detail.html?id=${course.id}'">View Details</button>
                    <button class="btn-primary" onclick="enrollCourse(${course.id})">Enroll</button>
                </div>
            </div>
        </div>
    `).join('');
    
    coursesGrid.innerHTML = coursesHTML;
}
