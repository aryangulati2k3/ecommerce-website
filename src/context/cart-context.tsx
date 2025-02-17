/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import React, {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

import type {
  Product,
  CartItem,
  CartState,
  CartAction,
  CartContextProps,
} from '@/lib/api';

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.items.find(
        (item) => item.product.id === action.product.id,
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
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

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [] },
    (initialState) => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : initialState;
      }
      return initialState;
    },
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
