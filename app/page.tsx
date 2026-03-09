import { Header } from "@/components/layout/Header";
import { PizzaList } from "@/components/home/PizzaList";
import { api } from "@/lib/axios";

export default async function Page() {
    const pizzas_req = await api.get('/pizzas');

    const pizzas = pizzas_req.data.pizzas ?? [];

    return (
        <div className="">
            <Header />
            <main className="container mx-auto mb-10">
                <PizzaList pizzas={pizzas}/>
            </main>
        </div>
    )
}