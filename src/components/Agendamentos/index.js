import React, { useMemo } from 'react';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Agendamento({ data, onCancel }) {
    const dateParsed = useMemo(() => {
        return formatRelative(parseISO(data.date), new Date(), {
            locale: pt,
            addSuffix: true,
        });
    }, [data.date]);
    return (
        <Container past={data.past}>
            <Left>
                <Avatar
                    source={{
                        uri: data.recurso.avatar
                            ? data.recurso.avatar.url
                            : `https://api.adorable.io/avatar/50/${data.recurso.name}.png`,
                    }}
                />
                <Info>
                    <Name>{data.recurso.name}</Name>
                    <Time>{dateParsed}</Time>
                </Info>
            </Left>
            {data.cancelable && !data.canceledAt && (
                <TouchableOpacity onPress={onCancel}>
                    <Icon name="event-busy" size={20} color="red" />
                </TouchableOpacity>
            )}
        </Container>
    );
}
