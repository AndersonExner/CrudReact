import React from "react";
import { InputDefault } from "../InputDefault";
import { Stack, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";


export interface FormProps {
  type: 'login' | 'signup';
}

export function Form({ type }: FormProps) {

  const selectInput = () => {
    console.log('teste');
  };

  const login = () => {
    console.log('logando');

  }

  const cadastrar = () => {
    console.log('cadastrando');

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


  return (
    <>
      <Stack spacing={2} direction="column" sx={{ width: '80%' }}>
        {type === 'login' && (
          <>
            <InputDefault type="text" label="Nome" name="name" color="secondary" value="" handleChange={selectInput} />
            <InputDefault type="text" label="Senha" name="password" color="secondary" value="" handleChange={selectInput} />
            <Button variant="contained" color="secondary" onClick={login}>Acessar</Button>
            <Typography color='secondary' variant='subtitle2'>Não tem conta? <Typography variant='button' color='secondary' sx={{ cursor: 'pointer' }} onClick={handleNavigate}>Cadastre-se</Typography></Typography>
          </>
        )}
        {type === 'signup' && (
          <>
            <InputDefault type="text" label="Nome" name="name" color="secondary" value="" handleChange={selectInput} />
            <InputDefault type="text" label="Email" name="email" color="secondary" value="" handleChange={selectInput} />
            <InputDefault type="text" label="Senha" name="password" color="secondary" value="" handleChange={selectInput} />
            <InputDefault type="text" label="Repita a Senha" name="repassword" color="secondary" value="" handleChange={selectInput} />
            <Button variant="contained" color="secondary" onClick={cadastrar}>Cadastrar</Button>
            <Typography color='secondary' variant='subtitle2'>Já tem conta? <Typography variant='button' color='secondary' sx={{cursor: 'pointer'}} onClick={handleNavigate}>Fazer Login</Typography></Typography>
          </>
        )}
      </Stack>
    </>
  )
}