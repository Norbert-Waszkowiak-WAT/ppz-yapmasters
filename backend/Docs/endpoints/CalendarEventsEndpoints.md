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
	"statusCode": 200
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
	"statusCode": 200
}
```