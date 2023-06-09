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
   * GET, POST method --> Writing all HTTP Methods in routes now. 
   * Exported the method


## Using EJS for views 

##### Basic syntax 

- Basic syntax - `<% some code %>`
- Variable and value - `<%= varName %>`
- String - `<%= "abcdefg" %>`
- Importing - `<%- include("path/file") %>`
- Components will be called **partials** in EJS.

 
1. npm install ejs
2. Mounting view engine to get extra capability of using EJS. Setting the view engine of express app to ejs (by default it is HTML) in server.js
3. Created views folder and express by default understands views folder for frontend content
   1. Pages with `.ejs` extension
4. Created `views.js` in the routes/ folder

--- 

reduce(acccumulator, current)

using filter to filter out the delete objs

## Session 

1. Making logger in the `server.js`
2. Middlewares are always called sequentially in expressJS
3. So made 1st middleware for express app for logger and tried passing request by adding extra field to the request object and consumed it in the home route of view.
4. Added PUT call through views/todo.ejs form
5. Added `npm install --save express-validator`
6. Updated todoRouter.post() and used custom express-validator
7. Added form in a new todo_add.ejs view 

## Authentication :

Normal behaviour :
Login -> credentials -> yes/no approve

secured behaviour:
Login -> credentials -> hash(pw)+SALT -> store in DB

1. Created new `views/register.ejs`
2. Created new `auth.routes.js`
3. Adding the render routing for register in the `routes/views.js`
4. Renamed to `views.routes.js` and changed respectively the imports in the server.js
5. Similarly added login auth n routes 
6. -------------Protected route for add todo functionality :-----------------
7. Installed using `npm i jsonwebtoken`
8. Added `isAuthenticated()` in the `middlewares/index.js` and used it as a middleware in the `todos.routes.js`
9.  Signing a JWT token in the login post route in the `auth.routes` and then sending that jwt token as access token through the api response to the frontend login.ejs
10. Getting that token from backend response to frontend and setting it as local storage via  `login.ejs` when login is successful.
11. Implementing the workflow of isAuthenticated in the frontend of adding todo page where todo wont be added if user is not logged in.
12. `todo_add.ejs` uses that localstorage access_token and sends it via header . Then middleware checks its presence and based on response redirect is made

---

##### Protecting routes : 

###### on single GET todo (backend + frontend)

1. Added middleware `isAuthenticated` in the get single todo method of `todos.routes.js`
2. Added onclick on the li items of the todos in the `index.js`.

###### on PUT todo (backend + frontend)

1. Added middleware `isAuthenticated` in the post todo method of `todos.routes.js`... so here the middleware checks if the incoming header from this request has any authorization header or not. If not there a response is sent by middleware and if the header exists then the http method is allowed to carry out it's next instructions.
2. Checks are also put on the frontend part in the `todo.ejs` to send the authorization header to the backend and if all is good then proceed ahead otherwise redirect to login.

###### on DELETE todo (backend + frontend)

1. Added middleware `isAuthenticated` in the post todo method of `todos.routes.js`... so here the middleware checks if the incoming header from this request has any authorization header or not. If not there a response is sent by middleware and if the header exists then the http method is allowed to carry out it's next instructions.
2. Delete button was added in the `login.ejs` along with an onclick function to carry out the window redirect and the DELETE request.

###### on DELETE todo (backend + frontend)

1. Created `users.json` in the root directory of the project... remember to keep the empty file with `[]` as data as parsing it as array to json will cause error ahead when reading the empty file.
2. Added readUsers() function in the `utils.js` 
3. Utilized the array retuned by this utility function instead of that local USER array.

###### bcryptjs for password hashing & salting(backend)

1. Installed bcryptjs package 
```
npm i bcryptjs
```
2. Used it in the `auth.routes.js` to hash the password and then do operations on it. 
3. Installed `npm i dotenv` package to use the environment variable for the deployment purpose
   1. Loading the env variables using require() is essential 
```
require('dotenv').config();
const SECRET  = process.env.SECRET
```

---

1. With the help of this https://stackoverflow.com/a/18633827/17796286 ........Added CSS file and updated the project UI

---

##### Deployment

1. Used [render.com](https://render.com/) platform 
2. Created a `New` `Web Service`.
3. Connected github repository by connecting the github account.
4. Followed the steps on the platform and filled the basic details like providing a unique name, region, branch.
5. Note : Need build command as it is `$ yarn` and start command as it is too `$ node server.js`
6. Selected `free` instance type
7. Scroll down to advance section and add environment variable and shifted the project to use the `npm dotenv` package to manage environment variables for this deployment purpose.
   1. Add environment variable which was kept in the `.env` file of the project which was used to sign the jwt token to create the access_token.
8. Create the web service and you'll get the deployment link on the same page ! ✅
 
Task : 

- [x] isAuthenticated in 
  - [x] single GET todo (backend + frontend)
  - [x] single PUT todo (backend + frontend)
  - [x] single DELETE todo (backend + frontend)
- [x] users.json done for register & login
- [x] bcryptjs for password hashing & salting
- [x] Hosted on render 

## [Deployment link ->  https://todoist-aplv.onrender.com/](https://todoist-aplv.onrender.com/)