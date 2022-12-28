import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {User, Users} from '../typeStore';

const initialState: Users = [];

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNovoUsuario: (state, action: PayloadAction<User>) => {
      return [...state, action.payload];
  },
  atualizarUsuario: (state, action: PayloadAction<User>) => {
    const indexUser = state.findIndex(
      (user) => user.email === action.payload.email
      );

      if(indexUser === -1){
        return state;
      }

      const listaTemp = [...state];

      listaTemp[indexUser] = action.payload;
    
      return listaTemp;
    },
  },  
});

export const { addNovoUsuario, atualizarUsuario } = usersSlice.actions;

export const usersReducer = usersSlice.reducer