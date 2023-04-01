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
6. Created `db.json`
7. ES6 shortcut when key and value are same so can only write one thing
   1. Like `data` is same as `data: data` 
8. **VERY IMP :**
   1. `app.use(express.json())` is used to collect data from req.body in chunks

#### Logical steps :

1. Created server using express()
2. Listened to it on port 3000
3. Created /greetings call
4. Created GET /todos call
   * readData() through `fs`. Data obtained in string so parsed it into "Array object" using JSON.parse()
   * then sent response object in JSON with keys ---> "message", "data", "error"
5. Created POST /todos call
   * used middleware of `app.use(express.json())` --> to get body from request body into --> newTodo
   * readData() --> to get older data (for persistency)
   * newTodo --> Pushed to array object --> "older + newer = final data"
   * fs.writeFile --> "final data" --> stringify the array object --> store it
6. Utils
   *  import neccessary modules.
   *  readData() --> "file_path" --? read the data from string --> converted string to array object using `JSON.parse()`
   *  Exported the functions
7. Routes
   * `express.Router()` to make and channelize routes
   * GET method 
   * Exported the method