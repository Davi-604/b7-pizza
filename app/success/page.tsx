import { Header } from "@/components/layout/Header";
import { stripe } from "@/lib/stripe";
import { redirect } from 'next/navigation'

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Page({ searchParams }: Props) {
    const session_id = (await searchParams).session_id as string;
    if (!session_id) return redirect('/');

    const payment_session = await stripe.checkout.sessions.retrieve(session_id);
    if (!payment_session) return redirect('/');

    const customer_email = payment_session.customer_email;

    return (
        <div className="">
            <Header />
            <main className="container mx-auto text-center mb-10">
                <h1 className="text-2xl">Obrigado pela preferência</h1>
                <h3 className="text-xl">Em breve enviaremos um e-mail para <b>{customer_email}</b> com mais informações do pedido</h3>
            </main>
        </div>
    )
}