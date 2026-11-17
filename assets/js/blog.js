// Blog engine: renders the post list on blog.html and single posts on blog/post.html.
//
// How to add a new post:
//   1. Drop a markdown file into blog/posts/  (e.g. blog/posts/my-post.md)
//   2. Add an entry at the TOP of blog/posts.json:
//      { "slug": "my-post", "title": "My Post", "date": "2026-01-15",
//        "tags": ["rust"], "excerpt": "One-line summary." }
// The list is rendered in manifest order, newest first.

(function () {
  const listEl = document.getElementById("post-list");
  const articleEl = document.getElementById("article");

  // blog.html lives at the site root; post.html lives inside blog/.
  // Resolve data paths relative to the current page.
  const BASE = location.pathname.includes("/blog/") ? "" : "blog/";

  function fmtDate(iso) {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  // ----- blog.html: post list -----
  if (listEl) {
    fetch(`${BASE}posts.json`)
      .then((r) => {
        if (!r.ok) throw new Error("posts.json not found");
        return r.json();
      })
      .then((posts) => {
        if (!posts.length) {
          listEl.innerHTML = '<p class="empty">No posts yet. Check back soon!</p>';
          return;
        }
        listEl.innerHTML = posts
          .map(
            (p) => `
            <article class="post-item reveal">
              <div class="post-meta">
                <span>${fmtDate(p.date)}</span>
                ${(p.tags || []).map((t) => `<span>#${esc(t)}</span>`).join("")}
              </div>
              <h3><a href="post.html?post=${encodeURIComponent(p.slug)}">${esc(p.title)}</a></h3>
              <p>${esc(p.excerpt || "")}</p>
            </article>`
          )
          .join("");
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      })
      .catch(() => {
        listEl.innerHTML =
          '<p class="empty">Could not load posts. If you are opening this file directly, serve the site with a local server (e.g. <code>python3 -m http.server</code>).</p>';
      });
  }

  // ----- blog/post.html: single post -----
  if (articleEl) {
    const params = new URLSearchParams(location.search);
    const slug = params.get("post");

    if (!slug) {
      articleEl.innerHTML = "<p class='empty'>No post specified.</p>";
      return;
    }

    fetch(`${BASE}posts.json`)
      .then((r) => r.json())
      .then((posts) => {
        const meta = posts.find((p) => p.slug === slug);
        return fetch(`${BASE}posts/${encodeURIComponent(slug)}.md`).then((r) => {
          if (!r.ok) throw new Error("post not found");
          return r.text().then((md) => ({ meta, md }));
        });
      })
      .then(({ meta, md }) => {
        document.title = `${meta ? meta.title : slug} — pintariching`;
        const tags = meta && meta.tags ? meta.tags.map((t) => `<span>#${esc(t)}</span>`).join("") : "";
        const date = meta && meta.date ? `<span>${fmtDate(meta.date)}</span>` : "";
        articleEl.innerHTML = `
          <div class="article-meta">${date}${tags}</div>
          ${window.MiniMD.render(md)}
          <p style="margin-top:2.5rem"><a href="../blog.html">&larr; back to all posts</a></p>`;
      })
      .catch(() => {
        articleEl.innerHTML = "<p class='empty'>Post not found.</p>";
      });
  }
})();
