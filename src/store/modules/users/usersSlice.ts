import { createSlice, createEntityAdapter} from "@reduxjs/toolkit";
import { RootState } from "../..";
import {User} from '../typeStore';


const usersAdapter = createEntityAdapter<User>({
  selectId: (state) => state.email,
});

export const {selectAll: buscarUsuario, selectById: buscarUsuarioEmail} = usersAdapter.getSelectors<RootState>((state) => state.users);

const usersSlice = createSlice({
  name: 'users',
  initialState: usersAdapter.getInitialState(),
  reducers: {
    addNovoUsuario: usersAdapter.addOne,
    atualizarUsuario: usersAdapter.updateOne
  }  
});

export const {addNovoUsuario, atualizarUsuario} = usersSlice.actions;

export const usersReducer = usersSlice.reducer