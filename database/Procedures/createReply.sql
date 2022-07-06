-- A user can comment on a post only once, BUT, they can make another comment by replying to their own comment.
-- Procedure to create a reply to a comment on a post into the database
CREATE OR ALTER PROCEDURE Posts.PROC_InsertReply(
    @content TEXT,
    @postId INT,
    @userId INT,
    @commentId INT
)
AS
BEGIN
    INSERT INTO Posts.Replies
        (content,postId,userId,commentId)
    VALUES(@content, @userId, @postId, @commentId)
END
GO

/**
EXECUTE Posts.PROC_InsertReply 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.', 1,1,1
GO
*/
