The methods in each model should map to the endpoints in `REQUIREMENTS.md`. 

### 4. Express Handlers

Set up the Express handlers to route incoming requests to the correct model method. Make sure that the endpoints you create match up with the enpoints listed in `REQUIREMENTS.md`. Endpoints must have tests and be CORS enabled. 

### 5. JWTs

Add JWT functionality as shown in the course. Make sure that JWTs are required for the routes listed in `REQUIUREMENTS.md`.

### 6. QA and `README.md`

Before submitting, make sure that your project is complete with a `README.md`. Your `README.md` must include instructions for setting up and running your project including how you setup, run, and connect to your database. 

Before submitting your project, spin it up and test each endpoint. If each one responds with data that matches the data shapes from the `REQUIREMENTS.md`, it is ready for submission!









# Storefront Backend Project
### Project #2 - Full Stack JavaScript Developer Nanodegree

#### Getting started
- `git clone https://github.com/dom-the-dev/udacity-storefront-backend.git`
- `cd udacity-storefront-backend`
- `cp .env.dist .env`
- Adjust environment variables
- run `yarn` to install all dependencies
- run `db-migrate up` 

Description

### Scripts

`db-migrate create {NAME} --sql-files `
`db-migrate up`
`db-migrate down`

