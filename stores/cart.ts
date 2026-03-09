import { CartItem } from "@/types/CartItem"
import { create } from "zustand";

type Store = {
    open: boolean;
    setOpen: (open: boolean) => void;

    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (product_id: number) => void;
}

export const useCart = create<Store>()((set) => ({
    open: false,
    setOpen: (open) => set(state => ({...state, open})),
    items: [],
    addItem: (item) => set(state => {
        let cloned_items = [...state.items];
        const existing_item = state.items.find((i) => i.product_id === item.product_id);
        
        if (existing_item) {
            for (let i in cloned_items) {
                if (cloned_items[i].product_id === item.product_id) {
                    cloned_items[i].quantity += item.quantity
                }
            }
        } else {
            cloned_items.push(item);
        }

        return {...state, items: cloned_items}
    }),
    removeItem: (product_id) => set(state => ({
        items: state.items.filter(item => item.product_id !== product_id)
    }))
}))
