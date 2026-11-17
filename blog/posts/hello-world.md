# Hello, world — why I rewrite things in Rust

Welcome to the blog! This is the first post on my new site, so a quick introduction is in order.

## Who am I

I'm **pintariching** — a developer who spends most of their time in *Rust*, building tools, compilers and game-engine tech. If a popular tool exists and can be made faster, safer, or more fun to build, there's a decent chance I've started rewriting it in Rust.

## What I work on

- **rustle** — the Svelte compiler, rewritten in Rust
- **railwind** — the Tailwind CSS compiler, rewritten in Rust
- **Bevy ecosystem** — physics, cloth simulation, pathfinding, outlines and more
- **wgpu-ocean** — FFT ocean simulation on the GPU

## Why compilers?

There's something uniquely satisfying about taking a tool that millions of developers use daily and rebuilding its engine from scratch. You learn how the magic actually works — and you get to make it *fast*.

```rust
fn main() {
    println!("cargo:rustc-env=ITCH=scratched");
}
```

## What's next

I'll be writing about compilers, graphics, game dev, industrial automation (yes, PLCs), and whatever else I'm currently breaking. If any of that sounds interesting, bookmark this page or star [my GitHub](https://github.com/pintariching).

See you in the next post. 🦀
