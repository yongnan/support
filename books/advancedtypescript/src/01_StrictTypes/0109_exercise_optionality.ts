/* eslint-disable @typescript-eslint/no-unused-vars */

interface Author {
    name: string;
}

interface Article {
    title: string;
    author?: Author;
}

function getArticleAuthorName(article?: Article){
    return article && article.author && article.author.name;
}

// or using the optional chaining syntax from TypeScript 3.7
function getArticleAuthorName2(article?: Article) {
    return article?.author?.name;
}
  