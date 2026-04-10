// Contract: the UI part
// Receives operations + state, renders the app

import { TodoView, TodoActions } from "../../schemas/types";

export interface UIModule {
  render(root: HTMLElement, view: TodoView, actions: TodoActions): void;
}
