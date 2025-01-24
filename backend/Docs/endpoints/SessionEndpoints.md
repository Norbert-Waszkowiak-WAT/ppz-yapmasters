## Get all Sessions Endpoint
   User must be logged in to use this endpoint
    URL: user/getallsessions
    Method: get
    Request Body: none
    Response:
       contains all sessions


  Example request:
When logged in
```json
{}
```
response:
 ``` json   
 {
	"0": "n2g0gPw4lbiBFR25dXH__TKK6qwet25H",
	"1": "g0fPGMgMGaRbXFhJw-D2O3kVaQ-tFi_r",
	"statusCode": 200,
	"responseCode": 701
}
```
When logged out
request:
```json
{}
```
response:
```json 
{
	"statusCode": 404,
	"responseCode": 702
}
``` 

## destroy all sessions
   User must be logged in to use this endpoint
    URL: user/destroyallsessions
    Method: delete
    Request Body: none
    Response:
    either internal server error, or code of success

  Example request:
  User logged in:
```json
{}
```
response:
```json
{
	"statusCode": 200,
	"responseCode": 703
}
```
When logged out
request:
```json
{}
```
response:
```json 
{
	"statusCode": 404,
	"responseCode": 702
}
``` 
