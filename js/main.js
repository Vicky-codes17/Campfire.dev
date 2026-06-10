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

  nav.querySelectorAll(".nav__link").forEach((link) => {
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
      
      if (currentPage === 1) {
        runBtn.textContent = "> continue";
        if (btn2) btn2.style.display = "none";
      } else if (currentPage === 2) {
        runBtn.textContent = "> continue";
        if (btn2) btn2.style.display = "none";
      } else if (currentPage === 3) {
        runBtn.textContent = "[ what are you getting at? ]";
        if (btn2) btn2.style.display = "none";
      } else if (currentPage === 4) {
        runBtn.textContent = "[ yeah actually ]";
        // Show dual buttons
        if (!btn2) {
          btn2 = document.createElement("button");
          btn2.id = "terminal-run-alt";
          btn2.type = "button";
          btn2.className = "terminal__run";
          btn2.textContent = "[ not really ]";
          runBtn.parentNode.insertBefore(btn2, runBtn.nextSibling);
          btn2.addEventListener("click", () => {
            handleNotReally();
          });
        }
        btn2.style.display = "inline-block";
      } else if (currentPage === 5) {
        runBtn.textContent = "[ maybe okay ]";
        // Show dual buttons
        if (!btn2) {
          btn2 = document.createElement("button");
          btn2.id = "terminal-run-alt";
          btn2.type = "button";
          btn2.className = "terminal__run";
          btn2.textContent = "[ still no ]";
          runBtn.parentNode.insertBefore(btn2, runBtn.nextSibling);
          btn2.addEventListener("click", () => {
            console.log("still no selected");
          });
        }
        btn2.style.display = "inline-block";
      } else {
        runBtn.textContent = "> end";
        runBtn.disabled = true;
        if (btn2) btn2.style.display = "none";
      }
    }
  }
}

function handleNotReally() {
  // Set currentPage to 4 so that runTerminalTypewriter increments it to 5 and displays the recovery page
  currentPage = 4;
  runTerminalTypewriter();
}

function initTerminalTypewriter() {
  const runBtn = document.getElementById("terminal-run");
  if (!runBtn) return;

  runBtn.addEventListener("click", () => {
    runTerminalTypewriter();
  });

  runTerminalTypewriter();
}

updateClock();
setInterval(updateClock, 30_000);
initMobileNav();
initTerminalTypewriter();
