// https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration

module.exports = {
  port: process.env.PORT || 8000,
  authorization_endpoint: process.env.AUTHZ_ENDPOINT || "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/authorize",
  token_endpoint: process.env.TOKEN_ENDPOINT || "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token",
  userinfo_endpoint: process.env.USERINFO_ENDPOINT || "https://graph.microsoft.com/oidc/userinfo",
  device_authorization_endpoint: process.env.DEVICE_AUTHZ_ENDPOINT || "https://login.microsoftonline.com/{tenant}/oauth2/v2.0/devicecode",
  userSearch_endpoint: process.env.USER_SEARCH_ENDPOINT || "https://graph.microsoft.com/v1.0/users",
  clientId: process.env.CLIENT_ID || "",
  clientSecret: process.env.CLIENT_SECRET || "",
  code_verifier: process.env.CODE_VERIFIER || "someValue",
  userId: process.env.USERID || ""
};