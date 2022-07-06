-- Procedure to create a post into the database
CREATE OR ALTER PROCEDURE Posts.PROC_InsertPost(
    @content TEXT,
    @userId INT
)
AS
BEGIN
    INSERT INTO Posts.Post
        (content,userId)
    VALUES(@content, @userId)
END
GO
/**
EXECUTE Posts.PROC_InsertPost 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus fuga doloribus, a eveniet cupiditate ab error nihil recusandae itaque culpa?', 1
GO
*/