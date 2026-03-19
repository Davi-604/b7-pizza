import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types/CartItem";

export const createNewOrder = async (user_id: number, cart: CartItem[]) => {
    const new_order = await prisma.order.create({
        data: {
            user_id,
        }
    })

    for (let cart_item of cart) {
        await prisma.orderProducts.create({
            data: {
                order_id: new_order.id,
                product_id: cart_item.product_id,
                quantity: cart_item.quantity
            }
        })
    }

    return new_order;
}