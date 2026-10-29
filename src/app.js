
import { WORLDS, ACTIVITIES } from "./content.js";

// ==========================================
// KUSI KIDS AI - MOTOR PRINCIPAL
// Plataforma educativa para 4 a 6 años
// ==========================================

const $ = (selector) => document.querySelector(selector);

const STORAGE_KEY = "kusi-kids-progress-v1";

const initial = {
  completed: {},
  attempts: [],
  sound: true,
  name: "Explorador",
  large: false
};

function loadProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    return {
      ...initial,
      ...saved,
      completed: saved.completed || {},
      attempts: Array.isArray(saved.attempts) ? saved.attempts : []
    };
  } catch {
    return { ...initial };
  }
}

let store = loadProgress();

const state = {
  page: "home",
  world: null,
  activity: null,
  answer: null,
  feedback: false,
  hint: false,
  wrong: 0,
  counted: [],
  showCelebration: false,
  showStory: true
};

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    console.warn("No se pudo guardar el progreso local.");
  }
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[c]);
}

const completedCount = () => Object.keys(store.completed).length;

const getActivity = () =>
  ACTIVITIES.find((a) => a.id === state.activity);

const getWorld = () =>
  WORLDS.find((w) => w.id === state.world);

function activityList(worldId) {
  return ACTIVITIES.filter((a) => a.world === worldId);
}

function percent(done, total) {
  return total ? Math.round((done / total) * 100) : 0;
}

// ==========================================
// VOZ DE KUSI
// ==========================================

let speaking = false;

function speak(text) {
  if (!store.sound || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(
    String(text).replace(/[⭐🍎🔴🔵🌈✨🎉]/g, "")
  );

  speech.lang = "es-PE";
  speech.rate = 0.82;
  speech.pitch = 1.1;
  speech.volume = 1;

  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find((v) =>
    v.lang.toLowerCase().startsWith("es")
  );

  if (spanishVoice) speech.voice = spanishVoice;

  speech.onstart = () => {
    speaking = true;
    document.querySelectorAll(".kusi-buddy").forEach((el) => {
      el.classList.add("is-speaking");
    });
  };

  const finish = () => {
    speaking = false;
    document.querySelectorAll(".kusi-buddy").forEach((el) => {
      el.classList.remove("is-speaking");
    });
  };

  speech.onend = finish;
  speech.onerror = finish;

  window.speechSynthesis.speak(speech);
}

function stopSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
  speaking = false;
}

function playKusiMessage() {
  const a = getActivity();
  if (!a) return;

  if (state.feedback && state.answer === a.correct) {
    speak((a.successTitle || "¡Excelente!") + ". " + a.explanation);
  } else if (state.hint || state.feedback) {
    speak(a.hint || "Observa cuidadosamente y vuelve a intentarlo.");
  } else {
    speak((a.mascotIntro || "Vamos a aprender juntos.") + " " + a.question);
  }
}

// ==========================================
// NAVEGACION
// ==========================================

