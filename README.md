# Keycat

A cross-platform keycast program that uses [Tauri (2.0)](https://beta.tauri.app/), [SolidJS](https://solidjs.com/) and [rdev](https://github.com/fufesou/rdev).

## Roadmap

- [x] Display a chat using key strokes.
- [ ] Display key strokes history (like a log).
- [ ] Add a trayer to manage the program
  - [ ] Switch to keystrokes
  - [ ] Switch to chat
  - [ ] Pause/Resume
  - [ ] Settings
  - [ ] Reset
  - [ ] About
  - [ ] Exit

## Alternatives

- [bubbly](https://github.com/siduck/bubbly) : uses `xinput` to fetch the keys and puts them into an `eww` widget.
- [showmethekey](https://github.com/AlynxZhou/showmethekey) : uses `libinput` and GTK.

## Development

### IDE

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

### Getting started

```bash
pnpm install
pnpm tauri dev
```
