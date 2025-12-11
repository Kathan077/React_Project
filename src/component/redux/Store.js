import { legacy_createStore as createStore } from "redux";
import { myReducer } from "./Reducer";

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    if (serializedCart === null) {
      return [];
    }
    return JSON.parse(serializedCart);
  } catch (err) {
    console.error('Error loading cart from localStorage:', err);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

// Create store with initial state from localStorage
export const myStore = createStore(
  myReducer,
  loadCartFromStorage()
);

// Subscribe to store changes and save to localStorage
myStore.subscribe(() => {
  saveCartToStorage(myStore.getState());
});