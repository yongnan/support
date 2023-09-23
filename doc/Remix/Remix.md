# Remix



# QA

1. # [The resource was preloaded using link preload but not used within a few seconds](https://wordpress.stackexchange.com/questions/253151/the-resource-was-preloaded-using-link-preload-but-not-used-within-a-few-seconds)

Answer:

due to http2/push

`root.tsx`

must add as attribute:

```
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: tailwindStylesheetUrl, as: "style" }];
};
```





