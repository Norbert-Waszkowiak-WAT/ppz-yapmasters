## Get all Sessions Endpoint
   User must be logged in to use this endpoint
    URL: sesssions/getallsessions
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
	"0": "2o5GJ8kB3SN0WjKlqPf1_a1PykY9VrOz",
	"1": "1737749977461",
	"2": "mjVcsZ9xz0uWD3lATbqeFBt-6PRlioq_",
	"3": "1737749977811",
	"statusCode": 200,
	"responseCode": 701
}
```
Each odd id number contains the time(in unix) of creation for the previos id number
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
