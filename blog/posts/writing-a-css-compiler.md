# What I learned writing a CSS compiler in Rust

> Spoiler: CSS is *weirder* than it looks from the outside.

[railwind](https://github.com/pintariching/railwind) started as a simple question: *how hard can it be to scan HTML, find Tailwind classes, and generate the matching CSS?* The answer turned out to be: harder than expected, but a lot of fun.

## The parsing problem

Tailwind classes look trivial — `flex`, `pt-4`, `bg-red-500` — but the grammar has surprising depth:

- Variants stack: `hover:md:dark:bg-red-500/75`
- Arbitrary values hide everywhere: `w-[37.5rem]`, `grid-cols-[repeat(3,1fr)]`
- Some utilities are context-sensitive: `first-child`, `group-hover`, `peer`

The trick was to treat each class as a tiny **state machine** rather than a regex soup. Variant prefixes become modifiers applied to the final selector, and the base utility becomes a lookup into a generated rule table.

## Speed actually matters here

A Tailwind build runs on every save. When your feedback loop is a compiler, every millisecond is paid back hundreds of times per day. Rust made the hot path — scanning thousands of class candidates — almost free:

```text
railwind:   ~40ms on a large project
reference:  noticeably more than that
```

## Lessons learned

1. **Start from the output format.** Knowing exactly what CSS you must emit makes the input grammar much easier to design.
2. **Errors are a feature.** A compiler that silently ignores typos wastes your users' time. Good diagnostics were worth more than any performance win.
3. **Test with real projects.** Synthetic test cases caught the grammar edge cases; real-world HTML caught *everything else*.

If you want to see the gory details, the source is on [GitHub](https://github.com/pintariching/railwind) — and `rustle`, the Svelte compiler, reuses a lot of the same ideas at a much larger scale.
