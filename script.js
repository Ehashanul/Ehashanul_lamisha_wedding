/* A closed envelope welcomes visitors; the full invitation remains available without JavaScript. */
const invitationPage = document.querySelector('main');
const invitationFooter = document.querySelector('footer');
const envelopeWelcome = document.createElement('section');
envelopeWelcome.className = 'envelope-welcome';
envelopeWelcome.setAttribute('aria-label', 'Open your wedding invitation');
envelopeWelcome.innerHTML = `
  <p class="welcome-eyebrow">A LETTER, WITH LOVE</p>
  <p class="welcome-names">Ehashanul <span>&</span> Lamisha</p>
  <button class="closed-envelope" type="button" aria-label="Break the seal and open the wedding invitation" aria-expanded="false">
    <span class="welcome-flap-back" aria-hidden="true"></span><span class="welcome-lining" aria-hidden="true"></span>
    <span class="welcome-letter" aria-hidden="true"><span class="script">You are invited</span></span>
    <span class="welcome-pocket" aria-hidden="true"></span>
    <span class="welcome-flap" aria-hidden="true"></span>
    <span class="wax-seal welcome-seal" aria-hidden="true"><span class="script">E<span>&</span>L</span></span>
  </button>
  <p class="welcome-prompt" aria-live="polite">Touch the seal to open your invitation</p>
  <p class="welcome-date">18 DECEMBER 2026</p>`;
document.body.prepend(envelopeWelcome);
invitationPage.hidden = true;
invitationFooter.hidden = true;
document.body.classList.add('invitation-closed');
const openEnvelope = envelopeWelcome.querySelector('button');
const weddingMusic = document.getElementById('wedding-music');
const musicToggle = document.getElementById('music-toggle');
weddingMusic.volume = 0.5;
function updateMusicButton() {
  const silent = weddingMusic.muted || weddingMusic.paused;
  musicToggle.classList.toggle('is-muted', silent);
  musicToggle.setAttribute('aria-label', silent ? 'Unmute background music' : 'Mute background music');
  musicToggle.setAttribute('aria-pressed', String(silent));
}
musicToggle.addEventListener('click', () => {
  if (weddingMusic.paused) {
    weddingMusic.muted = false;
    weddingMusic.play().then(updateMusicButton).catch(updateMusicButton);
  } else {
    weddingMusic.muted = !weddingMusic.muted;
    updateMusicButton();
  }
});
weddingMusic.addEventListener('play', updateMusicButton);
weddingMusic.addEventListener('pause', updateMusicButton);
// Silence the invitation whenever visitors switch tabs or leave the window.
function pauseBackgroundMusic() {
  weddingMusic.pause();
  updateMusicButton();
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) pauseBackgroundMusic();
});
window.addEventListener('blur', pauseBackgroundMusic);
window.addEventListener('pagehide', pauseBackgroundMusic);
// Use a copy of the real plaque so the envelope releases the same design.
const emergingPlaque = document.querySelector('.name-plaque').cloneNode(true);
const plaqueHeading = emergingPlaque.querySelector('h1');
const plaqueTitle = document.createElement('div');
plaqueTitle.className = 'plaque-title';
plaqueTitle.innerHTML = plaqueHeading.innerHTML;
plaqueHeading.replaceWith(plaqueTitle);
const letter = envelopeWelcome.querySelector('.welcome-letter');
letter.replaceChildren(emergingPlaque);
let isOpening = false;
openEnvelope.addEventListener('click', async () => {
  if (isOpening) return;
  isOpening = true;
  musicToggle.hidden = false;
  weddingMusic.muted = false;
  // Start synchronously from the envelope click so mobile browsers allow audio.
  weddingMusic.play().then(updateMusicButton).catch(updateMusicButton);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  openEnvelope.setAttribute('aria-expanded', 'true');
  envelopeWelcome.classList.add('is-opening');
  const ease = 'cubic-bezier(.22,.61,.36,1)';
  const plaqueLift = Math.min(430, Math.max(250, letter.getBoundingClientRect().top + 75 - 24));
  const play = (element, frames, duration, delay = 0) => element.animate(frames, {
    duration: reducedMotion ? 80 : duration,
    delay: reducedMotion ? 0 : delay,
    easing: ease, fill: 'forwards'
  });
  play(envelopeWelcome.querySelector('.welcome-seal'), [
    { opacity: 1, transform: 'translate(-50%,-50%) scale(1)' },
    { opacity: 0, transform: 'translate(-50%,-50%) scale(1.12)' }
  ], 700);
  play(envelopeWelcome.querySelector('.welcome-flap'), [
    { transform: 'rotateX(0deg)' }, { transform: 'rotateX(-180deg)' }
  ], 2300, 450);
  play(envelopeWelcome.querySelector('.welcome-flap-back'), [
    { transform: 'rotateX(180deg)', opacity: 0 },
    { transform: 'rotateX(90deg)', opacity: 0, offset: .5 },
    { transform: 'rotateX(0deg)', opacity: 1 }
  ], 2300, 450);
  play(openEnvelope, [{ transform: 'translateY(0)' }, { transform: 'translateY(75px)' }], 2600, 1300);
  for (const label of envelopeWelcome.querySelectorAll('.welcome-eyebrow,.welcome-names,.welcome-prompt,.welcome-date')) {
    play(label, [{ opacity: 1 }, { opacity: 0 }], 1000, 600);
  }
  const extraction = play(letter, [
    { transform: 'translateY(0)' }, { transform: `translateY(-${plaqueLift}px)` }
  ], 2900, 1900);
  await extraction.finished;
  // Keep the emerging plaque on screen while it grows into its exact page position.
  const start = emergingPlaque.getBoundingClientRect();
  invitationPage.hidden = false;
  invitationFooter.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  const destinationPlaque = invitationPage.querySelector('.name-plaque');
  const target = destinationPlaque.getBoundingClientRect();
  const targetPadding = getComputedStyle(destinationPlaque).padding;
  destinationPlaque.style.visibility = 'hidden';
  const flight = document.createElement('div');
  flight.className = 'plaque-flight hero';
  flight.setAttribute('aria-hidden', 'true');
  flight.style.cssText = `position:fixed;left:0;top:0;z-index:60;min-height:0;padding:0;margin:0;background:transparent;border:0;overflow:visible;width:${target.width}px;height:${target.height}px;transform-origin:0 0;will-change:transform`;
  const finalPlaque = destinationPlaque.cloneNode(true);
  finalPlaque.style.cssText = `visibility:visible;width:100%;max-width:none;height:100%;min-height:0;margin:0;padding:${targetPadding}`;
  flight.append(finalPlaque);
  document.body.append(flight);
  emergingPlaque.style.visibility = 'hidden';
  const landing = play(flight, [
    { transform: `translate3d(${start.left}px,${start.top}px,0) scale(${start.width / target.width},${start.height / target.height})` },
    { transform: `translate3d(${target.left}px,${target.top}px,0) scale(1,1)` }
  ], 2600);
  const fade = play(envelopeWelcome, [{ opacity: 1 }, { opacity: 0 }], 2000);
  envelopeWelcome.style.pointerEvents = 'none';
  await Promise.all([landing.finished, fade.finished]);
  destinationPlaque.style.visibility = '';
  flight.remove();
  envelopeWelcome.remove();
  document.body.classList.remove('invitation-closed');
  const heading = document.querySelector('h1');
  heading.setAttribute('tabindex', '-1');
  heading.focus({ preventScroll: true });
});
/* Add confirmed wedding details here. Leave empty values until confirmed. */
const wedding = {
  date: '2026-12-18T13:30:00+06:00',
  venue: 'Fuly Community Center',
  address: 'Boro Kalibari Road, Tangail',
  time: '1:30 PM',
  mapUrl: 'https://maps.app.goo.gl/YfsEFfRXDD5bYeR28',
  albumUrl: 'https://drive.google.com/drive/folders/17H2Nh9EsEgSaUsoNmPfHL7mx8NskeYLO?usp=sharing'
};

