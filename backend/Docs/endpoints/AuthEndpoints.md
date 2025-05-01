## Features

- User registration
- User login
- User logout

### Register Endpoint

- **URL:** `/users/register`
- **Method:** `POST`
- **Request Body:**
  - `username`: string (required,unique)
  - `email`: string (required,unique)
  - `password`: string (required)
- **Response:**
  - `user`: object (contains the newly created user data)
  - `token`: string (contains the authentication token)

**Example Request:**
```json
{
	"username":"negro",
	"email": "alexanderdawi1@hotmail.com",
	"password": "negromancer"
	
}
```

Example Responses:
```json
{
  "statusCode": 200,
	"responseCode": 615,
	"username": "negro",
	"email": "alexanderdawi1@hotmail.com"
}
```
will return this json if the email is already in use
```json
{
{
	"statusCode": 200,
	"responseCode": 608
}
}
```
if username is already in use
```json
{
	"statusCode": 200,
	"responseCode": 607
}
```

## Login Endpoint
- URL: /users/login
- Method: POST
- Request Body:
  - `email`: string (required)
  - `password`: string (required)
- Response:
  - `username`: object (contains the authenticated user data)
  - `token`: string (contains the authentication token)

Example Request:
``` json
{
  "email": "johnDoe@negro300.com",
  "password": "password123"
}
```

Example Response:

``` json
{
	"statusCode": 200,
	"responseCode": 609,
	"username": "negro",
  "email": "johnDoe@negro300.com",
	"sessionId": "pqfb9Fg8tiNfbI7VNrX5zFhTE0XtWaJd"
}
```
will return this json if the email is not verfied
``` json
{
	"statusCode": 200,
	"responseCode": 601
}
```
and this json if email is not found
``` json
{
	"statusCode": 200,
	"responseCode": 602
}
```
and this json if password incorrect
``` json
{
	"statusCode": 200,
	"responseCode": 603
}
```
## verify-sentcode Endpoint

- URL: /users/verify-sentcode
- Method: POST
- Request Body:
  - `email`: string (required)
  - `code`: string (required)
  - `password`: string (required)
- Response:
  - `message`: string (contains the success message)

Example Request:
``` json
{
  "email": "johnDoe@negro300.com",
  "password": "password123",
  "code": "123456"
}
```
response
``` json 
{
	"statusCode": 200,
	"responseCode": 605
}
invalid code:
```json
{
	"statusCode": 200,
	"responseCode": 604
}
```
Wrong password:
```json
{
	"statusCode": 200,
	"responseCode": 603
}
```
Wrong email:
```json
{
	"statusCode": 200,
	"responseCode": 610
}
```
## send-verification-code Endpoint
- URL: /users/resend-verification-code  
- Method: POST  
- Request Body: email
- Response:
  - message: string (contains the success message)

Example Request:
``` json
{
  "email": "johnDoe@negro300.com"
}
```
response
``` json 
{
	"statusCode": 200,
	"responseCode": 616
}
```

## reset-password Endpoint

    URL: /users/reset-password
    Method: POST
    Request Body:email
    Response:
        message: string (contains the success message)

Example Request:

``` json 

{
  "email": "johnDoe@negro300.com"
}
```
response
``` json
{
	"statusCode": 200,
	"responseCode": 612
}
``` 
or if incorrect email
``` json 
{
	"statusCode": 200,
	"responseCode": 602
}
``` 
## reset-password/:token Endpoint
Part 2 of reseting a password

    URL: /users/reset-password/:token
    Method: POST
    Request Body: password
    Response:
        message: string (contains the success message)

Example Request:

``` json 

{
  "password": "password123"
}
``` 
response
``` json 
{
	"statusCode": 200,
	"responseCode": 614
}
``` 
if token invalid or expired
``` json 
{
	"statusCode": 200,
	"responseCode": 613
}
```
## delete-user Endpiont

    URL: /users/delete-user
    Method: delete
    Request Body: email,password (required)
    Response:
        message: string (contains the success message)

Example Request:

``` json 

{
  "email": "johnDoe@negro300.com",
  "password": "password123"
}
``` 
response
``` json   
{
	"statusCode": 200,
	"responseCode": 617
}
``` 
if password is incorrect
``` json 
{
	"statusCode": 200,
	"responseCode": 603
}
``` 
if email is incorrect:
```json
{
	"statusCode": 200,
	"responseCode": 610
}
```
 ## Logout Endpoint

    URL: /logout
    Method: GET
    Request Body: empty

response:
```json
{
	"statusCode": 200,
	"responseCode": 611
}
```
   
