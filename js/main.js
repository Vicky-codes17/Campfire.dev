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

updateClock();
setInterval(updateClock, 30_000);
