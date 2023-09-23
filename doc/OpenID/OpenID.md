# OpenID



OpenID Connect is used for **authentication**

OAuth 2.0 is used for **authorization**

# OAuth

## Why OAuth?

To understand the reason for the birth of OAuth we need to understand a term called Delegated Authorization.

### Delegated authorization

Delegated authorization is an approach to allowing a third-party application access to a user’s data.

### Two approaches to delegated authorization

There are two approaches for delegated authorization, whether you give the third-party application your account password so they can login into your account on your behalf and access your data *or* you grant the application to access your data using OAuth without giving your password (and none of us will give our password!).

## What is OAuth?

### OAuth 2.0 terminology

- **Resource Owner:** The user who owns the data that the client application wants to access.
- **Client:** The application that wants access to the user’s data.
- **Authorization Server:** The authorization server authorizes the client to access a user’s data by granting permission from the user.
- **Resource Server:** The system that holds the data that the client wants to access. In some cases, the resource server and authorization server are the same.
- **Access Token:** An access token is the only key that the client can use to access the granted data by the user on the resource server.

![OAuth 2.0 Abstract Flow](https://miro.medium.com/v2/resize:fit:700/1*sY_SVlcBpVDhqsFDwcdHTg.png)

### Scopes in OAuth

Scopes in OAuth 2.0 are used to limit an application’s access to a user’s data.

By issuing an authorization grant that is limited only to the scopes granted by the user.

When the client makes a request to the authorization server for authorization grant, it sends a list of scopes with it. The authorization server uses this list of scopes to generate a consent screen and grants permission from the user. If the user agrees to the consent screen, the authorization server issues a token or authorization code that is limited only to the scopes granted by the user.

For instance, if I grant a client application to see the list of my Google contacts then the token issued to the client by the authorization server can’t be used to delete my contacts or see my calendar events — it’s only scoped to read my Google contacts.

## Setup for OAuth 2.0

- `response_type` the type of response we want to get from the authorization server.
- `scope` list of scopes that the client wants access to. This list is used by the authorization server to generate a consent screen for the user.
- `client_id` is provided by the authorization service when setting up the client for OAuth. This ID helps the authorization server to determine the client who is initiating the OAuth flow.
- `redirect_uri` tells the authorization server where to go when the OAuth flow is completed.
- `client_secret` is provided by the authorization service. This parameter may or may not be required, based on the OAuth flow. We’ll see its importance in the authorization code flow.

## Understanding Different OAuth Flows

- **authorization code flow** for server-based applications

- **implicit flow** for pure JavaScript Single Page Applications (SPAs).

### Authorization code flow

![OAuth 2.0 Authorization Code Flow](https://miro.medium.com/v2/resize:fit:700/1*WOBSxYJi6onbvZDc1c6_gQ.png)

> https://accounts.google.com/o/oauth2/v2/auth?
>  response_type=code&
>  client_id=your_client_id&
>  scope=profile%20contacts&
>  redirect_uri=https%3A//oauth2.example.com/code

 The authorization code looks like this:

```
4/W7q7P51a-iMsCeLvIaQc6bYrgtp9
```

![OAuth 2.0 Authorization Code Flow broken into Client browser & server to explain the reason behind exchanging code for token](https://miro.medium.com/v2/resize:fit:700/1*ePkpjMPakMDAdO-NDg5D4A.png)

The `client_secret` is only known by the client’s back-end channel, the back-end channel then makes a POST request to the authorization server with authorization code and client secret included. The request might look something like this:

```
POST /token HTTP/1.1
Host: oauth2.googleapis.com
Content-Type: application/x-www-form-urlencoded

code=4/W7q7P51a-iMsCeLvIaQc6bYrgtp9&
client_id=your_client_id&
client_secret=your_client_secret_only_known_by_server&
redirect_uri=https%3A//oauth2.example.com/code
```

## Implicit flow

The OAuth 2.0 **implicit flow** is used when you don’t have a back end channel and your website is a static site that uses only the browser.

![OAuth 2.0 Implicit Flow](https://miro.medium.com/v2/resize:fit:700/1*qmULPvcojWyICSdxZ8h5mA.png)

The client redirects the browser to the authorization server URI to start the authorization flow with `response_type` set to `token`.

Implicit flow is considered less secure because the browser is responsible for managing the access token, so **it could potentially be stolen**. Still, it’s widely used for single-page applications.

# Authentication vs Authorization

- **Authentication** is the assurance that the communicating entity is the one claimed.
- **Authorization** is the process of verifying whether the communicating entity has access to the resource.

In other words, authentication cares who you are, authorization cares what permissions you have.

# OpenID Connect

OpenID Connect is an identity layer on top of the OAuth 2.0 protocol. It extends OAuth 2.0 to standardize a way for authentication.

![OpenID Connect extending OAuth 2.0](https://miro.medium.com/v2/resize:fit:500/1*oFe0Jr3Y-s46834I4CI9YQ.png)

OpenID Connect enables the client to identify the user based on the authentication performed by the authorization server. 

`openid` is a mandatory scope

The URI for OpenID Connect authentication request made by the client looks like this:

```
https://accounts.google.com/o/oauth2/v2/auth?
 response_type=code&
 client_id=your_client_id&
 scope=openid%20contacts&
 redirect_uri=https%3A//oauth2.example.com/code
```

The result of the request is an authorization code that the client can exchange for an access token and ID token.

flow is implicit:  responds with an access token and an ID token right away.

The ID token is a JWT or JSON Web Token. 

A JWT is an encoded token that consists of three parts: **header**, **payload**, and **signature**.

After acquiring the ID token, the client can decode it to get the user info encoded in the **payload** part — like this:

```
{
  "iss": "https://accounts.google.com",
  "sub": "10965150351106250715113082368",
  "email": "johndoe@example.com",
  "iat": 1516239022,
  "exp": 1516242922
}
```

## Claims

The payload of the ID token contains some fields known as claims. Basic claims are:

- `iss` token issuer.
- `sub` unique identifier for the user.
- `email` user’s email.
- `iat` token issuing time represented as Unix time.
- `exp` token expiration time represented as Unix time.

tell the authorization server to include the required information in the ID token’s payload. These scopes are `profile`, `email`, `address`, and `phone`.

# End Note

It’s always good to practice what you have learned. To play with OAuth 2.0 scopes, authorization codes, and tokens go to [Google OAuth 2.0 Playground](https://developers.google.com/oauthplayground/).