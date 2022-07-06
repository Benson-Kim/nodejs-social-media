--Procedure to check if a user has already commented on a post
CREATE or ALTER PROCEDURE Posts.checkUserComment
    (
    @userId INT,
    @postId INT
)
AS
BEGIN
    SELECT *
    FROM Posts.Comments
    WHERE userId= @userId AND postId=@postId
END
GO

-- EXECUTE Posts.checkUserComment 1,1
