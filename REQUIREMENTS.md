# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be
able to browse an index of all products, see the specifics of a single product, and add products to an order that they
can view in a cart page. You have been tasked with building the API that will support this application, and your
coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as
well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| Index | GET |`/api/products` | false |
| Show | GET |`/api/products/:id` | false |
| Create | POST |`/api/products` | **true** |
| Delete | DELETE | `/api/products/:id` | **true** |
| Top 5 most popular products [OPTIONAL] | GET | | false // orders count products limit 5
| Products by Category [OPTIONAL] | GET | | false // where category = CAT

### Users

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| Index | GET |`/api/users` | **true**
| Show | GET |`/api/users/:id` | **true**
| Create | POST |`/api/users` | **true**
| Delete | DELETE | `/api/users/:id` | **true**

### Orders

- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| show | GET |`/api/orders/:id/users/:id` | **true**
| complete | GET |`/api/users/:id/users/:id/complete` | **true**


## Data Shapes

### Product

- id
- name
- price
- [OPTIONAL] category

### User

- id
- firstName
- lastName
- password

### Orders

- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

Data Schema

`````sql
CREATE Table products(
    id SERIAL PRIMARY KEY, 
    name VARCHAR(30), 
    price numeric,
    category VARCHAR(30)
);

CREATE Table users(
     id SERIAL PRIMARY KEY,
     firstName VARCHAR(30),
     lastName VARCHAR(30),
     password VARCHAR(30)
);

CREATE Table orders(
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(30),
    completed boolean
);

CREATE TABLE orders_products(
    quantity int,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
)
`````
