
// =============================================
// APP STATE
// =============================================
const state = {
  currentView: 'auth',
  userRole: null,
  isVerified: false,
  userName: '',
  skills: [],
  profileComplete: 0,
  savedJobs: new Set(),
};

// =============================================
// MOCK JOB DATA
// =============================================
const JOBS = [
  {
    id: 1, title: 'Data Entry Specialist', company: 'Inclusive Tech Pvt Ltd',
    logo: 'IT', location: 'Bangalore', type: 'Hybrid', salary: '₹25,000–35,000/mo',
    posted: '2 days ago', score: 92, category: 'Technology',
    a11y: ['Screen reader', 'Flexible hours', 'Wheelchair access'],
    description: 'We are looking for a detail-oriented Data Entry Specialist to manage and maintain our database systems. Full screen reader compatibility provided. Flexible hours available.',
    skills: ['MS Excel', 'Data Entry', 'Tally ERP', 'Typing (50 WPM)'],
  },
  {
    id: 2, title: 'Customer Support Executive', company: 'VoiceFirst Solutions',
    logo: 'VF', location: 'Remote', type: 'Remote', salary: '₹20,000–28,000/mo',
    posted: '1 day ago', score: 85, category: 'Customer Support',
    a11y: ['Sign language interpreter', 'Remote-first', 'Flexible hours'],
    description: 'Handle inbound customer queries via chat and email. No phone calls required — fully accessible for hearing-impaired candidates. Remote-first workplace.',
    skills: ['Customer service', 'Email support', 'CRM tools', 'Patience'],
  },
  {
    id: 3, title: 'UI/UX Designer (Accessibility Focus)', company: 'DesignBridge Studio',
    logo: 'DB', location: 'Mumbai', type: 'Hybrid', salary: '₹45,000–65,000/mo',
    posted: '3 days ago', score: 78, category: 'Design',
    a11y: ['Wheelchair access', 'Ergonomic workstation', 'Flexible hours'],
    description: 'Design inclusive digital products. You will lead accessibility audits and champion WCAG compliance across our product suite. Experience with assistive tech is a plus.',
    skills: ['Figma', 'WCAG 2.1', 'User research', 'Prototyping'],
  },
  {
    id: 4, title: 'Accounts Assistant', company: 'GreenLedger Finance',
    logo: 'GL', location: 'Delhi NCR', type: 'Full-time', salary: '₹18,000–25,000/mo',
    posted: '5 days ago', score: 71, category: 'Finance',
    a11y: ['Wheelchair access', 'Screen reader compatible systems'],
    description: 'Assist the accounts team with bookkeeping, invoicing, and reconciliation. Screen reader-compatible accounting software provided.',
    skills: ['Tally ERP', 'GST', 'MS Excel', 'Bookkeeping'],
  },
  {
    id: 5, title: 'Content Writer (Remote)', company: 'InkRoot Media',
    logo: 'IR', location: 'Remote', type: 'Remote', salary: '₹15,000–22,000/mo',
    posted: 'Today', score: 88, category: 'Administration',
    a11y: ['Fully remote', 'Flexible hours', 'Asynchronous team'],
    description: 'Write SEO-friendly articles, blog posts, and social content. Fully remote with async communication. Voice-to-text tools supported.',
    skills: ['Content writing', 'SEO', 'Research', 'MS Word'],
  },
  {
    id: 6, title: 'Special Education Teacher', company: 'Rainbow Learning Centre',
    logo: 'RL', location: 'Pune', type: 'Full-time', salary: '₹22,000–30,000/mo',
    posted: '1 week ago', score: 65, category: 'Education',
    a11y: ['Wheelchair access', 'Sign language interpreter', 'Flexible hours'],
    description: 'Teach and support students with learning disabilities. B.Ed or special education certification preferred. Inclusive and supportive work environment.',
    skills: ['Teaching', 'Patience', 'IEP planning', 'Sign language (preferred)'],
  },
  {
    id: 7, title: 'Junior Software Tester', company: 'QABridge Technologies',
    logo: 'QB', location: 'Hyderabad', type: 'Hybrid', salary: '₹28,000–40,000/mo',
    posted: '4 days ago', score: 74, category: 'Technology',
    a11y: ['Screen reader', 'Ergonomic workstation', 'Remote option'],
    description: 'Perform manual and automated testing of web and mobile applications. Accessibility testing experience is highly valued. Screen reader setup provided.',
    skills: ['Manual testing', 'JIRA', 'Bug reporting', 'Selenium basics'],
  },
  {
    id: 8, title: 'Medical Transcriptionist', company: 'HealthScript India',
    logo: 'HS', location: 'Chennai', type: 'Part-time', salary: '₹12,000–18,000/mo',
    posted: '6 days ago', score: 59, category: 'Healthcare',
    a11y: ['Remote available', 'Flexible hours', 'Accessible software'],
    description: 'Transcribe audio medical reports into written records. Work from home option. Closed captions and transcription software fully supported.',
    skills: ['Medical terminology', 'Typing speed', 'Attention to detail', 'English'],
  },
];

