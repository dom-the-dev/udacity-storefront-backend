import express, {Request, Response} from "express"
import {Products, ProductStore} from '../models/products'

const router = express.Router()
const store = new ProductStore()


const index = async (_req: Request, res: Response) => {
    const products = await store.index()
    res.json(products)
}

const show = async (req: Request, res: Response) => {
    const product = await store.show(req.params.id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {

    const product: Products = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category
    }

    const newProduct = await store.create(product)
    res.json(newProduct)
}

const destroy  = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
}

router.route('/').get(index)
router.route('/:id').get(show)
router.route('/').post(create)
router.route('/:id').delete(destroy)

export default router