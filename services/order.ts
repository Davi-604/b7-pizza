import { prisma } from "@/lib/prisma";
import { CartItem } from "@/types/CartItem";

export const createNewOrder = async (user_id: number, cart: CartItem[]) => {
    const order_products = [];
    let subtotal = 0;

    for (let cart_item of cart) {
        const product = await prisma.product.findUnique({
            where: { id: cart_item.product_id }
        });

        if (product) {
            order_products.push({
                product_id: product.id,
                price: parseFloat(product.price.toString()),
                quantity: cart_item.quantity
            });

            subtotal += cart_item.quantity * parseFloat(product.price.toString());
        }
    }

    const new_order = await prisma.order.create({
        data: {
            user_id,
            subtotal,
            orderProducts: {
                createMany: {
                    data: order_products
                }
            }
        }
    })

    return new_order;
}