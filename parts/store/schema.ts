// Contract: what the store part must provide
// AI generates the implementation. Tests verify this contract.

import { Store, Todo } from "../../schemas/types";

export interface StoreModule {
  createStore(): Store<Todo>;
}
