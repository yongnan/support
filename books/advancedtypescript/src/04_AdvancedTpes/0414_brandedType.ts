export {}

type UserId = string & { __brand: "UserId"};
type ArticleId = string & { __brand: "ArticleId"};

declare const userId: UserId;

function getArticle(articleId: ArticleId) {}

getArticle(userId);  //Error!

