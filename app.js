// STEP_3D: Highlight active navigation links while scrolling
const navLinks = document.querySelectorAll('#navLinks a');
const sections = Array.from(document.querySelectorAll('main section[id]'));

if (navLinks.length && sections.length) {
  const navMap = new Map(sections.map((section) => [section.id, document.querySelector(`a[href="#${section.id}"]`)]));
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const anchor = navMap.get(entry.target.id);
        if (!anchor) return;
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          navLinks.forEach((link) => link.classList.remove('active'));
          anchor.classList.add('active');
        }
      });
    },
    { rootMargin: '-30% 0px -50% 0px', threshold: [0.5] }
  );
  sections.forEach((section) => observer.observe(section));
}

// STEP_3D: Toggle hero feature chips
const featureChips = document.querySelectorAll('[data-feature]');
if (featureChips.length) {
  featureChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const isPressed = chip.getAttribute('aria-pressed') === 'true';
      featureChips.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      chip.setAttribute('aria-pressed', String(!isPressed));
    });
  });
}

// STEP_3D: Countdown timer with reserved width
const countdownRoot = document.querySelector('[data-countdown]');
if (countdownRoot) {
  const targetDate = new Date('2025-10-20T09:00:00+03:00');
  const daysNode = countdownRoot.querySelector('[data-days]');
  const hoursNode = countdownRoot.querySelector('[data-hours]');
  const minutesNode = countdownRoot.querySelector('[data-minutes]');

  const updateCountdown = () => {
    const now = new Date();
    const diff = Math.max(targetDate.getTime() - now.getTime(), 0);
    const totalMinutes = Math.floor(diff / 60000);
    const days = Math.floor(totalMinutes / (60 * 24));
    const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
    const minutes = totalMinutes % 60;
    if (daysNode) daysNode.textContent = String(days).padStart(2, '0');
    if (hoursNode) hoursNode.textContent = String(hours).padStart(2, '0');
    if (minutesNode) minutesNode.textContent = String(minutes).padStart(2, '0');
  };

  updateCountdown();
  window.setInterval(updateCountdown, 60000);
}

// STEP_3D: Accessible carousel implementation
const carousel = document.querySelector('.carousel');
if (carousel) {
  const track = carousel.querySelector('.carousel__track');
  const slides = track ? Array.from(track.children) : [];
  const prevButton = carousel.querySelector('.carousel__control.prev');
  const nextButton = carousel.querySelector('.carousel__control.next');
  const dotsContainer = carousel.querySelector('.carousel__dots');
  let currentIndex = 0;

  const setSlideState = (index) => {
    slides.forEach((slide, slideIndex) => {
      const hidden = slideIndex !== index;
      slide.setAttribute('aria-hidden', String(hidden));
      slide.tabIndex = hidden ? -1 : 0;
    });
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel__dot')) : [];
    dots.forEach((dot, dotIndex) => {
      const isSelected = dotIndex === index;
      dot.setAttribute('aria-selected', String(isSelected));
      dot.tabIndex = isSelected ? 0 : -1;
    });
    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === slides.length - 1;
  };

  const focusableInCarousel = () => Array.from(carousel.querySelectorAll('button'));

  const goToSlide = (index) => {
    const clampedIndex = Math.max(0, Math.min(index, slides.length - 1));
    if (clampedIndex === currentIndex) return;
    currentIndex = clampedIndex;
    setSlideState(currentIndex);
  };

  slides.forEach((slide, index) => {
    slide.setAttribute('aria-hidden', index === currentIndex ? 'false' : 'true');
    slide.tabIndex = index === currentIndex ? 0 : -1;
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel__dot';
    dot.id = `dot-${index + 1}`;
    dot.dataset.index = String(index);
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-controls', slide.id);
    dot.setAttribute('aria-label', `Слайд ${index + 1} из ${slides.length}`);
    dot.setAttribute('aria-selected', index === currentIndex ? 'true' : 'false');
    dot.tabIndex = index === currentIndex ? 0 : -1;
    dot.addEventListener('click', () => {
      currentIndex = index;
      setSlideState(currentIndex);
    });
    dot.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToSlide(currentIndex + 1);
        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel__dot')) : [];
        dots[currentIndex]?.focus();
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToSlide(currentIndex - 1);
        const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel__dot')) : [];
        dots[currentIndex]?.focus();
      }
    });
    dotsContainer?.appendChild(dot);
  });

  prevButton?.addEventListener('click', () => {
    goToSlide(currentIndex - 1);
    dotsContainer?.querySelector(`.carousel__dot[data-index="${currentIndex}"]`)?.focus();
  });

  nextButton?.addEventListener('click', () => {
    goToSlide(currentIndex + 1);
    dotsContainer?.querySelector(`.carousel__dot[data-index="${currentIndex}"]`)?.focus();
  });

  carousel.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goToSlide(currentIndex + 1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goToSlide(currentIndex - 1);
    }
    if (event.key === 'Tab') {
      const focusable = focusableInCarousel();
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  setSlideState(currentIndex);
}

