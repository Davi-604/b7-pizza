import { getLoggedUserFromHeader } from "@/services/auth";
import { createNewOrder } from "@/services/order";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
    })

    return NextResponse.json({
        success: true
    });
}