import Client from "../database";
import {Product} from "../models/products";

export class DashboardQueries {
    // Get all products from a specific category
    async productsByCategory(category: string): Promise<Product[]> {

        try {
            const conn = await Client.connect();
            const sql = "SELECT * FROM products WHERE category=($1)";

            const result = await conn.query(sql, [category]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Can't get products for category ${category}: ${err}`);
        }
    }

    //TODO: Add method to get 5 most popular products
    // async topFiveProducts(): Promise<Product[]> {
    //
    // }
}