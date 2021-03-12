import React, { ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { UserIcon } from './Icons';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';

const Div = styled.div`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid ${gray5};
  box-shadow: 0 3px 7px 0 rgba(110, 112, 114, 0.21);
`;

const Link1 = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: ${gray1};
  text-decoration: none;
`;

const Input = styled.input`
  box-sizing: border-box;
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 8px 10px;
  border: 1px solid ${gray5};
  border-radius: 3px;
  color: ${gray2};
  background-color: white;
  width: 200px;
  height: 30px;
  :focus {
    outline-color: ${gray5};
  }
`;

const Link2 = styled.div`
  font-family: ${fontFamily};
  font-size: ${fontSize};
  padding: 5px 10px;
  background-color: transparent;
  color: ${gray2};
  text-decoration: none;
  cursor: pointer;
  span {
    margin-left: 10px;
  }
  :focus {
    outline-color: ${gray5};
  }
`;

export const Header = () => {
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.currentTarget.value);
  };

  return (
    <Div>
      <Link1>
        <Link to="/">Q & A</Link>
      </Link1>
      <Input type="text" placeholder="Search..." onChange={handleSearchInputChange} />
      <Link2>
        <Link to="/signin">
          <UserIcon />
          <span>Sign In</span>
        </Link>
      </Link2>
    </Div>
  );
};
