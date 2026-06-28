/* ── Activity Log ── */
const LOG_ENTRIES = [
  "anon_7f2a sat by the fire",
  "dev_c19 typed 'help'",
  "juno snored loudly",
  "anon_3e8b joined the fire",
  "dev_4a1c ran status check",
  "anon_9d3f sent a confession",
  "dev_b72e opened juno terminal",
  "anon_5c6a is sitting quietly",
  "dev_01fa checked campfire logs",
  "juno rolled over in sleep",
  "anon_8e2d typed 'sit'",
  "dev_f3b1 stared at the flames",
  "anon_2c9e joined anonymously",
  "juno twitched in a dream",
  "dev_77ac ran a debug check",
];

let logPool = [...LOG_ENTRIES];

function fmtTime(d) {
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function pushLog(text, isNew = false) {
  const list = document.getElementById("logs-list");
  if (!list) return;

  const now = new Date();
  const li = document.createElement("li");
  li.className = "header-logs_entry" + (isNew ? " header-logs_entry--new" : "");
  li.innerHTML = `<span class="header-logs_time">[${fmtTime(now)}]</span>${text}`;

  list.appendChild(li);

  // Keep max 5 entries
  while (list.children.length > 5) list.removeChild(list.firstChild);
}

function initActivityLog() {
  // Seed with 4 past entries (offset times)
  const now = new Date();
  const seeds = [
    { offset: 14, text: "juno snored loudly" },
    { offset: 9,  text: "anon_3e8b joined the fire" },
    { offset: 4,  text: "dev_c19 ran status check" },
    { offset: 1,  text: "anon_7f2a sat by the fire" },
  ];
  seeds.forEach(({ offset, text }) => {
    const t = new Date(now - offset * 60 * 1000);
    const list = document.getElementById("logs-list");
    if (!list) return;
    const li = document.createElement("li");
    li.className = "header-logs_entry";
    li.style.opacity = "1";
    li.style.animation = "none";
    li.innerHTML = `<span class="header-logs_time">[${fmtTime(t)}]</span>${text}`;
    list.appendChild(li);
  });

  // Add a new log entry every 18–28 seconds
  function scheduleNext() {
    const delay = 18000 + Math.random() * 10000;
    setTimeout(() => {
      if (!logPool.length) logPool = [...LOG_ENTRIES];
      const idx = Math.floor(Math.random() * logPool.length);
      const text = logPool.splice(idx, 1)[0];
      pushLog(text, true);
      scheduleNext();
    }, delay);
  }
  scheduleNext();
}

function updateClock() {

  const el = document.getElementById("clock");
  if (!el) return;

  const now = new Date();
  el.textContent = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  const backdrop = document.querySelector(".nav-backdrop");
  if (!toggle || !nav || !backdrop) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
    backdrop.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    nav.classList.add("is-open");
    backdrop.classList.add("is-visible");
    backdrop.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    document.body.style.overflow = "hidden";
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  backdrop.addEventListener("click", closeMenu);

  nav.querySelectorAll(".nav_link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1100) closeMenu();
  });
}

