document.addEventListener('DOMContentLoaded', () => {
    // Current year for footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // Load Data
    if (typeof PORTFOLIO_DATA !== 'undefined') {
        populatePortfolio(PORTFOLIO_DATA);
    } else {
        console.error('PORTFOLIO_DATA is not defined. Make sure data.js is loaded properly.');
    }

    // Scroll Animation
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const checkScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        fadeElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Trigger initially
});

function populatePortfolio(data) {
    // Hero Section
    document.getElementById('hero-name').textContent = data.personal.name;
    document.getElementById('hero-role').textContent = data.personal.role;
    document.getElementById('hero-summary').textContent = data.personal.summary;

    // Contact & Info Section
    document.getElementById('info-email').textContent = data.personal.email;
    document.getElementById('info-phone').textContent = data.personal.phone;
    document.getElementById('info-location').textContent = data.personal.location;

    // Languages
    const langContainer = document.getElementById('info-languages');
    data.personal.languages.forEach(lang => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = lang;
        langContainer.appendChild(span);
    });

    // Skills Section
    const skillsGrid = document.getElementById('skills-grid');
    data.skills.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-card';
        div.textContent = skill;
        skillsGrid.appendChild(div);
    });

    // Experience Section
    const timeline = document.getElementById('experience-timeline');
    data.experience.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        let tasksHtml = '';
        exp.responsibilities.forEach(task => {
            tasksHtml += `<li>${task}</li>`;
        });

        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-title">${exp.role}</h3>
                        <div class="timeline-company">${exp.company} - ${exp.location}</div>
                    </div>
                    <div class="timeline-date">${exp.duration}</div>
                </div>
                <ul class="timeline-tasks">
                    ${tasksHtml}
                </ul>
            </div>
        `;
        timeline.appendChild(item);
    });

    // Education Section
    const eduGrid = document.getElementById('education-grid');
    data.education.forEach(edu => {
        const card = document.createElement('div');
        card.className = 'education-card';
        card.innerHTML = `
            <h3>${edu.degree}</h3>
            <div class="inst">${edu.institution}</div>
            <div class="loc-date">${edu.location} ${edu.duration ? '| ' + edu.duration : ''}</div>
        `;
        eduGrid.appendChild(card);
    });
}
