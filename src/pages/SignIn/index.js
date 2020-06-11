import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch } from 'react-redux';
import logo from '~/assets/logoUnivaliBranco.png';
import Background from '~/components/Background';
import { signInRequest } from '~/store/modules/auth/actions';

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
    const dispatch = useDispatch();
    const passwordRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit() {
        dispatch(signInRequest(email, password));
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
                        value={email}
                        onChangeText={setEmail}
                    />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={password}
                        onChangeText={setPassword}
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
