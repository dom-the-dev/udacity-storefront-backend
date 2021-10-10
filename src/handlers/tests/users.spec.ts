import supertest from "supertest";
import app from '../../server'
import {User, UserStore} from "../../models/users";

const request = supertest(app);
const store = new UserStore();
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const {TOKEN_SECRET} = process.env;

describe("User Handler", () => {

    let user: User;
    let token: string;

    beforeAll(async () => {
        user = await store.create({
            "firstname": "Dominik",
            "lastname": "Amrugiewicz",
            "password": "password"
        });

        // @ts-ignore
        token = jwt.sign(user, TOKEN_SECRET);

    })

    it("index response with status 401", async () => {
        const response = await request.get("/api/users");
        expect(response.statusCode).toBe(401);
    });

    it("index response with status 200", async () => {
        const response = await request.get("/api/users").set('Authorization', 'bearer ' + token);
        expect(response.statusCode).toBe(200);
    });

    it("index response an array with an object", async () => {
        const response = await request.get("/api/users").set('Authorization', 'bearer ' + token);

        expect(response.body[0].firstname).toEqual("Dominik");
        expect(response.body[0].lastname).toEqual("Amrugiewicz");
    });

    it("show should response an user", async () => {
        const response = await request.get(`/api/users/${user.id}`).set('Authorization', 'bearer ' + token);

        expect(response.body.firstname).toEqual("Dominik");
        expect(response.body.lastname).toEqual("Amrugiewicz");
    });

    it("should create an user", async () => {
        const response = await request
            .post("/api/users")
            .send({
                "firstname": "Super",
                "lastname": "User",
                "password": "password"
            })
            .set('Authorization', 'bearer ' + token);

        expect(response.body.firstname).toEqual("Super");
        expect(response.body.lastname).toEqual("User");

        await store.delete(response.body.id)
    });

    it("should delete an user", async () => {
        const user = await store.create({
            "firstname": "John",
            "lastname": "Doe",
            "password": "password"
        });

        const response = await request
            .delete(`/api/users/${user.id}`)
            .set('Authorization', 'bearer ' + token);

        expect(response.body).toEqual({"message": "User successfully deleted"});

    });

    it("should response a token", async () => {
        const response = await request.post('/api/users/login')
            .send({
                "firstname": "Dominik",
                "lastname": "Amrugiewicz",
                "password": "password"
            })

        // @ts-ignore
        const verification = jwt.verify(token, TOKEN_SECRET);

        expect(verification).toBeTruthy();
    })

    afterAll(async () => {
        await store.delete(user.id)
    })

});