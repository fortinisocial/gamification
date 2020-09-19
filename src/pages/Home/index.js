import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;

  a {
    font-size: 18px;
    color: #323232;
    text-decoration: none;
    padding: 20px 0px;

    &:hover {
      color: #7acef6;
    }
  }
`;

const Options = styled.div`
  display: flex;
  height: max-content;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #f1f3f6;
  border-radius: 6px;
  padding: 24px;

  @media only screen and (max-width: 420px) {
    max-width: 95%;
  }

  h1 {
    margin-top: -64px;
    margin-bottom: 30px;
  }
`;

const Home = () => {
  return (
    <Container>
      <Options>
        <h1>Selecione o time:</h1>
        <Link to="/administracao-e-financas">Administração e Finanças</Link>
        <Link to="/gente-e-gestao">Gente e Gestão</Link>
        <Link to="/novos-negocios-e-mobilizacao-de-recursos">
          Novos Negócios e Mobilização de Recursos
        </Link>
      </Options>
    </Container>
  );
};

export default Home;
