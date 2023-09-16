/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

//const fetch = require("node-fetch");

interface Article{
    title: string;
    body: string;
}

fetch("http://example.com")
    .then((response: any) => response.json())
    .then((body: unknown) => {
        if (isArticle(body)){
            const article = body as Article;
            console.log(article.title);
        }
    })

function isArticle(body: unknown): boolean {
    //const article = body as Article;
    //return article.title !== undefined && article.body !== undefined ;

    return (
        typeof body === "object" &&
        body !== null &&
        typeof (body as any).title === "string" &&
        typeof (body as any).body === "string"
    );
}   