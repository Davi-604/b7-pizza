import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
    const headers_list = await headers();

    const stripe_signature = headers_list.get('stripe-signature');
    const raw_body = await request.text();

    try {
        const event = stripe.webhooks.constructEvent(
            raw_body, stripe_signature!, process.env.STRIPE_WEBHOOK_KEY!
        );

        const allowed_event_types = ['checkout.session.completed', 'checkout.session.async_payment_succeeded']

        if (allowed_event_types.includes(event.type)) {
            const stripe_session = event.data.object as Stripe.Checkout.Session;
            const { metadata, payment_status } = stripe_session;

            if (payment_status === 'paid') {
                const order_id = Number(metadata?.order_id);

                if (order_id) {
                    const order = await prisma.order.findUnique({
                        where: { id: order_id }
                    });

                    if (order) {
                        await prisma.order.update({
                            where: { id: order_id },
                            data: { status: 'PAID' }
                        })
                    }
                }
            }
        }

        return NextResponse.json({ success: true });
    } catch (err: any) {
        console.log(err.message);

        return NextResponse.json({
            success: false,
            message: `Webhook Error: ${err.message}`
        }, { status: 500 });
    }
}