export const IN_PRODUCTION_MODE = process.env.NODE_ENV === 'production';

export const GITHUB_OAUTH = {
  clientId: process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID || '',
};

export const VERSION = process.env.VERSION;