import React, { createContext, useContext, useEffect } from 'react';
import create from 'zustand';

const useStore = create((set) => ({
  // Define your Zustand state here
  // e.g. count: 0,
  // increment: () => set((state) => ({ count: state.count + 1 })),
}));

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  const store = useStore();

  useEffect(() => {
    // Hydrate Zustand state if needed
    const storedState = localStorage.getItem('zustandState');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      // Set the Zustand state here
      // e.g. store.setState(parsedState);
    }
  }, [store]);

  useEffect(() => {
    // Save Zustand state to local storage
    const unsubscribe = store.subscribe((state) => {
      localStorage.setItem('zustandState', JSON.stringify(state));
    });
    return () => {
      unsubscribe();
    };
  }, [store]);

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useGlobalStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useGlobalStore must be used within a StoreProvider');
  }
  return context;
};
