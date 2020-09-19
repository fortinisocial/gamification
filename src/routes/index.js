import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import { teamsRoutes } from '../utils/trello';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      {Object.keys(teamsRoutes).map(team => (
        <Route
          key={team}
          path={`/${team}`}
          exact
          render={() => <Dashboard teamName={teamsRoutes[team]} />}
        />
      ))}
      {/* <Route
        path="/comunicacao-e-relacionamento"
        exact
        render={() => <Dashboard teamName={'Comunicação e Relacionamento'} />}
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
      /> */}
    </Switch>
  );
};

export default Routes;
