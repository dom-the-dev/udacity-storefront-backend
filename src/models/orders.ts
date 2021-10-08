// @ts-ignore
import Client from "../database";

export type Order = {
    id?: number,
    product_id: number,
    quantity: number,
    user_id: number
    order_completed: boolean
}

const dummy_order = {id: 1, product_id: 1, quantity: 20, user_id: 1, order_completed: false};

export class OrderStore {
    async index(): Promise<Order[]> {

        return [dummy_order];
    }

    async show(id: string): Promise<Order> {
        return dummy_order;
    }

    async create(u: Order): Promise<Order> {

        return dummy_order;
    }

    async delete(id: string): Promise<Order> {

        return dummy_order;
    }
}