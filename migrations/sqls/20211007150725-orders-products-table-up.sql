CREATE TABLE orders_products(
    quantity int,
    order_id bigint,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
)