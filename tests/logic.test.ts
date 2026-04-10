/**
 * Logic tests — human-authored guardrails
 * These test business rules, not implementation details.
 * Any AI-generated logic that passes these is correct.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { createTodoManager } from "../src/logic";
import { createStore } from "../src/store";
import type { Store, Todo } from "../schemas/types";

describe("Logic contract", () => {
  let manager: ReturnType<typeof createTodoManager>;

  beforeEach(() => {
    localStorage.clear();
    const store = createStore();
    manager = createTodoManager(store);
  });

  // --- add ---

  it("adds a todo with correct defaults", () => {
    const todo = manager.add("Buy milk");
    expect(todo.text).toBe("Buy milk");
    expect(todo.completed).toBe(false);
    expect(todo.id).toBeTruthy();
    expect(todo.createdAt).toBeTruthy();
    expect(todo.updatedAt).toBeTruthy();
  });

  it("trims whitespace on add", () => {
    const todo = manager.add("  Buy milk  ");
    expect(todo.text).toBe("Buy milk");
  });

  it("rejects empty text", () => {
    expect(() => manager.add("")).toThrow();
    expect(() => manager.add("   ")).toThrow();
  });

  it("generates unique IDs", () => {
    const a = manager.add("First");
    const b = manager.add("Second");
    expect(a.id).not.toBe(b.id);
  });

  // --- toggle ---

  it("toggles completion", () => {
    const todo = manager.add("Test");
    const toggled = manager.toggle(todo.id);
    expect(toggled.completed).toBe(true);

    const toggledBack = manager.toggle(todo.id);
    expect(toggledBack.completed).toBe(false);
  });

  it("toggle updates updatedAt", () => {
    const todo = manager.add("Test");
    const before = todo.updatedAt;

    // Small delay to ensure timestamp differs
    const toggled = manager.toggle(todo.id);
    expect(toggled.updatedAt).toBeTruthy();
  });

  it("toggle throws for non-existent ID", () => {
    expect(() => manager.toggle("nope")).toThrow();
  });

  // --- edit ---

  it("edits todo text", () => {
    const todo = manager.add("Old");
    const edited = manager.edit(todo.id, "New");
    expect(edited.text).toBe("New");
  });

  it("edit trims whitespace", () => {
    const todo = manager.add("Old");
    const edited = manager.edit(todo.id, "  New  ");
    expect(edited.text).toBe("New");
  });

  it("edit rejects empty text", () => {
    const todo = manager.add("Old");
    expect(() => manager.edit(todo.id, "")).toThrow();
    expect(() => manager.edit(todo.id, "   ")).toThrow();
  });

  it("edit throws for non-existent ID", () => {
    expect(() => manager.edit("nope", "text")).toThrow();
  });

  // --- remove ---

  it("removes a todo", () => {
    const todo = manager.add("Test");
    manager.remove(todo.id);
    expect(manager.list()).toEqual([]);
  });

  it("remove is a no-op for non-existent ID", () => {
    manager.add("Test");
    manager.remove("nope"); // should not throw
    expect(manager.list()).toHaveLength(1);
  });

  // --- list ---

  it("lists all todos in insertion order", () => {
    manager.add("First");
    manager.add("Second");
    manager.add("Third");
    const texts = manager.list().map((t) => t.text);
    expect(texts).toEqual(["First", "Second", "Third"]);
  });

  it("filters active todos", () => {
    const a = manager.add("Active");
    const b = manager.add("Done");
    manager.toggle(b.id);
    const active = manager.list("active");
    expect(active).toHaveLength(1);
    expect(active[0].text).toBe("Active");
  });

  it("filters completed todos", () => {
    const a = manager.add("Active");
    const b = manager.add("Done");
    manager.toggle(b.id);
    const completed = manager.list("completed");
    expect(completed).toHaveLength(1);
    expect(completed[0].text).toBe("Done");
  });

  // --- clear ---

  it("clears completed todos only", () => {
    manager.add("Keep");
    const done = manager.add("Remove");
    manager.toggle(done.id);
    manager.clear();
    const remaining = manager.list();
    expect(remaining).toHaveLength(1);
    expect(remaining[0].text).toBe("Keep");
  });
});
