import i18n from 'i18next';
import ReactDOM from 'react-dom/client';
import React from 'react';
import { Provider } from 'react-redux';
import { io } from 'socket.io-client';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import ru from './locales/ru';
import store from './slices';
import SocketProvider from './components/providers/SocketProvider';
import AuthProvider from './components/providers/AuthProvider';
import App from './components/App';
import { actions as messagesActions } from './slices/messagesSlice';
import { actions as channelsActions } from './slices/channelsSlice';

export default async () => {
  const rollbarConfig = {
    enabled: true,
    accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
  };

  const i18nextInstance = i18n.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: {
        ru,
      },
    });

  filter.add(filter.getDictionary('ru'));

  const socket = io();

  socket.on('newMessage', (msg) => {
    store.dispatch(messagesActions.addMessage(msg));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(channelsActions.removeChannel(id));
    if (store.getState().channels.currentChannelId === id) {
      store.dispatch(channelsActions.setCurrentChannelId(1));
    }
  });

  socket.on('renameChannel', ({ id, name }) => {
    store.dispatch(channelsActions.updateChannel({ id, changes: { name } }));
  });

  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <React.StrictMode>
          <Provider store={store}>
            <SocketProvider socket={socket}>
              <I18nextProvider i18n={i18nextInstance}>
                <AuthProvider>
                  <App />
                </AuthProvider>
              </I18nextProvider>
            </SocketProvider>
          </Provider>
        </React.StrictMode>
      </ErrorBoundary>
    </RollbarProvider>,
  );
};
