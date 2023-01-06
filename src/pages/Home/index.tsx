import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, unstable_useId } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputDefault, InputName } from '../../components/InputDefault';
import { ModalAttDel} from '../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {  Recado } from '../../store/modules/typeStore';
import { atualizarUsuario, buscarUsuarioEmail } from '../../store/modules/users/usersSlice';
import { v4 as uuid} from 'uuid';
import { adicionarNovoRecado, adicionarRecados, buscarRecados, limparRecados } from '../../store/modules/recados/recadosSlice';
import { clearUsuarioLogado } from '../../store/modules/userLogged/userLoggedSlice';
import styled from 'styled-components';
import { width } from '@mui/system';


export function Home(){

  const navigate =  useNavigate();

  //states variaveis
  const [description, setDescription] = useState('');
  const [detail, setDetail] = useState('');
  const [idSelec, setIdSelec] = useState('');
  const [modeModal, setModeModal] = useState<'edit' | 'delete'>('edit');
  const [openModal, setOpenModal] = useState(false)
  
  //informaçoes usuario e recados
  const userLogged = useAppSelector((state) => state.userLogged);
  const userRedux = useAppSelector((state) => buscarUsuarioEmail(state, userLogged.email)); //);
  const recadosRedux = useAppSelector(buscarRecados)
  //const [recadosRedux, setRecadosRedux] = useState(useAppSelector(buscarRecados))

  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if(!userLogged.email){
        navigate('/')
      }    
      
      if(userRedux){
        dispatch(adicionarRecados(userRedux.recados))
      }

    },
    [navigate, userLogged, userRedux, dispatch]
  );

  useEffect(
      () => {
        save()
      },
      [recadosRedux]
    );
  
  const mudarInput = (value:string, key:InputName) => {
    switch(key) {
      case 'description':
        setDescription(value);
      break;
      
      case 'detail':
        setDetail(value);
      break;

      default:
    }
  }

  const salvarRecado = () => {
    const novoRecado: Recado = {
      id: uuid(),
      description,
      detail 
    }

    dispatch(adicionarNovoRecado(novoRecado));
    limpaCampos();
  }

  const limpaCampos = () => {
    setDescription('')
    setDetail('')
  }

  const save = () => {
    dispatch(atualizarUsuario({id: userLogged.email, changes: {recados: recadosRedux} }))
  }

  const logOut = () => {
    dispatch(atualizarUsuario({id: userLogged.email, changes: {recados: recadosRedux} }))
    dispatch(clearUsuarioLogado());
    dispatch(limparRecados());

  }

  const editMessage = (id: string) => {
    setModeModal('edit');
    setIdSelec(id);
    setOpenModal(true);  
  }

  const deleteMessage = (id: string) => {
    setModeModal('delete');
    setIdSelec(id);
    setOpenModal(true); 
  }
    
  const handleCloseModal = () => { 
    setOpenModal(false);
  }

  //const imageBack = require('../../assets/image-bg.jpg')

  const imageBack = require('../../assets/image-bg4.jpg')

  const style : React.CSSProperties = {
    backgroundImage: `url(${imageBack})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  }


  return (   

    <Box sx={{ flexGrow: 1}}>
      <Box style={style}>
        <Grid container justifyContent={'space-around'} pt={5} padding={2}>
          <Grid md={6} xs={12}>
            <Typography variant='h4' color='primary'>
              Bem vindo {(userLogged?.name.toUpperCase())}, você possui {(recadosRedux.length)} recados.
            </Typography>
          </Grid>
          <Grid md={2} xs={12}>
            <Button variant='contained' color='primary' size='large' onClick={logOut}>Salvar e Sair </Button>
          </Grid>
        </Grid>  

        <Grid container justifyContent={'space-around'} alignItems={'center'} marginY={2} padding={2} >
          <Grid md={3} xs={12} mt={3}>
            <InputDefault type='text' label='Descrição' name='description' value={description} color='primary' handleChange={mudarInput} />
          </Grid>
          <Grid md={6} xs={12} mt={3}>
            <InputDefault type='text' label='Recado' name='detail' value={detail} color='primary' handleChange={mudarInput} />
          </Grid>
          <Grid md={2} xs={12} mt={3}>
            <Button variant='contained' color='primary' size='large' onClick={salvarRecado}>Salvar Recado</Button>
          </Grid>
        </Grid>
      
        <Divider color='#1976d2'/>
        <Divider color='#1976d2'/>
      </Box>
      <Grid container>
        <Grid xs={12}>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">

              <TableHead>
                <TableRow >
                  <TableCell width={'10%'} align="center">ID</TableCell>
                  <TableCell width={'20%'} align="center">Descrição</TableCell>
                  <TableCell width={'30%'}align="center">Detalhamento</TableCell>
                  <TableCell width={'20%'}align="center">Ações</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {recadosRedux.map((row, index) => 
                  <TableRow component="th" scope="row" key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.detail}</TableCell>
                    <TableCell align="center">
                      <Button color='success' variant='contained' sx={{margin: '0 15px'}} onClick={() => editMessage(row.id)}>Editar</Button>
                      <Button color='error' variant='contained' sx={{margin: '0 15px'}} onClick={() => deleteMessage(row.id)}>Apagar</Button>
                    </TableCell>
                  </TableRow>
                  )}
              </TableBody>

            </Table>
          </TableContainer>
    
        </Grid>
      </Grid>
      <ModalAttDel mode={modeModal} id={idSelec} open={openModal} handleClose={handleCloseModal}/>
    </Box>
  )
}  