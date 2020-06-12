import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';
import { Container, RecursosList, Recurso, Avatar, Name } from './styles';
import api from '~/services/api';

export default function SelectRecurso({ navigation }) {
    const [recursos, setRecursos] = useState([]);

    useEffect(() => {
        async function loadRecursos() {
            const response = await api.get('recursos');

            setRecursos(response.data);
        }

        loadRecursos();
    }, []);

    return (
        <Background>
            <Container>
                <RecursosList
                    data={recursos}
                    keyExtractor={recurso => String(recurso.id)}
                    renderItem={({ item: recurso }) => (
                        <Recurso
                            onPress={() =>
                                navigation.navigate('SelectDateTime', {
                                    recurso,
                                })
                            }>
                            <Avatar
                                source={{
                                    uri: recurso.avatar
                                        ? recurso.avatar.url
                                        : `https://api.adorable.io/avatar/50/${recurso.name}.png`,
                                }}
                            />
                            <Name>{recurso.name}</Name>
                        </Recurso>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectRecurso.navigationOptions = ({ navigation }) => ({
    title: 'Escolha o recurso',
    headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
            <Icon name="chevron-left" size={20} color="#FFF" />
        </TouchableOpacity>
    ),
});
