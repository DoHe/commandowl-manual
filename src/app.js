import Vue from 'vue';
import App from './App.vue';
import { createStore } from './store';

export function createApp(context) {
  const store = createStore();
  const app = new Vue({
    store,
    data: {
      url: context.url,
    },
    render: h => h(App),
  });
  return { app, store };
}
