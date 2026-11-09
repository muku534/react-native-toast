# Changelog

All notable changes to **rn-toastify** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [2.0.2] - 2026-11-09

### Added
- **Fluid Stack Gliding Physics**:
  - Implemented animated Reanimated shared value `stackY` inside `Toast.js`, driven by `stackIndex` and dynamic `stackSpacing`.
  - Configured a fluid 420ms cubic-bezier transition (`Easing.bezier(0.25, 0.1, 0.25, 1)`): when an older toast finishes and unmounts, any subsequent toasts beneath it smoothly and gracefully glide up into their new positions.
  - Added dynamic `zIndex: 9999 - stackIndex` layering on toast wrappers to guarantee older, topmost alerts visually layer above subsequent toasts.
- **Dynamic Stack Spacing**: Supported configurable `stackSpacing` prop forwarded from `ToastContainer` to `Toast` (defaults to `68px`).

### Fixed
- **Abrupt Stacking Snap / Bounce**:
  - Completely eliminated the jarring visual jump where lower toasts snapped instantly from `marginTop: 66px` to `0px` upon the removal of previous toasts.
- **Premature Toast Dismissal (Queue & Rapid Triggers)**:
  - Replaced immediate unmounting (`if (!visible) return null;`) with graceful animated exit (`if (!visible && !hasEnteredRef.current) return null;`). Dismissed toasts now always play their full collapse-to-circle and float-away exit animation without vanishing mid-flight.
  - Added timer cancellation references (`expandTimerRef`, `hideTimeoutRef`) in `Toast.js` to eliminate race conditions between entrance expansion and exit collapse when rapid events fire.
  - Enabled true FIFO queuing in `ToastManager.js`: when active toasts reach `maxVisible`, subsequent alerts are queued cleanly instead of abruptly interrupting active alerts mid-expansion. Queued toasts smoothly pop in as slots open up.
- **Text Border Slicing on Collapse**:
  - Tuned the text opacity interpolation range in `BaseToast.js` from `[0.3, 0.85]` to `[0.45, 0.9]`, ensuring text cleanly disappears before the capsule reaches circle diameter to prevent text clipping against the right border.

### Changed
- Refactored `ToastContainer.js` to remove static `marginTop: index * 66` and `bottom: hp(2) + index * 66` style calculations in favor of native-thread Reanimated transform translations.

---

## [2.0.1] - 2026-11-04

### Added
- **Apple Dynamic Island 2-Phase Circular Morph**:
  - **Entrance**: Toasts enter at the top as a compact, glowing round circular badge (`52×52px`), settle cleanly into place, and then fluidly expand horizontally into a sleek glassmorphic capsule.
  - **Exit**: Symmetrical exit animation where the capsule smoothly collapses back into the circular badge before floating upward into the Dynamic Island and fading out.
- **Adaptive Real-Time Theme Engine**:
  - Full automatic detection of system appearance via `Appearance.addChangeListener` for instant Light/Dark mode transitions.
  - Built-in glassmorphic color tokens, borders, and ambient drop shadows for both light (`#FFFFFF` with subtle slate borders) and dark (`#111726` with translucent white borders) modes.
  - Per-toast `theme` override (`'light' | 'dark' | 'auto'`) via `ToastOptions`.
- **Zero-Dependency Event System**:
  - Implemented an in-tree, lightweight `EventEmitter` inside `ToastManager.js` with zero external dependencies, replacing external polyfills.
- **Full TypeScript Definitions**:
  - Added `src/types.d.ts` with comprehensive typing for `ToastOptions`, `ToastContainerProps`, `UseToastReturn`, `PromiseOptions`, and `PromiseMessages`.

### Changed
- Overhauled `BaseToast.js` layout with dedicated `COLLAPSED_SIZE` (`52px`) and fixed `iconContainer` dimensions to guarantee zero horizontal layout shift or text reflow during morphing.
- Upgraded exit and entrance easing curves to custom cubic-bezier timing curves (`Easing.bezier(0.16, 1, 0.3, 1)` and `Easing.bezier(0.25, 0.1, 0.25, 1)`).

### Removed
- Removed legacy external `events` package dependency.
- Removed outdated `docs/Toast.gif` in favor of modernized high-res demo assets.

---

## [2.0.0] - 2026-05-14

### Added
- **Glassmorphic Floating Pill Design**:
  - Completely redesigned notification UI with rounded pill aesthetics, modern borders, and multi-layered elevation shadows.
