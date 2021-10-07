// @ts-ignore
import Client from '../database'

export type User = {
    id?: number,
    firstName: string,
    lastName: string,
    password: string
}

const dummy_user = {id: 1, firstName: 'Dominik', lastName: 'Amrugiewicz', password: '123456'}

export class UserStore {
    async index(): Promise<User[]> {

        return [dummy_user]
    }

    async show(id: string): Promise<User> {
        return dummy_user
    }

    async create(u: User): Promise<User> {

        return dummy_user
    }

    async delete(id: string): Promise<User> {

        return dummy_user
    }
}