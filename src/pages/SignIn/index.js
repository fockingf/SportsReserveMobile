import React, { useRef } from 'react';
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

export default function SignIn({ navigation }) {
    const passwordRef = useRef();

    function handleSubmit() {
        return;
    }
    return (
        <Background>
            <Container>
                <Image source={logo} />
                <SportsReserve>
                    Sports
                    {/* eslint-disable-next-line react-native/no-inline-styles */}
                    <Text style={{ fontSize: 30, color: '#fff' }}>Reserve</Text>
                </SportsReserve>
                <Form>
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorret={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />
                    <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
                </Form>
                <SignLink onPress={() => navigation.navigate('SignUp')}>
                    <SignLinkText>Não tenho uma conta</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