const TERMINAL_PAGES = [
  [
    { text: "systemctl status campfire" },
    { text: "● loaded → developer_mode: on", className: "t-success" },
    { text: "└ init complete. hearts ready.", className: "t-indent t-dim" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "./confession.sh" }] },
    { text: "# Initializing...", className: "t-comment" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "whoami" }] },
    { text: "A fellow developer you met recently" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "status --verbose" }] },
    { text: "Overthinking: true", className: "t-success" },
    { text: "Nervous: definitely", className: "t-success" },
    { text: "Worth_the_risk: absolutely", className: "t-success" },
    { text: "# Here goes nothing...", className: "t-comment" },
  ],
  [
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git init new-friendship" }] },
    { text: "Initialized empty Git repository ☕", className: "t-success" },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "cat random-thoughts.md" }] },
    { text: "" },
    { text: "Honestly..." },
    { text: "" },
    { text: "I'm not really the type," },
    { text: "who talks to people first." },
    { text: "" },
    { text: "Most of the time, I just stay quiet," },
    { text: "work on projects, and disapper into my own little world." },
    { text: "" },
    { text: "But somehow, talking with you feels easy." },
    { text: "" },
    { text: "Like the kind of conversation" },
    { text: "that makes my brain slow down for once." },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git add random-thoughts.md" }] },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git commit -m \"trying to open up\"" }] },
  ],
  [
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "cat social-battery.log" }] },
    { text: "[INFO] introvert detected", className: "t-success" },
    { text: "[INFO] comfort level increasing", className: "t-success" },
    { text: "[INFO] user presence appreciated", className: "t-success" },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "cat why-im-doing-this.txt" }] },
    { text: "" },
    { text: "As developers, we spend so much time:" },
    { text: "" },
    { text: "  → fixing broken code", className: "t-dim" },
    { text: "  → talking to AI more than people", className: "t-dim" },
    { text: "  → staring at screens at 2AM", className: "t-dim" },
    { text: "  → pretending we're fine after 47 errors", className: "t-dim" },
    { text: "" },
    { text: "But finding someone" },
    { text: "who actually feels comfortable to talk to?" },
    { text: "" },
    { text: "That's rare.", className: "t-success" },
    { text: "" },
    { text: "And I think you're one of those people." },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git add comfort-zone.txt" }] },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git commit -m \"stepping outside my shell\"" }] },
  ],
  [
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "./friendship-proposal.sh" }] },
    { text: "" },
    { text: "  ☕ random conversations", className: "t-dim" },
    { text: "  💻 sharing project ideas", className: "t-dim" },
    { text: "  🌄 talking about life sometimes", className: "t-dim" },
    { text: "  🎮 sending memes at midnight", className: "t-dim" },
    { text: "  🔥 just... genuine friendship vibes", className: "t-dim" },
    { text: "" },
    { text: "No weird pressure." },
    { text: "No expectations." },
    { text: "" },
    { text: "Just two people" },
    { text: "getting to know each other." },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "echo \"sounds nice, right?\"" }] },
    { text: "sounds nice, right?", className: "t-success" },
  ],
  [
    { text: "exception: SocialAnxietyError", className: "t-error" },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "./recover.sh" }] },
    { text: "" },
    { text: "Ah." },
    { text: "Yeah that's fair." },
    { text: "" },
    { text: "Took me like 3 business days" },
    { text: "to even say all this." },
    { text: "" },
    { text: "But honestly?" },
    { text: "" },
    { text: "You seem like a really cool person," },
    { text: "and I didn't want to regret" },
    { text: "not trying to become friends." },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "retry_connection()" }] },
  ],
  [
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git revert friendship_attempt" }] },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "cat final-log.txt" }] },
    { text: "" },
    { text: "No worries." },
    { text: "" },
    { text: "I know friendships don't happen instantly." },
    { text: "" },
    { text: "But still," },
    { text: "I'm glad I tried talking to you." },
    { text: "" },
    { text: "You're genuinely easy to talk to," },
    { text: "and that's rare nowadays." },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git commit -m \"respecting boundaries\"" }] },
  ],
  [
    { text: "[main 1a2b3c4] CONNECTION ESTABLISHED", className: "t-success" },
    { text: "✓ friendship initialized successfully", className: "t-success" },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git commit -m \"new friendship unlocked\"" }] },
    { text: "[main 5d6e7f8] new friendship unlocked", className: "t-success" },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "friendship.log" }] },
    { text: "a92b1c shared random thoughts" },
    { text: "f83a2d exchanged memes" },
    { text: "d72f9e late night conversations" },
    { text: "c61e7a project discussions" },
    { text: "b50d6f comfortable silence achieved" },
    { text: "" },
    { text: "Honestly?" },
    { text: "This feels nice." },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "echo \"guess i made a new friend today.\"" }] },
    { text: "guess i made a new friend today.", className: "t-success" },
    { text: "" },
    { text: "☕ Looking forward to more conversations." },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "git push origin campfire-session" }] },
    { text: "✓ deployed successfully", className: "t-success" },
    { text: "" },
    { parts: [{ text: "$ ", className: "t-dim" }, { text: "exit" }] },
  ],
];

