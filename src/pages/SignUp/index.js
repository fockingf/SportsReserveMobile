import React, { useRef, useState } from 'react';
import { Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import logo from '~/assets/logoUnivaliBranco.png';
import Background from '~/components/Background';
import { signUpRequest } from '~/store/modules/auth/actions';
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

export default function SignUp({ navigation }) {
    const dispatch = useDispatch();
    const emailRef = useRef();
    const passwordRef = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit() {
        dispatch(signUpRequest(name, email, password));
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
                        icon="person-outline"
                        autoCorret={false}
                        autoCapitalize="none"
                        placeholder="Nome Completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />
                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorret={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        ref={emailRef}
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
                    <SubmitButton loading={loading} onPress={handleSubmit}>
                        Cadastrar
                    </SubmitButton>
                </Form>
                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já tenho uma conta</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
