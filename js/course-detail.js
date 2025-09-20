// Course Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeCourseDetailPage();
});

function initializeCourseDetailPage() {
    // Load course from query string and apply to page
    try { loadCourseFromQuery(); } catch (e) { console.warn('Course apply failed', e); }

    // Initialize tabs
    initializeTabs();
    
    // Initialize curriculum sections
    initializeCurriculumSections();
    
    // Initialize enroll button
    initializeEnrollButton();
    
    // Initialize preview video
    initializePreviewVideo();
    
    // Check authentication state
    updateAuthState();

    // Initialize quiz
    renderQuiz();
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Smooth scroll to content if on mobile
            if (window.innerWidth <= 768) {
                document.querySelector('.tab-content').scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initializeCurriculumSections() {
    const sectionHeaders = document.querySelectorAll('.section-header');
    
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const section = this.parentElement;
            const content = section.querySelector('.section-content');
            const icon = this.querySelector('.section-info i');
            
            if (content) {
                const isExpanded = content.style.display === 'block';
                
                if (isExpanded) {
                    content.style.display = 'none';
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-right');
                } else {
                    content.style.display = 'block';
                    icon.classList.remove('fa-chevron-right');
                    icon.classList.add('fa-chevron-down');
                }
            }
        });
    });
}

function initializeEnrollButton() {
    const enrollBtn = document.querySelector('.enroll-btn');
    
    if (enrollBtn) {
        enrollBtn.addEventListener('click', function() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (!isLoggedIn) {
                openModal('loginModal');
                showNotification('Please log in to enroll in this course', 'info');
            } else {
                handleEnrollment();
                // Persist selected course to enrolledCourses based on current page course
                const course = getCurrentCourse();
                if (course) {
                    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
                    if (!enrolled.find(e => e.id === course.id)) {
                        enrolled.push({ id: course.id, title: course.title, category: course.category, progress: 0, price: course.price, icon: course.icon });
                        localStorage.setItem('enrolledCourses', JSON.stringify(enrolled));
                    }
                }
            }
        });
    }
}

function handleEnrollment() {
    // Simulate enrollment process
    const enrollBtn = document.querySelector('.enroll-btn');
    const originalText = enrollBtn.innerHTML;
    
    // Show loading state
    enrollBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    enrollBtn.disabled = true;
    
    setTimeout(() => {
        // Simulate successful enrollment
        enrollBtn.innerHTML = '<i class="fas fa-check"></i> Enrolled!';
        enrollBtn.style.background = '#10b981';
        
        showNotification('Successfully enrolled in Complete Web Development Bootcamp!', 'success');
        
        // Show access to course content
        setTimeout(() => {
            showCourseAccessModal();
        }, 1500);
        
    }, 2000);
}

function showCourseAccessModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">&times;</span>
            <div style="text-align: center; padding: 1rem;">
                <i class="fas fa-graduation-cap" style="font-size: 4rem; color: #667eea; margin-bottom: 1rem;"></i>
                <h2>Welcome to the Course!</h2>
                <p style="margin-bottom: 2rem;">You now have full access to all course materials. Start your learning journey today!</p>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button class="btn-primary" onclick="startCourse()">Start Learning</button>
                    <button class="btn-outline" onclick="window.location.href='dashboard.html'">Go to Dashboard</button>
                    <button class="btn-secondary" onclick="this.parentElement.parentElement.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">Later</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function startCourse() {
    // Close modal
    document.querySelector('.modal').remove();
    document.body.style.overflow = 'auto';
    
    // Simulate navigation to course content
    showNotification('Redirecting to course content...', 'info');
    
    // In a real application, you would redirect to the learning platform
    setTimeout(() => {
        showNotification('Course content would load here in a real application', 'info');
    }, 1500);
}

function initializePreviewVideo() {
    const previewVideo = document.querySelector('.preview-video');
    
    if (previewVideo) {
        previewVideo.addEventListener('click', function() {
            showVideoPreview();
        });
    }
}

function showVideoPreview() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 800px;">
            <span class="close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = 'auto';">&times;</span>
            <h2>Course Preview</h2>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; background: #000; border-radius: 8px; margin-top: 1rem;">
                <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: white;">
                    <i class="fas fa-play-circle" style="font-size: 4rem; margin-bottom: 1rem; display: block;"></i>
                    <h3>Introduction to Web Development</h3>
                    <p>Get a taste of what you'll learn in this comprehensive course</p>
                    <button class="btn-primary" style="margin-top: 1rem;" onclick="playPreview(this)">
                        <i class="fas fa-play"></i> Play Preview
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Close when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    });
}

function playPreview(button) {
    const videoContainer = button.parentElement;
    videoContainer.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; height: 200px;">
            <div style="text-align: center;">
                <i class="fas fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                <p>Loading preview...</p>
            </div>
        </div>
    `;
    
    setTimeout(() => {
        videoContainer.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px;">
                <div style="text-align: center; color: white;">
                    <i class="fas fa-video" style="font-size: 3rem; margin-bottom: 1rem; display: block;"></i>
                    <h3>Preview Video Playing</h3>
                    <p>In a real application, the actual video would play here</p>
                </div>
            </div>
        `;
    }, 1500);
}

function updateAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const navAuth = document.querySelector('.nav-auth');
    const userName = localStorage.getItem('userName') || 'User';
    
    if (isLoggedIn && navAuth) {
        navAuth.innerHTML = `
            <div class="user-menu">
                <span>Welcome, ${userName}</span>
                <button class="btn-secondary" onclick="logout()">Logout</button>
            </div>
        `;
    }
}

// Rating and review functionality
function initializeReviewSystem() {
    // Add review form for enrolled students
    const reviewsContent = document.querySelector('.reviews-content');
    
    if (reviewsContent && localStorage.getItem('isLoggedIn') === 'true') {
        const reviewForm = document.createElement('div');
        reviewForm.className = 'review-form-container';
        reviewForm.innerHTML = `
            <div class="review-form">
                <h3>Leave a Review</h3>
                <div class="rating-input">
                    <span>Your Rating:</span>
                    <div class="star-rating">
                        <i class="far fa-star" data-rating="1"></i>
                        <i class="far fa-star" data-rating="2"></i>
                        <i class="far fa-star" data-rating="3"></i>
                        <i class="far fa-star" data-rating="4"></i>
                        <i class="far fa-star" data-rating="5"></i>
                    </div>
                </div>
                <textarea placeholder="Share your experience with this course..." rows="4"></textarea>
                <button class="btn-primary" onclick="submitReview()">Submit Review</button>
            </div>
        `;
        
        reviewsContent.insertBefore(reviewForm, reviewsContent.firstChild);
        
        // Initialize star rating
        const stars = reviewForm.querySelectorAll('.star-rating i');
        let selectedRating = 0;
        
        stars.forEach((star, index) => {
            star.addEventListener('click', function() {
                selectedRating = index + 1;
                updateStarDisplay(stars, selectedRating);
            });
            
            star.addEventListener('mouseenter', function() {
                updateStarDisplay(stars, index + 1);
            });
        });
        
        reviewForm.addEventListener('mouseleave', function() {
            updateStarDisplay(stars, selectedRating);
        });
    }
}

function updateStarDisplay(stars, rating) {
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
            star.style.color = '#ffd700';
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
            star.style.color = '#d1d5db';
        }
    });
}

function submitReview() {
    const reviewForm = document.querySelector('.review-form');
    const textarea = reviewForm.querySelector('textarea');
    const stars = reviewForm.querySelectorAll('.star-rating .fas').length;
    
    if (stars === 0) {
        showNotification('Please select a rating', 'warning');
        return;
    }
    
    if (textarea.value.trim() === '') {
        showNotification('Please write a review', 'warning');
        return;
    }
    
    // Simulate review submission
    showNotification('Thank you for your review! It will be published after moderation.', 'success');
    
    // Reset form
    textarea.value = '';
    const allStars = reviewForm.querySelectorAll('.star-rating i');
    updateStarDisplay(allStars, 0);
}

// Progress tracking (for enrolled students)
function initializeProgressTracking() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    if (isLoggedIn) {
        // Add progress indicator to curriculum
        const curriculumSections = document.querySelectorAll('.curriculum-section');
        
        curriculumSections.forEach((section, index) => {
            const progress = Math.random() * 100; // Simulate progress
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.innerHTML = `
                <div class="progress-fill" style="width: ${progress}%"></div>
                <span class="progress-text">${Math.round(progress)}% complete</span>
            `;
            
            section.querySelector('.section-header').appendChild(progressBar);
        });
    }
}

// Wishlist functionality
function initializeWishlist() {
    const courseCard = document.querySelector('.course-card-sidebar');
    
    if (courseCard) {
        const wishlistBtn = document.createElement('button');
        wishlistBtn.className = 'btn-outline btn-full wishlist-btn';
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
        wishlistBtn.style.marginBottom = '1rem';
        
        wishlistBtn.addEventListener('click', function() {
            const isInWishlist = this.classList.contains('in-wishlist');
            
            if (isInWishlist) {
                this.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
                this.classList.remove('in-wishlist');
                showNotification('Removed from wishlist', 'info');
            } else {
                this.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
                this.classList.add('in-wishlist');
                this.style.color = '#dc2626';
                this.style.borderColor = '#dc2626';
                showNotification('Added to wishlist', 'success');
            }
        });
        
        courseCard.insertBefore(wishlistBtn, courseCard.querySelector('.enroll-btn'));
    }
}

// Social sharing
function initializeSocialSharing() {
    const courseInfo = document.querySelector('.course-info');
    
    if (courseInfo) {
        const shareButtons = document.createElement('div');
        shareButtons.className = 'social-share';
        shareButtons.innerHTML = `
            <span>Share this course:</span>
            <div class="share-buttons">
                <button class="share-btn" onclick="shareOnFacebook()">
                    <i class="fab fa-facebook"></i>
                </button>
                <button class="share-btn" onclick="shareOnTwitter()">
                    <i class="fab fa-twitter"></i>
                </button>
                <button class="share-btn" onclick="shareOnLinkedIn()">
                    <i class="fab fa-linkedin"></i>
                </button>
                <button class="share-btn" onclick="copyLink()">
                    <i class="fas fa-link"></i>
                </button>
            </div>
        `;
        
        courseInfo.appendChild(shareButtons);
    }
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
}

function shareOnLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
}

function copyLink() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showNotification('Link copied to clipboard!', 'success');
    }).catch(() => {
        showNotification('Failed to copy link', 'error');
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        initializeReviewSystem();
        initializeProgressTracking();
        initializeWishlist();
        initializeSocialSharing();
    }, 1000);
});

// -----------------
// Dynamic course API
// -----------------
const courseCatalog = [
    { id: 1, title: "Complete Web Development Bootcamp", category: "programming", description: "Learn HTML, CSS, JavaScript, React, Node.js and more in this comprehensive course.", price: "$99", rating: 4.8, students: "12,450", icon: "fas fa-code" },
    { id: 2, title: "UI/UX Design Masterclass", category: "design", description: "Master the art of user interface and user experience design with industry tools.", price: "$79", rating: 4.9, students: "8,320", icon: "fas fa-palette" },
    { id: 3, title: "Digital Marketing Strategy", category: "marketing", description: "Learn to create effective digital marketing campaigns that drive results.", price: "$89", rating: 4.7, students: "6,890", icon: "fas fa-bullhorn" },
    { id: 4, title: "Python for Data Science", category: "programming", description: "Master Python programming for data analysis, visualization, and machine learning.", price: "$109", rating: 4.8, students: "9,560", icon: "fab fa-python" },
    { id: 5, title: "Business Strategy & Leadership", category: "business", description: "Develop essential business skills and leadership qualities for career growth.", price: "$95", rating: 4.6, students: "5,430", icon: "fas fa-chart-line" },
    { id: 6, title: "Graphic Design Fundamentals", category: "design", description: "Learn the principles of graphic design using Adobe Creative Suite.", price: "$69", rating: 4.7, students: "7,210", icon: "fas fa-paint-brush" },
    { id: 7, title: "Mobile App Development", category: "programming", description: "Build native mobile apps for iOS and Android using React Native.", price: "$119", rating: 4.9, students: "4,680", icon: "fas fa-mobile-alt" },
    { id: 8, title: "Social Media Marketing", category: "marketing", description: "Master social media platforms to grow your brand and engage audiences.", price: "$59", rating: 4.5, students: "11,230", icon: "fas fa-share-alt" }
];

function getCurrentCourseId() {
    const params = new URLSearchParams(window.location.search);
    const id = Number(params.get('id'));
    return Number.isFinite(id) && id > 0 ? id : 1;
}

function getCurrentCourse() {
    const id = getCurrentCourseId();
    return courseCatalog.find(c => c.id === id);
}

function loadCourseFromQuery() {
    const course = getCurrentCourse();
    if (!course) return;

    // Title & description
    const titleEl = document.querySelector('.course-title');
    const subtitleEl = document.querySelector('.course-subtitle');
    if (titleEl) titleEl.textContent = course.title;
    if (subtitleEl) subtitleEl.textContent = course.description;

    // Price and rating
    const priceEl = document.querySelector('.current-price');
    if (priceEl) priceEl.textContent = course.price;

    const ratingMeta = document.querySelector('.course-meta .meta-item span');
    if (ratingMeta) ratingMeta.textContent = `${course.rating} (${course.students} reviews)`;

    // Sidebar icon if present
    const sidebarIcon = document.querySelector('.course-image i, .preview-video i');
    if (sidebarIcon && course.icon) {
        sidebarIcon.className = course.icon;
    }
}

// Add CSS for additional features
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .review-form-container {
        margin-bottom: 3rem;
        padding: 2rem;
        background: #f8f9fa;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
    }
    
    .review-form h3 {
        margin-bottom: 1.5rem;
        color: #2d3748;
    }
    
    .rating-input {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }
    
    .star-rating {
        display: flex;
        gap: 0.25rem;
    }
    
    .star-rating i {
        font-size: 1.5rem;
        cursor: pointer;
        transition: color 0.2s ease;
    }
    
    .review-form textarea {
        width: 100%;
        padding: 1rem;
        border: 2px solid #d1d5db;
        border-radius: 8px;
        font-family: inherit;
        font-size: 1rem;
        margin-bottom: 1rem;
        resize: vertical;
    }
    
    .review-form textarea:focus {
        outline: none;
        border-color: #667eea;
    }
    
    .progress-bar {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-left: auto;
    }
    
    .progress-fill {
        height: 4px;
        background: #667eea;
        border-radius: 2px;
        transition: width 0.3s ease;
    }
    
    .progress-text {
        font-size: 0.8rem;
        color: #6b7280;
        white-space: nowrap;
    }
    
    .wishlist-btn.in-wishlist {
        background: #fef2f2;
    }
    
    .social-share {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;
        padding-top: 2rem;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
    
    .social-share span {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
    }
    
    .share-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .share-btn {
        width: 40px;
        height: 40px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: transparent;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .share-btn:hover {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(255, 255, 255, 0.5);
        transform: translateY(-2px);
    }
`;
document.head.appendChild(additionalStyles);
