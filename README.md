> ### Work Manager API for  Test Project
This repo contains the codebase for a simple attempt at a Worker Manager. It allows managers to assign 1out of 3 preset shifts to workers in a day.
Built with Nodejs, MongoDB, Express

# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)) and run it by executing `mongod`
- Alternatively, you can test with a Mongo instance on the cloud with [Atlas](https://www.mongodb.com/atlas/database)
- Set your environment variables to run the app successfully. 
 * PORT=3003
 * JWT_SECRET=secret
 * JWT_EXPIRY=2h
 * MONGO_URI_DEV='local mongo db url .e.g. mongodb://localhost/work-manager'
 * MONGO_URI_PROD='hosted or production mongo url'
 * NODE_ENV='development or production'
- `npm run start:dev` to start the local server
- `npm run test` to test the application

Alternately, to quickly try out this repo in the cloud, you can [Test it here](https://real-lime-seagull-kilt.cyclic.app/api/uptime)

### API Documentation

The postman JSON link can be found [here](https://elements.getpostman.com/redirect?entityId=20674887-a166c149-fe26-4e43-ac54-3ca97a7845aa&entityType=collection)

To authenticate Worker/Admin endpoints
- Choose the prod environment from the environment dropdown
- Create preferred user type via the Register Worker/ Register Admin endpoints
- Login with worker/admin credentials via the Auth/Login user endpoint to generate a token
- Replace current value in the prod environmnents token field with token string generated in last step