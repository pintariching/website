// Project data — edit this file to add, remove or reorder portfolio entries.
// "featured" items also appear on the home page.

const PROJECTS = [
  {
    name: "rustle",
    url: "https://github.com/pintariching/rustle",
    description: "The Svelte compiler, rewritten in Rust.",
    language: "Rust",
    langColor: "#dea584",
    stars: 1338,
    tags: ["compiler", "web", "rust"],
    category: "compilers",
    featured: true
  },
  {
    name: "railwind",
    url: "https://github.com/pintariching/railwind",
    description: "The Tailwind CSS compiler, rewritten in Rust.",
    language: "Rust",
    langColor: "#dea584",
    stars: 324,
    tags: ["compiler", "css", "rust"],
    category: "compilers",
    featured: true
  },
  {
    name: "wgpu-ocean",
    url: "https://github.com/pintariching/wgpu-ocean",
    description: "FFT-based ocean simulation with wgpu.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["graphics", "wgpu", "simulation"],
    category: "graphics",
    featured: true
  },
  {
    name: "bevy_silk",
    url: "https://github.com/pintariching/bevy_silk",
    description: "Cloth simulation engine for the Bevy game engine.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["bevy", "physics", "cloth"],
    category: "gamedev",
    featured: true
  },
  {
    name: "avian",
    url: "https://github.com/pintariching/avian",
    description: "ECS-driven 2D and 3D physics engine for the Bevy game engine.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["bevy", "physics", "ecs"],
    category: "gamedev",
    featured: false
  },
  {
    name: "Rust7",
    url: "https://github.com/pintariching/Rust7",
    description: "Pragmatic native Rust S7 client (Snap7-style) for Siemens PLCs.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["industrial", "plc", "networking"],
    category: "systems",
    featured: false
  },
  {
    name: "ehttp",
    url: "https://github.com/pintariching/ehttp",
    description: "Minimal Rust HTTP client for both native and WASM.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["http", "wasm", "web"],
    category: "systems",
    featured: false
  },
  {
    name: "hypertext",
    url: "https://github.com/pintariching/hypertext",
    description: "A blazing fast type-checked HTML macro crate for Rust.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["macros", "html", "rust"],
    category: "compilers",
    featured: false
  },
  {
    name: "bevy_pathfinding",
    url: "https://github.com/pintariching/bevy_pathfinding",
    description: "Pathfinding for the Bevy game engine.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["bevy", "algorithms", "ai"],
    category: "gamedev",
    featured: false
  },
  {
    name: "bevy_mod_outline",
    url: "https://github.com/pintariching/bevy_mod_outline",
    description: "Mesh outlining for the Bevy game engine.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["bevy", "graphics"],
    category: "graphics",
    featured: false
  },
  {
    name: "skein",
    url: "https://github.com/pintariching/skein",
    description: "Convert glTF extras to Bevy components using reflection.",
    language: "Rust",
    langColor: "#dea584",
    stars: null,
    tags: ["bevy", "gltf", "tooling"],
    category: "gamedev",
    featured: false
  },
  {
    name: "Sideloader",
    url: "https://github.com/pintariching/Sideloader",
    description: "Open-source cross-platform iOS app sideloader — even Linux is supported.",
    language: "D",
    langColor: "#ba595e",
    stars: null,
    tags: ["ios", "tooling", "cross-platform"],
    category: "tools",
    featured: false
  }
];

const CATEGORIES = [
  { id: "all", label: "all" },
  { id: "compilers", label: "compilers" },
  { id: "gamedev", label: "game dev" },
  { id: "graphics", label: "graphics" },
  { id: "systems", label: "systems" },
  { id: "tools", label: "tools" }
];
