import { create } from 'zustand';

const useStore = create((set) => ({
  authStatus: null, // initially unknown
  user: null,
  login: (user) => set({ authStatus: true, user }),
  logout: () => {
    localStorage.removeItem('token');
    set({ authStatus: false, user: null });
  },
}));

export default useStore;
