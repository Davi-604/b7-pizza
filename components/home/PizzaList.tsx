import { Product } from "@prisma/client"
import { PizzaItem } from "./PizzaItem"

type Props = {
    pizzas: Product[]
}

export const PizzaList = ({ pizzas }: Props) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {pizzas.map((pizza, id) => (
                <PizzaItem data={pizza} key={id}/>
            ))}
        </div>
    )
}