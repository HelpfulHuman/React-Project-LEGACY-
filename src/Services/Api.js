import { Portal } from 'portals';

const Api = new Portal();

Api.useDefaultInterceptors();

if (window.env.API_HOST) {
  Api.globals.hostname = window.env.API_HOST;
}

export default Api;
