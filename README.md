# pintariching — personal website

A zero-dependency static personal site: home, projects/portfolio, blog, and contact pages.
Pure HTML/CSS/JS — no build step, no frameworks. Host it anywhere static files are served
(GitHub Pages, Netlify, Cloudflare Pages…).

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Projects & portfolio | `projects.html` |
| Blog | `blog.html` |
| Blog post view | `blog/post.html?post=<slug>` |
| Contact | `contact.html` |

## Writing a new blog post

1. Create a markdown file in `blog/posts/`, e.g. `blog/posts/my-new-post.md`.
2. Add an entry at the **top** of `blog/posts.json` (the list renders newest first):

```json
{
  "slug": "my-new-post",
  "title": "My New Post",
  "date": "2026-02-01",
  "tags": ["rust", "compilers"],
  "excerpt": "One-line summary shown in the post list."
}
```

`slug` must match the markdown filename (without `.md`). Supported markdown:
headings, bold/italic, inline code, fenced code blocks, links, images, lists,
blockquotes, and horizontal rules.

## Managing projects

Edit `assets/js/projects-data.js`. Each entry needs a `name`, `url`, `description`,
`language`, `langColor`, `tags`, and a `featured` flag (featured entries appear on the
home page).

## Local preview

The blog fetches markdown files at runtime, so use a local server instead of opening
files directly:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Customizing

- **Email / form**: replace `hello@example.com` in `contact.html` (and optionally point
  the form at a service like Formspree).
- **Theme**: colors and fonts live in `assets/css/style.css` under `:root`.
- **Stats on home page**: edit the `.stats` block in `index.html`.

## Deploying with GitHub Pages

Repo **Settings → Pages → Deploy from branch** → `main` → `/ (root)`.
The site will be live at `https://pintariching.github.io/website/`.

## License

MIT — see [LICENSE](LICENSE).
