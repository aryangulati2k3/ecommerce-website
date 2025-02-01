'use client';

import React, { createContext, useReducer, useContext, ReactNode } from 'react';

// Define your Product interface (adapt as needed for Fake Store API)
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

// A CartItem couples a product with a quantity.
export type CartItem = {
  product: Product;
  quantity: number;
};

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_TO_CART'; product: Product }
  | { type: 'REMOVE_FROM_CART'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' };

interface CartContextProps {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

// Create the context.
const CartContext = createContext<CartContextProps | undefined>(undefined);

// The reducer updates cart state based on action types.
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id,
      );
      if (existingItem) {
        // If the product is already in the cart, increase its quantity.
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        // Otherwise, add the product with an initial quantity of 1.
        return {
          items: [...state.items, { product: action.product, quantity: 1 }],
        };
      }
    }
    case 'REMOVE_FROM_CART': {
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.productId,
        ),
      };
    }
    case 'UPDATE_QUANTITY': {
      return {
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item,
        ),
      };
    }
    case 'CLEAR_CART': {
      return { items: [] };
    }
    default:
      return state;
  }
};

// The provider wraps your app and makes the cart state available.
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// A custom hook for easy cart context access.
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
