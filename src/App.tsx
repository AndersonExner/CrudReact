import React from 'react';
import { AppRoutes } from './AppRoutes';
import { GlobalStyle } from './config/GlobalStyles';


function App() {
  return (
    <React.Fragment>
      <GlobalStyle/>
      <AppRoutes />
    </React.Fragment>
  );
}

export default App;
