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
| Top 5 most popular products [OPTIONAL] | GET | TODO | false // orders count products limit 5
| Products by Category | GET | `/api/products/category/:category` | false

### Users

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| Index | GET |`/api/users` | **true**
| Show | GET |`/api/users/:id` | **true**
| Create | POST |`/api/users` | **true**
| Delete | DELETE | `/api/users/:id` | **true**

### Orders

| Method | Request Type | URL | Token required |
|--------|--------------| --- | -------------- |
| Index | GET |`/api/orders` | **true**
| Show | GET |`/api/orders/:id` | **true**
| Create | GET |`/api/orders` | **true**
| showCurrentByUserId | GET |`/api/orders/user/:id` | **true**
| showCompletedByUserId | GET |`/api/orders/user/:id/complete` | **true**


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
- user_id
- status of order (active or complete)
- array of products with id and quantity

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
     firstname VARCHAR(30),
     lastname VARCHAR(30),
     password VARCHAR(255)
);

CREATE Table orders(
    id SERIAL PRIMARY KEY,
    user_id bigint,
    completed boolean,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE orders_products(
    quantity int,
    order_id bigint, 
    FOREIGN KEY (order_id) REFERENCES orders(id),
    product_id bigint, 
    FOREIGN KEY (product_id) REFERENCES products(id)
)
`````