// =============================================
// VIEW MANAGEMENT
// =============================================
function showView(viewName) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const target = document.getElementById(viewName + '-view');
  if (target) target.classList.add('active');
  state.currentView = viewName;

  // Update nav
  updateNav(viewName);

  // Render jobs if needed
  if (viewName === 'jobboard') renderJobs(JOBS);

  // Scroll to top
  window.scrollTo(0, 0);

  // Focus management
  const main = document.getElementById('main');
  if (main) main.focus();
}

function updateNav(viewName) {
  const nav = document.getElementById('main-nav');
  const navActions = document.getElementById('nav-actions');

  if (viewName === 'auth') {
    navActions.innerHTML = `
      <button class="nav-btn" onclick="switchAuthTab('login')" aria-label="Sign in">Sign in</button>
      <button class="nav-btn primary" onclick="switchAuthTab('register')" aria-label="Get started">Get started</button>`;
  } else if (viewName === 'jobboard') {
    const initials = state.userName ? state.userName.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'PS';
    navActions.innerHTML = `
      <button class="nav-btn" onclick="showView('jobboard')">Browse Jobs</button>
      <button class="nav-profile-btn" onclick="showView('profile')" aria-label="My profile">${initials}</button>
      <button class="nav-btn" onclick="logout()" aria-label="Sign out">Sign out</button>`;
  } else if (viewName === 'employer') {
    navActions.innerHTML = `
      <span style="color:rgba(255,255,255,0.7);font-size:0.875rem;">Employer Portal</span>
      <button class="nav-btn" onclick="logout()" aria-label="Sign out">Sign out</button>`;
  } else if (viewName === 'profile') {
    navActions.innerHTML = `
      <button class="nav-btn" onclick="showView('jobboard')">← Back to Jobs</button>`;
  } else if (viewName === 'role-select') {
    navActions.innerHTML = `
      <button class="nav-btn" onclick="showView('auth')">← Back</button>`;
  }
}

function goHome() {
  if (state.userRole) {
    if (state.userRole === 'employer') showView('employer');
    else showView('jobboard');
  } else {
    showView('auth');
  }
}

// =============================================
// AUTH
// =============================================
function switchAuthTab(tab) {
  const loginPanel = document.getElementById('login-panel');
  const registerPanel = document.getElementById('register-panel');
  const loginTab = document.getElementById('login-tab');
  const registerTab = document.getElementById('register-tab');

  if (tab === 'login') {
    loginPanel.style.display = 'block';
    registerPanel.style.display = 'none';
    loginTab.classList.add('active');
    registerTab.classList.remove('active');
    loginTab.setAttribute('aria-selected', 'true');
    registerTab.setAttribute('aria-selected', 'false');
  } else {
    loginPanel.style.display = 'none';
    registerPanel.style.display = 'block';
    loginTab.classList.remove('active');
    registerTab.classList.add('active');
    loginTab.setAttribute('aria-selected', 'false');
    registerTab.setAttribute('aria-selected', 'true');
  }
}

