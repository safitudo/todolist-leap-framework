// Contract: the business logic part
// Receives a store, exposes todo operations

import { Store, Todo, TodoOperations } from "../../schemas/types";

export interface LogicModule {
  createTodoManager(store: Store<Todo>): TodoOperations;
}
