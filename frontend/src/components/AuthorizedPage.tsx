import React, { FC, Fragment } from 'react';
import { useAuth } from './Auth';
import { Page } from './Page';

export const AuthorizedPage: FC = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Fragment>{children}</Fragment>;
  } else {
    return <Page title="You do not have access to this page" />;
  }
};
