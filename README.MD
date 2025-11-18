# React Native Toastify

A highly customizable and performant toast notification library for React Native. Featuring smooth animations, swipe gestures, and flexible styling options.

![Demo GIF](https://github.com/muku534/react-native-toast/blob/master/docs/Toast.gif)

---

## 🚀 Features

- **Single-root container**: Mount once at the app root.
- **Imperative API**: Use `useToast` hook anywhere in your app.
- **Light/Dark Theme**: System-aware with optional forced theme.
- **Promise Helper**: Show loading, success, and error states.
- **Customizable**: Add custom content, styles, and emojis.

---

## 📦 Installation

Install the package using npm or yarn:

```bash
npm install rn-toastify
```

Or:

```bash
yarn add rn-toastify
```

### Peer Dependencies

Ensure the following peer dependencies are installed:

- `react`
- `react-native`
- `react-native-reanimated` (v2+)
- `lottie-react-native`

For iOS, run:

```bash
cd ios && pod install
```

---

## 🛠️ Quick Start

### Step 1: Mount the Toast Container

Add the `ToastContainer` to your app's root component (e.g., `App.js`):

```javascript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigation';
import { ToastContainer } from 'rn-toastify';

export default function App() {
  return (
    <>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      <ToastContainer theme="dark" /> {/* Optional: Force theme */}
    </>
  );
}
```

### Step 2: Use the `useToast` Hook

Call toast methods anywhere in your app:

```javascript
import React from 'react';
import { View, Button } from 'react-native';
import useToast from 'rn-toastify';

export default function HomeScreen() {
  const { success, error } = useToast();

  return (
    <View>
      <Button title="Show Success" onPress={() => success('Operation successful!')} />
      <Button title="Show Error" onPress={() => error('Something went wrong.', { position: 'top' })} />
    </View>
  );
}
```

---

## 📖 API Reference

### `useToast` Hook

The `useToast` hook provides the following methods:

| Method   | Description                          |
|----------|--------------------------------------|
| `show`   | Display a custom toast.              |
| `success`| Show a success toast.                |
| `error`  | Show an error toast.                 |
| `custom` | Render a custom React element.       |
| `emoji`  | Display a toast with an emoji.       |
| `promise`| Handle promise states with toasts.   |

### Common Options

| Option     | Type     | Description                          |
|------------|----------|--------------------------------------|
| `duration` | `number` | Duration in milliseconds.            |
| `position` | `string` | `'top' | 'bottom' | 'center'`.       |
| `style`    | `object` | Custom styles for the toast wrapper. |

### `promise` Method Options

| Option     | Type     | Description                          |
|------------|----------|--------------------------------------|
| `loading`  | `string` | Message during loading.              |
| `success`  | `string` | Message on success.                  |
| `error`    | `string` | Message on error.                    |

---

## 🌈 Examples

### Success Toast

```javascript
const { success } = useToast();
success('Operation successful!', { duration: 1500, position: 'top' });
```

### Promise Helper

```javascript
const { promise } = useToast();

const myPromise = fetch('/api/save');

promise(myPromise, {
  loading: 'Saving…',
  success: 'Saved successfully!',
  error: 'Save failed.',
});
```

### Custom Content

```javascript
const { custom } = useToast();
custom(<MyCustomComponent />, { duration: 2000 });
```

### Emoji Toast

```javascript
const { emoji } = useToast();
emoji('Great job!', '🎉', { duration: 1300 });
```

---

## 🎨 Theme Support

- **Automatic**: Detects system theme (light/dark).
- **Forced**: Pass `theme="light"` or `theme="dark"` to `ToastContainer`.

If the system theme is unavailable, the default is `light`.

---

## 🐛 Troubleshooting

### Common Issues

- **Toasts not showing**: Ensure `ToastContainer` is mounted at the app root.
- **Reanimated errors**: Add the Reanimated Babel plugin and rebuild.
- **Lottie issues on iOS**: Run `cd ios && pod install`.

---

## 📜 License

MIT License. See [LICENSE](./LICENSE) for details.