let terminalRunId = 0;
let currentPage = 0;

function sleep(ms, runId) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (runId !== terminalRunId) reject(new Error("aborted"));
      else resolve();
    }, ms);
  });
}

async function typeChar(lineEl, char, runId) {
  lineEl.textContent += char;
  await sleep(50 + Math.random() * 35, runId);
}

async function runTerminalTypewriter() {
  const output = document.getElementById("terminal-output");
  const runBtn = document.getElementById("terminal-run");
  if (!output || !runBtn) return;

  if (currentPage >= TERMINAL_PAGES.length) return;

  terminalRunId += 1;
  const runId = terminalRunId;

  const TERMINAL_LINES = TERMINAL_PAGES[currentPage];
  currentPage += 1;

  output.innerHTML = "";
  runBtn.disabled = true;
  runBtn.classList.add("is-running");
  runBtn.textContent = "> running...";

  try {
    for (const line of TERMINAL_LINES) {
      const p = document.createElement("p");
      if (line.className) p.className = line.className;
      output.appendChild(p);
      output.scrollTop = output.scrollHeight;

      if (line.parts) {
        for (const part of line.parts) {
          const span = document.createElement("span");
          if (part.className) span.className = part.className;
          p.appendChild(span);
          for (const char of part.text) {
            await typeChar(span, char, runId);
          }
        }
        await sleep(80, runId);
      } else {
        for (const char of line.text) {
          await typeChar(p, char, runId);
        }
        await sleep(80, runId);
      }
    }

    const cursorLine = document.createElement("p");
    cursorLine.innerHTML = '<span class="cursor" aria-hidden="true">█</span>';
    output.appendChild(cursorLine);
  } catch {
    return;
  } finally {
    if (runId === terminalRunId) {
      runBtn.disabled = false;
      runBtn.classList.remove("is-running");
      let btn2 = document.getElementById("terminal-run-alt");
      
      if (currentPage === 1 || currentPage === 2 || currentPage === 3) {
        runBtn.textContent = "> continue";
        if (btn2) btn2.style.display = "none";
      } else if (currentPage === 4) {
        // After friendship proposal page
        runBtn.textContent = "[ yeah actually ]";
        if (!btn2) {
          btn2 = document.createElement("button");
          btn2.id = "terminal-run-alt";
          btn2.type = "button";
          btn2.className = "terminal_run";
          btn2.textContent = "[ not really ]";
          runBtn.parentNode.insertBefore(btn2, runBtn.nextSibling);
        }
        btn2.textContent = "[ not really ]";
        btn2.onclick = () => { handleNotReally(); };
        btn2.style.display = "inline-block";
      } else if (currentPage === 5) {
        // After error recovery page
        runBtn.textContent = "[ maybe okay ]";
        if (!btn2) {
          btn2 = document.createElement("button");
          btn2.id = "terminal-run-alt";
          btn2.type = "button";
          btn2.className = "terminal_run";
          runBtn.parentNode.insertBefore(btn2, runBtn.nextSibling);
        }
        btn2.textContent = "[ still no ]";
        btn2.onclick = () => { handleStillNo(); };
        btn2.style.display = "inline-block";
      } else if (currentPage === 6) {
        // After git revert page
        runBtn.textContent = "[ wait actually okay ]";
        if (btn2) btn2.style.display = "none";
      } else if (currentPage === 7) {
        // End of story
        runBtn.textContent = "> session closed";
        runBtn.disabled = true;
        if (btn2) btn2.style.display = "none";
      }
    }
  }
}

function handleNotReally() {
  // Jump to error recovery page (page 4)
  currentPage = 4;
  runTerminalTypewriter();
}

function handleStillNo() {
  // Jump to git revert page (page 5)
  currentPage = 5;
  runTerminalTypewriter();
}

