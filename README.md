### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!









# Storefront Backend Project
### Project #2 - Full Stack JavaScript Developer Nanodegree

NodeJS programm connection to a Postgresql database to create, read, update and delete data on Models.  

## Getting started
- Clone this repository: `git clone https://github.com/dom-the-dev/udacity-storefront-backend.git`
- Change into project directory `cd udacity-storefront-backend`
- run `yarn` to install all dependencies
- Create database as described below in section *Database Connection* 
- Copy env file `cp .env.dist .env`
- Adjust environment variables with database credentials like in the given example below *.env Example*
- Copy database config file `cp database.json.dist database.json`
- Adjust environment variables with database credentials like in the given example below *database.json Example*
- install db-migrate globally with `yarn global add db-migrate`
- run `db-migrate up` to run migrations
- have fun!

### Database Connection
- be sure to have installed postgresql and sql shell on your system
- open terminal and type `psql` 
- alternatively *open psql terminal from applications* 
- connect to psql with your postgres user
- run `CREATE DATABASE udacity-store;` to create dev database
- run `CREATE DATABASE udacity-store_test;` to create testing database

### .env Example
````dotenv
APP_PORT=3000
POSTGRES_HOST=localhost
POSTGRES_DB=udacity-store
POSTGRES_DB_TEST=udacity-store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
ENV=dev
SALT_ROUNDS=10
BCRYPT_PASSWORD=safe-udacity-password
TOKEN_SECRET=safe-for-token
````

### database.json Example
````json
{
  "dev": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "udacity-store",
    "user": "postgres",
    "password": "postgres"
  },
  "test": {
    "driver": "pg",
    "host": "127.0.0.1",
    "database": "udacity-store_test",
    "user": "postgres",
    "password": "postgres"
  }
}
````

## Development
- run `yarn watch` to start development server

## Testing
- run `yarn test` to run all tests

## Available scripts

- `yarn watch`
- `yarn test`
- `yarn lint`
 
#### Reset Databases
- `yarn drop-test`
- `yarn drop-dev`

#### Migrations
- `db-migrate create {NAME} --sql-files `
- `db-migrate up`
- `db-migrate down`

## Dependencies
- [NodeJS](https://nodejs.org/en/)
- [ExpressJS](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Postgres](https://www.postgresql.org/)
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [bCrypt](https://www.npmjs.com/package/bcrypt)

## Resources & useful links
- [Node Docs](https://nodejs.org/api/fs.html)
- [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)