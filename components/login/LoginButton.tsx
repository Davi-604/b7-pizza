"use client"

import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import Link from "next/link"
import { useAuth } from "@/stores/auth"

type Props = {
    initial_state: boolean
}

export const LoginButton = ({ initial_state }: Props) => {
    const auth = useAuth();
    const [auth_state, setAuthState] = useState<boolean>(initial_state)

    useEffect(() => {
        setAuthState(auth.token ? true : false);
    }, [auth])

    const handleLogout = () => {
        auth.setToken(null);
    }
 
    if (auth_state) {
        return (
            <>
                <Link href='/pedidos'>
                    <Button>
                        Meus Pedidos
                    </Button>
                </Link>
                <Button onClick={handleLogout}>
                    Sair
                </Button>
            </>
        )
    }

    return (
        <Button onClick={() => auth.setOpen(true)}>
            Login / Cadastro
        </Button>
    )
}