function handleYeahActually() {
  // Jump directly to success page (page 6)
  currentPage = 6;
  runTerminalTypewriter();
}

function handleMaybeOkay() {
  // Jump directly to success page (page 6)
  currentPage = 6;
  runTerminalTypewriter();
}

function handleWaitActuallyOkay() {
  // Jump directly to success page (page 6)
  currentPage = 6;
  runTerminalTypewriter();
}

function initTerminalTypewriter() {
  const runBtn = document.getElementById("terminal-run");
  if (!runBtn) return;

  runBtn.addEventListener("click", () => {
    // Check current page and call appropriate handler
    if (currentPage === 4) {
      // Proposal page - clicking main button means "yeah actually"
      handleYeahActually();
    } else if (currentPage === 5) {
      // Recovery page - clicking main button means "maybe okay"
      handleMaybeOkay();
    } else if (currentPage === 6) {
      // Revert page - clicking main button means "wait actually okay"
      handleWaitActuallyOkay();
    } else {
      // Default behavior for other pages
      runTerminalTypewriter();
    }
  });

  runTerminalTypewriter();
}

updateClock();
setInterval(updateClock, 30_000);
initMobileNav();
initTerminalTypewriter();
initActivityLog();



/* ════════════════════════════════
   Command Popup (help / status / sit / about)
   Never touches the main terminal.
   ════════════════════════════════ */

const cmdPopup        = document.getElementById("cmd-popup");
const cmdPopupOutput  = document.getElementById("cmd-popup-output");
const cmdPopupTitle   = document.getElementById("cmd-popup-title");
const cmdPopupClose   = document.getElementById("cmd-popup-close");
const cmdPopupOverlay = document.getElementById("cmd-popup-overlay");

function openCmdPopup(title, lines) {
  cmdPopupTitle.textContent = title;
  cmdPopupOutput.innerHTML = "";
  lines.forEach(({ text, className }) => {
    const p = document.createElement("p");
    if (className) p.className = className;
    p.textContent = text;
    cmdPopupOutput.appendChild(p);
  });
  const cur = document.createElement("p");
  cur.innerHTML = '<span class="cursor" aria-hidden="true">█</span>';
  cmdPopupOutput.appendChild(cur);
  cmdPopup.hidden = false;
}

function closeCmdPopup() { cmdPopup.hidden = true; }

cmdPopupClose.addEventListener("click", closeCmdPopup);
cmdPopupOverlay.addEventListener("click", closeCmdPopup);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCmdPopup(); });

/* ── Command data ── */
const HELP_OUTPUT = [
  { text: "$ help", className: "t-dim" },
  { text: "" },
  { text: "Available commands:", className: "t-success" },
  { text: "" },
  { text: "  help    → Show available commands" },
  { text: "  status  → Check campfire status" },
  { text: "  juno    → Talk to Juno" },
  { text: "  sit     → Sit by the fire" },
  { text: "  about   → Learn about Campfire.dev" },
  { text: "" },
  { text: "Tip:", className: "t-comment" },
  { text: "  Juno might be sleeping.", className: "t-dim" },
];

const STATUS_OUTPUT = [
  { text: "$ status", className: "t-dim" },
  { text: "" },
  { text: "campfire : Lit 🔥", className: "t-success" },
  { text: "" },
  { text: "Developer:", className: "t-success" },
  { text: "  Coffee       : Low", className: "t-dim" },
  { text: "  Motivation   : Low", className: "t-dim" },
];

const SIT_OUTPUT = [
  { text: "$ sit", className: "t-dim" },
  { text: "" },
  { text: "You sit beside the fire." },
  { text: "" },
  { text: "The wind is calm." },
  { text: "" },
  { text: "Juno snores softly nearby." },
  { text: "" },
  { text: "Everything feels peaceful." },
];

const ABOUT_OUTPUT = [
  { text: "$ about", className: "t-dim" },
  { text: "" },
  { text: "Campfire.dev", className: "t-success" },
  { text: "" },
  { text: "A quiet place for developers to gather." },
  { text: "No usernames. No pressure. Just the fire." },
  { text: "" },
  { text: "→ Visit the About page to learn more.", className: "t-dim" },
];

