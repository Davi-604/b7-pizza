import { createUser, createUserToken, hasEmail } from "@/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return NextResponse.json({
            error: "Campos incompletos"
        })
    }

    const has = await hasEmail(email);
    if (!has) return NextResponse.json({ 
        error: "E-mail já cadastrado no sistema" 
    });

    const new_user = await createUser(name, email, password);
    if (!new_user) return NextResponse.json({ 
        error: "Erro ao criar usuário" 
    });

    const token = await createUserToken(new_user.id);

    return NextResponse.json({
        user: new_user, token
    }, { status: 201 });
}