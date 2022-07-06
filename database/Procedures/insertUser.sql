-- Procedure to insert a user into the database
CREATE PROCEDURE users.PROC_InsertUser(
    @firstname VARCHAR(50),
    @lastname VARCHAR(50),
    @username VARCHAR(50),
    @email VARCHAR(50),
    @telephone VARCHAR(50),
    @password VARCHAR(255)
)
AS
BEGIN
    INSERT INTO Users.[User]
        (firstname,lastname,username,email,telephone,[password])
    VALUES(@firstname, @lastname, @username, @email, @telephone, @password)
END
GO

/** 
EXECUTE users.PROC_InsertUser 'Alfred', 'Kimathi','bensonkimathi', 'alfredkimathi@edu.com', '702 404-6272','Pass1234'
GO
*/