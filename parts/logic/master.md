# Logic Part

Implement todo business logic that operates on a Store.

## Behavior

- `createTodoManager(store)` returns `TodoOperations` (see schema.ts)
- `add(text)`: creates a new Todo with a unique ID, `completed: false`, current timestamps. Trims whitespace. Rejects empty strings (throw Error).
- `remove(id)`: deletes from store. No-op if ID doesn't exist.
- `toggle(id)`: flips `completed`, updates `updatedAt`. Throws if ID doesn't exist.
- `edit(id, text)`: updates text, updates `updatedAt`. Trims whitespace. Throws if empty. Throws if ID doesn't exist.
- `list(filter?)`: returns all todos, or filtered by active/completed. Returns in insertion order.
- `clear()`: removes all todos where `completed === true`.

## ID generation

Use `crypto.randomUUID()` for IDs.

## Output

Generate `src/logic.ts` exporting `createTodoManager`.
