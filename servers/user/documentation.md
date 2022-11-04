## Endpoints :

List of available endpoints:

- `POST /login`
- `POST /register`

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

&nbsp;

## Global Error

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
