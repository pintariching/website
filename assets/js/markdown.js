// Tiny dependency-free Markdown renderer for blog posts.
// Supports: headings, bold, italic, inline code, fenced code blocks,
// links, images, unordered/ordered lists, blockquotes, hr, paragraphs.

(function () {
  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function inline(s) {
    // escape first, then apply inline rules on the escaped text
    let out = escapeHtml(s);

    // images: ![alt](src)
    out = out.replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1">');
    // links: [text](url)
    out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
    // bold + italic
    out = out.replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>");
    out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    out = out.replace(/___([^_]+)___/g, "<strong><em>$1</em></strong>");
    out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");
    // inline code (before stray emphasis mangling)
    out = out.replace(/`([^`]+)`/g, "<code>$1</code>");
    // strikethrough
    out = out.replace(/~~([^~]+)~~/g, "<del>$1</del>");
    return out;
  }

  function render(md) {
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    const html = [];
    let i = 0;

    while (i < lines.length) {
      const line = lines[i];

      // fenced code block
      const fence = line.match(/^```(\w*)\s*$/);
      if (fence) {
        const lang = fence[1];
        const buf = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) {
          buf.push(lines[i]);
          i++;
        }
        i++; // skip closing fence
        const cls = lang ? ` class="language-${escapeHtml(lang)}"` : "";
        html.push(`<pre><code${cls}>${escapeHtml(buf.join("\n"))}</code></pre>`);
        continue;
      }

      // heading
      const h = line.match(/^(#{1,6})\s+(.*)$/);
      if (h) {
        const level = h[1].length;
        html.push(`<h${level}>${inline(h[2])}</h${level}>`);
        i++;
        continue;
      }

      // horizontal rule
      if (/^\s*(---|\*\*\*|___)\s*$/.test(line)) {
        html.push("<hr>");
        i++;
        continue;
      }

      // blockquote
      if (/^>\s?/.test(line)) {
        const buf = [];
        while (i < lines.length && /^>\s?/.test(lines[i])) {
          buf.push(lines[i].replace(/^>\s?/, ""));
          i++;
        }
        html.push(`<blockquote>${render(buf.join("\n"))}</blockquote>`);
        continue;
      }

      // unordered list
      if (/^\s*[-*+]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
          items.push(`<li>${inline(lines[i].replace(/^\s*[-*+]\s+/, ""))}</li>`);
          i++;
        }
        html.push(`<ul>${items.join("")}</ul>`);
        continue;
      }

      // ordered list
      if (/^\s*\d+[.)]\s+/.test(line)) {
        const items = [];
        while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
          items.push(`<li>${inline(lines[i].replace(/^\s*\d+[.)]\s+/, ""))}</li>`);
          i++;
        }
        html.push(`<ol>${items.join("")}</ol>`);
        continue;
      }

      // blank line
      if (/^\s*$/.test(line)) {
        i++;
        continue;
      }

      // paragraph: consume until blank line / block start
      const buf = [line];
      i++;
      while (
        i < lines.length &&
        !/^\s*$/.test(lines[i]) &&
        !/^(#{1,6}\s|>\s?|\s*[-*+]\s|\s*\d+[.)]\s|```)/.test(lines[i])
      ) {
        buf.push(lines[i]);
        i++;
      }
      html.push(`<p>${inline(buf.join(" "))}</p>`);
    }

    return html.join("\n");
  }

  window.MiniMD = { render };
})();
