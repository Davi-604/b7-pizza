import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs";
import { headers } from "next/headers";
import { v4 } from "uuid"

export const hasEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    return user ? true : false;
}

export const validateAuth = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) return false;

    if (!bcrypt.compareSync(password, user.password)) return false;

    return {
        id: user.id,
        name: user.name,
        email: user.email
    }
}

export const createUser = async (name: string, email: string, password: string) => {
    try {
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcrypt.hashSync(password, 10)
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    } catch (err) {
        return null;
    }
}

export const createUserToken = async (user_id: number) => {
    try {
        const token = v4();

        await prisma.user.update({
            where: { id: user_id },
            data: { token: token }
        })

        return token
    } catch (err) {
        return false
    }
}

export const getLoggedUserFromHeader = async () => {
    const headers_list = await headers();

    const authorization = headers_list.get('authorization')?.split(' ');
    if (!authorization) return null;

    if (authorization[0] !== 'Token') return null;

    const token = authorization[1];
    if (!token) return null;

    const user = await prisma.user.findFirst({ 
        select: { id: true, name: true, email: true },
        where: { token: token } 
    });

    return user;
}