function handleLogin() {
  const email = document.getElementById('login-email').value;
  if (!email) { showToast('Please enter your email.', 'error'); return; }
  state.userName = 'Priya Sharma';
  state.userRole = 'seeker';
  showToast('Signed in! Complete your profile to see jobs.', 'success');
  setTimeout(() => showView('profile'), 1000);
}

function handleRegister() {
  const name = document.getElementById('reg-name').value;
  if (!name) { showToast('Please fill in all required fields.', 'error'); return; }
  state.userName = name;
  showToast('Account created! Choose your role.', 'success');
  setTimeout(() => showView('role-select'), 1000);
}

function demoLogin(role) {
  state.userRole = role;
  state.userName = role === 'seeker' ? 'Priya Sharma' : 'Inclusive Tech';
  showToast('Signed in as demo ' + role + '!', 'success');
  if (role === 'seeker') {
    setTimeout(() => showView('profile'), 800);
  } else {
    setTimeout(() => showView('employer'), 800);
  }
}

function selectRole(role) {
  state.userRole = role;
  showToast('Great! Let\'s set up your ' + (role === 'seeker' ? 'job seeker' : 'employer') + ' profile.', 'success');
  if (role === 'seeker') {
    setTimeout(() => showView('profile'), 800);
  } else {
    setTimeout(() => showView('employer'), 800);
  }
}

function logout() {
  state.userRole = null;
  state.userName = '';
  state.isVerified = false;
  state.skills = [];
  showToast('Signed out successfully.');
  setTimeout(() => showView('auth'), 600);
}

// =============================================
// PROFILE FORM
// =============================================
function updateProgress() {
  const fields = [
    document.getElementById('p-firstname'),
    document.getElementById('p-lastname'),
    document.getElementById('p-address'),
    document.getElementById('p-phone'),
    document.getElementById('edu-highest'),
  ];
  const filled = fields.filter(f => f && f.value.trim()).length;
  const pct = Math.round((filled / fields.length) * 60) + (state.skills.length > 0 ? 25 : 0) + (state.isVerified ? 15 : 0);
  const capped = Math.min(pct, 100);

  document.getElementById('progress-fill').style.width = capped + '%';
  document.getElementById('progress-bar-container').setAttribute('aria-valuenow', capped);

  // Update step indicators
  if (filled >= 1) setStepDone(1);
  if (filled >= 2) setStepDone(2);
  if (state.skills.length > 0) setStepDone(3);

  // Update profile completion on job board
  const profileFill = document.getElementById('profile-completion-fill');
  if (profileFill) profileFill.style.width = capped + '%';
}

function setStepDone(n) {
  const tab = document.getElementById('step-tab-' + n);
  if (tab) {
    tab.classList.remove('active');
    tab.classList.add('done');
    tab.querySelector('.step-dot').textContent = '✓';
  }
}

function addSkill(event) {
  if (event.key === 'Enter') { event.preventDefault(); addSkillBtn(); }
}

function addSkillBtn() {
  const input = document.getElementById('skills-input');
  const val = input.value.trim();
  if (!val || state.skills.includes(val)) { input.value = ''; return; }
  state.skills.push(val);
  renderSkills();
  input.value = '';
  updateProgress();
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = '';
  state.skills.forEach((skill, i) => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.setAttribute('role', 'listitem');
    tag.innerHTML = `${skill} <button onclick="removeSkill(${i})" aria-label="Remove skill ${skill}">×</button>`;
    container.appendChild(tag);
  });
}

function removeSkill(i) {
  state.skills.splice(i, 1);
  renderSkills();
  updateProgress();
}

function handleFileSelect(input, displayId) {
  const display = document.getElementById(displayId);
  if (input.files && input.files[0]) {
    display.textContent = '✓ ' + input.files[0].name;
    display.style.display = 'block';
    showToast('File uploaded: ' + input.files[0].name, 'success');
    updateProgress();
  }
}

function enableVerified() {
  state.isVerified = true;
  document.getElementById('verified-preview').style.display = 'block';
  setStepDone(5);
  updateProgress();
}

