-- Procedure to login the user
CREATE OR ALTER PROCEDURE Users.PROC_Login(
    @email VARCHAR(50) ,
    @password VARCHAR(50)
)
AS
BEGIN
    SELECT *
    FROM Users.[User]
    WHERE email=@email AND [password] =@password
END
GO