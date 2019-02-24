import { createApp } from './app';

export default (context) => {
  // eslint-disable-next-line no-param-reassign
  context.url = 'abc';
  const { app, store } = createApp(context);
  // eslint-disable-next-line no-param-reassign
  context.rendered = () => {
    // eslint-disable-next-line no-param-reassign
    context.state = store.state;
  };
  return app;
};
