import React, { ChangeEvent, FC, useState, FormEvent } from 'react';
import styled from '@emotion/styled';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { UserIcon } from './Icons';
import { fontFamily, fontSize, gray1, gray2, gray5 } from './Styles';

import { useAuth } from './Auth';

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

const Div1 = styled.div`
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

const Div2 = styled.div`
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

export const Header: FC<RouteComponentProps> = ({ history, location }) => {
  const searchParams = new URLSearchParams(location.search);
  const criteria = searchParams.get('criteria') || '';

  const [search, setSearch] = useState(criteria);

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    history.push(`/search?criteria=${search}`);
  };

  const { user, isAuthenticated, loading } = useAuth();

  return (
    <Div>
      <Link to="/">
        <Div1>Q & A</Div1>
      </Link>
      <form onSubmit={handleSearchSubmit}>
        <Input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchInputChange}
        />
      </form>
      <Div2>
        {!loading &&
          (isAuthenticated ? (
            <div>
              <span>{user!.name}</span>
              <Link to={{ pathname: '/signout', state: { local: true } }}>
                <UserIcon />
                <span>Sign Out</span>
              </Link>
            </div>
          ) : (
            <Link to="/signin">
              <UserIcon />
              <span>Sign In</span>
            </Link>
          ))}
      </Div2>
    </Div>
  );
};

export const HeaderWithRouter = withRouter(Header);
