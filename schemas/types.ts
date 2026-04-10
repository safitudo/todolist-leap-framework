// ============================================
// Core domain types — the todo app's "language"
// Human-authored. This IS the product spec.
// ============================================

// --- Entities ---

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;   // ISO 8601
  updatedAt: string;   // ISO 8601
}

// --- Operations ---

export interface TodoOperations {
  add(text: string): Todo;
  remove(id: string): void;
  toggle(id: string): Todo;
  edit(id: string, text: string): Todo;
  list(filter?: "all" | "active" | "completed"): Todo[];
  clear(): void;  // remove all completed
}

// --- Storage contract ---

export interface Store<T> {
  get(id: string): T | null;
  getAll(): T[];
  set(id: string, value: T): void;
  delete(id: string): void;
}

// --- UI contract ---
// What the UI part must render, not HOW it renders

export interface TodoView {
  todos: Todo[];
  filter: "all" | "active" | "completed";
  counts: {
    total: number;
    active: number;
    completed: number;
  };
}

export interface TodoActions {
  onAdd(text: string): void;
  onToggle(id: string): void;
  onEdit(id: string, text: string): void;
  onRemove(id: string): void;
  onFilter(filter: "all" | "active" | "completed"): void;
  onClearCompleted(): void;
}
