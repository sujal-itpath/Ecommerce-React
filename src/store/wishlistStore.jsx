// src/store/wishlistStore.js
import { create } from 'zustand';

// Load initial state from localStorage
const loadWishlist = () => {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) return [];
    
    const savedWishlist = localStorage.getItem(`wishlist_${userId}`);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
    return [];
  }
};

export const useWishlistStore = create((set) => ({
  wishlist: loadWishlist(),
  toggleWishlist: (product) =>
    set((state) => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User must be logged in to modify wishlist');
        return state;
      }

      const exists = state.wishlist.some((p) => p.id === product.id);
      const newWishlist = exists
        ? state.wishlist.filter((p) => p.id !== product.id)
        : [...state.wishlist, product];
      
      // Save to localStorage with user-specific key
      try {
        localStorage.setItem(`wishlist_${userId}`, JSON.stringify(newWishlist));
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error);
      }
      
      return { wishlist: newWishlist };
    }),
}));

// Listen for storage changes (e.g., when user logs out)
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === 'userId' && !event.newValue) {
      // Clear wishlist when user logs out
      useWishlistStore.setState({ wishlist: [] });
    }
  });
}
