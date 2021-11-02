import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Switch, Route, } from 'react-router-dom'


import './index.css';
import App from './pages/BilletsPage';
import CreateBilletPage from "./pages/CreateBilletPage";
import Login from "./pages/auth/LoginPage";
import Register from "./pages/auth/RegisterPage";
import NavBar from "./components/navbar";


ReactDOM.render(

  <React.StrictMode>
    <div>
      <BrowserRouter>
        <NavBar />

        <main className="-mt-32">
          <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
            <Switch>
              <Route path="/" exact={true} name="Dashboard" component={App} />
              <Route path="/createBillet" name="Criar boleto" component={CreateBilletPage} />
              <Route path="/login" name="Login" component={Login} />
              <Route path="/register" name="Register" component={Register} />
            </Switch>
          </div>
        </main>
      </ BrowserRouter>
    </div >

  </React.StrictMode >,
  document.getElementById('root')
);