// STEP_3D: Schedule view toggles with smooth expansion
const schedule = document.querySelector('.schedule');
const scheduleButtons = document.querySelectorAll('.segmented__btn');

const updateScheduleView = (view) => {
  if (!schedule) return;
  schedule.dataset.view = view;
  const details = schedule.querySelectorAll('.schedule__details');
  details.forEach((detail) => {
    const targetHeight = view === 'detailed' ? detail.scrollHeight : 0;
    detail.style.maxHeight = `${targetHeight}px`;
  });
};

if (schedule && scheduleButtons.length) {
  scheduleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      scheduleButtons.forEach((btn) => btn.classList.remove('is-active'));
      scheduleButtons.forEach((btn) => btn.setAttribute('aria-pressed', 'false'));
      button.classList.add('is-active');
      button.setAttribute('aria-pressed', 'true');
      updateScheduleView(button.dataset.view || 'compact');
    });
  });
  updateScheduleView('compact');
}

window.addEventListener('resize', () => {
  if (schedule && schedule.dataset.view === 'detailed') {
    updateScheduleView('detailed');
  }
});

// STEP_3D: Form validation and submission state
const form = document.getElementById('applyForm');
if (form) {
  const submitButton = form.querySelector('button[type="submit"]');
  const consent = form.querySelector('#consent');
  const successMessage = form.querySelector('.form__success');
  const requiredFields = Array.from(form.querySelectorAll('input[required][type!="checkbox"], textarea[required]'));
  const errorMap = new Map(
    requiredFields.map((field) => [field, document.getElementById(`${field.id}-error`)]).filter(([, node]) => node)
  );

  const hideSuccessMessage = () => {
    if (successMessage) {
      successMessage.hidden = true;
    }
  };

  const toggleSubmitState = () => {
    if (!submitButton) return;
    const fieldsValid = requiredFields.every((field) => field.checkValidity());
    const consentValid = consent ? consent.checked : true;
    submitButton.disabled = !(fieldsValid && consentValid);
  };

  const validateField = (field) => {
    const errorNode = errorMap.get(field);
    if (!errorNode) return;
    if (field.validity.valid) {
      errorNode.hidden = true;
    } else {
      errorNode.hidden = false;
    }
  };

  requiredFields.forEach((field) => {
    field.addEventListener('input', () => {
      hideSuccessMessage();
      validateField(field);
      toggleSubmitState();
    });
    field.addEventListener('blur', () => validateField(field));
  });

  consent?.addEventListener('change', () => {
    hideSuccessMessage();
    toggleSubmitState();
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fieldsValid = requiredFields.every((field) => field.reportValidity());
    if (!fieldsValid || (consent && !consent.checked)) {
      toggleSubmitState();
      return;
    }
    if (successMessage) {
      successMessage.hidden = false;
      successMessage.setAttribute('tabindex', '-1');
      successMessage.focus();
    }
    form.reset();
    errorMap.forEach((errorNode) => {
      if (errorNode) errorNode.hidden = true;
    });
    toggleSubmitState();
    window.setTimeout(() => {
      successMessage?.removeAttribute('tabindex');
    }, 400);
  });

  toggleSubmitState();
}

// STEP_3D: Accessible accordion controls
const accordionButtons = document.querySelectorAll('.accordion__item > button');
const accordionPanels = document.querySelectorAll('.accordion__item > div');

