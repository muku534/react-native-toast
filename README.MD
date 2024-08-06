
# react-native-toast


## Demo

Animated toast message component for React Native.
![Demo GIF](https://github.com/muku534/react-native-toast/blob/master/docs/Toast.gif)



## Features

- 🚀 Imperative API
- 🎨 Customizable layouts
- 🔧 Flexible config
- 📅 Promise Handling
- 📍 Position Control



## Installation

```bash
npm install rn-toastify
```
    
## Usage

To integrate the toast notifications into your application, follow these steps:

- Import and Setup

Start by importing the necessary components and hooks from the library:

```javascript
import useToast from 'react-native-toast-library-name';
import ToastContainer from 'react-native-toast-library-name';

const AppContent = () => {
  // Toast functions here

  return (
    <View style={styles.container}>
      {/* Buttons to trigger toasts */}
      <ToastContainer />
    </View>
  );
};

export default AppContent;

```

- Implementing Toasts

The useToast hook provides access to different types of toasts. Below are examples of how to implement each toast type:

- Success Toast
```javascript
import useToast from 'react-native-toast-library-name';

const { success } = useToast();

const handleSuccessToast = () => {
  success('Operation was successful!', { duration: 1500, position: 'top' });
};


```
- Error Toast
```javascript
import useToast from 'react-native-toast-library-name';

const { error } = useToast();

const handleErrorToast = () => {
  error('Something went wrong!', { duration: 1500, position: 'top' });
};


```

- Promise Toast
```javascript
import useToast from 'react-native-toast-library-name';

const { promise } = useToast();

const handlePromiseToast = () => {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
      // reject();
    }, 1500);
  });

  promise(myPromise, {
    loading: 'Loading...',
    success: 'Promise resolved!',
    error: 'Promise rejected!',
  });
};


```

- Custom Toast
```javascript
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import useToast from 'rn-toastify';

const { custom } = useToast();

const handleCustomToast = () => {
  custom(
    <View style={styles.customContent}>
      <Image
        style={styles.image}
        source={{
          uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80',
        }}
      />
      <View style={styles.textContainer}>
        <Text style={styles.customText}>Emilia Gates</Text>
        <Text style={styles.customSubText}>Sure! 8:30pm works great!</Text>
      </View>
    </View>,
    { duration: 1500, position: 'top' }
  );
};

const styles = StyleSheet.create({
  customContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginLeft: 10,
  },
  customText: {
    fontWeight: 'bold',
  },
  customSubText: {
    color: 'gray',
  },
});

```

- Emoji Toast
```javascript
import useToast from 'react-native-toast-library-name';

const { emoji } = useToast();

const handleEmojiToast = () => {
  emoji('Great job!', '👍', { duration: 1500, position: 'top' });
};

```

- Full Example

Here's a complete example to demonstrate how all the toast types can be implemented within a single component:

```javascript
import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import useToast from 'rn-toastify';
import ToastContainer from 'rn-toastify';

const AppContent = () => {
  const { success, error, promise, custom, emoji } = useToast();

  return (
    <View style={styles.container}>
      <Button title="Show Success Toast" onPress={() => success('Operation was successful!', { duration: 1500, position: 'top' })} />
      <Button title="Show Error Toast" onPress={() => error('Something went wrong!', { duration: 1500, position: 'top' })} />
      <Button title="Show Promise Toast" onPress={() => {
        const myPromise = new Promise((resolve) => setTimeout(resolve, 1500));
        promise(myPromise, { loading: 'Loading...', success: 'Promise resolved!', error: 'Promise rejected!' });
      }} />
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
