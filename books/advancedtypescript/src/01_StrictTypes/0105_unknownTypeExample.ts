/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

//const fetch = require("node-fetch");

interface Article{
    title: string;
    body: string;
}

fetch("http://example.com")
    .then((response: any) => response.json())
    .then((body: unknown) => {
        const article = body as Article;
        console.log(article.title);
    })