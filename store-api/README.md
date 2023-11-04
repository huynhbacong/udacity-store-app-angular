# Storefront Backend Project

## Getting Started
These instructions will help you to run the project on your local machine for development and testing purposes.

## Packages

#### express
`npm i -S express`
`npm i -D @types/express`

#### typescript
`npm i -D typescript`

#### db-migrate
`npm install -g db-migrate`
`npm add db-migrate db-migrate-pg`

#### bcrypt
`npm -i bcrypt`
`npm -i -D @types/bcrypt`

#### pg
`npm -i pg`
`npm -i -D @types/pg`

#### jsonwebtoken
`npm -i jsonwebtoken`
`npm -i -D @types/jsonwebtoken`

#### jasmine
`npm i -D jasmine`
`npm i -D jasmine-spec-reporter`
`npm -i -D @types/jasmine`

#### supertest
`npm i -D supertest`
`npm i -D @types/supertest`


## Set Up

### Create a Docker Container
`docker-compose up`

### Install Dependencies
`npm install`

### Run database Migrations
`db-migrate up`

## Environmental Variables Set up
Bellow are the environmental variables that needs to be set in a `.env` file.

```
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=udacity_project
POSTGRES_TEST_DB=udacity_project_test
POSTGRES_USER=magical_user
POSTGRES_PASSWORD=password123
POSTGRES_PORT=5432
BCRYPT_PASSWORD=###
SALT_ROUNDS=10
TOKEN_SECRET=###
ENV=dev
```

## Running the App

### Build the Applications and start it
`npm run start`

### Ports
After start application, the server will start on port `3000` and the database on port `5432`

## Endpoint
See [REQUIREMENT.md](REQUIREMENTS.md) file. 

## Testing
`npm run test`