/* ── Action card listeners ── */
document.getElementById("cmd-help").addEventListener("click", () => {
  openCmdPopup("campfire-terminal", HELP_OUTPUT);
});
document.getElementById("cmd-status").addEventListener("click", () => {
  openCmdPopup("campfire-terminal", STATUS_OUTPUT);
});
document.getElementById("cmd-sit").addEventListener("click", () => {
  openCmdPopup("campfire-terminal", SIT_OUTPUT);
});
document.getElementById("cmd-juno").addEventListener("click", () => {
  showJunoTerminal();
});

/* ── Terminal input field ── */
const terminalInput = document.querySelector(".terminal_input");
if (terminalInput) {
  terminalInput.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const cmd = terminalInput.value.trim().toLowerCase();
    terminalInput.value = "";
    if (!cmd) return;

    if (cmd === "help")   { openCmdPopup("campfire-terminal", HELP_OUTPUT); }
    else if (cmd === "status") { openCmdPopup("campfire-terminal", STATUS_OUTPUT); }
    else if (cmd === "sit")    { openCmdPopup("campfire-terminal", SIT_OUTPUT); }
    else if (cmd === "about")  { openCmdPopup("campfire-terminal", ABOUT_OUTPUT); }
    else if (cmd === "juno")   { showJunoTerminal(); }
    else {
      openCmdPopup("campfire-terminal", [
        { text: `$ ${cmd}`, className: "t-dim" },
        { text: "" },
        { text: `command not found: ${cmd}`, className: "t-error" },
        { text: "" },
        { text: "Type 'help' to see available commands.", className: "t-dim" },
      ]);
    }
  });
}

/* ════════════════════════════════
   Juno System
   ════════════════════════════════ */
let junoUnlocked = false;

/* All Juno messages the modal can cycle through */
const JUNO_SCENES = [
  {
    label: "whoami",
    lines: [
      { text: "$ whoami", className: "t-dim" },
      { text: "" },
      { text: "Juno", className: "t-success" },
      { text: "" },
      { text: "Professional sleeper." },
      { text: "Campfire guardian." },
      { text: "Treat enthusiast." },
    ],
  },
  {
    label: "status",
    lines: [
      { text: "$ status", className: "t-dim" },
      { text: "" },
      { text: "Energy: 100%", className: "t-success" },
      { text: "Tasks Completed: 0" },
      { text: "Naps Completed: 47" },
    ],
  },
  {
    label: "current-task",
    lines: [
      { text: "$ current-task", className: "t-dim" },
      { text: "" },
      { text: "Sleeping..." },
      { text: "" },
      { text: "Sleeping..." },
      { text: "" },
      { text: "Still sleeping..." },
    ],
  },
  {
    label: "contribution",
    lines: [
      { text: "$ contribution", className: "t-dim" },
      { text: "" },
      { text: "Bug Fixes: 0" },
      { text: "Morale Boost: 100", className: "t-success" },
    ],
  },
  {
    label: "debug",
    lines: [
      { text: "$ debug", className: "t-dim" },
      { text: "" },
      { text: "I found the problem.", className: "t-success" },
      { text: "" },
      { text: "Not enough treats." },
    ],
  },
  {
    label: "wake-juno",
    lines: [
      { text: "$ wake-juno", className: "t-dim" },
      { text: "" },
      { text: "Permission denied.", className: "t-error" },
    ],
  },
  {
    label: "assign-task juno",
    lines: [
      { text: "$ assign-task juno", className: "t-dim" },
      { text: "" },
      { text: "Task failed successfully.", className: "t-error" },
    ],
  },
];

let junoSceneIndex = 0; // start at whoami
let junoTypewriterId = 0;

function sleepJuno(ms, id) {
  return new Promise((res, rej) => {
    setTimeout(() => junoTypewriterId === id ? res() : rej(), ms);
  });
}

