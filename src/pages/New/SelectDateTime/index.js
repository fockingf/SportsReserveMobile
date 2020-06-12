import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, HourList, Hour, Title } from './styles';
import DateInput from '~/components/DateInput';
import api from '~/services/api';
import Background from '~/components/Background';

export default function SelectDateTime({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);

    const recurso = navigation.getParam('recurso');

    useEffect(() => {
        async function loadDisponibilidade() {
            const response = await api.get(
                `recursos/${recurso.id}/disponibilidade`,
                {
                    params: {
                        date: date.getTime(),
                    },
                }
            );
            setHours(response.data);
        }
        loadDisponibilidade();
    }, [date, recurso.id]);
    function handleSelectHour(time) {
        navigation.navigate('Confirm', {
            recurso,
            time,
        });
    }

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />
                <HourList
                    data={hours}
                    keyExtrator={item => item.time}
                    renderItem={({ item }) => (
                        <Hour
                            onPress={() => handleSelectHour(item.value)}
                            enabled={item.disponivel}>
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o horário',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>
    ),
});
