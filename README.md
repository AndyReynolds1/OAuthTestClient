# OAuth 2.0 Test Client

Node.js web app to test the following OAuth 2.0 flows:

- Authorization Code
- Authorization Code with PKCE
- Client Credentials
- Implicit
- Hybrid
- Device Code

![Screenshot](/docs/screenshot-1.png)
![Screenshot](/docs/screenshot-2.png)
![Screenshot](/docs/screenshot-3.png)

## Setup

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

# Running
Install required depencies:

```bash
npm install
```

Run the app:

```bash
node index.js
```

App will be available at [http://localhost:8000](http://localhost:8000)
