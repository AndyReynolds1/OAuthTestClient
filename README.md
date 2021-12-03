# OAuth 2.0 Test Client

A small Node.js web app to test the following OAuth 2.0 flows:

- Authorization Code
- Authorization Code with PKCE
- Client Credentials
- Implicit
- Hybrid
- Device Code

This app can either be [run locally](#running-locally) or is available as a [Docker image](#docker-version).

- [Screenshots](#screenshots)
- [Running Locally](#running-locally)
- [Docker Version](#docker-version)

## Screenshots

![Screenshot](/docs/screenshot-1.png)
![Screenshot](/docs/screenshot-2.png)
![Screenshot](/docs/screenshot-3.png)

## Setup

1. Register an application with your authorization server
2. Generate a client secret for your application and make a note of this
3. Configure the following callback URLs in your application:

```bash
http://localhost:8000/auth-code/callback
http://localhost:8000/auth-code-pkce/callback
http://localhost:8000/hybrid/callback
http://localhost:8000/implicit/callback
```

**If using the Docker version amend the callback URLs in your application to match the URL/port of your Docker container**.

## Running locally

Ensure you have [Node.js](https://nodejs.org/en/download/) installed.

Edit the following values in `config.js` for your application:

- `authorization_endpoint` Authorization endpoint URL
- `token_endpoint` Token endpoint URL
- `userinfo_endpoint` User info endpoint URL
- `device_authorization_endpoint` Device authorization endpoint URL
- `userSearch_endpoint` User search endpoint URL
- `clientId` Client ID of your application
- `clientSecret` Client secret for your application
- `userId` A user ID to search for when using the Client Credentials flow

You can also optionally set the following if you wish to override the default values:

- `code_verifier` Value to use for the `code_verifier`
- `url` Base URL of the website
- `port` To overide the default port the website will run on

Note that changes to the `url` and `port` values will need to be reflected in the listed callback URLs for your registered application.

Install required depencies (only needed once):

```bash
npm install
```

Run the app:

```bash
node index.js
```

The app will be available at [http://localhost:8000](http://localhost:8000).

## Docker version

A docker image for this app is also available: [areynolds762/oauthtestclient](https://hub.docker.com/repository/docker/areynolds762/oauthtestclient)

The following environment variables need to be set on the container to configure the app:

- `URL` Base URL of the website
- `PORT` To overide the default port the website will run on
- `AUTHZ_ENDPOINT` Authorization endpoint URL
- `TOKEN_ENDPOINT` Token endpoint URL
- `USERINFO_ENDPOINT` User info endpoint URL
- `DEVICE_AUTHZ_ENDPOINT` Device authorization endpoint URL
- `USER_SEARCH_ENDPOINT` User search endpoint URL
- `CLIENT_ID` Client ID of your application
- `CLIENT_SECRET` Client secret for your application
- `CODE_VERIFIER` Value to use for the `code_verifier`
- `USERID` A user ID to search for when using the Client Credentials flow

Example docker command:

```bash
docker run -d \
-e URL=http://localhost
-e PORT=8080 \
-e AUTHZ_ENDPOINT="https://login.microsoftonline.com/common/oauth2/v2.0/authorize" \
-e TOKEN_ENDPOINT="https://login.microsoftonline.com/common/oauth2/v2.0/token" \
-e USERINFO_ENDPOINT="https://graph.microsoft.com/oidc/userinfo" \
-e DEVICE_AUTHZ_ENDPOINT="https://login.microsoftonline.com/common/oauth2/v2.0/devicecode" \
-e USER_SEARCH_ENDPOINT="https://graph.microsoft.com/v1.0/users" \
-e CLIENT_ID="87100e23-6a40-4774-af83-00906b9959c1" \
-e CLIENT_SECRET="MySecretValue" \
-e CODE_VERIFIER="CodeVerifierValue" \
-e USERID="demo@example.com" \
-p 8080:8080 areynolds762/oauthtestclient:latest
```
