# Sign Up

> ## Success Usecase

1. ✅ It receives a **POST** request at **/api/signup**
2. ✅ It validates required fields **name**, **email**, **password** and **passwordConfirmation**
3. ✅ It validates that **password** and **passwordConfirmation** are equals
4. ✅ It validates **email** is a valid email
5. ✅ It **validates** if that email is taken
6. ✅ It generates a **hashed** password
7. ✅ It **creates** a user account, **replacing** the password with the hashed password
8. ✅ It generates an access **token** by the user id
9. ✅ It **updates** the user data with the access token
10. ✅ It will return a **200** with the access token and the user name

> ## Exceptions

1. ✅ It will return error **404** if endpoint doesn't exist
2. ✅ It will return error **400** if name, email, password or passwordConfirmation aren't provided
3. ✅ It will return error **400** if password and passwordConfirmation aren't
4. ✅ It will return error **400** if email is an invalid email
5. ✅ It will return error **403** if the provided email has already been taken
6. ✅ It will return error **500** if there is an error while trying to hash password
7. ✅ It will return error **500** if there is an error while trying to create an account
8. ✅ It will return error **500** if there is an error while trying generate an access token
9. ✅ It will return error **500** if there is an error while trying update the user with the access token
