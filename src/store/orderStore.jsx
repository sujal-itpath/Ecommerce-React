import { create } from 'zustand';

const useOrderStore = create((set) => ({
  orders: [],
  
  // Load orders from localStorage
  loadOrders: () => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      const savedOrders = localStorage.getItem(`orders_${userId}`);
      if (savedOrders) {
        set({ orders: JSON.parse(savedOrders) });
      }
    }
  },

  // Add new order
  addOrder: (order) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      set((state) => {
        const newOrders = [...state.orders, order];
        localStorage.setItem(`orders_${userId}`, JSON.stringify(newOrders));
        return { orders: newOrders };
      });
    }
  },

  // Remove order
  removeOrder: (orderId) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      set((state) => {
        const newOrders = state.orders.filter(order => order.id !== orderId);
        localStorage.setItem(`orders_${userId}`, JSON.stringify(newOrders));
        return { orders: newOrders };
      });
    }
  },

  // Clear orders (for logout)
  clearOrders: () => {
    set({ orders: [] });
  }
}));

export default useOrderStore; 