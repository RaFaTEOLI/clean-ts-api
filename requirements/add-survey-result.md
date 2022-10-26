# Answer Survey

> ## Success Case:

1. ⛔ It receives a **PUT** request at **/api/surveys/{survey_id}/results**
2. ⛔ It validates if the request was made by an user
3. ✅ It validates the param **survey_id**
4. ✅ It validates if the field **answer** is a valid answer
5. ✅ It **creates** a survey result with provided data if there is no existing record
6. ✅ It **updates** a survey result with provided data if there is an existing record
7. ⛔ It returns a **200** with the survey result data

> ## Exceptions:

1. ⛔ It will return error **404** if endpoint doesn't exist
2. ⛔ It will return error **403** if the request is not made by an user
3. ✅ It will return error **403** if survey_id is invalid
4. ✅ It will return error **403** if the answer is an invalid answer
5. ⛔ It will return error **500** if there is an error while trying to create survey result
6. ⛔ It will return error **500** if there is an error while trying to update survey result
7. ✅ It will return error **500** if there is an error while trying to load survey
