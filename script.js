/* ===== AI-RehabX interactions =====
   1. Mobile menu  2. System-flow explorer  3. Live demo  4. AI chatbot
   To teach the chatbot new answers, edit the KNOWLEDGE array below. */

/* ---------- 1. Mobile menu ---------- */
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
navLinks.addEventListener('click', () => navLinks.classList.remove('open'));

/* ---------- 2. System flow explorer ---------- */
const FLOW = [
  ['Camera captures movement and posture. Wearable sensors track vital data like heart rate and temperature.'],
  ['AI processes sensor and video data, detects injury signs and movement errors, and assesses risk in real time.'],
  ['Generates a custom rehab plan, sets exercise routine and intensity, and adapts to progress and recovery stage.'],
  ['Real-time posture and movement guidance with visual and audio feedback. Corrects form and reduces risk.'],
  ['Tracks recovery progress, measures performance and mobility, and updates the plan as needed.'],
  ['Evaluates readiness with data, prevents re-injury and supports a safe return to sports.'],
  ['Stronger athletes, fewer injuries and long-term health and success.']
];
const flowBtns = document.querySelectorAll('#flowList button');
const flowDetail = document.getElementById('flowDetail');
function showFlow(i) {
  flowBtns.forEach((b, n) => b.setAttribute('aria-pressed', n === i));
  flowDetail.textContent = FLOW[i][0];
}
flowBtns.forEach((b, i) => b.addEventListener('click', () => showFlow(i)));
showFlow(0);

/* ---------- 3. Live demo ---------- */
const angle = document.getElementById('angle');
const load = document.getElementById('load');
const PHASES = [
  { name: 'Acute (Week 1-2)', pct: 25, move: 'Quadriceps set, 3 x 10' },
  { name: 'Strengthening (Week 3-6)', pct: 50, move: 'Mini squat, 3 x 12' },
  { name: 'Functional (Week 7-10)', pct: 75, move: 'Ladder drill, 3 x 15' },
  { name: 'Return to play (Week 11+)', pct: 100, move: 'Sprint drill, 3 x 20 m' }
];
const phasesEl = document.getElementById('phases');
phasesEl.innerHTML = PHASES.map(p =>
  `<div class="phase"><b>${p.name}</b><small>${p.move}</small><div class="bar"><i style="width:${p.pct}%"></i></div></div>`).join('');

function analyze() {
  const a = +angle.value, l = +load.value;
  // Simple illustrative model: further from the normal 120 degrees + higher load = higher risk
  const risk = Math.min(98, Math.max(5, Math.round(Math.abs(120 - a) * 0.75 + l * 0.35)));
  const loadLabel = l > 66 ? 'High' : l > 33 ? 'Medium' : 'Low';
  document.getElementById('angleVal').textContent = a;
  document.getElementById('loadVal').textContent = loadLabel;
  document.getElementById('riskVal').textContent = risk + '%';
  const arc = document.getElementById('arc');
  arc.style.strokeDashoffset = 314 - 314 * risk / 100;
  arc.style.stroke = risk > 65 ? 'var(--warn)' : risk > 35 ? '#d9a21b' : 'var(--good)';
  const msg = risk > 65 ? 'High risk of knee strain detected. Reduce load and avoid deep bends.'
    : risk > 35 ? 'Movement shows slight asymmetry. Focus on balanced strengthening.'
    : 'Good form. Continue the current plan.';
  document.getElementById('riskMsg').textContent = msg;
  const idx = risk > 65 ? 0 : risk > 50 ? 1 : risk > 30 ? 2 : 3;
  document.querySelectorAll('.phase').forEach((el, i) => el.classList.toggle('on', i === idx));
  document.getElementById('phaseMsg').textContent = 'Suggested phase: ' + PHASES[idx].name;
}
['input', 'change'].forEach(e => { angle.addEventListener(e, analyze); load.addEventListener(e, analyze); });
document.getElementById('analyzeBtn').addEventListener('click', analyze);
analyze();

// Hero heart-rate flicker
const hr = document.getElementById('heroHr');
setInterval(() => { hr.textContent = 138 + Math.floor(Math.random() * 9); }, 1500);