function submitProfile() {
  const fname = document.getElementById('p-firstname').value;
  const lname = document.getElementById('p-lastname').value;
  const address = document.getElementById('p-address').value;
  const phone = document.getElementById('p-phone').value;
  const edu = document.getElementById('edu-highest').value;

  if (!fname || !lname || !address || !phone || !edu) {
    showToast('Please complete all required fields (*).', 'error');
    return;
  }

  if (state.skills.length === 0) {
    showToast('Please add at least one skill.', 'error');
    return;
  }

  state.userName = fname + ' ' + lname;

  // Update job board profile bar
  const initials = (fname[0] + lname[0]).toUpperCase();
  const avatarEl = document.getElementById('seeker-avatar');
  if (avatarEl) avatarEl.textContent = initials;

  const nameEl = document.getElementById('seeker-name-display');
  if (nameEl) nameEl.textContent = state.userName;

  const verifiedBadge = document.getElementById('verified-badge');
  if (verifiedBadge) verifiedBadge.style.display = state.isVerified ? 'inline-flex' : 'none';

  showToast('Profile saved! Showing your matched jobs. 🎉', 'success');
  setTimeout(() => showView('jobboard'), 1200);
}

// =============================================
// JOBS
// =============================================
function renderJobs(jobs) {
  const grid = document.getElementById('jobs-grid');
  if (!grid) return;
  grid.innerHTML = '';
  if (jobs.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--gray-400);"><div style="font-size:3rem;margin-bottom:0.5rem;">🔍</div><p>No jobs match your current filters. Try adjusting your search.</p></div>';
    return;
  }
  jobs.forEach(job => {
    const card = createJobCard(job);
    grid.appendChild(card);
  });
  // Animate match rings
  setTimeout(() => {
    document.querySelectorAll('.match-ring-fill').forEach(ring => {
      const pct = parseFloat(ring.dataset.pct);
      const circumference = 2 * Math.PI * 22;
      ring.style.strokeDashoffset = circumference - (pct / 100) * circumference;
    });
  }, 100);
  document.getElementById('jobs-count').textContent = `Showing ${jobs.length} opportunit${jobs.length === 1 ? 'y' : 'ies'} matched to your profile`;
}

function getScoreColor(score) {
  if (score >= 85) return '#10B981';
  if (score >= 70) return '#F59E0B';
  return '#F43F5E';
}

function createJobCard(job) {
  const circumference = 2 * Math.PI * 22;
  const card = document.createElement('article');
  card.className = 'job-card';
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `${job.title} at ${job.company}, ${job.score}% match`);

  const isSaved = state.savedJobs.has(job.id);
  const scoreColor = getScoreColor(job.score);

  card.innerHTML = `
    ${state.isVerified ? '<div class="verified-banner" aria-label="Your profile is verified">✓ Verified</div>' : ''}
    <div class="job-card-header">
      <div class="company-logo" aria-hidden="true">${job.logo}</div>
      <div class="job-card-info">
        <div class="job-title">${job.title}</div>
        <div class="job-company">${job.company}</div>
      </div>
      <div class="match-ring-wrapper" role="img" aria-label="Match score: ${job.score}%">
        <svg viewBox="0 0 48 48" aria-hidden="true">
          <circle class="match-ring-bg" cx="24" cy="24" r="22"/>
          <circle class="match-ring-fill" cx="24" cy="24" r="22"
            data-pct="${job.score}"
            stroke="${scoreColor}"
            stroke-dasharray="${circumference}"
            stroke-dashoffset="${circumference}"
          />
        </svg>
        <div class="match-ring-text">
          <span class="match-score-num" style="color:${scoreColor};">${job.score}%</span>
          <span class="match-score-label">match</span>
        </div>
      </div>
    </div>

    <div class="job-meta">
      <span class="badge badge-gray">📍 ${job.location}</span>
      <span class="badge badge-gray">💼 ${job.type}</span>
      <span class="badge badge-indigo">📂 ${job.category}</span>
    </div>

    <div class="job-accessibility-tags" aria-label="Accessibility features">
      ${job.a11y.map(tag => `<span class="a11y-tag" title="Accessibility feature">♿ ${tag}</span>`).join('')}
    </div>

    <div class="job-card-footer">
      <div>
        <div class="job-salary" aria-label="Salary: ${job.salary}">${job.salary}</div>
        <div class="job-date">Posted ${job.posted}</div>
      </div>
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <button class="save-btn ${isSaved ? 'saved' : ''}" onclick="toggleSave(${job.id},this)" aria-label="${isSaved ? 'Remove from saved' : 'Save this job'}" aria-pressed="${isSaved}">
          ${isSaved ? '♥' : '♡'}
        </button>
        <button class="btn btn-saffron btn-sm" onclick="openJobModal(${job.id})" aria-label="View details and apply for ${job.title}">Apply</button>
      </div>
    </div>
  `;
  return card;
}

