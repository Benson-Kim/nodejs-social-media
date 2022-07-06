-- Procedure to create a post comment into the database
CREATE OR ALTER PROCEDURE Posts.PROC_InsertComment(
    @content TEXT,
    @postId INT,
    @userId INT
)
AS
BEGIN
    INSERT INTO Posts.Comments
        (content,postId,userId)
    VALUES(@content, @userId, @postId)
END
GO

/**
EXECUTE Posts.PROC_InsertComment 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.', 1,1
GO
*/