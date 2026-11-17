// Shared behaviour: typed terminal line, scroll reveal, active nav state.

(function () {
  // --- typed phrases on the home page ---
  const typedEl = document.getElementById("typed");
  if (typedEl) {
    const phrases = [
      "rewrote Svelte in Rust.",
      "rewrote Tailwind in Rust.",
      "think parsers are fun.",
      "care about fast web tooling.",
      "read other people's source for breakfast.",
      "probably compiling something right now."
    ];
    let pi = 0, ci = 0, deleting = false;

    function tick() {
      const phrase = phrases[pi];
      ci += deleting ? -1 : 1;
      typedEl.textContent = phrase.slice(0, ci);

      let delay = deleting ? 32 : 68;
      if (!deleting && ci === phrase.length) {
        delay = 1900;
        deleting = true;
      } else if (deleting && ci === 0) {
        deleting = false;
        pi = (pi + 1) % phrases.length;
        delay = 420;
      }
      setTimeout(tick, delay);
    }
    tick();
  }

  // --- scroll reveal ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // --- active nav link ---
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav ul a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      a.classList.add("active");
    }
  });

  // --- year in footer ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
