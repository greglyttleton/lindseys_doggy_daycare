/* ======= LOAD CMS DATA & APPLY TO PAGE ======= */

async function loadCMSData() {
  // Load settings from CMS (overrides config.js defaults)
  try {
    const res = await fetch('/cms-data/settings.json?v=' + Date.now());
    if (res.ok) {
      const s = await res.json();
      // Merge CMS settings into SITE_CONFIG
      if (s.tagline)        SITE_CONFIG.tagline        = s.tagline;
      if (s.phoneDisplay)   SITE_CONFIG.phoneDisplay   = s.phoneDisplay;
      if (s.email)          SITE_CONFIG.email          = s.email;
      if (s.address)        SITE_CONFIG.address        = s.address;
      if (s.hours)          SITE_CONFIG.hours          = s.hours;
      if (s.facebook)       SITE_CONFIG.facebook       = s.facebook;
      if (s.aboutTitle)     SITE_CONFIG.aboutTitle     = s.aboutTitle;
      if (s.pricingNote)    SITE_CONFIG.pricingNote    = s.pricingNote;
      if (s.googleReviews)  SITE_CONFIG.googleReviews  = s.googleReviews;
      if (s.daycarePrice)   SITE_CONFIG.services[0].price   = s.daycarePrice;
      if (s.overnightPrice) SITE_CONFIG.services[1].price   = s.overnightPrice;
      if (s.aboutText1 || s.aboutText2) {
        SITE_CONFIG.aboutText = [s.aboutText1 || '', s.aboutText2 || ''].filter(Boolean);
      }
    }
  } catch (e) { /* use config.js defaults */ }

  // Load gallery from CMS
  try {
    const res = await fetch('/cms-data/gallery.json?v=' + Date.now());
    if (res.ok) {
      const data = await res.json();
      renderGallery(data.photos || []);
    }
  } catch (e) {
    renderGallery([]);
  }

  // Apply all config to the page
  applyConfig();
}

function renderGallery(photos) {
  const grid  = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');
  if (!grid) return;

  if (!photos || photos.length === 0) {
    grid.style.display  = 'none';
    if (empty) empty.style.display = 'block';
    return;
  }

  grid.style.display  = '';
  if (empty) empty.style.display = 'none';

  // Build gallery — first photo is large, items fade in with stagger
  grid.innerHTML = photos.map((photo, i) => {
    const width = i === 0 ? 600 : 300;
    const quality = i === 0 ? 70 : 65;
    const cleanSrc = photo.src.startsWith('/') ? photo.src : '/' + photo.src;
    const src = `/.netlify/images?url=${cleanSrc}&w=${width}&fm=webp&q=${quality}`;
    return `
      <div class="gallery-item ${i === 0 ? 'gallery-item-large' : ''}" style="animation: fadeInUp 0.5s ease ${(i * 0.05).toFixed(2)}s both;">
        <img src="${src}" alt="${photo.caption || 'Dog at Lindsey\'s Doggy Daycare'}" />
        <div class="gallery-overlay">
          <span>${photo.caption || '🐾'}</span>
        </div>
      </div>
    `;
  }).join('');

  applyLocalImageFallback();
}


