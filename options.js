// In React Navigation, the `navigation` object provides various methods to control navigation between screens. Here's a list of the most commonly used functions on the `navigation` object:

// ### **1. `navigate(name, params)`**
//    - Navigates to a screen in the navigation stack.
//    - **Parameters:**
//      - `name`: The name of the screen to navigate to.
//      - `params`: Optional parameters to pass to the destination screen.

//    ```javascript
//    navigation.navigate('Details', { itemId: 42 });
//    ```

// ### **2. `goBack()`**
//    - Goes back to the previous screen in the navigation stack.

//    ```javascript
//    navigation.goBack();
//    ```

// ### **3. `push(name, params)`**
//    - Similar to `navigate`, but pushes a new instance of the screen onto the stack, even if it's already in the stack.
//    - **Parameters:**
//      - `name`: The name of the screen to push.
//      - `params`: Optional parameters to pass to the screen.

//    ```javascript
//    navigation.push('Details', { itemId: 42 });
//    ```

// ### **4. `pop(number)`**
//    - Pops the current screen off the stack and goes back to the previous screen. You can specify how many screens to pop.
//    - **Parameters:**
//      - `number`: The number of screens to pop. Defaults to 1.

//    ```javascript
//    navigation.pop();
//    navigation.pop(2); // Pops two screens
//    ```

// ### **5. `popToTop()`**
//    - Pops all the screens off the stack except the first one, effectively going back to the top screen.

//    ```javascript
//    navigation.popToTop();
//    ```

// ### **6. `replace(name, params)`**
//    - Replaces the current screen with a new one in the stack.
//    - **Parameters:**
//      - `name`: The name of the screen to navigate to.
//      - `params`: Optional parameters to pass to the new screen.

//    ```javascript
//    navigation.replace('Details', { itemId: 42 });
//    ```

// ### **7. `reset(state)`**
//    - Resets the navigation state to the provided state, which can be used to reset the stack to a specific set of screens.
//    - **Parameters:**
//      - `state`: An object representing the new navigation state.

//    ```javascript
//    navigation.reset({
//      index: 0,
//      routes: [{ name: 'Home' }],
//    });
//    ```

// ### **8. `setParams(params)`**
//    - Sets the params for the current screen.
//    - **Parameters:**
//      - `params`: An object with the new parameters.

//    ```javascript
//    navigation.setParams({ itemId: 42 });
//    ```

// ### **9. `dispatch(action)`**
//    - Dispatches an action to the navigation router.
//    - **Parameters:**
//      - `action`: An action object, such as a navigation action.

//    ```javascript
//    navigation.dispatch(StackActions.popToTop());
//    ```

// ### **10. `addListener(event, callback)`**
//    - Adds an event listener to the navigation prop.
//    - **Parameters:**
//      - `event`: The name of the event (e.g., `focus`, `blur`).
//      - `callback`: The function to be called when the event occurs.

//    ```javascript
//    navigation.addListener('focus', () => {
//      // Do something
//    });
//    ```

// ### **11. `removeListener(event, callback)`**
//    - Removes an event listener from the navigation prop.
//    - **Parameters:**
//      - `event`: The name of the event.
//      - `callback`: The function to remove.

//    ```javascript
//    navigation.removeListener('focus', callback);
//    ```

// ### **12. `canGoBack()`**
//    - Returns a boolean indicating whether there is a previous screen to go back to.

//    ```javascript
//    if (navigation.canGoBack()) {
//      navigation.goBack();
//    }
//    ```

// ### **13. `getParent(id)`**
//    - Returns the parent navigator, optionally filtered by an `id`.

//    ```javascript
//    const parentNavigation = navigation.getParent();
//    ```

// ### **14. `isFocused()`**
//    - Returns a boolean indicating whether the screen is focused.

//    ```javascript
//    if (navigation.isFocused()) {
//      // Screen is focused
//    }
//    ```

// ### **15. `setOptions(options)`**
//    - Dynamically set the options (e.g., title, header) for the current screen.
//    - **Parameters:**
//      - `options`: An object containing the new options.

//    ```javascript
//    navigation.setOptions({ title: 'New Title' });
//    ```

// ### **16. `dangerouslyGetState()`**
//    - Returns the navigation state for the navigator.

//    ```javascript
//    const state = navigation.dangerouslyGetState();
//    ```

// ### **17. `getState()`**
//    - Gets the current navigation state.

//    ```javascript
//    const state = navigation.getState();
//    ```

// These functions provide the flexibility to manage navigation within your app, allowing you to navigate between screens, control the navigation stack, and respond to navigation events.