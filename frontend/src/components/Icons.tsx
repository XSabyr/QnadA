import React from 'react';
import user from '../user.svg';
import styled from '@emotion/styled';

const UserImg = styled.img`
  width: 12px;
  opacity: 0.6;
`;

export const UserIcon = () => <UserImg src={user} alt="User" width="12px" />;