/* ---------- 4. AI chatbot ---------- */
// Each entry: keywords the user might type -> answer. Add your own!
const KNOWLEDGE = [
  { keys: ['what is', 'about', 'rehabx', 'overview', 'introduce'],
    answer: 'AI-RehabX is an AI-powered smart system for real-time sports injury detection and personalized rehabilitation. It combines AI, wearable sensors and computer vision to help athletes recover faster, train smarter and perform better.' },
  { keys: ['solution', 'how does it work', 'work', 'approach'],
    answer: 'The solution has four parts working together:\n1. Camera monitors movement\n2. Wearable sensors track heart rate, motion and temperature\n3. AI analysis detects posture, angles and risk\n4. Personalized feedback gives guidance and progress reports.' },
  { keys: ['feature', 'features', 'capabilities', 'can it'],
    answer: 'Key features: AI injury detection and risk prediction, real-time posture and movement analysis, vital signs monitoring, personalized rehab guidance, real-time progress tracking and return-to-play assessment.' },
  { keys: ['flow', 'steps', 'process', 'stages'],
    answer: 'System flow: Data capture, AI analysis, Personalized plan, Guided rehabilitation, Progress tracking, Return to play, Better performance. A continuous feedback loop keeps improving the plan.' },
  { keys: ['hardware', 'sensor', 'device', 'esp32', 'imu', 'wearable', 'camera'],
    answer: 'Hardware: camera system, wearable sensors (heart rate, temperature, motion), an edge AI model on an ESP32 or microcontroller, an inertial measurement unit (joint angles, balance), a Wi-Fi/Bluetooth communication module and a rechargeable power supply.' },
  { keys: ['software', 'app', 'dashboard', 'cloud', 'algorithm'],
    answer: 'Software: AI algorithms for injury detection and risk prediction, a web/mobile dashboard with alerts, personalized rehab plans, secure cloud storage, an AI feedback system and analytics reports.' },
  { keys: ['demo', 'sample', 'output', 'knee', 'angle', 'risk'],
    answer: 'The sample output shows a knee angle of 68 degrees (normal is about 120), medium joint stability and an 82% risk score for the right knee. Try the Live demo section and drag the sliders to see it change.' },
  { keys: ['phase', 'rehab plan', 'plan', 'week', 'exercise'],
    answer: 'Sample rehab plan:\nAcute (Week 1-2): rest, ice, gentle range of motion\nStrengthening (Week 3-6): strength and balance\nFunctional (Week 7-10): agility and sport-specific work\nReturn to play (Week 11+): full range of motion and performance assessment.' },
  { keys: ['impact', 'benefit', 'why', 'advantage'],
    answer: 'Impact: faster recovery, better performance, injury prevention, personalized care, accessible monitoring in clinics, training centers and homes, and healthier long-term living for athletes.' },
  { keys: ['hackathon', 'theme', 'innovation', 'feasible'],
    answer: 'It fits a hackathon because it solves a real problem (late injury detection and generic rehab), uses emerging tech (AI, wearables, computer vision), creates social impact and is feasible with existing wearables and cameras.' },
  { keys: ['team', 'who', 'made', 'built', 'written', 'author', 'students'],
    answer: 'AI-RehabX was written by Dhaara Senthilkumar, Divya, Gowthami and Kowsalaya from AVS Engineering College (Autonomous).' },
  { keys: ['college', 'avs', 'university'],
    answer: 'AVS Engineering College (Autonomous) - Discipline, Excellence, Innovation.' },
  { keys: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
    answer: 'Hello! I can explain AI-RehabX, its features, hardware, software, demo or team. What would you like to know?' },
  { keys: ['thank', 'thanks'],
    answer: 'You are welcome! Smarter rehab. Healthier athletes. Stronger tomorrow.' }
];
const MEDICAL = ['pain', 'hurt', 'injured', 'diagnose', 'treatment', 'medicine', 'doctor', 'swelling'];
const FALLBACK = 'I can answer questions about AI-RehabX: features, system flow, hardware, software, demo, impact or the team. Try one of the suggestions below.';
const CHIPS = ['What is AI-RehabX?', 'Key features', 'Hardware used', 'Rehab plan phases', 'Who built this?'];

const fab = document.getElementById('chatFab');
const chat = document.getElementById('chat');
const body = document.getElementById('chatBody');
const form = document.getElementById('chatForm');
const input = document.getElementById('chatInput');
const chipsEl = document.getElementById('chips');

function addMsg(text, who) {
  const d = document.createElement('div');
  d.className = 'msg ' + who;
  d.textContent = text;
  body.appendChild(d);
  body.scrollTop = body.scrollHeight;
  return d;
}

function findAnswer(q) {
  q = q.toLowerCase();
  if (MEDICAL.some(w => q.includes(w)))
    return 'I cannot give medical advice or diagnose injuries. Please see a doctor or physiotherapist. AI-RehabX is designed to support professionals, not replace them.';
  let best = null, bestScore = 0;
  KNOWLEDGE.forEach(item => {
    const score = item.keys.reduce((s, k) => s + (q.includes(k) ? k.length : 0), 0);
    if (score > bestScore) { best = item; bestScore = score; }
  });
  return best ? best.answer : FALLBACK;
}

function ask(text) {
  text = text.trim();
  if (!text) return;
  addMsg(text, 'user');
  const typing = addMsg('Typing...', 'bot typing');
  setTimeout(() => { typing.remove(); addMsg(findAnswer(text), 'bot'); }, 600);
}

function openChat(open = true) {
  chat.hidden = !open;
  fab.setAttribute('aria-expanded', open);
  if (open) {
    if (!body.children.length) addMsg('Hi! I am the RehabX assistant. Ask me anything about the project.', 'bot');
    input.focus();
  }
}

CHIPS.forEach(c => {
  const b = document.createElement('button');
  b.type = 'button'; b.textContent = c;
  b.addEventListener('click', () => ask(c));
  chipsEl.appendChild(b);
});
fab.addEventListener('click', () => openChat(chat.hidden));
document.getElementById('chatClose').addEventListener('click', () => openChat(false));
form.addEventListener('submit', e => { e.preventDefault(); ask(input.value); input.value = ''; });
document.querySelectorAll('[data-ask]').forEach(b =>
  b.addEventListener('click', () => { openChat(true); ask(b.dataset.ask); }));
