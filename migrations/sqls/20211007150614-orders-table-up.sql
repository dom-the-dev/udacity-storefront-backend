CREATE Table orders(
    id SERIAL PRIMARY KEY,
    user_id bigint,
    completed boolean,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
