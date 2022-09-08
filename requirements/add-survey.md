# Create Survey

> ## Success Case:

1. ⛔ It receives a **POST** request at **/api/surveys**
2. ⛔ It validates if the request was made by an admin
3. ⛔ It validates the request for required fields **question** and **asnwers**
4. ⛔ It creates a survey with provided data
5. ✅ It returns a 204 when new survey is created

> ## Exceptions:

1. ⛔ It will return error **404** if endpoint doesn't exist
2. ⛔ It will return error **403** if the user isn't admin
3. ✅ It will return error **400** if **question** and **asnwers** weren't provided
4. ✅ It will return error **500** if there is an error while trying to create survey
