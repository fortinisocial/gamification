import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route
        path="/administracao-e-financas"
        exact
        render={() => <Dashboard teamName={'Administração e Finanças'} />}
      />
      <Route
        path="/gente-e-gestao"
        exact
        render={() => <Dashboard teamName={'Gente e Gestão'} />}
      />
      <Route
        path="/novos-negocios-e-mobilizacao-de-recursos"
        exact
        render={() => (
          <Dashboard teamName={'Novos Negócios e Mobilização de Recursos'} />
        )}
      />
      <Route
        path="/operacoes"
        exact
        render={() => <Dashboard teamName={'Operações'} />}
      />
      <Route
        path="/tecnologia-da-informacao"
        exact
        render={() => <Dashboard teamName={'Tecnologia da Informação'} />}
      />
    </Switch>
  );
};

export default Routes;