async function typewriteJunoLines(lines) {
  const output = document.getElementById("juno-output");
  if (!output) return;
  output.innerHTML = "";

  const id = ++junoTypewriterId;

  try {
    for (const { text, className } of lines) {
      const p = document.createElement("p");
      if (className) p.className = className;
      output.appendChild(p);
      output.scrollTop = output.scrollHeight;

      for (const ch of text) {
        p.textContent += ch;
        await sleepJuno(28 + Math.random() * 22, id);
      }
      await sleepJuno(60, id);
    }
    // blinking cursor
    const cur = document.createElement("p");
    cur.innerHTML = '<span class="cursor" aria-hidden="true">█</span>';
    output.appendChild(cur);
  } catch {
    // aborted — do nothing
  }
}

function showJunoTerminal() {
  const modal   = document.getElementById("juno-modal");
  const actions = document.getElementById("juno-actions");

  modal.hidden = false;
  actions.innerHTML = "";

  if (!junoUnlocked) {
    // Before intro complete: Do Not Disturb
    junoTypewriterId++; // abort any running animation
    const output = document.getElementById("juno-output");
    output.innerHTML = "";
    [
      { text: "$ access-juno", className: "t-dim" },
      { text: "" },
      { text: "Do not disturb.", className: "t-error" },
      { text: "" },
      { text: "Current Activity:", className: "t-success" },
      { text: "Sleeping..." },
      { text: "" },
      { text: "Complete the developer introduction first." },
    ].forEach(({ text, className }) => {
      const p = document.createElement("p");
      if (className) p.className = className;
      p.textContent = text;
      output.appendChild(p);
    });

    const okBtn = document.createElement("button");
    okBtn.className = "juno-action-btn";
    okBtn.textContent = "[ Okay ]";
    okBtn.onclick = closeJunoTerminal;
    actions.appendChild(okBtn);
    return;
  }

  // Show current scene with typewriter
  typewriteJunoLines(JUNO_SCENES[junoSceneIndex].lines);

  // "Random Juno Messages" button cycles through scenes
  const randomBtn = document.createElement("button");
  randomBtn.className = "juno-action-btn";
  randomBtn.textContent = "[ Random Juno Messages ]";
  randomBtn.onclick = () => {
    junoSceneIndex = (junoSceneIndex + 1) % JUNO_SCENES.length;
    typewriteJunoLines(JUNO_SCENES[junoSceneIndex].lines);
  };
  actions.appendChild(randomBtn);

  const closeBtn = document.createElement("button");
  closeBtn.className = "juno-action-btn";
  closeBtn.textContent = "[ Close ]";
  closeBtn.onclick = closeJunoTerminal;
  actions.appendChild(closeBtn);
}

function updateJunoStatus() {
  const el = document.getElementById("juno-status");
  if (!el) return;
  el.textContent = "Juno is resting. Thanks for being here.";
}

function closeJunoTerminal() {
  junoTypewriterId++; // abort typewriter
  document.getElementById("juno-modal").hidden = true;
}

function unlockJuno() {
  if (!junoUnlocked) {
    junoUnlocked = true;
    const junoBtn = document.getElementById("juno-button");
    if (junoBtn) junoBtn.disabled = false;
  }
}

/* ── Juno sidebar button ── */
document.getElementById("juno-button").addEventListener("click", () => {
  showJunoTerminal();
});

/* ── Juno modal close ── */
document.getElementById("juno-modal-close").addEventListener("click", closeJunoTerminal);
document.getElementById("juno-modal").addEventListener("click", (e) => {
  if (e.target.id === "juno-modal") closeJunoTerminal();
});

/* ── Unlock Juno when story finishes ── */
function checkJunoUnlock() {
  if (currentPage >= TERMINAL_PAGES.length) unlockJuno();
}
const terminalRunBtn = document.getElementById("terminal-run");
if (terminalRunBtn) {
  terminalRunBtn.addEventListener("click", () => setTimeout(checkJunoUnlock, 100));
}

