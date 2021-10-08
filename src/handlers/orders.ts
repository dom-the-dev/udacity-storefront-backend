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

    const products = req.body.products
    const order_completed = req.body.order_completed
    const user_id = req.body.user_id

    const order: Order = {
        user_id,
        products,
        order_completed
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
};

const showCurrentUserOrders = async (req: Request, res: Response) => {
    const orders = await store.showCurrentUserOrders(req.params.id);
    res.json(orders);
};

const showCompletedUserOrders = async (req: Request, res: Response) => {
    const orders = await store.showCompletedUserOrders(req.params.id);
    res.json(orders);
};

router.route("/").get(index);
router.route("/:id").get(show);
router.route("/").post(create);
router.route("/user/:id").get(showCurrentUserOrders);
router.route("/user/:id/completed").get(showCompletedUserOrders);

export default router;