import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '/JS/components/Header';
import Footer from '/JS/components/Footer';
import Home from '/JS/components/Home';
import Recursos from '/JS/components/Recursos';
import Suporte from '/JS/components/Suporte';
import Noticias from '/JS/components/Noticias';
import Eventos from '/JS/components/Eventos';
import Contato from '/JS/components/Contato';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/recursos" component={Recursos} />
        <Route path="/suporte" component={Suporte} />
        <Route path="/noticias" component={Noticias} />
        <Route path="/eventos" component={Eventos} />
        <Route path="/contato" component={Contato} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
