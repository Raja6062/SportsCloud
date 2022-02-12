import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RouterComponent from './App/Router';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function App() {
  return (
    <BrowserRouter>
      <RouterComponent />
    </BrowserRouter>
  );
}

export default App;
