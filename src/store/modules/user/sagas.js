import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';
import api from '~/services/api';
import {
    updateProfileFailure,
    updateProfileSuccess,
} from '~/store/modules/user/actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload.data;
        const profile = Object.assign(
            { name, email },
            rest.oldPassword ? rest : {}
        );
        const response = yield call(api.put, 'users', profile);
        Alert.alert('Sucesso', 'Perfil atualizado');

        yield put(updateProfileSuccess(response.data));
    } catch (e) {
        Alert.alert(
            'Erro ao atualizar o perfil',
            'Verifique os dados digitados'
        );
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