function go(page, world = null) {
  stopSpeech();

  state.page = page;
  state.world = world;
  state.activity = null;
  state.answer = null;
  state.feedback = false;
  state.hint = false;
  state.showCelebration = false;

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function start(activity) {
  if (!activity) return;

  stopSpeech();

  state.page = "activity";
  state.world = activity.world;
  state.activity = activity.id;
  state.answer = null;
  state.feedback = false;
  state.hint = false;
  state.wrong = 0;
  state.counted = [];
  state.showCelebration = false;
  state.showStory = true;

  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================
// BARRA DE NAVEGACION
// ==========================================

function nav() {
  return `
    <header class="topbar">
      <a href="#inicio" class="logo" data-go="home">
        <span class="logo-mark">K<span>✦</span></span>
        <span>
          KUSI <b>KIDS</b>
          <small>APRENDE A TU RITMO</small>
        </span>
      </a>

      <nav aria-label="Navegación principal">
        <button class="nav-link ${state.page === "home" ? "active" : ""}"
          data-go="home">Inicio</button>
        <button class="nav-link ${["worlds", "world", "activity"].includes(state.page) ? "active" : ""}"
          data-go="worlds">Explorar mundos</button>
        <button class="nav-link ${state.page === "progress" ? "active" : ""}"
          data-go="progress">Mi progreso</button>
        <button class="nav-link ${state.page === "teacher" ? "active" : ""}"
          data-go="teacher">Docentes</button>
        <button class="nav-link ${state.page === "family" ? "active" : ""}"
          data-go="family">Familias</button>
      </nav>

      <div class="nav-actions">
        <button id="sound" class="icon-button"
          title="Activar o desactivar narración"
          aria-label="Activar o desactivar narración">
          ${store.sound ? "🔊" : "🔇"}
        </button>
        <button class="pill mini" data-go="worlds">
          Comenzar ↗
        </button>
      </div>
    </header>
  `;
}

function footer() {
  return `
    <footer class="footer">
      <span class="logo-mark tiny">K</span>
      <div>
        <b>KUSI KIDS AI</b>
        <p>Pequeños descubrimientos, grandes comienzos.</p>
      </div>
      <span class="footer-note">
        Educación inicial · 4 a 6 años ·
        Progreso local · Actividades con acompañamiento adulto
      </span>
    </footer>
  `;
}

// ==========================================
// PERSONAJE KUSI
// ==========================================

function mascotFace(mood = "happy") {
  return `
    <div class="kusi-mini" data-mood="${mood}" aria-hidden="true">
      <i class="ear left"></i>
      <i class="ear right"></i>

      <div class="kusi-mini-face">
        <i class="eye left"></i>
        <i class="eye right"></i>
        <i class="cheek left"></i>
        <i class="cheek right"></i>
        <i class="mouth"></i>
      </div>
    </div>
  `;
}

function kusiBuddy(message, mood = "happy") {
  return `
    <div class="kusi-buddy ${mood}">
      <div class="kusi-avatar" title="Tu amigo Kusi">
        ${mascotFace(mood)}
        <span class="kusi-sparkle">✨</span>
      </div>

      <div class="kusi-talk">
        <b>🐾 ¡Kusi te acompaña!</b>
        <p aria-live="polite">${escapeHtml(message)}</p>

        <div class="kusi-buttons">
          <button class="kusi-voice" id="kusi-say">
            🔊 Escúchame
          </button>
          <button class="kusi-voice" id="kusi-tip">
            💡 Dame una pista
          </button>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// INICIO
// ==========================================

function heroArt() {
  return `
    <div class="hero-visual">
      <div class="sun">☀</div>
      <div class="cloud c1">☁</div>
      <div class="cloud c2">☁</div>
      <div class="island-back"></div>
      <div class="arc a1"></div>
      <div class="arc a2"></div>

      <div class="floating f1">🔤</div>
      <div class="floating f2">⭐</div>
      <div class="floating f3">🎨</div>
      <div class="floating f4">🔢</div>

      <div class="mascot">
        <div class="mascot-ears"><i></i><i></i></div>
        <div class="mascot-face">
          <i class="eye"></i>
          <i class="eye"></i>
          <span class="nose">●</span>
          <span class="smile">⌣</span>
        </div>
        <div class="mascot-body"></div>
        <div class="mascot-feet"><i></i><i></i></div>
      </div>

      <div class="island-front"></div>
      <div class="mini-label">¡Hola, soy Kusi! ✨</div>
    </div>
  `;
}

function home() {
  return `
    <section class="hero">
      <div class="hero-copy">
        <div class="eyebrow">
          ✦ UNA NUEVA FORMA DE DESCUBRIR EL MUNDO
        </div>

        <h1>
          Aprender es una
          <em>gran aventura</em>
          <span class="spark">✳</span>
        </h1>

        <p>
          Descubre ocho mundos de aprendizaje con cuentos,
          desafíos, juegos interactivos y un amigo muy especial:
          ¡Kusi!
        </p>

        <div class="hero-buttons">
          <button class="pill primary" data-go="worlds">
            🚀 ¡Comenzar mi aventura!
          </button>
          <button class="pill secondary" data-go="teacher">
            Soy docente →
          </button>
        </div>

        <div class="hero-trust">
          <span>💜</span>
          <div>
            <b>Aprender con alegría</b>
            <small>Para niñas y niños de 4 a 6 años.</small>
          </div>
        </div>
      </div>

      ${heroArt()}
    </section>

    <section class="metrics">
      <div><b>8</b><span>mundos mágicos</span></div>
      <div><b>${ACTIVITIES.length}</b><span>aventuras educativas</span></div>
      <div><b>${completedCount()}</b><span>retos realizados</span></div>
      <div><b>4–6</b><span>años de edad</span></div>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <span class="kicker">EL UNIVERSO DE KUSI</span>
          <h2>Ocho mundos para <em>descubrir</em></h2>
          <p>Cada mundo fortalece una habilidad diferente.</p>
        </div>
        <button class="text-button" data-go="worlds">
          Explorar todos →
        </button>
      </div>

      <div class="world-grid">
        ${WORLDS.slice(0, 4).map(worldCard).join("")}
      </div>
    </section>

    <section class="teacher-banner">
      <div class="banner-icon">🌟</div>
      <div>
        <span class="kicker">CADA INTENTO CUENTA</span>
        <h2>Aprendemos, practicamos y descubrimos.</h2>
        <p>
          Kusi explica, ofrece pistas y acompaña el progreso
          del niño sin cronómetros ni castigos.
        </p>
      </div>
      <button class="pill light" data-go="progress">
        Mi progreso →
      </button>
    </section>

    <section class="section">
      <div class="section-head">
        <div>
          <span class="kicker">APRENDER JUNTOS</span>
          <h2>Una experiencia para toda la familia</h2>
        </div>
      </div>

      <div class="feature-grid">
        <article class="feature">
          <div>🧒</div>
          <h3>Modo niño</h3>
          <p>Explorar, escuchar y resolver desafíos.</p>
        </article>
        <article class="feature">
          <div>👩‍🏫</div>
          <h3>Modo docente</h3>
          <p>Consultar actividades y refuerzos educativos.</p>
        </article>
        <article class="feature">
          <div>🏡</div>
          <h3>Modo familia</h3>
          <p>Continuar aprendiendo fuera de la pantalla.</p>
        </article>
      </div>
    </section>
  `;
}

// ==========================================
// OCHO MUNDOS
// ==========================================

function worldCard(world) {
  const activities = activityList(world.id);
  const done = activities.filter((a) => store.completed[a.id]).length;
  const progressValue = percent(done, activities.length);

  return `
    <button class="world-card magical-world"
      data-world="${world.id}"
      style="--world:${world.color}">
      <span class="world-decoration">✨</span>

      <div class="world-art">
        <span>${world.emoji}</span>
        <i></i>
      </div>

      <div class="world-data">
        <small>${escapeHtml(world.area)}</small>
        <h3>${escapeHtml(world.title)}</h3>
        <p>${escapeHtml(world.description)}</p>

        <div class="world-bottom">
          <span>⭐ ${done}/${activities.length} aventuras</span>
          <span class="go-circle">↗</span>
        </div>

        <div class="track">
          <div style="width:${progressValue}%;background:${world.color}"></div>
        </div>
      </div>
    </button>
  `;
}

function worlds() {
  return `
    <section class="page-hero">
      <span class="kicker">EL MAPA DE LAS AVENTURAS</span>
      <h1>Elige tu próximo <em>mundo mágico</em> ✨</h1>
      <p>
        ¡Kusi te acompañará en cada descubrimiento!
        Explora los mundos a tu ritmo.
      </p>
    </section>

    <section class="section narrow-top">
      <div class="world-grid">
        ${WORLDS.map(worldCard).join("")}
      </div>
    </section>
  `;
}

// ==========================================
// LISTADO DE AVENTURAS
// ==========================================

function worldPage() {
  const world = getWorld();
  if (!world) return worlds();

  const activities = activityList(world.id);

  return `
    <section class="page-hero world-page-head"
      style="--world:${world.color}">
      <button class="back-link" data-go="worlds">
        ← Todos los mundos
      </button>

      <div class="world-hero-emoji">${world.emoji}</div>
      <span class="kicker">${escapeHtml(world.area)}</span>
      <h1>${escapeHtml(world.title)}</h1>
      <p>${escapeHtml(world.description)}</p>
    </section>

    <section class="section narrow-top">
      <div class="activity-grid">
        ${activities.map((a, index) => `
          <button class="activity-card magic-activity"
            data-start="${a.id}">

            <span class="activity-icon"
              style="--world:${world.color}">
              ${a.emoji}
            </span>

            <div>
              <small>
                AVENTURA ${String(index + 1).padStart(2, "0")}
                ${store.completed[a.id] ? "· ✓ REALIZADA" : ""}
              </small>

              <h3>${escapeHtml(a.title)}</h3>
              <p>
                ${escapeHtml(
                  a.skill || "Aprendizaje y exploración"
                )}
              </p>
            </div>

            <span class="go-circle">→</span>
          </button>
        `).join("")}
      </div>

      <div class="helper-note">
        💜 Cada aventura incluye acompañamiento de Kusi.
        Los adultos pueden ayudar sin responder por el niño.
      </div>
    </section>
  `;
}

// ==========================================
// ESCENARIOS VISUALES POR ÁREA
// ==========================================

function countingScene() {
  return `
    <div class="count-scene">
      <div class="count-stage">
        ${[1, 2, 3].map((n) => `
          <button class="count-fruit ${state.counted.includes(n) ? "counted" : ""}"
            data-fruit="${n}"
            aria-label="Contar manzana ${n}">
            🍎
            <span>${n}</span>
          </button>
        `).join("")}
      </div>
      <small>👆 Toca cada manzana para contarla.</small>
    </div>
  `;
}

function visualQuestion(a) {
  if (a.id === "a05") return countingScene();

  const scenes = {
    a01: ["👧", "🌱", "💧"],
    a02: ["🪑", "☀️", "🦆"],
    a03: ["🐱", "🦆", "🌙"],
    a04: ["🌱", "💧", "🌿"],
    a06: ["⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐"],
    a07: ["🔴", "🔵", "🔴", "🔵", "❔"],
    a08: ["🔺", "🟠", "🟦"],
    a09: ["🌱", "💧", "☀️"],
    a10: ["🐟", "🐱", "🐔"],
    a11: ["👂", "👀", "👃"],
    a12: ["☀️", "🌧️", "☁️"],
    a13: ["😊", "😠", "😨"],
    a14: ["🤝", "💜", "🌈"],
    a15: ["🧒", "👧", "🧸"],
    a16: ["😠", "🌬️", "😌"],
    a17: ["🧦", "🧦", "👟"],
    a18: ["🍌", "🍌", "🍎"],
    a19: ["🟣", "🟦", "🟣"],
    a20: ["🟡", "🔵", "🔴"],
    a21: ["🔵", "🟡", "🟢"],
    a22: ["👏", "👏", "🤫"],
    a23: ["☁️", "🐟", "🌈"],
    a24: ["🖍️", "🎨", "📄"],
    a25: ["🫧", "👐", "💧"],
    a26: ["🧸", "🧺", "✨"],
    a27: ["🪥", "🦷", "✨"],
    a28: ["🚦", "🚶", "🤝"],
    a29: ["🙌", "⬆️", "🌤️"],
    a30: ["👣", "➡️", "🌟"],
    a31: ["🦩", "🦶", "💪"],
    a32: ["🎶", "💃", "🕺"]
  };

  const symbols = scenes[a.id] || [a.emoji, "✨", "🌟"];

  return `
    <div class="kusi-visual-scene"
      style="--world:${getWorld()?.color || "#7865ed"}">
      <div class="kusi-scene-stars" aria-hidden="true">
        ✨ ⭐ ✨
      </div>

      <div class="kusi-scene-objects">
        ${symbols.map((symbol, index) => `
          <span class="kusi-scene-item"
            style="animation-delay:${index * 0.15}s">
            ${symbol}
          </span>
        `).join("")}
      </div>

      <div class="kusi-scene-floor"></div>
    </div>
  `;
}

// ==========================================
// RESPUESTAS VISUALES
// ==========================================

const OPTION_IMAGES = {
  a01: ["🌱", "🎩", "⚽"],
  a02: ["🪑", "☀️", "🦆"],
  a03: ["🦆", "🪑", "🌙"],
  a04: ["🌱", "💧", "🍎"],
  a05: ["2️⃣", "3️⃣", "4️⃣"],
  a06: ["⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐"],
  a07: ["🔴", "🔵", "🟡"],
  a08: ["🔺", "🟠", "🟦"],
  a09: ["💧☀️", "🧸", "👟"],
  a10: ["🐟", "🐱", "🐔"],
  a11: ["👂", "💪", "🦵"],
  a12: ["🌧️", "🏜️", "🌙"],
  a13: ["😊", "😠", "😨"],
  a14: ["🤝", "😡", "📚"],
  a15: ["🤲", "🧸", "📣"],
  a16: ["🌬️", "🪑", "📄"],
  a17: ["🧦", "👟", "🥄"],
  a18: ["🍎", "🍌", "🍌"],
  a19: ["🟦", "🟣", "🔺"],
  a20: ["🟡", "🔵", "🔴"],
  a21: ["🟢", "🌸", "🟤"],
  a22: ["👏", "🦘", "😴"],
  a23: ["📖", "☁️", "🙈"],
  a24: ["🖍️", "👟", "🪥"],
  a25: ["👐", "🧸", "🚫"],
  a26: ["🧺", "🧸", "🛏️"],
  a27: ["🦷", "🧸", "🎨"],
  a28: ["🤝", "🏃", "🙈"],
  a29: ["⬆️", "⬇️", "↩️"],
  a30: ["➡️", "😴", "⬅️"],
  a31: ["🦩", "🏃", "🪑"],
  a32: ["💃", "🙈", "🔊"]
};

function optionCard(a, option, index) {
  const image = OPTION_IMAGES[a.id]?.[index] || "✨";
  const selected = state.answer === index;

  return `
    <button class="option kusi-answer ${selected ? "selected" : ""}"
      data-answer="${index}"
      ${state.feedback ? "disabled" : ""}
      aria-pressed="${selected}">
      <span class="kusi-option-image">${image}</span>
      <strong>${escapeHtml(option)}</strong>
      <span class="kusi-option-check">
        ${selected ? "✓" : "○"}
      </span>
    </button>
  `;
}

// ==========================================
// RECOMPENSAS Y RETROALIMENTACION
// ==========================================

function celebration() {
  return `
    <div class="kusi-celebration" aria-label="Celebración">
      <div class="kusi-celebration-icons">
        🎉 ⭐ 🌟 🎊 ⭐
      </div>
      <strong>¡Lo conseguiste!</strong>
      <p>Una aventura más en tu camino.</p>
    </div>
  `;
}

function feedbackBlock(a) {
  if (!state.feedback) return "";

  const correct = state.answer === a.correct;

  if (correct) {
    return `
      ${celebration()}
      <div class="feedback correct" role="status">
        <b>🎉 ${escapeHtml(
          a.successTitle || "¡Excelente trabajo!"
        )}</b>
        <p>${escapeHtml(a.explanation)}</p>
      </div>
    `;
  }

  return `
    <div class="feedback retry" role="status">
      <b>💜 ${escapeHtml(
        a.retryTitle || "¡Vamos a intentarlo otra vez!"
      )}</b>
      <p>${escapeHtml(
        a.hint ||
        "Observa las imágenes y escucha nuevamente."
      )}</p>
    </div>
  `;
}

function getBuddyMessage(a) {
  if (state.feedback && state.answer === a.correct) {
    return a.successTitle || "¡Lo lograste!";
  }

  if (state.feedback) {
    return "¡Seguimos aprendiendo! " +
      (a.hint || "Vamos a mirar otra vez.");
  }

  if (state.hint) {
    return a.hint || "Observa cuidadosamente.";
  }

  return a.mascotIntro ||
    "¡Hola! Escucha la pregunta y vamos a descubrir la respuesta.";
}

// ==========================================
// PANTALLA PRINCIPAL DE ACTIVIDAD
// ==========================================

function activityPage() {
  const a = getActivity();
  const world = getWorld();

  if (!a || !world) return worlds();

  const activities = activityList(a.world);
  const index = activities.findIndex((item) => item.id === a.id);
  const correct = state.feedback && state.answer === a.correct;
  const percentage = percent(index + 1, activities.length);

  return `
    <section class="play-shell kusi-play-world"
      style="--world:${world.color}">

      <button class="back-link" data-world="${world.id}">
        ← Volver a ${escapeHtml(world.title)}
      </button>

      <div class="play-panel upgraded-play">

        <div class="play-top">
          <span class="kicker">
            ${world.emoji} ${escapeHtml(world.area)}
          </span>

          <span class="level">
            ⭐ Aventura ${index + 1} de ${activities.length}
          </span>
        </div>

        <div class="kusi-level-track">
          <div style="width:${percentage}%"></div>
        </div>

        ${kusiBuddy(
          getBuddyMessage(a),
          correct ? "celebrate" : state.feedback ? "thinking" : "happy"
        )}

        <div class="activity-center">

          ${visualQuestion(a)}

          <div class="play-emoji" style="display:none">
            ${a.emoji}
          </div>

          <span class="kicker">
            ${escapeHtml(a.skill || "Aprendiendo con Kusi")}
          </span>

          <h1>${escapeHtml(a.title)}</h1>

          <p class="question">
            ${escapeHtml(a.question)}
          </p>

          <button class="speak-btn" id="repeat">
            🔊 Escuchar la pregunta
          </button>

          ${state.hint && !state.feedback ? `
            <div class="hint-box">
              💡 ${escapeHtml(a.hint || "Observa con calma.")}
            </div>
          ` : ""}

          <div class="options playful-options">
            ${a.options.map(
              (option, i) => optionCard(a, option, i)
            ).join("")}
          </div>

          ${feedbackBlock(a)}

          <div class="play-actions">
            ${!state.feedback ? `
              <button class="pill secondary" id="hint">
                💡 Necesito una pista
              </button>

              <button class="pill primary" id="check"
                ${state.answer === null ? "disabled" : ""}>
                ✨ Comprobar respuesta
              </button>
            ` : correct ? `
              <button class="pill secondary" id="try-again">
                🔁 Practicar otra vez
              </button>

              <button class="pill primary" id="next">
                🚀 Siguiente aventura
              </button>
            ` : `
              <button class="pill secondary" id="hint-retry">
                💡 Escuchar una pista
              </button>

              <button class="pill primary" id="try-again">
                🌈 Volver a intentarlo
              </button>
            `}
          </div>
        </div>
      </div>

      <p class="safety-note">
        🌼 Cada niño aprende a su propio ritmo.
        Sin cronómetros, castigos ni comparaciones.
      </p>
    </section>
  `;
}

// ==========================================
// PROGRESO Y RESULTADOS
// ==========================================

function progressData() {
  return WORLDS.map((world) => {
    const activities = activityList(world.id);
    const done = activities.filter(
      (a) => store.completed[a.id]
    ).length;

    const attempts = store.attempts.filter(
      (x) => x.world === world.id
    );

    return {
      ...world,
      done,
      total: activities.length,
      tries: attempts.length,
      success: attempts.filter((a) => a.correct).length
    };
  });
}

function progressRows() {
  return progressData().map((world) => `
    <div class="progress-row">
      <span class="progress-emoji">${world.emoji}</span>

      <div class="progress-info">
        <div>
          <b>${escapeHtml(world.area)}</b>
          <small>${world.done}/${world.total}</small>
        </div>

        <div class="track">
          <div style="
            width:${percent(world.done, world.total)}%;
            background:${world.color}">
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

function progress() {
  const rows = progressData();

  return `
    <section class="dashboard-head">
      <div>
        <span class="kicker">MI GRAN AVENTURA</span>
        <h1>¡Mira cuánto has <em>descubierto!</em></h1>
        <p>Todos tus avances permanecen en este navegador.</p>
      </div>
      <div class="stat-icon">🏆</div>
    </section>

    <section class="section narrow-top">
      <div class="stats-grid">
        <div class="stat">
          <span>Aventuras completadas</span>
          <b>${completedCount()}
            <small>/${ACTIVITIES.length}</small>
          </b>
          <p>Actividades diferentes realizadas</p>
        </div>

        <div class="stat">
          <span>Intentos registrados</span>
          <b>${store.attempts.length}</b>
          <p>¡Cada intento cuenta!</p>
        </div>

        <div class="stat">
          <span>Mundos explorados</span>
          <b>${rows.filter((x) => x.done > 0).length}
            <small>/8</small>
          </b>
          <p>Universos con actividades completadas</p>
        </div>
      </div>

      <div class="panel">
        <div class="panel-heading">
          <h2>🌈 Mis mundos</h2>
          <span>Progreso local</span>
        </div>
        ${progressRows()}
      </div>

      <div class="helper-note">
        🧠 Estos resultados indican actividades realizadas,
        no una evaluación oficial de preparación para primaria.
      </div>

      <div class="end-actions">
        <button class="pill primary" data-go="worlds">
          🚀 Seguir aprendiendo
        </button>

        <button class="pill outline" id="clear">
          Borrar progreso local
        </button>
      </div>
    </section>
  `;
}

// ==========================================
// PANEL DOCENTE
// ==========================================

function teacher() {
  const rows = progressData();

  const needs = rows.filter((w) => w.tries > 0).sort(
    (a, b) =>
      (a.success / a.tries) - (b.success / b.tries)
  );

  return `
    <section class="dashboard-head">
      <div>
        <span class="kicker">ESPACIO PARA DOCENTES</span>
        <h1>Enseñar es acompañar cada <em>descubrimiento</em></h1>
        <p>
          Visualiza las actividades realizadas y encuentra
          oportunidades de refuerzo.
        </p>
      </div>
      <div class="stat-icon">👩‍🏫</div>
    </section>

    <section class="section narrow-top">
      <div class="demo-alert">
        ℹ️ Los resultados locales reflejan este navegador.
        Los perfiles de ejemplo son ficticios.
      </div>

      <div class="stats-grid">
        <div class="stat">
          <span>Actividades completadas</span>
          <b>${completedCount()}</b>
          <p>Actividades diferentes</p>
        </div>

        <div class="stat">
          <span>Intentos</span>
          <b>${store.attempts.length}</b>
          <p>Respuestas registradas</p>
        </div>

        <div class="stat">
          <span>Áreas exploradas</span>
          <b>${rows.filter((w) => w.tries > 0).length}
            <small>/8</small>
          </b>
          <p>Áreas con intentos registrados</p>
        </div>
      </div>

      <div class="panel">
        <h2>Seguimiento por áreas</h2>
        ${progressRows()}
      </div>

      <div class="panel">
        <h2>Recomendaciones pedagógicas</h2>

        <div class="recommendation-grid">
          <article>
            📚
            <b>Comunicación</b>
            <p>Escuchar cuentos y conversar sobre las historias.</p>
          </article>

          <article>
            🧮
            <b>Matemática</b>
            <p>Contar objetos reales, agrupar y comparar.</p>
          </article>

          <article>
            💜
            <b>Emociones</b>
            <p>Jugar a representar sentimientos y situaciones.</p>
          </article>
        </div>

        ${needs.length ? `
          <div class="helper-note">
            💡 Área que conviene revisar según los intentos:
            <b>${escapeHtml(needs[0].area)}</b>.
            Esta sugerencia no constituye un diagnóstico.
          </div>
        ` : ""}
      </div>

      <div class="end-actions">
        <button class="pill secondary" id="print">
          🖨 Imprimir resumen
        </button>

        <button class="pill primary" data-go="worlds">
          Explorar actividades →
        </button>
      </div>
    </section>
  `;
}

// ==========================================
// PANEL FAMILIAR
// ==========================================

function family() {
  const ideas = [
    ["📚", "Cuentos en familia",
      "Lean juntos y conversen sobre los personajes."],
    ["🍎", "Contemos en casa",
      "Cuenten frutas, cucharas o juguetes."],
    ["🌿", "Exploradores",
      "Observen una planta y conversen sobre sus cambios."],
    ["😊", "Hablemos de emociones",
      "Cuenten cómo se sintieron durante el día."],
    ["🎨", "Artistas",
      "Dibujen una historia y explíquenla."],
    ["🤸", "Movimiento",
      "Bailen y practiquen movimientos con supervisión."],
    ["🪥", "Mis hábitos",
      "Practiquen rutinas de higiene y orden."],
    ["🧩", "Pequeños retos",
      "Clasifiquen objetos por color, tamaño y forma."]
  ];

  return `
    <section class="dashboard-head">
      <div>
        <span class="kicker">FAMILIAS QUE APRENDEN JUNTAS</span>
        <h1>Aprendemos también <em>en casa</em></h1>
        <p>
          Actividades cotidianas para acompañar lo aprendido
          sin depender de pantallas.
        </p>
      </div>
      <div class="stat-icon">🏡</div>
    </section>

    <section class="section narrow-top">
      <div class="family-grid">
        ${ideas.map((idea, i) => `
          <article class="family-card">
            <span>${idea[0]}</span>
            <small>ACTIVIDAD ${i + 1}</small>
            <h3>${idea[1]}</h3>
            <p>${idea[2]}</p>
          </article>
        `).join("")}
      </div>

      <div class="panel">
        <h2>💜 Acompaña sin presionar</h2>
        <p>
          Escucha al niño, permite que explique sus ideas,
          celebra el esfuerzo y respeta sus tiempos.
          Los juegos digitales complementan las experiencias reales.
        </p>
      </div>

      <button class="pill primary" data-go="worlds">
        Explorar aventuras →
      </button>
    </section>
  `;
}

// ==========================================
// RENDER PRINCIPAL
// ==========================================

function render() {
  const pages = {
    home,
    worlds,
    world: worldPage,
    activity: activityPage,
    progress,
    teacher,
    family
  };

  const page = pages[state.page] || home;

  $("#app").innerHTML = `
    ${nav()}
    <main id="main">${page()}</main>
    ${footer()}
  `;

  document.title = "KUSI KIDS AI | Aprende a tu ritmo";
}

// ==========================================
// RESPUESTAS Y APRENDIZAJE
// ==========================================

function checkAnswer() {
  const a = getActivity();
  if (!a || state.answer === null || state.feedback) return;

  const correct = state.answer === a.correct;

  store.attempts.push({
    activity: a.id,
    world: a.world,
    correct,
    date: new Date().toISOString()
  });

  // Solo se considera completada cuando hay acierto.
  if (correct) {
    store.completed[a.id] = true;
  } else {
    state.wrong++;
  }

  save();

  state.feedback = true;
  state.showCelebration = correct;

  render();

  if (correct) {
    speak((a.successTitle || "¡Muy bien!") + ". " + a.explanation);
  } else {
    speak(
      "Vamos a intentarlo nuevamente. " +
      (a.hint || "Observa y escucha con calma.")
    );
  }
}

function nextActivity() {
  const current = getActivity();
  if (!current) return;

  const activities = activityList(current.world);

  let next = activities.find(
    (a) => !store.completed[a.id] && a.id !== current.id
  );

  if (!next) {
    const index = activities.findIndex(
      (a) => a.id === current.id
    );
    next = activities[(index + 1) % activities.length];
  }

  start(next);
}

function retryActivity() {
  state.feedback = false;
  state.answer = null;
  state.hint = false;
  state.counted = [];
  state.showCelebration = false;
  render();
}

function showHint() {
  const a = getActivity();
  if (!a) return;

  state.hint = true;
  state.feedback = false;
  state.answer = null;

  render();
  speak(a.hint || "Observa con calma y vuelve a intentarlo.");
}

// ==========================================
// EVENTOS
// ==========================================

document.addEventListener("click", (event) => {
  const target = event.target.closest(
    "button, a[data-go]"
  );

  if (!target) return;

  if (target.dataset.go) {
    event.preventDefault();
    go(target.dataset.go);
    return;
  }

  if (target.dataset.world) {
    go("world", target.dataset.world);
    return;
  }

  if (target.dataset.start) {
    start(ACTIVITIES.find(
      (a) => a.id === target.dataset.start
    ));
    return;
  }

  if (target.id === "sound") {
    store.sound = !store.sound;
    save();
    if (!store.sound) stopSpeech();
    render();
    return;
  }

  if (target.id === "repeat") {
    const a = getActivity();
    if (a) speak(a.question);
    return;
  }

  if (target.id === "kusi-say") {
    playKusiMessage();
    return;
  }

  if (target.id === "kusi-tip" ||
      target.id === "hint" ||
      target.id === "hint-retry") {
    showHint();
    return;
  }

  if (target.dataset.fruit) {
    const number = Number(target.dataset.fruit);

    if (!state.counted.includes(number)) {
      state.counted.push(number);
      render();
      speak(String(state.counted.length));
    }
    return;
  }

  if (target.dataset.answer !== undefined) {
    if (state.feedback) return;
    state.answer = Number(target.dataset.answer);
    render();
    return;
  }

  if (target.id === "check") {
    checkAnswer();
    return;
  }

  if (target.id === "try-again") {
    retryActivity();
    return;
  }

  if (target.id === "next") {
    nextActivity();
    return;
  }

  if (target.id === "clear") {
    if (window.confirm(
      "¿Borrar el progreso guardado en este navegador?"
    )) {
      store = {
        ...initial,
        completed: {},
        attempts: []
      };
      save();
      render();
    }
    return;
  }

  if (target.id === "print") {
    window.print();
  }
});

// ==========================================
// INICIALIZACION
// ==========================================

render();
