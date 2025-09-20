// Dashboard Logic

document.addEventListener('DOMContentLoaded', function() {
    const userName = localStorage.getItem('userName') || 'Student';
    document.getElementById('dashboardUser').textContent = userName;

    renderDashboard();
    initializeFilters();
});

function getEnrolledCourses() {
    try {
        return JSON.parse(localStorage.getItem('enrolledCourses') || '[]');
    } catch {
        return [];
    }
}

function renderDashboard(filter = 'all') {
    const grid = document.getElementById('enrolledGrid');
    const courses = getEnrolledCourses();

    // Stats
    document.getElementById('statEnrolled').textContent = courses.length;
    const avg = courses.length ? Math.round(courses.reduce((a,c)=>a + (c.progress || 0), 0) / courses.length) : 0;
    document.getElementById('statAvgProgress').textContent = `${avg}%`;
    const completed = courses.filter(c => (c.progress || 0) >= 100).length;
    document.getElementById('statCompleted').textContent = completed;

    // Filter
    const filtered = courses.filter(c => {
        if (filter === 'completed') return (c.progress || 0) >= 100;
        if (filter === 'in_progress') return (c.progress || 0) > 0 && (c.progress || 0) < 100;
        return true;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:2rem;">
                <i class="fas fa-layer-group" style="font-size:3rem; color:#cbd5e1; margin-bottom:0.5rem;"></i>
                <h3>No courses yet</h3>
                <p>Enroll in a course to see it here.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = filtered.map(c => `
        <div class="enrolled-card">
            <div class="enrolled-banner">
                <i class="${c.icon}"></i>
            </div>
            <div class="enrolled-body">
                <div class="enrolled-title">${c.title}</div>
                <div class="enrolled-meta">${capitalize(c.category)}</div>
                <div class="progress"><div class="fill" style="width:${c.progress||0}%"></div></div>
                <div class="card-actions">
                    <button class="btn-primary" onclick="continueCourse(${c.id})">Continue</button>
                    <button class="btn-outline" onclick="markProgress(${c.id})">Mark +10%</button>
                </div>
            </div>
        </div>
    `).join('');
}

function initializeFilters() {
    const buttons = document.querySelectorAll('.filter');
    buttons.forEach(btn => btn.addEventListener('click', function() {
        buttons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderDashboard(this.getAttribute('data-filter'));
    }));
}

function continueCourse(id) {
    window.location.href = 'course-detail.html';
}

function markProgress(id) {
    const courses = getEnrolledCourses();
    const idx = courses.findIndex(c => c.id === id);
    if (idx >= 0) {
        const current = courses[idx].progress || 0;
        courses[idx].progress = Math.min(100, current + 10);
        localStorage.setItem('enrolledCourses', JSON.stringify(courses));
        renderDashboard(document.querySelector('.filter.active')?.getAttribute('data-filter') || 'all');
    }
}

function clearProgress() {
    localStorage.removeItem('enrolledCourses');
    renderDashboard();
}

function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : s; }

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    window.location.href = 'index.html';
}
