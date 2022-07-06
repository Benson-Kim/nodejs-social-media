-- Procedure to retrieve all posts
CREATE OR ALTER PROCEDURE Posts.PROC_GetPosts
AS
BEGIN
    SELECT *
    FROM Posts.Post
END
GO
/**
EXECUTE Posts.PROC_GetPosts
GO
*/