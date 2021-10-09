import express, {Request, Response} from "express";
import {OrderPrototype, OrderStore} from "../models/orders";
import {authenticate} from "../middleware/authMiddleware";

const router = express.Router();
const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const orders = await store.index();
    res.json(orders);
};

const show = async (req: Request, res: Response) => {
    const order = await store.show(parseInt(req.params.id));
    res.json(order);
};

const create = async (req: Request, res: Response) => {

    const products = req.body.products;
    const order_completed = req.body.order_completed;
    const user_id = req.body.user_id;

    const order: OrderPrototype = {
        user_id,
        products,
        order_completed
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
};

const showCurrentUserOrders = async (req: Request, res: Response) => {
    const orders = await store.showCurrentUserOrders(parseInt(req.params.id));
    res.json(orders);
};

const showCompletedUserOrders = async (req: Request, res: Response) => {
    const orders = await store.showCompletedUserOrders(parseInt(req.params.id));
    res.json(orders);
};

router.route("/").get(authenticate, index);
router.route("/:id").get(authenticate, show);
router.route("/").post(authenticate, create);
router.route("/user/:id").get(authenticate, showCurrentUserOrders);
router.route("/user/:id/completed").get(authenticate, showCompletedUserOrders);

export default router;