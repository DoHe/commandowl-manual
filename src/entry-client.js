import { createApp } from './app';

const { app, store } = createApp({});

// eslint-disable-next-line no-underscore-dangle
if (window.__INITIAL_STATE__) {
  // eslint-disable-next-line no-underscore-dangle
  store.replaceState(window.__INITIAL_STATE__);
}

app.$mount('#app');
