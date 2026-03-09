'use client'

import { useCart } from "@/stores/cart"
import { Button } from "../ui/button"

export const CartEmpty = () => {
    const cart = useCart();

    return (
        <div className="my-10 text-center">
            <p className="mb-4">
                Carrinho vazio
            </p>
            <Button onClick={() => cart.setOpen(false)}>
                Fechar
            </Button>
        </div>
    )
}