const openAccordionItem = (targetButton) => {
  if (!targetButton) return;
  accordionButtons.forEach((button, index) => {
    const panel = accordionPanels[index];
    const isTarget = button === targetButton;
    button.setAttribute('aria-expanded', String(isTarget));
    if (panel) {
      panel.hidden = !isTarget;
    }
  });
};

if (accordionButtons.length) {
  accordionButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isExpanded = button.getAttribute('aria-expanded') === 'true';
      if (!isExpanded) {
        openAccordionItem(button);
      }
    });
    button.addEventListener('keydown', (event) => {
      const currentIndex = Array.from(accordionButtons).indexOf(button);
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        const next = accordionButtons[currentIndex + 1] || accordionButtons[0];
        next.focus();
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        const prev = accordionButtons[currentIndex - 1] || accordionButtons[accordionButtons.length - 1];
        prev.focus();
      }
      if (event.key === 'Home') {
        event.preventDefault();
        accordionButtons[0].focus();
      }
      if (event.key === 'End') {
        event.preventDefault();
        accordionButtons[accordionButtons.length - 1].focus();
      }
    });
  });
}

// STEP_3D: Ensure only one accordion item stays open on load
if (accordionButtons.length) {
  openAccordionItem(accordionButtons[0]);
}

// STEP_3D: Orbit Invaders animation
const orbitRoot = document.getElementById('orbitInvaders');

if (orbitRoot) {
  const layer = orbitRoot.querySelector('.orbit-layer');
  const cube = orbitRoot.querySelector('.center-cube');
  if (layer) {
    const COUNT = Number.parseInt(orbitRoot.dataset.count ?? '12', 10) || 12;
    const SPEED = Number.parseFloat(orbitRoot.dataset.speed ?? '0.6') || 0.6;
    const RATIO = Number.parseFloat(orbitRoot.dataset.radius ?? '42') || 42;

    const makeInvader = (fill = '#64748b') => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 16 12');
      svg.classList.add('invader');
      const parts = [
        [0, 4, 2, 2, '#475569'],
        [14, 4, 2, 2, '#475569'],
        [2, 2, 12, 8, fill],
        [4, 0, 8, 4, fill],
        [4, 4, 2, 2, '#0f172a'],
        [10, 4, 2, 2, '#0f172a'],
        [0, 10, 4, 2, fill],
        [12, 10, 4, 2, fill],
      ];
      parts.forEach(([x, y, w, h, color]) => {
        const rect = document.createElementNS(svg.namespaceURI, 'rect');
        rect.setAttribute('x', String(x));
        rect.setAttribute('y', String(y));
        rect.setAttribute('width', String(w));
        rect.setAttribute('height', String(h));
        rect.setAttribute('fill', color);
        svg.appendChild(rect);
      });
      return svg;
    };

    const nodes = [];
    for (let i = 0; i < COUNT; i += 1) {
      const node = document.createElement('div');
      node.className = 'invader-node';
      const hue = 210 + ((i * 12) % 140);
      const invader = makeInvader(`hsl(${hue} 16% 60%)`);
      node.appendChild(invader);
      layer.appendChild(node);
      nodes.push({ node, angle: (i / COUNT) * Math.PI * 2 });
    }

    let startTimestamp = null;
    const animate = (timestamp) => {
      if (startTimestamp === null) startTimestamp = timestamp;
      const elapsedSeconds = (timestamp - startTimestamp) / 1000;
      const { width, height } = orbitRoot.getBoundingClientRect();
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(cx, cy) * (RATIO / 50);
      const angularVelocity = SPEED * Math.PI * 2;
      nodes.forEach((entry, index) => {
        const angle = entry.angle + angularVelocity * elapsedSeconds * (index % 2 === 0 ? 0.92 : 1);
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        const tangent = angle + Math.PI / 2;
        entry.node.style.transform = `translate(${x}px, ${y}px) rotate(${tangent}rad)`;
      });
      window.requestAnimationFrame(animate);
    };

    window.requestAnimationFrame(animate);

    if (cube) {
      orbitRoot.addEventListener('click', () => {
        cube.style.animation = 'none';
        // Force reflow to replay the animation
        void cube.offsetWidth;
        cube.style.animation = '';
      });
    }
  }
}
