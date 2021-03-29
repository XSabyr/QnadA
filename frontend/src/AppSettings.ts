export const server = 'https://localhost:44336';

export const webAPIUrl = `${server}/api`;

export const authSettings = {
  domain: 'dev-k9sz0zky.us.auth0.com',
  client_id: 'R3qHs18tayXrPZMf2zTOcz5NK0EsaK4I',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'https://qanda',
};
