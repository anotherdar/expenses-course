import { createStore } from 'zustand/vanilla';
import { persist } from 'zustand/middleware';

const expensesStore = createStore(
    persist(
        (set, get) => {
            return {
                expenses: [],
                add: (expense) => set({ expenses: [...get().expenses, expense] }),
                remove: (expenseIndex) => {
                    const expenses = [...get().expenses];
                    expenses.splice(expenseIndex, 1);
                    set({ expenses });
                },
            }
        }, 
        { name: 'expenses' }
    )
);

export { expensesStore };