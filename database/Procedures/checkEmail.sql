-- Procedure to check if email is already registered
CREATE OR ALTER PROCEDURE Users.PROC_CheckEmail(
    @email VARCHAR(50)
)
AS
BEGIN
    SELECT *
    FROM Users.[User]
    WHERE email=@email
END
GO

/** 
EXECUTE Users.PROC_CheckEmail 'alfredkimathi@edu.com'
GO
*/