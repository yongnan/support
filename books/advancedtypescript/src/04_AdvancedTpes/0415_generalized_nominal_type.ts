export {}

// Generalizing nominal typescript
type Nominal<T, K extends string> = T & { __brand: K };

type UserId = Nominal<string, "UserId">;
type ArticleId = Nominal<string, "ArticleId">;

function getArticle(articleId: ArticleId) {}

declare const articleId: ArticleId;
declare const userId: UserId;

getArticle(articleId); 
getArticle(userId);  //Error!

