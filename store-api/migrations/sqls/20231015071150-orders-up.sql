/* Replace with your SQL commands */
CREATE TABLE orders (user_id bigint REFERENCES users(id), status INTEGER, id SERIAL PRIMARY KEY);
