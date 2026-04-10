/**
 * Integration tests — human-authored guardrails
 * Tests that parts work together through their contracts.
 * This is the "does the whole thing actually work" layer.
 */

import { describe, it, expect, beforeEach } from "vitest";
import { createStore } from "../src/store";
import { createTodoManager } from "../src/logic";

describe("Integration: store + logic", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("full lifecycle: add, toggle, edit, clear", () => {
    const store = createStore();
    const manager = createTodoManager(store);

    // Add
    const todo = manager.add("Buy milk");
    expect(manager.list()).toHaveLength(1);

    // Toggle
    manager.toggle(todo.id);
    expect(manager.list("completed")).toHaveLength(1);

    // Edit
    manager.edit(todo.id, "Buy oat milk");
    expect(manager.list()[0].text).toBe("Buy oat milk");

    // Clear completed
    manager.clear();
    expect(manager.list()).toHaveLength(0);
  });

  it("data survives store recreation (simulated reload)", () => {
    const store1 = createStore();
    const manager1 = createTodoManager(store1);
    manager1.add("Persistent todo");

    // Simulate page reload
    const store2 = createStore();
    const manager2 = createTodoManager(store2);
    expect(manager2.list()).toHaveLength(1);
    expect(manager2.list()[0].text).toBe("Persistent todo");
  });

  it("multiple managers on same store see same data", () => {
    const store = createStore();
    const m1 = createTodoManager(store);
    const m2 = createTodoManager(store);

    m1.add("From manager 1");
    expect(m2.list()).toHaveLength(1);
  });

  it("operations are consistent across filter views", () => {
    const store = createStore();
    const manager = createTodoManager(store);

    const a = manager.add("Active task");
    const b = manager.add("Completed task");
    manager.toggle(b.id);

    expect(manager.list("all")).toHaveLength(2);
    expect(manager.list("active")).toHaveLength(1);
    expect(manager.list("completed")).toHaveLength(1);

    // Toggling back
    manager.toggle(b.id);
    expect(manager.list("active")).toHaveLength(2);
    expect(manager.list("completed")).toHaveLength(0);
  });
});
