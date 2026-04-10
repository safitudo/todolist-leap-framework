# Store Part

Implement a todo store using browser localStorage.

## Behavior

- `createStore()` returns a `Store<Todo>` (see schema.ts)
- Data persists across page reloads via localStorage
- Key for localStorage: `"todos"`
- `getAll()` returns todos in insertion order
- `get()` returns null for non-existent IDs
- `delete()` on non-existent ID is a no-op
- Store serializes/deserializes JSON to localStorage on every write

## Output

Generate `src/store.ts` exporting `createStore`.
