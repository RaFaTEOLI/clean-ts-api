# Login

> ## Success Usecase

1. ✅ It receives a **POST** request at **/api/login**
2. ✅ It validates required fields **email** and **password**
3. ✅ It validates that **email** is a valid email
4. ✅ It **searches** the user with email and password
5. ✅ It generates an access **token** by the user id
6. ✅ It **updates** the user data with the access token
7. ✅ It will return a **200** with the access token and the user name

> ## Exceptions

1. ✅ It will return error **404** if endpoint doesn't exist
2. ✅ It will return error **400** if email or password aren't provided
3. ✅ It will return error **400** if email is an invalid email
4. ✅ It will return error **401** if no valid user is found
5. ✅ It will return error **500** if there is an error while trying generate an access token
6. ✅ It will return error **500** if there is an error while trying update the user with the access token
