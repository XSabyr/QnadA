import React from 'react';
import styled from '@emotion/styled';

import { PrimaryButton } from './Styles';

const Div1 = styled.div`
  margin: 50px auto 20px auto;
  padding: 30px 20px;
  max-width: 600px;
`;

const Div2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const H2 = styled.h2`
  font-size: 15px;
  font-weight: bold;
  margin: 10px 0px 5px;
  text-align: center;
  text-transform: uppercase;
`;

export const HomePage = () => (
  <Div1>
    <Div2>
      <H2>Unanswered Questions</H2>
      <PrimaryButton>Ask a question</PrimaryButton>
    </Div2>
  </Div1>
);
