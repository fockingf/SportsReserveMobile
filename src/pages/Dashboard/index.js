import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '../../components/Background';
import { Container, Title, List } from './styles';
import Agendamento from '~/components/Agendamentos';
import api from '~/services/api';

export default function Dashboard() {
    const [agendamentos, setAgendamentos] = useState([]);
    useEffect(() => {
        async function loadAgendamentos() {
            const response = await api.get('agendamentos');
            setAgendamentos(response.data);
        }
        loadAgendamentos();
    }, []);

    async function handleCancel(id) {
        const response = await api.delete(`agendamentos/${id}`);
        setAgendamentos(
            agendamentos.map(agendamento =>
                agendamento.id === id
                    ? {
                          ...agendamento,
                          canceledAt: response.data.canceledAt,
                      }
                    : agendamento
            )
        );
    }

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>
                <List
                    data={agendamentos}
                    keyExtrator={item => String(item.id)}
                    renderItem={({ item }) => <Agendamento onCancel={() => handleCancel(item.id)} data={item} />}
                />
            </Container>
        </Background>
    );
}

Dashboard.navigationOptions = {
    tabBarLabel: 'Agendamentos',
    tabBarIcon: ({ tintColor }) => (
        <Icon name="event" size={20} color={tintColor} />
    ),
};
