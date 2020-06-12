import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Container, Name, Avatar, SubmitButton, Time } from './styles';
import api from '~/services/api';
import Background from '~/components/Background';

export default function Confirm({ navigation }) {
    const recurso = navigation.getParam('recurso');
    const time = navigation.getParam('time');
    const dateFormatted = useMemo(
        () => formatRelative(parseISO(time), new Date(), { locale: pt }),
        [time]
    );
    async function handleAddAppointment() {
        await api.post('agendamentos', {
            recursoId: recurso.id,
            date: time,
        });
        navigation.navigate('Dashboard');
    }
    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: recurso.avatar
                            ? recurso.avatar.url
                            : `https://api.adorable.io/avatar/50/${recurso.name}.png`,
                    }}
                />
                <Name>{recurso.name}</Name>
                <Time>{dateFormatted}</Time>
                <SubmitButton onPress={handleAddAppointment}>
                    Confirmar reserva
                </SubmitButton>
            </Container>
        </Background>
    );
}

Confirm.navigationOptions = ({ navigation }) => ({
    title: 'Confirmar reserva',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>
    ),
});
