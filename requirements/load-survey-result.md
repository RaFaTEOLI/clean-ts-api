# Survey Result

> ## Success Case:

1. ⛔ It receives a **GET** request at **/api/surveys/{survey_id}/results**
2. ⛔ It validates if the request was made by an user
3. ⛔ It returns **204** if there are no results
4. ⛔ It returns **200** with the survey results

> ## Exceptions:

1. ⛔ It will return error **404** if endpoint doesn't exist
2. ⛔ It will return error **403** if the request is not made by an user
3. ⛔ It will return error **403** if survey_id is invalid
4. ⛔ It will return error **500** if there is an error while trying to return survey result
