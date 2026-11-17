# Bevy's ECS changed how I think about game code

If you learned game programming the classic way, your mental model is objects: a `Player` class with an `update()`, an `Enemy` class with an `update()`, inheritance where it barely fits, and a god-object `Game` that holds it all together.

[Bevy](https://bevy.org) — a Rust game engine built around an Entity Component System — throws most of that away. After spending time with it, I find it hard to go back. Here's why.

## The idea in one paragraph

In an ECS:

- **Entities** are just IDs — a "thing" with no data and no behavior.
- **Components** are plain data (`struct Health(f32)`) attached to entities.
- **Systems** are functions that run over all entities carrying specific components.

Behavior doesn't live inside objects. It lives in *systems that query data*. A bouncy projectile isn't an object with a `bounce()` method — it's any entity that has `Velocity` and `Collider`, processed by whichever systems care about those.

## What this looks like in practice

```rust
#[derive(Component)]
struct Health(f32);

#[derive(Component)]
struct Poisoned { ticks_left: u8 }

fn poison_damage(
    time: Res<Time>,
    mut query: Query<(&mut Health, &mut Poisoned)>,
) {
    for (mut health, mut poison) in &mut query {
        health.0 -= 2.0 * time.delta_secs();
        poison.ticks_left -= 1;
        if poison.ticks_left == 0 {
            // remove the component — the entity simply stops being poisoned
        }
    }
}
```

Notice what's *absent*: no base class, no virtual `update`, no dependency on what else the entity is. A poisoned rock and a poisoned dragon are handled by the same five lines, because the system only asked for the data it needs.

## Three things that clicked for me

### 1. Composition replaces inheritance, for real this time

Every OOP tutorial promises "favor composition over inheritance" and then gives you a hierarchy anyway. ECS makes composition the only option. Want a flying enemy? Add a `Flying` component. Want it to catch fire? Add `Burning`. No diamond problem, because there is no diamond — just a bag of data and systems that react to it.

### 2. Scheduling is a superpower

Because systems declare their data access up front, Bevy can look at every system and figure out what can run in parallel. Two systems that only read `Health`? Concurrent. One that writes it? Automatically ordered. You get data-parallelism you'd normally get from careful, fragile manual threading — for free, from the type signatures.

### 3. Queries are documentation

A system's signature tells you everything about its role:

```rust
fn explode_on_contact(
    q_projectiles: Query<&Transform, With<Projectile>>,
    q_targets: Query<(Entity, &Transform), With<Vulnerable>>,
    mut commands: Commands,
)
```

No digging through method bodies to find hidden state. The engine *enforces* that a system can't touch anything it didn't declare.

## The trade-off nobody mentions first

ECS is not automatically simpler — it's *differently* simpler. The hard part moves from designing class hierarchies to designing component boundaries. Split too fine and you're wiring five components together to represent one concept; too coarse and you've rebuilt a god-object with extra steps.

My rule of thumb after a while: **a component should be a fact, not a role.** `IsPlayer` is a fact. `PlayerController` with embedded health, inventory and audio hooks is a role — split it.

## Try it

The fastest path in: `cargo new` + `bevy` as a dependency, then the official [breaking-in example](https://bevy.org/learn/quick-start/) — a walking square you'll extend into a full game in a few hundred lines. Even if you never ship a game, Bevy is worth a weekend for how it rewires your thinking about state, data flow, and parallelism.

And if you *do* get hooked — the Bevy ecosystem is one of the friendliest open-source communities in Rust. See you in the issue tracker.
