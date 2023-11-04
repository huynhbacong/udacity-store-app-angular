/* Replace with your SQL commands */
CREATE TABLE order_products (id SERIAL PRIMARY KEY, product_id bigint REFERENCES products(id), product_amount INTEGER, order_id bigint REFERENCES orders(id));
