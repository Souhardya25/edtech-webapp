# EduLearn – EdTech Website

A modern, responsive EdTech website with great UI/UX. It includes a homepage with hero, features, course browsing with filters, authentication modals (simulated), a course detail page, notifications, and responsive design.

## Live Structure
- `index.html` – Landing page with hero, features, popular courses, about, contact, and auth modals.
- `course-detail.html` – Detailed course page with tabs (Overview, Curriculum, Instructor, Reviews), preview modal, and enrollment simulation.
- `styles/`
  - `main.css` – Global styles and responsive layout.
  - `course-detail.css` – Styles specific to the course detail page.
- `js/`
  - `main.js` – Interactivity for homepage: filters, modals, notifications, auth simulation, animations.
  - `course-detail.js` – Tabs, curriculum expand/collapse, enrollment simulation, preview modal, reviews mock, wishlist, and social share.

## Features
- Responsive, accessible layout (mobile-first breakpoints).
- Course filtering and dynamic course card rendering.
- Smooth scrolling, fade-in animations, floating hero elements.
- Simulated auth (login/signup) with `localStorage` and top-right user menu.
- Reusable notification system with success/info/warning/error states.
- Course detail with tabs, preview modal, wishlist, social share, and mock progress.
- Contact form UI (simulated submission).

## Getting Started
This is a static site—no build step required.

1. Open the project folder:
   - `C:\Users\LENOVO\CascadeProjects\edtech-website\`
2. Double-click `index.html` to open in your browser.
   - For best results with routing and assets, use a local server (see below).

### Recommended: run a local server
- With VS Code Live Server: Right-click `index.html` → "Open with Live Server".
- With Python 3 (optional):
  - PowerShell in the project directory, run:
    - `python -m http.server 5500`
  - Visit: `http://localhost:5500`

## Project Structure
```
edtech-website/
├─ index.html
├─ course-detail.html
├─ styles/
│  ├─ main.css
│  └─ course-detail.css
└─ js/
   ├─ main.js
   └─ course-detail.js
```

## Usage Tips
- Update course data in `js/main.js` (`courses` array) to change cards, categories, prices, and icons.
- Adjust colors, gradients, and spacing in `styles/main.css` and `styles/course-detail.css`.
- The auth system is mocked via `localStorage`:
  - `isLoggedIn: 'true'|'false'`
  - `userName: string`
- To link cards to the detail page, point CTAs to `course-detail.html` or create per-course pages as needed.

## Customization Ideas
- Replace placeholder icons with real images/thumbnails for each course.
- Hook the contact form to a backend (e.g., Firebase, Supabase, or a simple serverless function).
- Replace simulated auth with real authentication (Auth0, Firebase Auth, Supabase Auth).
- Store and fetch courses from an API, then hydrate the UI.
- Add a student dashboard with progress tracking and saved courses.
- Implement quizzes and certificates with downloadable assets.

## Deployment
This site can be hosted on any static hosting provider:
- Netlify, Vercel, GitHub Pages, Cloudflare Pages, or an S3 bucket with CDN.
- Deploy the repository root; no build step required.

### Netlify Quick Deploy
1. Drag-and-drop the project folder into Netlify dashboard, or
2. Connect your Git repo → pick `main` branch → Framework preset: `None`.

## Tech Stack
- HTML5, CSS3 (no framework—clean, responsive CSS)
- Vanilla JavaScript (no dependencies)
- Font Awesome (CDN)
- Google Fonts: Inter (CDN)

## License
You can use and modify this template for personal or commercial projects. Attribution appreciated.

## Screens and Sections Map
- `index.html`
  - Navbar with brand and auth
  - Hero with stats and CTAs
  - Feature grid
  - Course filters and dynamic grid
  - About section with highlights
  - Contact section with form and info
  - Footer (links, social)
- `course-detail.html`
  - Course hero with meta and sticky enroll card
  - Tabs: Overview, Curriculum, Instructor, Reviews
  - Related courses

## Support
If you want me to integrate real backend/auth, dashboards, or quizzes, tell me your preferred stack and I’ll extend this project.
