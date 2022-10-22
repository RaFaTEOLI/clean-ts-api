# List Surveys

> ## Success Case:

1. ⛔ It receives a **GET** request at **/api/surveys**
2. ⛔ It validates if the request was made by an user
3. ⛔ It returns **204** if there are no surveys
4. ✅ It returns **200** with the surveys

> ## Exceptions:

1. ⛔ It will return error **404** if endpoint doesn't exist
2. ⛔ It will return error **403** if a user is not logged in
3. ✅ It will return error **500** if there is an error while trying to list surveys
