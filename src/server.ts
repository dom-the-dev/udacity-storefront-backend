import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import product_routes from "./handlers/products";
import user_routes from "./handlers/users";
import order_routes from "./handlers/orders";

dotenv.config();

const app = express();

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
    res.send("Storefront Backend Project");
});

// Routes
app.use("/api/products", product_routes);
app.use("/api/users", user_routes);
app.use("/api/orders", order_routes);

// Start
app.listen(process.env.APP_PORT, function () {
    console.log("starting app on: http://localhost:3000");
});

export default app;