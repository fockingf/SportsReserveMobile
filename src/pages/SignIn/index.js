import React from 'react';
import { Image } from 'react-native';
import logo from '~/assets/logoUnivaliBranco.png';
import Background from '~/components/Background';
import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
    SportsReserve,
} from './styles';
import { Text } from '~/components/Button/styles';

export default function SignIn() {
    return (
        <Background>
            <Container>
                <Image source={logo} />
                <SportsReserve>
                    Sports
                    <Text style={{ fontSize: 30, color: '#fff' }}>Reserve</Text>
                </SportsReserve>
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorret={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                    />
                    <SubmitButton onPress={() => {}}>Acessar</SubmitButton>
                </Form>
                <SignLink onPress={() => {}}>
                    <SignLinkText>Cadastre-se</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
