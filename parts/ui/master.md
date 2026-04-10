# UI Part

Render the todo app into a root DOM element.

## Behavior

- `render(root, view, actions)` builds/updates the DOM inside `root`
- Shows an input field at top for adding new todos (placeholder: "What needs to be done?")
- Enter key in input calls `actions.onAdd(text)` and clears the input
- Each todo shows its text and a delete button (×)
- Clicking a todo calls `actions.onToggle(id)`
- Completed todos have strikethrough text styling
- Double-clicking a todo enters edit mode (inline input, Enter to save, Escape to cancel)
- Three filter buttons: All, Active, Completed — highlight the active filter
- "Clear completed" button appears only when completed todos exist
- Footer shows: "{n} items left"
- Clean, minimal CSS — no external stylesheets

## Accessibility

- Input has a label
- Buttons have aria-labels
- Filter buttons indicate active state with aria-current

## Output

Generate `src/ui.ts` exporting `render` and `src/styles.css` for styling.
