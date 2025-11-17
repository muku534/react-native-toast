
# react-native-toast


## Demo

Animated toast message component for React Native.
 # rn-toastify (react-native-toast)

Animated, customizable toast notifications for React Native with a simple imperative API, responsive animations, and built-in light/dark theme support.

Demo GIF: https://github.com/muku534/react-native-toast/blob/master/docs/Toast.gif

## Key features

- Single-root container (mount once at App entry)
- Imperative hook API (useToast) — call from anywhere in your component tree
- System-aware light/dark theme with optional forced theme
- Promise helper (loading → success/error)
- Custom content and emoji toasts

## Installation

```bash
npm install rn-toastify
```

Or with yarn:

```bash
yarn add rn-toastify
```

## Quick start (recommended)

1. Mount a single `ToastContainer` at the top of your app (App.js). This container listens to the package singleton manager and renders toasts from anywhere in the app.

App.js

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation';
import useToast, { ToastContainer } from 'rn-toastify';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>

      {/* Mount once at root. Optionally force theme: <ToastContainer theme="dark" /> */}
      <ToastContainer />
    </>
  );
}
```

2. Use the `useToast()` hook anywhere in your app (inside React function components):

```javascript
import React from 'react';
import { View, Button } from 'react-native';
import useToast from 'rn-toastify';

export default function HomeScreen() {
  const { success, error, promise, custom, emoji } = useToast();

  return (
    <View>
      <Button title="Success" onPress={() => success('Saved successfully')} />
      <Button title="Error" onPress={() => error('Failed to save', { position: 'top' })} />
    </View>
  );
}
```

## API (summary)

`useToast()` returns an object with convenience methods:

- `show(content, options)` — show a raw element or text (content can be a React element)
- `success(messageOrElement, options)`
- `error(messageOrElement, options)`
- `custom(element, options)`
- `emoji(message, emojiChar, options)`
- `promise(promise, { loading, success, error }, options)`

### Options (common)

- `duration`: number (milliseconds). Use `Infinity` for persistent toasts.
- `position`: `'top' | 'bottom' | 'center'`
- `style`: object — custom style to apply to the toast wrapper

## Examples

Success toast

```javascript
const { success } = useToast();
success('Operation successful', { duration: 1500, position: 'top' });
```

Promise helper

```javascript
const { promise } = useToast();

const myPromise = fetch('/api/save');

promise(myPromise, {
  loading: 'Saving…',
  success: 'Saved!',
  error: 'Save failed',
});
```

Custom content

```javascript
const { custom } = useToast();
custom(<MyCustomView />, { duration: 2000 });
```

Emoji toast

```javascript
const { emoji } = useToast();
emoji('Great job!', '👍', { duration: 1300 });
```

## Theme

- By default `ToastContainer` detects the system color scheme (via `Appearance`) and passes a `theme` prop to visual toast components.
- To force a theme, mount the container with `theme`:

```jsx
<ToastContainer theme="dark" />
```

If the system color scheme is unavailable, the toast theme defaults to `light`.

## Compatibility & installation notes

- Peer dependencies: `react`, `react-native`, `react-native-reanimated` (v2+), `lottie-react-native` (if using animations). Install and link those in your app. See `package.json`.
- Reanimated setup: add `react-native-reanimated/plugin` to `babel.config.js` as the last plugin.
- iOS: run `cd ios && pod install` on macOS after installing native dependencies.

## Import styles

This package exports a default `useToast` hook and named exports. Both of the following work:

```javascript
// ES default + named
import useToast, { ToastContainer } from 'rn-toastify';

// CommonJS
const rnToastify = require('rn-toastify');
const useToast = rnToastify.useToast || rnToastify.default;
const { ToastContainer } = rnToastify;
```

## Troubleshooting

- Crash on app start / `_rnToastify.default is not a function`:
  - Clear Metro cache and rebuild: `npx react-native start --reset-cache` and rebuild the app.
  - Ensure your app resolves the package's `index.js` correctly (this package exports a CommonJS-friendly entry to avoid interop issues).

- Reanimated-related errors:
  - Add the Reanimated babel plugin and rebuild the app. See Reanimated installation docs.

- Lottie errors on iOS:
  - Run `cd ios && pod install` and rebuild from Xcode.

- Toasts not showing:
  - Make sure `ToastContainer` is mounted once at the app root.
  - Ensure native peer dependencies are installed and app rebuilt.

## Publishing & versioning

When you're ready to release this change to npm:

1. Update the package version in `package.json` (or run `npm version patch|minor|major`).
2. Run tests and build (if any): `npm test`.
3. Pack and inspect: `npm pack`.
4. Publish: `npm publish --access public` (make sure you're logged in via `npm login`).

## Contributing

PRs welcome. Please open an issue if you find bugs or want features like scoped containers, configurable color tokens, or example apps.

## License

MIT
      <Button title="Show Custom Toast" onPress={() => custom(
        <View style={styles.customContent}>
          <Text>Custom Toast Content</Text>
        </View>, 
        { duration: 1500, position: 'top' }
      )} />
      <Button title="Show Emoji Toast" onPress={() => emoji('Great job!', '👍', { duration: 1500, position: 'top' })} />
      <ToastContainer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customContent: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
});

export default AppContent;
```
This example integrates multiple toast types and demonstrates how to trigger each one. It also includes the necessary ToastContainer to display the toasts.

Theme and single-root notes
- Mount `ToastContainer` once at the app root (recommended). The container detects the system color scheme by default and passes a `theme` prop to all toast components.
- To force a theme, pass `theme="dark"` or `theme="light"` to `<ToastContainer />`.
- If the system color scheme is unavailable, the toast theme defaults to `light`.


## API Reference

#### useToast Hook Methods
All toast methods accept the following parameters:

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `message` | `string` | **Required**. The message to display in the toast. |
| `options` | `object` | **Optional**. Configuration options for the toast (e.g., duration, position). |


- Methods

- success : Displays a success toast.

- error : Displays an error toast.

- promise : Handles a promise and displays loading, success, and error toasts based on the promise's state.

Additional options for promise method:
| Option | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `loading` | `string` | The message to display in the toast. |
| `success` | `string` | Message to display if the promise resolves. |
| `error` | `string` | Message to display if the promise is rejected. |

- custom

Displays a custom toast with your own content.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `content` | `element` |  **Required**. React element to render in the toast. |

- emoji

Displays a custom toast with your own content.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `emoji` | `string` |  **Required**. The emoji to display alongside the message. |

- options

All toast methods accept an options object for configuration:

| Option | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `duration` | `number` |**Optional**. Duration in milliseconds for which the toast is visible. |
| `position` | `string` | **Optional**. Position of the toast on the screen (top, bottom, center). |

## License

[MIT](https://choosealicense.com/licenses/mit/)