const calendar = document.getElementById('calendar');
for (const day of ['S', 'M', 'T', 'W', 'T', 'F', 'S']) {
  const label = document.createElement('span');
  label.className = 'weekday'; label.textContent = day; calendar.append(label);
}
for (let i = 0; i < 2; i++) calendar.append(document.createElement('span'));
for (let day = 1; day <= 31; day++) {
  const cell = document.createElement('span'); cell.textContent = day;
  if (day === 18) {
    cell.className = 'wedding-date';
    cell.setAttribute('aria-label', '18 December, our wedding day');
    cell.insertAdjacentHTML('beforeend', '<svg class="date-sketch" viewBox="0 0 48 42" preserveAspectRatio="none" fill="none" aria-hidden="true"><path pathLength="1" d="M34 5C23 0 7 4 4 17C0 30 12 39 25 38C39 39 47 28 44 16C42 7 29 2 18 5C8 7 3 16 5 26C7 34 20 39 33 35"/></svg>');
  }
  calendar.append(cell);
}

function updateCountdown() {
  const remaining = Math.max(0, new Date(wedding.date).getTime() - Date.now());
  const seconds = Math.floor(remaining / 1000);
  const values = { days: Math.floor(seconds / 86400), hours: Math.floor(seconds / 3600) % 24, minutes: Math.floor(seconds / 60) % 60, seconds: seconds % 60 };
  for (const [id, value] of Object.entries(values)) document.getElementById(id).textContent = String(value).padStart(2, '0');
  if (!remaining) document.getElementById('countdown-note').textContent = 'Our forever began on 18 December 2026. Thank you for celebrating with us.';
}
updateCountdown(); setInterval(updateCountdown, 1000);

for (const [key, id] of [['venue', 'venue-name'], ['address', 'venue-address'], ['time', 'venue-time']]) {
  if (wedding[key]) document.getElementById(id).textContent = wedding[key];
}
if (wedding.venue && wedding.address && wedding.time) document.getElementById('venue-note').hidden = true;
for (const [key, linkId, noteId] of [['mapUrl', 'map-link', null], ['albumUrl', 'album-link', null]]) {
  if (/^https:\/\//.test(wedding[key])) { const link = document.getElementById(linkId); link.href = wedding[key]; link.hidden = false; link.removeAttribute('aria-disabled'); if (noteId) document.getElementById(noteId).hidden = true; }
}
if ('IntersectionObserver' in window) {
  document.documentElement.classList.add('js');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(section => observer.observe(section));
}
