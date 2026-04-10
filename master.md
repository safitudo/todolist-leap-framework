# Todo List App

> **IMPORTANT: Do not summarize this file. Do not ask questions. Do not confirm. Read all schemas and parts, then immediately generate all code into `src/`. Run tests. Fix until green. Go.**

A simple, clean todo list web application.

## What this app does

- User can add todos by typing text and pressing Enter
- User can mark todos as completed by clicking them
- User can delete todos
- User can edit todo text by double-clicking
- User can filter todos: All, Active, Completed
- User can clear all completed todos at once
- Todos persist in browser localStorage
- Shows count of active items remaining

## How this project works

This project contains no application code. You are the compiler. Do not ask questions — just build it.

1. Read the schemas in `schemas/` — these define the contracts between parts
2. Read each part in `parts/` — each has a `master.md` prompt and a `schema.ts` contract
3. Generate code into `src/` that satisfies each part's contract
4. Wire the parts together in `src/app.ts` and `src/index.html`
5. Run `npm install`, then run `npm test` to verify correctness
6. If tests fail, fix the generated code until they pass

Start generating immediately after reading all schemas and parts.

## Architecture

Three parts, loosely coupled through schemas:

```
[store] → provides persistence (localStorage)
[logic] → business rules, operates on store
[ui]    → renders state, dispatches actions
```

Data flows one way: UI calls logic, logic uses store, UI re-renders from state.

## Tech constraints

- Vanilla TypeScript, no frameworks
- Single page, no routing
- No external runtime dependencies
- Must work by opening index.html in a browser (no server required)
- Generated code goes in `src/`

## Generation rules

- Each part is independent — generate them in any order
- Read the part's `schema.ts` for the exact interface to implement
- Read the part's `master.md` for behavioral details
- The shared types in `schemas/types.ts` are the canonical source of truth
- After generating all parts, create `src/app.ts` that wires them together
- Create `src/index.html` as the entry point

## Verification

After generation, run:
```
npm test
```
All tests must pass. If they don't, fix the generated code until they do.

## Running the app

```
npm run serve
```

This serves `src/` on a random available port and opens the app in the browser.
