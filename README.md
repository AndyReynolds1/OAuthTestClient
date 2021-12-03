# OAuth 2.0 Test Client

- [Overview](#overview)
- [Screenshots](#screenshots)
- [Run Locally](#run-locally)
- [Docker Version](#docker-version)

## Overview

A small Node.js web app to test the following OAuth 2.0 flows:

- Authorization Code
- Authorization Code with PKCE
- Client Credentials
- Implicit
- Hybrid
- Device Code

## Screenshots

![Screenshot](/docs/screenshot-1.png)
![Screenshot](/docs/screenshot-2.png)
![Screenshot](/docs/screenshot-3.png)

## Run locally

### Setup

Requires having [Node.js](https://nodejs.org/en/download/) installed.

Edit `config.js` to set endpoint URLs for your authorization server.

Register an application with your authorization server and configure the following callback URLs:

```bash
http://localhost:8000/auth-code/callback
http://localhost:8000/auth-code-pkce/callback
http://localhost:8000/hybrid/callback
http://localhost:8000/implicit/callback
```

Generate a client secret for your application and edit the `clientId` and `clientSecret` values in `config.js` for your application.

### Running
Install required depencies (only needed once):

```bash
npm install
```

Run the app:

```bash
node index.js
```

App will be available at [http://localhost:8000](http://localhost:8000)

## Docker version

A docker image for this app is also available: [areynolds762/oauthtestclient](https://hub.docker.com/repository/docker/areynolds762/oauthtestclient)

The following environment variables need to be set when running the container to configure the app:

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
