import { stripe } from "@/lib/stripe";
import { getLoggedUserFromHeader } from "@/services/auth";
import { createNewOrder } from "@/services/order";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const headers_list = await headers();
    const origin_url = headers_list.get('origin');

    const { cart } = await request.json();

    const user = await getLoggedUserFromHeader();

    if (!user) return NextResponse.json({
        success: false,
        message: "Não foi encontrado nenhum usuário logado"
    })

    if (!cart || (cart && cart.length <= 0)) return NextResponse.json({
        success: false,
        message: "Carrinho vazio"
    })

    const order = await createNewOrder(user.id, cart);
    if (!order) return NextResponse.json({
        success: false,
        message: "Ocorreu um erro ao criar o pedido"
    });

    const payment_items = [];
    for(let item of order.orderProducts) {
        payment_items.push({
            price_data: {
                currency: 'BRL',
                unit_amount: parseFloat(item.product.price.toString()) * 100,
                product_data: {
                    name: item.product.name
                }
            },
            quantity: item.quantity
        })
    }

    const payment_session = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${origin_url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin_url}`,
        line_items: payment_items,
        customer_email: user.email,
        shipping_options: [
            {
                shipping_rate_data: {
                    type: 'fixed_amount',
                    display_name: 'Frete padrão',
                    fixed_amount: {
                        currency: 'BRL',
                        amount: 1000
                    }
                }
            }
        ],
        metadata: {
            order_id: order.id
        }
    })

    return NextResponse.json({
        success: true,
        order,
        url: payment_session.url
    }, { status: 201 });
}