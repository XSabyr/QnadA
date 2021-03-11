import React, { FC } from 'react';
import styled from '@emotion/styled';
import { PageTitle } from './PageTitle';

interface Props {
  title?: string;
}

const Div1 = styled.div`
  margin: 50px auto 20px auto;
  padding: 30px 20px;
  max-width: 600px;
`;

export const Page: FC<Props> = ({ title, children }) => (
  <Div1>
    {title && <PageTitle>{title}</PageTitle>}
    {children}
  </Div1>
);
