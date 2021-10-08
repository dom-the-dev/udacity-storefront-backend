import express, {Request, Response} from "express";
import {Order, OrderStore} from "../models/orders";

const router = express.Router();
const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const order = await store.show(req.params.id);
    res.json(order);
};

const create = async (req: Request, res: Response) => {

    const order: Order = {
        product_id: 1,
        quantity: 1,
        user_id: 1,
        order_completed: false
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
};

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id);
    res.json(deleted);
};

router.route("/").get(index);
router.route("/:id").get(show);
router.route("/").post(create);
router.route("/:id").delete(destroy);

export default router;