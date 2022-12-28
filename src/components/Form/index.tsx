import React, {useState} from "react";
import { InputDefault, InputName } from "../InputDefault";
import { Stack, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addNovoUsuario } from "../../store/modules/users/usersSlice";


export interface FormProps {
  type: 'login' | 'signup';
}

export function Form({ type }: FormProps) {

//states para dados do usuario  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRepassword] = useState('');

//states para erros no formulario
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

//pegando informaçoes de usuarios com redux
  const usersRedux = useAppSelector((state) => state.users);

//variavel que recebe o retorno
  const dispatch = useAppDispatch();

  const selectInput = (value: string, key: InputName) => {
    switch (key) {
      case 'name':
        setName(value);
        handleValidateInput(value, key);
      break;
      
      case 'email':
        setEmail(value);
        handleValidateInput(value, key);
      break;

      case 'password':
        setPassword(value);
        handleValidateInput(value, key);
      break;

      case 'repassword':
        setRepassword(value);
        handleValidateInput(value, key);
      break;

      default:
      } 
  };

//funçao para validar campos input
  const handleValidateInput = (value: string, key: InputName) => {
    switch(key){
      case 'name':
        if(value.length < 3){
          setErrorName(true)
        }else{
          setErrorName(false)
        }
      break;
      
      case 'email':
        // eslint-disable-next-line no-useless-escape
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if(!value.match(regexEmail)){
          setErrorEmail(true)
        }else{
          setErrorEmail(false)
        }
      break;

      case 'password':
        if(type === 'signup') {
          if(!value || value.length < 6){
            setErrorPassword(true)
          }else{
            setErrorPassword(false)
          }
        }

          if(type === 'login') {
            if(!value){
              setErrorPassword(true)
            }else{
              setErrorPassword(false)
            }    
          }  
      break;  
      
      case 'repassword':
        if(value !== password) {
          setErrorPassword(true)
        } else {
          setErrorPassword(false)
        }
      break
    
      default:
    }
  }

  //navegaçao de páginas login/signup
  const navigate = useNavigate();

  const handleNavigate = () => {
    if(type === 'login') {
      navigate('/signup');
    }else{
      navigate('/');
    }
  }

  const createAccount = () => {
    const newUser = {
      name,
      email,
      password,
      recados: []
    }

    const userExist = usersRedux.some((user) => user.email === newUser.email);

    if(!userExist){
      dispatch(addNovoUsuario(newUser))
      clearInputs();
      alert('Usuário Cadastrado! Você será redirecionado');
    
      setTimeout(() => {
        navigate('/')
      }, 1000)
    }else{
      alert('E-mail já em uso!')
    }
  }

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
    setRepassword('');
  }

  const login = () => {
    const userExist = usersRedux.find((user) => user.email === email && user.password === password);

    if(!userExist) {
       const confirma = window.confirm("Usuário não cadastrado. Deseja cadastrar uma conta? ")

       if(confirma) {
            navigate('/signup')
       }else{
        return;
       }
    }else{
      localStorage.setItem('usuarioLogado', JSON.stringify(userExist))
      
      alert('Login efetuado com sucesso! Redirecionando...')
      setTimeout(() => {
          navigate('/home')
      }, 1500)
    }
}


  return (
    <>
      <Stack spacing={2} direction="column" sx={{ width: '80%' }}>
        {type === 'login' && (
          <>
            <InputDefault type="email" label="E-mail" name="email" value={email} handleChange={selectInput} color={errorEmail ? 'error' : 'secondary'}/>
            <InputDefault type="password" label="Senha" name="password" value={password} handleChange={selectInput} color={errorPassword ? 'error' : 'secondary'} />
            <Button variant="contained" color="secondary" onClick={login}>Acessar</Button>
            <Typography color='secondary' variant='subtitle2'>Não tem conta? <Typography variant='button' color='secondary' sx={{ cursor: 'pointer' }} onClick={handleNavigate}>Cadastre-se</Typography></Typography>
          </>
        )}
        {type === 'signup' && (
          <>
            <InputDefault type="text" label="Nome" name="name" color={errorName ? 'error' : 'secondary'} value={name} handleChange={selectInput} />
            <InputDefault type="email" label="Email" name="email" color={errorEmail ? 'error' : 'secondary'} value={email} handleChange={selectInput} />
            <InputDefault type="password" label="Senha" name="password" color={errorPassword ? 'error' : 'secondary'} value={password} handleChange={selectInput} />
            <InputDefault type="password" label="Repita a Senha" name="repassword" color={errorPassword ? 'error' : 'secondary'} value={repassword} handleChange={selectInput} />
            <Button disabled={errorName || errorEmail || errorPassword} variant='contained' color='secondary' onClick={createAccount}>Criar Conta</Button>
            <Typography color='secondary' variant='subtitle2'>Já tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography>
          </>
        )}
      </Stack>
    </>
  )
}