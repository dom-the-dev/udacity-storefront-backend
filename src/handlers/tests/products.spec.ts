import supertest from "supertest";
import app from '../../server'
import {Product, ProductStore} from "../../models/products";
import {User, UserStore} from "../../models/users";
import jwt from "jsonwebtoken";

const request = supertest(app);
const store = new ProductStore();
const userStore = new UserStore();
import dotenv from "dotenv";

dotenv.config();

const {TOKEN_SECRET} = process.env;

describe("Product Handler", () => {

    let user: User;
    let product: Product;
    let token: string;

    beforeAll(async () => {
        user = await userStore.create({
            "firstname": "Dominik",
            "lastname": "Amrugiewicz",
            "password": "password"
        });

        // @ts-ignore
        token = jwt.sign(user, TOKEN_SECRET);

        product = await store.create({name: "Product", price: "19.00", category: "Shoes"});
    })

    it("index response with status 200", async () => {
        const response = await request.get("/api/products");
        expect(response.statusCode).toBe(200);
    });

    it("index response an array of products", async () => {
        const response = await request.get("/api/products");
        expect(response.body).toEqual([{id: 1, name: "Product", price: "19.00", category: "Shoes"}]);
    });

    it("show response a product", async () => {
        const response = await request.get("/api/products/1");
        expect(response.body).toEqual({id: 1, name: "Product", price: "19.00", category: "Shoes"});
    });

    it("should create a product", async () => {
        const response = await request
            .post("/api/products")
            .send({
                "name": "New Product",
                "price": "22.99",
                "category": "Caps"
            })
            .set('Authorization', 'bearer ' + token);

        expect(response.body).toEqual({id: 2, name: "New Product", price: "22.99", category: "Caps"});

        await store.delete(response.body.id)
    });


    it("should response with error", async () => {

        const response = await request
            .post("/api/products")
            .send({
                "name": "New Product",
                "price": "22.99",
                "category": "Caps"
            })

        expect(response.statusCode).toBe(401);
        expect(response.body).toBe("Access denied, no token");

    });


    it("should delete a product", async () => {
        const product = await store.create({name: "Product", price: "19.00", category: "Shoes"});

        const response = await request
            .delete(`/api/products/${product.id}`)
            .set('Authorization', 'bearer ' + token);

        expect(response.body).toEqual({"message" : "Product successfully deleted"});

    });

    it("should return an array of products", async () => {

        const response = await request.get("/api/products/category/Shoes");
        expect(response.body).toEqual([{id: 1, name: "Product", price: "19.00", category: "Shoes"}]);

    });

    it("should return an empty array", async () => {

        const response = await request.get("/api/products/category/Caps");
        expect(response.body).toEqual([]);

    });



    afterAll(async () => {
        await userStore.delete(user.id)
        await store.delete(product.id)
    })

});
