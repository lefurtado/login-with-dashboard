import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Input from '../../components/Input';
import ButtonComp from '../../components/ButtonComp';
import * as C from './styles';

const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [emailConf, setEmailConf] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { signup } = useAuth();

    const handleSignup = () => {
        if (!email | !emailConf | !password | !name | !surname | !phone) {
            setError('Preencha todos os campos');
            return;
        } else if (email !== emailConf) {
            setError('Os e-mails não são iguais');
            return;
        }

        const res = signup(email, password, name, surname, phone);

        if (res) {
            setError(res);
            return;
        }

        alert('Usuário cadatrado com sucesso!');
        navigate('/');
    };

    return (
        <C.Container>
            <C.Label>SISTEMA DE CADASTRO</C.Label>
            <C.Content>
                <Input 
                    type='text'
                    placeholder='Digite seu nome'
                    value={name}
                    onChange={(e) => [setName(e.target.value), setError('')]}
                />
                <Input 
                    type='text'
                    placeholder='Digite seu sobrenome'
                    value={surname}
                    onChange={(e) => [setSurname(e.target.value), setError('')]}
                />
                <Input 
                    type='text'
                    placeholder='Digite seu telefone'
                    value={phone}
                    onChange={(e) => [setPhone(e.target.value), setError('')]}
                />
                <Input
                    type='email'
                    placeholder='Digite seu E-mail'
                    value={email}
                    onChange={(e) => [setEmail(e.target.value), setError('')]}
                />
                <Input
                    type='email'
                    placeholder="Confirme seu E-mail"
                    value={emailConf}
                    onChange={(e) => [setEmailConf(e.target.value), setError('')]}
                />
                <Input
                    type='password'
                    placeholder='Digite sua Senha'
                    value={password}
                    onChange={(e) => [setPassword(e.target.value), setError('')]}
                />
                <C.labelError>{error}</C.labelError>
                <ButtonComp Text='Inscrever-se' onClick={handleSignup} />
                <C.LabelSignin>
                    Já tem uma conta?
                    <C.Strong>
                        <Link to='/'> Entre</Link>
                    </C.Strong>
                </C.LabelSignin>
            </C.Content>
        </C.Container>
    )
}

export default Signup;
