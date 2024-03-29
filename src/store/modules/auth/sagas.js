import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;
        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        if (user.recurso) {
            Alert.alert('Aviso', 'Usuario não pode ser um recurso');
            return;
        }
        api.defaults.headers.Authorization = `Baerer ${token}`;
        yield put(signInSuccess(token, user));
    } catch (e) {
        Alert.alert('Falha na autenticação', 'Verifique os dados digitados');
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;
        yield call(api.post, 'users', {
            name,
            email,
            password,
        });
        Alert.alert('Cadastro de Usuário', 'Cadastradado com sucesso!');
    } catch (e) {
        Alert.alert('Falha no cadastro', 'Verifique os dados digitados');
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) {
        return;
    }
    const { token } = payload.auth;
    if (token) {
        api.defaults.headers.Authorization = `Baerer ${token}`;
    }
}

export function signOut() {}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('@auth/SIGN_OUT', signOut),
]);