- **React Native Reanimated Engine**:
  - Migrated core animations to `react-native-reanimated` (v3 / v4 compatible) for smooth 60fps native-thread performance.
- **Built-in Lightweight Vector Icons**:
  - Created standalone React Native vector icon components: `CheckIcon`, `CrossIcon`, `InfoIcon`, `WarningIcon`, and `LoadingSpinner`.
- **Async Promise API (`toast.promise`)**:
  - Added built-in promise resolution handler transitioning seamlessly from loading spinner to success or error states.
- **Swipe-to-Dismiss Gestures**:
  - Integrated `PanResponder` gesture handlers supporting horizontal fling dismiss and vertical swipe dismiss.
- **Keyboard Awareness**:
  - Bottom-positioned toasts dynamically observe keyboard events (`keyboardWillShow` / `keyboardDidShow`) and translate upward above the keyboard.
- **New Toast Variants**:
  - Added dedicated components: `SuccessToast`, `ErrorToast`, `InfoToast`, `WarningToast`, `LoadingToast`, `EmojiToast`, and `CustomToast`.

### Changed
- Restructured package exports in `index.js` to support both named and default imports cleanly (`useToast`, `ToastContainer`, `ToastManager`).
- Updated `ToastContainer` to support `defaultPosition`, `topOffset`, `bottomOffset`, and `maxVisible` queue limits.

### Removed
- **Removed Heavy `lottie-react-native` Dependency**: Removed Lottie animation JSON files and peer dependency in favor of ultra-lightweight Reanimated vector icons, drastically reducing bundle size.
- Removed legacy `CustomeToast.js` typo file.

---

## [1.0.12] - 2025-11-19

### Added
- Refactored toast design with smooth multi-layer shadow effects on iOS and Android.
- Optimized typography and font-size hierarchy for improved readability across varied screen densities.
- Enhanced package metadata and discoverability keywords in `package.json`.

---

## [1.0.11] - 2025-11-19

### Fixed
- Resolved top-positioned toast overlay conflicts with status bar notches on newer iOS and Android devices.
- Verified compatibility with React Native `0.81.0`.

---

## [1.0.10] - 2025-11-18

### Fixed
- Resolved edge-case layout positioning offsets for top and bottom toasts.
- Updated `README.MD` documentation and usage examples to conform with open-source industry standards.

---

## [1.0.9] - 2025-11-17

### Added
- Added foundation for toast theming and appearance modes.
- Singleton container lifecycle hardening to prevent duplicate mounts.

### Fixed
- Fixed packaging compatibility across React Native modern architectures.

---

## [1.0.8] - 2025-01-04

### Fixed
- Resolved minor import path and module resolution errors when consumed as an npm package in vanilla React Native and Expo projects.

---

## [1.0.7] - 2024-12-19

### Fixed
- Resolved layout measurement issue on dynamic screen sizes.
- Cleaned up build artifacts to optimize production npm package download size.

---

## [1.0.6] - 2024-11-26

### Added
- Re-introduced and improved `PanResponder` gesture handling for swipe-to-dismiss functionality.
- Enhanced hide transition animations with refined fade-out timing curves.

### Changed
- Refactored `ToastContainer` re-render cycles to reduce unnecessary layout passes.

---

## [1.0.5] - 2024-11-15

### Changed
- Removed unused files and assets to optimize library install size.
- Updated `README.MD` with official demo video and enhanced installation instructions.

---

## [1.0.4] - 2024-09-20

### Added
- Enhanced Toast component with dynamic positioning support (`top`, `center`, `bottom`).
- Added screen dimension utilities to compute safe margin offsets dynamically.

---

## [1.0.3] - 2024-08-08

### Changed
- Adjusted `peerDependencies` range for wider React Native compatibility.
- Temporarily disabled unstable swipe gestures to prevent interaction conflicts with scrollable screens.

---

## [1.0.2] - 2024-08-07

### Fixed
- Resolved packaging issue where `useToast` and `ToastContainer` imports failed in certain bundler environments.
- Corrected root index export mappings.

---

## [1.0.1] - 2024-08-06

### Added
- Jest unit testing setup and testing harness.
- Comprehensive `README.MD` with usage examples and installation guide.
- Added MIT `LICENSE`.

### Fixed
- Updated toast components to resolve prop forwarding issues.

---

## [1.0.0] - 2024-07-24

### Added
- Initial release of `rn-toastify`.
- Core notification management with `ToastManager` singleton.
- Top, center, and bottom toast positioning.
- Basic toast types: Success, Error, Info, Loader, and Custom.
- Auto-dismiss timers with configurable duration.
