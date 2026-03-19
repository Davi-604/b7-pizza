'use client'

import { useCart } from "@/stores/cart"
import { Button } from "../ui/button";
import { useProducts } from "@/stores/products";
import { useEffect, useState } from "react";
import { decimalToMoney } from "@/lib/utils";
import { CartProduct } from "./CartProduct";
import { useAuth } from "@/stores/auth";
import { auth_api } from "@/lib/axios";

export const CartList = () => {
    const auth = useAuth();
    const cart = useCart();
    const products = useProducts();

    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(10);

    const calculateSubtotal = () => {
        let count = 0;

        for (let i in cart.items) {
            const product = products.products.find((prod) => prod.id === cart.items[i].product_id);

            if (product) {
                count += (parseFloat(product.price.toString()) * cart.items[i].quantity);
            }

            setSubtotal(count);
        }
    }

    useEffect(() => calculateSubtotal(), [cart]);

    const handleFinishOrder = async () => {
        if (cart.items.length <= 0) return;
        
        const req = await auth_api.post('/order/new', {
            cart: cart.items
        });
    }

    return (
        <>
            <div className="flex flex-col gap-3 my-5">
                {cart.items.map((item, id) => (
                    <CartProduct 
                        key={id}
                        data={item}
                    />
                ))}
            </div>
            <div className="my-4 text-right">
                <div className="text-sm">
                    Subtotal: {decimalToMoney(subtotal)}
                </div>
                <div className="text-sm">
                    Frete: {decimalToMoney(shipping)}
                </div>
                <div className="font-bold mt-2">
                    Total: {decimalToMoney(subtotal + shipping)}
                </div>
            </div>
            
            {auth.token && 
                <Button onClick={() => handleFinishOrder()} className="bg-green-700 hover:bg-green-900">
                    Finalizar Compra
                </Button>
            } 
            
            {!auth.token && 
                <Button onClick={() => auth.setOpen(true)}>
                    Login / Cadastro
                </Button>
            } 
        </>
    )
}