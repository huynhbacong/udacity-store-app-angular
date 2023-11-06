/* Replace with your SQL commands */
CREATE TABLE products (name VARCHAR(50) NOT NULL, price DECIMAL(10,2) NOT NULL, category INTEGER, img_source VARCHAR(2083), id SERIAL PRIMARY KEY);
INSERT INTO products (name, price, category, img_source) VALUES ('Book', 9.99, 1, 'https://pngimg.com/d/book_PNG2111.png');
INSERT INTO products (name, price, category, img_source) VALUES ('Headphones', 249.99, 2, 'https://sony.scene7.com/is/image/sonyglobalsolutions/wh-ch720_Primary_image?$categorypdpnav$&fmt=png-alpha');
INSERT INTO products (name, price, category, img_source) VALUES ('Backpack', 79.99, 2, 'https://m.media-amazon.com/images/I/91YandYecdL.jpg');
INSERT INTO products (name, price, category, img_source) VALUES ('Glasses', 129.99, 2, 'https://framesbuy.s3.amazonaws.com/old-images/570X342/YJ0198C101.jpg');
INSERT INTO products (name, price, category, img_source) VALUES ('Cup', 4.99, 2, 'https://m.media-amazon.com/images/I/51k5yyN+KVL.jpg');
INSERT INTO products (name, price, category, img_source) VALUES ('Shirt', 29.99, 2, 'https://www.craftclothing.ph/cdn/shop/products/standard-plain-round-neck-shirt-white_4d7e38cd-0b88-4940-a8cf-c7529a68a1a3_600x.png?v=1644204854');