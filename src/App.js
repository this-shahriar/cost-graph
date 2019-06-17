import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Accounting from './components/Accounting'
import Ecommerce from './components/Ecommerce'

function App() {
  return (
    /*Router*/
    <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
      <Route render= {({location})=>(
                <Switch location={location}>
                  <Route path="/" component={Accounting} exact />
                  <Route path="/ecommerce" component={Ecommerce} exact />
                  />
                </Switch>
      )}/>
    </BrowserRouter>
  );
}

export default App;
