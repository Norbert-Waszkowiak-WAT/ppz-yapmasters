## Features

- User registration
- User login
- User logout

## Tech Stack

(TBD - Insert your tech stack here)

## API Endpoints
The program does not check if emails are valid!!!
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

Default -> Verification
```json
{
	"message": "Now please verify your email",
	"userId": "672797f0c2acec05a02dc4ab",
	"userName": "negro",
	"userEmail": "alexanderdawi1@hotmail.com"
}
```
will return this json if the email is already in use
```json
{
	"message": "Email already used",
	"error": "Unauthorized",
	"statusCode": 401
}
```
if username is already in use
```json
{
  "message": "Username already used",
  "error": "Unauthorized",
  "statusCode": 401
}
```

## Login Endpoint
- URL: /users/login
- Method: POST
- Request Body:
  - `email`: string (required)
  - `password`: string (required)
- Response:
  - `user`: object (contains the authenticated user data)
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
	"User": {
		"userId": "672797f0c2acec05a02dc4ab",
		"userName": "negro"
	},
	"message": "User logged in"
}
```
will return this json if the email is not verfied
``` json
{
	"message": "Please verify your email address",
	"error": "Unauthorized",
	"statusCode": 401
}
```
and this json if email is not found
``` json
{
	"message": "email incorrect",
	"error": "Unauthorized",
	"statusCode": 401
}
```
and this json if password incorrect
``` json
{
	"message": "Password Incorrect",
	"error": "Unauthorized",
	"statusCode": 401
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
  "message": "Email verified successfully"
}
```
## resend-verification-code Endpoint
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
  "message": "Verification code sent successfully"
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
  "message": "Password reset email sent"
}
``` 
or if incorrect email
``` json 
{
  "message": "Email not found"
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
  "message": "Password reset successful"
}
``` 
if token invalid or expired
``` json 
{
  "message": "Invalid or expired token"
}
```
## delete-user Endpiont

    URL: /users/delete-user
    Method: post
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
  "message": "User deleted successfully"
}
``` 
if password is incorrect
``` json 
{
  "message": "Invalid password"
}
``` 
 ## Logout Endpoint

    URL: /logout
    Method: GET
    Request Body: empty


    !!! USES RRULE FOR HANDLING RECCURING EVENTS!!!
 ## addEvent enpoint

    URL: calendar/event/add
    Method: post
    Request Body: event (required)
    Response:
        contains the whole event with id

 Example request:
 With the event not reocurring
 ``` json   
 {
  "title": "Meeting",
  "type": "Work",
  "description": "Project discussion",
  "startDate": "2024-12-13T10:00:00.000Z",
  "endDate": "2024-12-13T11:00:00.000Z",
  "recurring": null //null for a one-time event
}
```
Response:
```json 
{
	"title": "Meeting",
	"type": "Work",
	"description": "Project discussion",
	"startDate": "2024-12-13T10:00:00.000Z",
	"endDate": "2024-12-13T11:00:00.000Z",
	"recurring": null,
	"_id": "675c8b1479abe2dca5499fb9",
	"__v": 0
}
```

  With the event reocurring:
  ``` json 
  {
  "title": "Gym Session",
  "type": "personal",
  "description": "Morning workout",
  "startDate": "2024-12-06T07:00:00Z",
  "endDate": "2024-12-06T08:00:00Z",
  "recurring": "FREQ=WEEKLY;INTERVAL=1;UNTIL=20250131T100000Z;BYDAY=MO,FR"
}
```
Response:
``` json 
{
	"title": "Gym Session",
	"type": "personal",
	"description": "Morning workout",
	"startDate": "2024-12-06T07:00:00.000Z",
	"endDate": "2024-12-06T08:00:00.000Z",
	"recurring": "FREQ=WEEKLY;INTERVAL=1;UNTIL=20250131T100000Z;BYDAY=MO,FR",
	"_id": "675c8ade79abe2dca5499fb6",
	"__v": 0
}
```
## Edit Event
      URL: calendar/event/update:eventId
      Method: post
      Request Body: event (required), eventId (required)
      Response:
        contains the whole event and reccuring with id's
 Example request:
 ```json
 {
  "recurring": "FREQ=WEEKLY;INTERVAL=1;UNTIL=20250131T100000Z;BYDAY=MO,FR"
}
```
response:
```json 
{
	"_id": "675d630f6b056db2b821c2a8",
	"title": "Meeting",
	"type": "Work",
	"description": "Project discussion",
	"startDate": "2024-12-13T10:00:00.000Z",
	"endDate": "2024-12-13T11:00:00.000Z",
	"recurring": "FREQ=WEEKLY;INTERVAL=1;UNTIL=20250131T100000Z;BYDAY=MO,FR",
	"__v": 0
}
```
Example request with incorrect EventId:

http://localhost:3000/calendar/events/update:675d630f6b6db2b821c2a8
```json
{
 "recurring": "FREQ=WEEKLY;INTERVAL=1;UNTIL=20250131T100000Z;BYDAY=MO,FR"
}
```
Response:
```json
{
	"message": "Invalid event ID",
	"error": "Bad Request",
	"statusCode": 400
}
```
Incorrect information format will be checked with DTO's and nestjs ValidationPipe.
Example request:
```json
{
  "recurring": "FREQ=WELY;INTERVAL=1;UNTIL=20250131T100000Z;BYDAY=MO,FR"
}
```
Response:
```json
{
	"message": [
		"recurring.frequency must be one of the following values: daily, weekly, monthly, yearly"
	],
	"error": "Bad Request",
	"statusCode": 400
}
```