function toggleSave(jobId, btn) {
  if (state.savedJobs.has(jobId)) {
    state.savedJobs.delete(jobId);
    btn.classList.remove('saved');
    btn.innerHTML = '♡';
    btn.setAttribute('aria-pressed', 'false');
    btn.setAttribute('aria-label', 'Save this job');
    showToast('Removed from saved jobs.');
  } else {
    state.savedJobs.add(jobId);
    btn.classList.add('saved');
    btn.innerHTML = '♥';
    btn.setAttribute('aria-pressed', 'true');
    btn.setAttribute('aria-label', 'Remove from saved');
    showToast('Saved to your jobs list!', 'success');
  }
}

function openJobModal(jobId) {
  const job = JOBS.find(j => j.id === jobId);
  if (!job) return;
  document.getElementById('modal-job-title').textContent = job.title + ' — ' + job.company;
  document.getElementById('modal-job-body').innerHTML = `
    <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-bottom:1rem;">
      <span class="badge badge-gray">📍 ${job.location}</span>
      <span class="badge badge-gray">💼 ${job.type}</span>
      <span class="badge badge-saffron">${job.salary}</span>
      <span class="badge badge-mint" style="color:#065F46;">Match: ${job.score}%</span>
    </div>
    <p style="font-size:0.9rem;line-height:1.7;margin-bottom:1rem;color:var(--gray-600);">${job.description}</p>
    <div style="margin-bottom:0.75rem;">
      <strong style="font-size:0.85rem;">Skills required:</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.4rem;">
        ${job.skills.map(s => `<span class="badge badge-indigo">${s}</span>`).join('')}
      </div>
    </div>
    <div>
      <strong style="font-size:0.85rem;">Accessibility features:</strong>
      <div style="display:flex;flex-wrap:wrap;gap:0.4rem;margin-top:0.4rem;">
        ${job.a11y.map(a => `<span class="a11y-tag">♿ ${a}</span>`).join('')}
      </div>
    </div>
  `;
  showModal('job-modal');
}

function applyJob() {
  showToast('Application submitted! You will hear back within 5 business days.', 'success');
}

function filterJobs() {
  const search = (document.getElementById('job-search-input')?.value || '').toLowerCase();
  const location = document.getElementById('filter-location')?.value || '';
  const type = document.getElementById('filter-type')?.value || '';
  const minMatch = parseInt(document.getElementById('filter-match')?.value || '0');

  const filtered = JOBS.filter(job => {
    const matchesSearch = !search || job.title.toLowerCase().includes(search) || job.company.toLowerCase().includes(search) || job.skills.some(s => s.toLowerCase().includes(search));
    const matchesLocation = !location || job.location === location;
    const matchesType = !type || job.type === type;
    const matchesScore = job.score >= minMatch;
    return matchesSearch && matchesLocation && matchesType && matchesScore;
  });

  renderJobs(filtered);
}

function setActiveNav(btn) {
  document.querySelectorAll('.sidebar-nav-item').forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  btn.classList.add('active');
  btn.setAttribute('aria-current', 'page');
}

function toggleChip(chip) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  filterJobs();
}

