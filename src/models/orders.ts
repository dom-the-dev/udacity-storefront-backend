import Client from "../database";

export type OrderProduct = {
    product_id: number,
    quantity: number,
}

export type OrderPrototype = {
    products: OrderProduct[],
    user_id: number
    order_completed: boolean
}

export type Order = {
    id: number,
    products: OrderProduct[],
    user_id: number
    order_completed: boolean
}

export class OrderStore {
    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM orders";

            const result = await conn.query(sql);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async show(id: number): Promise<Order> {
        try {
            const sql = "SELECT * FROM orders WHERE id=($1)";
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    async create(o: OrderPrototype): Promise<Order> {
        try {
            // first create order
            const sql = "INSERT INTO orders (user_id, completed) VALUES($1, $2) RETURNING *";
            const conn = await Client.connect();

            const result = await conn.query(sql, [o.user_id, o.order_completed]);
            const order = result.rows[0];

            // second add to order_products
            for(const product of o.products) {
                const sql = "INSERT INTO orders_products (product_id, order_id, quantity) VALUES($1, $2, $3) RETURNING *";
                await conn.query(sql, [product.product_id, order.id, product.quantity]);
            }

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not create new order. Error: ${err}`);
        }
    }

    async delete(id: number): Promise<string> {
        try {
            const sql = "DELETE FROM orders WHERE id=($1)";
            const conn = await Client.connect();

            await conn.query(sql, [id]);

            conn.release();

            return "Order successfully deleted";

        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }

    async showCurrentUserOrders(user_id: number): Promise<Order[]> {
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) ORDER BY id LIMIT 1";
            const conn = await Client.connect();

            const result = await conn.query(sql, [user_id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }

    async showCompletedUserOrders(user_id: number): Promise<Order[]> {
        try {
            const sql = "SELECT * FROM orders WHERE user_id=($1) AND completed=false";
            const conn = await Client.connect();

            const result = await conn.query(sql, [user_id]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not get orders. Error: ${err}`);
        }
    }
}