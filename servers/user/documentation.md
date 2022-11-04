## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`
- `GET /users`
- `GET /users/:id`
- `DELETE /users`
- `PATCH /users/verify/:id`
- `PATCH /users/changeusername`
- `PATCH /users/changeImg`
- `GET /vehicles`
- `PATCH /vehicles`
- `POST /vehicles`
- `DELETE /vehicles/:id`

&nbsp;

1. `POST /login`

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string",
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

2. `POST /register`

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "fullName": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Check your email"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "username is required"
}
OR
{
  "message": "username is already use"
}
{
  "message": "email is required"
}
OR
{
  "message": "use email format!"
}
OR
{
  "message": "email is already use"
}
OR
{
  "message":"password is required"
}
OR
{
  "message":"password minimum character is 5"
}
OR
{
  "message":"use real email"
}
```

&nbsp;

3. `GET /users`

_Response (200 - OK)_

````json
[
  {
        "id": 1,
        "username": "Lord ujang",
        "email": "ujang1@gmail.com",
        "password": "$2a$10$U5e8SF4abmqcQq8IjKcpjOwd3Y2/etRrqC2SNmbeFTwFlqjV6eRh6",
        "fullName": "ujang",
        "balance": 0,
        "isRegis": true,
        "imgUrl": null,
        "role": "user",
        "createdAt": "2022-11-04T10:13:51.933Z",
        "updatedAt": "2022-11-04T10:22:40.192Z",
        "BalanceHistories": [],
        "Vehicle": {
            "id": 7,
            "UserId": 1,
            "plat": "B 1232 XYZ",
            "modelName": "avanza",
            "name": "joni",
            "imgUrl": null,
            "createdAt": "2022-11-04T14:22:23.459Z",
            "updatedAt": "2022-11-04T14:22:23.459Z"
        }
    },
    {
        "id": 3,
        "username": "feexz",
        "email": "feexz@gmail.com",
        "password": "$2a$10$EXsCLv2bV6sTztLiAtXu3ekaR3OUnUGkB4L7zsiR4Eb1EOO4gLA.W",
        "fullName": "ananda fiqri",
        "balance": 0,
        "isRegis": false,
        "imgUrl": null,
        "role": "user",
        "createdAt": "2022-11-04T10:52:54.842Z",
        "updatedAt": "2022-11-04T10:52:54.842Z",
        "BalanceHistories": [],
        "Vehicle": null
    },
    ```,
]
````

&nbsp;

4. `GET /users/:id`

- params:

```json
{
  "id": "integer (required)"
}
```

_Response (200 - OK)_

```json

    {
        "id": 1,
        "username": "Lord ujang",
        "email": "ujang1@gmail.com",
        "password": "$2a$10$U5e8SF4abmqcQq8IjKcpjOwd3Y2/etRrqC2SNmbeFTwFlqjV6eRh6",
        "fullName": "ujang",
        "balance": 0,
        "isRegis": true,
        "imgUrl": null,
        "role": "user",
        "createdAt": "2022-11-04T10:13:51.933Z",
        "updatedAt": "2022-11-04T10:22:40.192Z",
        "BalanceHistories": [],
        "Vehicle": {
            "id": 7,
            "UserId": 1,
            "plat": "B 1232 XYZ",
            "modelName": "avanza",
            "name": "joni",
            "imgUrl": null,
            "createdAt": "2022-11-04T14:22:23.459Z",
            "updatedAt": "2022-11-04T14:22:23.459Z"
        }
    },
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

4. `DELETE /users`

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Success delete user"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

5. `PATCH /users/verify/:id`

_Response (200 - OK)_

```json
{
  "message": "Verified"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

&nbsp;

6. `PATCH users/changeusername`

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success update username"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "User not found"
}
```

_Response (409 - Conflict)_

```json
{
  "message": "username is already use"
}
```

7. `PATCH /users/changeImg`

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "success change image"
}
```

&nbsp;

8. `GET /vehicles`

- headers:

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

````json
[
    {
        "id": 7,
        "UserId": 1,
        "plat": "B 1232 XYZ",
        "modelName": "avanza",
        "name": "joni",
        "imgUrl": null,
        "createdAt": "2022-11-04T14:22:23.459Z",
        "updatedAt": "2022-11-04T14:22:23.459Z"
    },
    {
        "id": 8,
        "UserId": 1,
        "plat": "B 1235 XYZ",
        "modelName": "avanza",
        "name": "jeki",
        "imgUrl": null,
        "createdAt": "2022-11-04T14:23:33.307Z",
        "updatedAt": "2022-11-04T14:23:33.307Z"
    }```,
]
````

&nbsp;

9. `PATCH /vehicles`

- headers:

```json
{
  "access_token": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "Success"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Vehicle not found"
}
```

&nbsp;

10. `POST /vehicles`

- headers:

```json
{
  "access_token": "string"
}
```

- body:

```json
{
  "plat": "string",
  "modelName": "string",
  "name": "string"
}
```

_Response (201 - Created)_

```json
{
  "message": "success create"
}
```

&nbsp;

11. `DELETE /vehicles/:id`

- headers:

```json
{
  "access_token": "string"
}
```

- params:

```json
{
  "id": "integer"
}
```

_Response (200 - OK)_

```json
{
  "message": "success"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Vehicle not found"
}
```

&nbsp;

## Global Error

_Response (430 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