function applyConfig() {
  const c = SITE_CONFIG;

  // Helper
  const set = (sel, val, attr) => {
    document.querySelectorAll(sel).forEach(el => {
      if (attr) el.setAttribute(attr, val);
      else el.textContent = val;
    });
  };
  const setHref = (sel, val) => document.querySelectorAll(sel).forEach(el => el.href = val);

  // Page title & meta
  document.title = `${c.businessName} ${c.businessSub} | Blackpool`;

  // Logo
  set('.logo-name',  c.businessName);
  set('.logo-sub',   c.businessSub);
  set('.logo-paw',   c.logoEmoji);

  // Hero
  set('.hero-badge', c.heroBadge);
  const h1 = document.querySelector('.hero-content h1');
  if (h1) h1.innerHTML = c.tagline.replace(/ /g, ' ');
  set('.hero-content > p', c.description);

  // Hero stats
  const statNums   = document.querySelectorAll('.stat-num');
  const statLabels = document.querySelectorAll('.stat-label');
  c.heroStats.forEach((s, i) => {
    if (statNums[i])   statNums[i].textContent   = s.num;
    if (statLabels[i]) statLabels[i].textContent = s.label;
  });

  // About
  set('#about h2', c.aboutTitle);
  set('.about-badge p', c.aboutBadge.replace(/^[^ ]+ /, ''));
  const aboutPs = document.querySelectorAll('.about-content > p');
  c.aboutText.forEach((t, i) => { if (aboutPs[i]) aboutPs[i].textContent = t; });
  const features = document.querySelectorAll('.feature-item');
  c.aboutFeatures.forEach((f, i) => {
    if (!features[i]) return;
    features[i].querySelector('.feature-icon').textContent = f.icon;
    features[i].querySelector('strong').textContent = f.title;
    features[i].querySelector('p').textContent = f.text;
  });

  // Contact details
  set('.contact-detail a[href^="tel"]', `+44 ${c.phoneDisplay}`);
  document.querySelectorAll('a[href^="tel"]').forEach(a => a.href = `tel:${c.phone.replace(/\s/g,'')}`);
  document.querySelectorAll('a[href^="mailto"]').forEach(a => {
    a.href = `mailto:${c.email}`;
    if (a.textContent.includes('@')) a.textContent = c.email;
  });
  set('.contact-address-span', c.address);
  set('.contact-hours-span', c.hours);
  set('.footer-contact p:last-child', c.address.split(',').slice(-2).join(','));

  // Links
  setHref('a[href*="facebook"]', c.facebook);
  setHref('a[href*="wa.me"], .whatsapp-float', c.whatsapp);

  // Footer
  set('.footer-brand p', c.footerTagline);
  set('.footer-bottom p', c.copyright);

  // Pricing note
  set('.pricing-note p', c.pricingNote);

  // Apply local fallback
  applyLocalImageFallback();
}

function applyLocalImageFallback() {
  const isLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' || 
                  window.location.protocol === 'file:';
  if (isLocal) {
    document.querySelectorAll('img').forEach(img => {
      const src = img.getAttribute('src') || '';
      if (src.startsWith('/.netlify/images')) {
        const urlParams = new URLSearchParams(src.split('?')[1]);
        const originalUrl = urlParams.get('url');
        if (originalUrl) img.src = originalUrl;
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', loadCMSData);

// Netlify Identity — redirect to admin after login
if (window.netlifyIdentity) {
  window.netlifyIdentity.on('init', user => {
    if (!user) {
      window.netlifyIdentity.on('login', () => {
        document.location.href = '/admin/';
      });
    }
  });
}


/* ======= MAIN JS ======= */

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(item => {
        item.classList.toggle(
          'active',
          item.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { threshold: 0.4 });
sections.forEach(s => observer.observe(s));

// Scroll-reveal animation
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.service-card, .pricing-card, .testimonial-card, .feature-item, .contact-detail, .gallery-item'
).forEach(el => {
  el.style.opacity = '0';
  revealObserver.observe(el);
});

// Contact form handler (mailto fallback)
function handleSubmit(e) {
  e.preventDefault();
  const form   = e.target;
  const btn    = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');

  btn.disabled    = true;
  btn.textContent = 'Sending…';

  const formData = new FormData(form);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString()
  })
  .then(response => {
    if (response.ok) {
      success.style.display = 'block';
      form.reset();
    } else {
      throw new Error('Form submission failed');
    }
  })
  .catch(error => {
    console.error(error);
    alert("Oops! There was a problem submitting your form. Please try again or call/email us directly.");
  })
  .finally(() => {
    btn.textContent = 'Send Enquiry 🐾';
    btn.disabled = false;
  });
}

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
