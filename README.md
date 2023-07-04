# CRUD API NODE.JS

#### [Task](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/crud-api/assignment.md)

---

#### Installation

```bash
$ git clone https://github.com/KirillGenin/node-simple-crud-api.git
or with SSH - 
$ git clone git@github.com:KirillGenin/node-simple-crud-api.git
```

```bash
$ cd node-simple-crud-api
```

```bash
$ git checkout develop
```

```bash
$ npm install
```

#### Configuration

Rename the file `.env_RENAME_ME` to `.env`.

#### Running the app
##### Run application in development mode
```
$ npm run start:dev
```
##### Build and run application in production mode
```
$ npm run start:prod
```

#### Implementation details

##### Implemented endpoint `api/users`
 - **GET** `api/users` is used to get all persons
    - Response: `status code` **200** and all users records
  - **GET** `api/users/${userId}`
    - Response: `status code` **200** and record with `id === userId` if it exists
    - Response: `status code` **400** and message `Invalid user ID!` if provided id is not valid uuid
    - Response: `status code` **404** and message `User not found!` if record with id === userId doesn't exist
  - **POST** `api/users` is used to create record about new user and store it in database
    - Response: `status code` **201** and newly created record
    - Response: `status code` **400** and message `Request body does not contain required fields!` if request `body` does not contain **required** fields
    - Response: `status code` **400** and message `Invalid JSON body!` if request contain invalid JSON body
  - **PUT** `api/users/{userId}` is used to update existing user
    - Response: ` status code` **200** and updated record
    - Response: ` status code` **400** and message `Invalid user ID!` if provided id is not valid uuid
    - Response: ` status code` **404** and message `User not found!` if record with id === userId doesn't exist
    - Response: `status code` **400** and message `Invalid JSON body!` if request contain invalid JSON body
  - **DELETE** `api/users/${userId}` is used to delete existing user from database
    - Response: `status code` **204** if the record is found and deleted
    - Response: ` status code` **400** and message `Invalid user ID!` if provided id is not valid uuid
    - Response: ` status code` **404** and message `User not found!` if record with id === userId doesn't exist

##### Implemented non-existing endpoints
 - Response: `status code` **404** and message `Page not found..`

##### Implemented non-existing HTTP methods 
 - Response: `status code` **400** and message `Invalid HTTP request method`

##### Users are stored as `objects` that have following properties
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `username` — user's name (`string`, **required**)
  - `age` — user's age (`number`, **required**)
  - `hobbies` — user's hobbies (`array` of `strings` or empty `array`, **required**)