# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index `'/products' [GET]`
- Show `'/products/:id' [GET]`
- Create [token required] `'/products' [POST] (token)`
- [OPTIONAL] Top 5 most popular products `'/top-5-most-popular-products' [GET]`
- [OPTIONAL] Products by category (args: product category) `'/products-by-category/:category' [GET]`

#### Users

- Index [token required]  `'/user' [GET] (token)`
- Show [token required] `'/user/:id' [GET] (token)`
- Create N[token required] `'/user' [POST]`
- [ADDED] Authenticate: `'/user/login' [POST]`

#### Orders
- Current Order by user (args: user id)[token required] `'/current-orders' [GET] (token)`
- [OPTIONAL] Completed Orders by user (args: user id)[token required] `'/completed-orders' [GET] (token)`
- [ADDED] Add Product to active order (args: product id) [token required]`'/orders/addProduct/:productId' [POST] (token)`
- [ADDED] Completed order [token required] `'/orders/completed' [GET] (token)`

## Data Shapes

#### Product

- id
- name
- price
- [OPTIONAL] category

```
CREATE TABLE products (
    name VARCHAR(50) NOT NULL, 
    price DECIMAL(10,2) NOT NULL, 
    category INTEGER, 
    id SERIAL PRIMARY KEY);

INSERT INTO products (name, price, category) VALUES ('Baby dolls', 20, 1);
INSERT INTO products (name, price, category) VALUES ('Katana', 20, 2);
```

#### User

- id
- firstName
- lastName
- password
- [ADDED] username

```
CREATE TABLE users (
    firstName VARCHAR(50), 
    lastName VARCHAR(50), 
    userName VARCHAR(50) NOT NULL, 
    password_digest VARCHAR NOT NULL, 
    id SERIAL PRIMARY KEY);
```

#### Orders

- id
- user_id
- status of order (active or complete)

```
CREATE TABLE orders (
    user_id bigint REFERENCES users(id), 
    status INTEGER, 
    id SERIAL PRIMARY KEY);
```

#### [ADDED] Order_products
- id
- product_id: id of each product in the order
- product_amount: quantity of each product in the order
- order_id: id of order

```
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY, 
    product_id bigint REFERENCES products(id), 
    product_amount INTEGER, 
    order_id bigint REFERENCES orders(id));
```