// =============================================
// EMPLOYER
// =============================================
function switchEmployerTab(tab, btn) {
  document.querySelectorAll('.emp-panel').forEach(p => p.style.display = 'none');
  document.getElementById('emp-' + tab).style.display = 'block';
  document.querySelectorAll('#app-layout-employer .sidebar-nav-item').forEach(b => {
    b.classList.remove('active');
    b.removeAttribute('aria-current');
  });
  if (btn) {
    btn.classList.add('active');
    btn.setAttribute('aria-current', 'page');
  }
}

function submitJob() {
  const title = document.getElementById('job-title')?.value;
  const location = document.getElementById('job-location-new')?.value;
  if (!title || !location) { showToast('Please fill in all required fields.', 'error'); return; }
  showToast('Job "' + title + '" published successfully! ✓', 'success');
  document.getElementById('job-title').value = '';
  document.getElementById('job-location-new').value = '';
  document.getElementById('job-desc').value = '';
  setTimeout(() => switchEmployerTab('dashboard', document.querySelector('#app-layout-employer .sidebar-nav-item')), 1500);
}

// =============================================
// MODALS
// =============================================
function showModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) {
    overlay.classList.add('open');
    overlay.querySelector('button')?.focus();
  }
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove('open');
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
  }
});

// ESC key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// =============================================
// TOAST
// =============================================
let toastTimer;
function showToast(msg, type) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'show' + (type ? ' ' + type : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = ''; }, 3500);
}

// =============================================
// SESSION TIMEOUT
// =============================================
let sessionSeconds = 300;
let timeoutInterval;

function startSessionTimer() {
  clearInterval(timeoutInterval);
  sessionSeconds = 300;
  document.getElementById('timeout-banner').classList.remove('show');
  timeoutInterval = setInterval(() => {
    sessionSeconds--;
    if (sessionSeconds <= 60) {
      const banner = document.getElementById('timeout-banner');
      banner.classList.add('show');
      const mins = Math.floor(sessionSeconds / 60);
      const secs = sessionSeconds % 60;
      document.getElementById('timeout-countdown').textContent = mins + ':' + String(secs).padStart(2,'0');
    }
    if (sessionSeconds <= 0) {
      clearInterval(timeoutInterval);
      logout();
      showToast('Session expired. Please sign in again.', 'error');
    }
  }, 1000);
}

function resetTimeout() {
  startSessionTimer();
  showToast('Session extended!', 'success');
}

// Reset timer on activity
['click', 'keydown', 'mousemove', 'scroll'].forEach(evt => {
  document.addEventListener(evt, () => {
    if (state.userRole) {
      sessionSeconds = 300;
      document.getElementById('timeout-banner').classList.remove('show');
    }
  }, { passive: true });
});

// =============================================
// ACCESSIBILITY TOOLBAR
// =============================================
function toggleA11yPanel() {
  const panel = document.getElementById('a11y-panel');
  const btn = document.getElementById('a11y-toggle-btn');
  const isOpen = panel.classList.toggle('open');
  btn.setAttribute('aria-expanded', isOpen);
  btn.classList.toggle('active', isOpen);
}

function toggleA11y(cls, toggleId) {
  const body = document.body;
  const toggle = document.getElementById(toggleId);
  const isOn = body.classList.toggle(cls);
  toggle.classList.toggle('on', isOn);
  toggle.setAttribute('aria-checked', isOn);
}

// Close a11y panel when clicking outside
document.addEventListener('click', (e) => {
  const toolbar = document.getElementById('a11y-toolbar');
  const panel = document.getElementById('a11y-panel');
  if (toolbar && !toolbar.contains(e.target) && panel.classList.contains('open')) {
    panel.classList.remove('open');
    document.getElementById('a11y-toggle-btn').setAttribute('aria-expanded', 'false');
    document.getElementById('a11y-toggle-btn').classList.remove('active');
  }
});

// =============================================
// INIT
// =============================================
window.addEventListener('DOMContentLoaded', () => {
  // Hide loading, show app
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.remove();
      document.getElementById('main-nav').style.display = 'flex';
    }, 500);
  }, 1500);

  // Activate auth view
  showView('auth');

  // Set step-tab-1 as active
  const step1 = document.getElementById('step-tab-1');
  if (step1) step1.classList.add('active');
});
