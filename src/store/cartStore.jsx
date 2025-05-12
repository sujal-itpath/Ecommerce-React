// src/store/cartStore.js
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const getUserId = () => localStorage.getItem('userId') || 'guest';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const exists = get().cartItems.find((item) => item.id === product.id);
        if (exists) {
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, { ...product, quantity: 1 }],
          });
        }
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set({
          cartItems: get().cartItems.map((item) =>
            item.id === productId ? { ...item, quantity } : item
          ),
        });
      },

      removeFromCart: (id) =>
        set({
          cartItems: get().cartItems.filter((item) => item.id !== id),
        }),

      clearCart: () => set({ cartItems: [] }),

      getCartTotal: () =>
        get().cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),

      getCartCount: () =>
        get().cartItems.reduce((count, item) => count + item.quantity, 0),

      syncOnLogout: () => {
        const userId = getUserId();
        if (!userId) set({ cartItems: [] });
      },
    }),
    {
      name: `cart_${getUserId()}`, // dynamic key
      getStorage: () => localStorage,
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);
