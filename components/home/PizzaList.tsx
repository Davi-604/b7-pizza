'use client'

import { Product } from "@prisma/client"
import { PizzaItem } from "./PizzaItem"
import { useProducts } from "@/stores/products"
import { useEffect } from "react"

type Props = {
    pizzas: Product[]
}

export const PizzaList = ({ pizzas }: Props) => {
    const products = useProducts();
    useEffect(() => products.setProduct(pizzas), []);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {pizzas.map((pizza, id) => (
                <PizzaItem data={pizza} key={id}/>
            ))}
        </div>
    )
}