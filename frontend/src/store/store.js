import { create } from 'zustand';

const useStore = create((set) => ({
    authStatus: false,
    login: () => {
        set({ authStatus: true });
    },
    logout: () => {
        set({ authStatus: false });
    }
}))

export default useStore;