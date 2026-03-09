import { create } from "zustand";
import { setCookie, deleteCookie } from 'cookies-next/client'

type Store = {
    token: string | null;
    setToken: (token: string | null) => void;

    open: boolean;
    setOpen: (open: boolean) => void;
}

export const useAuth = create<Store>()(set => ({
    token: null,
    setToken: (token) => set(state => {
        if (token) {
            setCookie('token', token);
        } else {
            deleteCookie('token');
        }

        return ({...state, token});
    }),

    open: false,
    setOpen: (open) => set(state => ({...state, open}))
}));