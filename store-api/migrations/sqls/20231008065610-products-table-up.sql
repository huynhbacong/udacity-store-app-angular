/* Replace with your SQL commands */
CREATE TABLE products (name VARCHAR(50) NOT NULL, price DECIMAL(10,2) NOT NULL, category INTEGER, id SERIAL PRIMARY KEY);
INSERT INTO products (name, price, category) VALUES ('Baby dolls', 20, 1);
INSERT INTO products (name, price, category) VALUES ('Katana', 20, 2);