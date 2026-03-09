'use client';

import { useCart } from "@/stores/cart";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";
import { useEffect, useState } from "react";
import { CartEmpty } from "./CartEmpty";
import { CartList } from "./CartList";

export const Cart = () => {
    const cart = useCart();

    const [open, setOpen] = useState(cart.open);

    useEffect(() => { setOpen(cart.open) }, [cart]);
    
    return (
        <Drawer
            direction="right"   
            open={open}
            onOpenChange={(open) => setOpen(open)}
        >
            <DrawerContent className="p-4">
                <DrawerTitle>
                    Carrinho
                </DrawerTitle>

                {cart.items.length <= 0 &&
                    <CartEmpty />
                }

                {cart.items.length > 0 &&
                    <CartList />
                }
            </DrawerContent>
        </Drawer>
    );
}