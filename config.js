// https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration

module.exports = {
  port: 8000,
  authorization_endpoint: "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize",
  token_endpoint: "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
  userinfo_endpoint: "https://graph.microsoft.com/oidc/userinfo",
  device_authorization_endpoint: "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/devicecode",
  userSearch_endpoint: "https://graph.microsoft.com/v1.0/users",
  clientId: "",
  clientSecret: "",
  code_verifier: "someValue",
  userId: ""
};