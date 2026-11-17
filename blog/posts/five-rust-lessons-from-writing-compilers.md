# Five things the borrow checker taught me about writing compilers

People like to complain about the borrow checker. I've come to appreciate it — mostly because it made me a better compiler author. Here are five lessons it forced on me.

## 1. Ownership maps perfectly to syntax trees

A compiler's core data structure is a tree: the AST. Trees are *almost* the ideal shape for Rust's ownership model — every node has exactly one parent, so ownership is unambiguous.

The pain starts with anything that isn't tree-shaped: symbol tables, type information, back-references from an expression to its enclosing scope. My first attempt at `rustle` fought this constantly, threading lifetimes through everything. The fix wasn't cleverer lifetimes — it was a data-model change:

```rust
// before: nodes own their children AND reference each other (pain)
// after: arena allocation + plain indices

pub struct Arena {
    nodes: Vec<Node>,
}

pub struct NodeId(usize);
```

An arena plus `NodeId` indices sidesteps the borrow checker entirely, because nothing *borrows* — everything *refers*. This is the standard pattern in Rust compiler circles (rustc's own `Arena` and `HirId` work the same way), and it's the single highest-leverage refactor I know.

## 2. Enums make states illegal to represent

Compilers are full of phases: parse → transform → generate. In a language with permissive types, it's easy to accidentally run a transform on an unvalidated AST. In Rust, you can make that state unrepresentable:

```rust
pub enum Program {
    Parsed(ast::Program),
    Analyzed(analysis::Program),
}
```

If a function takes `&AnalyzedProgram`, you *cannot* pass it something that skipped analysis. The type system becomes your pipeline diagram.

## 3. `Result` forces you to design error messages early

Every fallible operation in Rust demands a decision about the error type. In a compiler, that decision is user-facing: what does the developer see when their template is broken?

Designing an error enum up front — with spans, not just strings — was tedious for about a day, and then paid for itself every single time a user pasted a confusing snippet into an issue. A compiler's UX *is* its diagnostics.

## 4. iterators > manual recursion (usually)

My first tree-walks were hand-written recursive functions with mutable accumulators. They worked, but every new pass meant another bespoke traversal. Rust's iterator combinators changed the shape of the code:

```rust
ast.walk()
   .filter_map(|node| node.as_element())
   .filter(|el| is_directive(el))
   .map(transform)
```

The passes became declarative — the *what* instead of the *how* — and the recursion bugs disappeared.

## 5. The compiler-in-your-terminal is your best reviewer

The meta-lesson: Rust's compiler does to *your* compiler what your compiler does to user code. It rejects invalid states, complains about dead data flow, and refuses to let you ship a dangling reference. Every fight I've had with it was, in retrospect, a design flaw I would otherwise have found in production.

So yes — the borrow checker is strict. For compiler work, that's exactly what you want.
