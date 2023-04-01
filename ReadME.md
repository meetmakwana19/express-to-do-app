## To-do app

- REST API for CRUD operations In nodeJS
  - Will work with file system for now instead of mongoDB
- EJS frontend

#### MVC Architecture

1. Frontend
   1. `VIEW`
2. Backend
   1. `CONTROLLER`(business logic)
   2. `MODEL`(database)

##### PLanned folder structure :

- CONTROLLER
- ROUTER
- VIEW
- MIDDLEWARE : a software which sits between softwares
- UTILS/HELPERS
- `server.js` start point
- `config.js` where configurations like auth tokens can be maintained or `constant.js` where global constanst can be maintained

### Project steps: 

1. npm init 
2. made folders 
```
mkdir controller
mkdir middlewares
mkdir routes
mkdir utils
touch config.js
touch server.js
```
3. npm install express
4. Using arrow function introduced in ES6
5. `Nodemon` is a automation tool which is a watcher which watches the server and upon ay changes it kills the running server and starts an updated server 
   1. To start through nodemon
   ```
   npx nodemon server.js
   ```
   2. or make `start:dev` script in the `package.json` and run this command
   ```
   npm run start:dev
   ```
   3. xs