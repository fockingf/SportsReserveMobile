import React from 'react';
import './config/ReactotronConfig';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { StatusBar } from 'react-native';
import Routes from './routes';

// import { Container } from './styles';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <StatusBar barStyle="light-content" backgroundColor="black" />
                <Routes />
            </PersistGate>
        </Provider>
    );
}
