import React from 'react';
import styled from '@emotion/styled';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { fontFamily, fontSize, gray2 } from './components/Styles';

const Div = styled.div`
  font-family: ${fontFamily};
  font-size: ${fontSize};
  color: ${gray2};
`;

function App() {
  return (
    <Div>
      <Header />
      <HomePage />
    </Div>
  );
}

export default App;
