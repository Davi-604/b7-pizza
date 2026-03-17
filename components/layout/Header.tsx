import Link from "next/link"
import { CartButton } from "../cart/CartButton"
import { LoginButton } from "../login/LoginButton"
import { cookies } from "next/headers"

export const Header = async () => {
    const cookie_store = await cookies();

    const token = cookie_store.get('token');

    return (
        <header className="container mx-auto flex my-4 p-5 items-center justify-between bg-secondary rounded-md">
            <Link href="/">
                <div className="text-2xl font-bold">
                    B7 Pizza
                </div>
            </Link>
            <div className="flex gap-2">
                <LoginButton initial_state={ token ? true : false }/>
                <CartButton />
            </div>
        </header>
    )
}