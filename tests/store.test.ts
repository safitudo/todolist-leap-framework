/**
 * Store tests — human-authored guardrails
 * These test the contract, not the implementation.
 * Any AI-generated store that passes these is correct.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { createStore } from "../src/store";
import type { Todo } from "../schemas/types";

const makeTodo = (overrides: Partial<Todo> = {}): Todo => ({
  id: "test-1",
  text: "Buy milk",
  completed: false,
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  ...overrides,
});

describe("Store contract", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts empty", () => {
    const store = createStore();
    expect(store.getAll()).toEqual([]);
  });

  it("stores and retrieves a todo", () => {
    const store = createStore();
    const todo = makeTodo();
    store.set(todo.id, todo);
    expect(store.get(todo.id)).toEqual(todo);
  });

  it("returns null for non-existent ID", () => {
    const store = createStore();
    expect(store.get("nope")).toBeNull();
  });

  it("deletes a todo", () => {
    const store = createStore();
    const todo = makeTodo();
    store.set(todo.id, todo);
    store.delete(todo.id);
    expect(store.get(todo.id)).toBeNull();
    expect(store.getAll()).toEqual([]);
  });

  it("delete is a no-op for non-existent ID", () => {
    const store = createStore();
    store.delete("nope"); // should not throw
    expect(store.getAll()).toEqual([]);
  });

  it("preserves insertion order", () => {
    const store = createStore();
    const a = makeTodo({ id: "a", text: "First" });
    const b = makeTodo({ id: "b", text: "Second" });
    const c = makeTodo({ id: "c", text: "Third" });
    store.set(a.id, a);
    store.set(b.id, b);
    store.set(c.id, c);
    expect(store.getAll().map((t) => t.id)).toEqual(["a", "b", "c"]);
  });

  it("persists to localStorage", () => {
    const store1 = createStore();
    store1.set("x", makeTodo({ id: "x" }));

    // Simulate page reload — new store instance, same localStorage
    const store2 = createStore();
    expect(store2.get("x")).toEqual(makeTodo({ id: "x" }));
  });

  it("updates existing todo without changing order", () => {
    const store = createStore();
    store.set("a", makeTodo({ id: "a", text: "First" }));
    store.set("b", makeTodo({ id: "b", text: "Second" }));
    store.set("a", makeTodo({ id: "a", text: "Updated" }));
    const all = store.getAll();
    expect(all[0].text).toBe("Updated");
    expect(all.map((t) => t.id)).toEqual(["a", "b"]);
  });
});
