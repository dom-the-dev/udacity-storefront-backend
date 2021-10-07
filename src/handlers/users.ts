import express, {Request, Response} from "express"
import {User, UserStore} from '../models/users'

const router = express.Router()
const store = new UserStore()

const index = async (_req: Request, res: Response) => {
    const users = await store.index()
    res.json(users)
}

const show = async (req: Request, res: Response) => {
    const user = await store.show(req.params.id)
    res.json(user)
}

const create = async (req: Request, res: Response) => {

    const user: User = {
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        password: req.body.password
    }

    const newUser = await store.create(user)
    res.json(newUser)
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.params.id)
    res.json(deleted)
}

router.route('/').get(index)
router.route('/:id').get(show)
router.route('/').post(create)
router.route('/:id').delete(destroy)

export default router