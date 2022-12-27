import React from 'react';
import { BannerImage } from '../../components/BannerImage';
import { ContainerForm } from '../../components/ContainerForm';
import { Form } from '../../components/Form';
import { WrapperContent } from '../../components/WrapperComponent';

export function Login(){
  return (
    <WrapperContent>
      <BannerImage />
      <ContainerForm>
        <Form type='login'/>
      </ContainerForm>
    </WrapperContent>
  )
}

