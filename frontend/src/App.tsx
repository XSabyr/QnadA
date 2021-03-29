import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { HeaderWithRouter as Header } from './components/Header';
import HomePage from './components/HomePage';
import { fontFamily, fontSize, gray2 } from './components/Styles';

import { SearchPage } from './components/SearchPage';
import { SignInPage } from './components/SignInPage';
import { NotFoundPage } from './components/NotFoundPage';
import { QuestionPage } from './components/QuestionPage';

import { Provider } from 'react-redux';
import { configureStore } from './reduxState/Store';

import { SignOutPage } from './components/SignOutPage';
import { AuthProvider } from './components/Auth';

import { AuthorizedPage } from './components/AuthorizedPage';

const AskPage = lazy(() => import('./components/AskPage'));

const Div = styled.div`
  font-family: ${fontFamily};
  font-size: ${fontSize};
  color: ${gray2};
`;

const FallBackDiv = styled.div`
  margin-top: 100px;
  text-align: center;
`;

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Div>
            <Header />
            <Switch>
              <Redirect from="/home" to="/" />
              <Route exact path="/" component={HomePage} />
              <Route path="/search" component={SearchPage} />
              <Route path="/ask">
                <Suspense fallback={<FallBackDiv>Loading...</FallBackDiv>}>
                  <AuthorizedPage>
                    <AskPage />
                  </AuthorizedPage>
                </Suspense>
              </Route>
              <Route path="/signin" render={() => <SignInPage action={'signin'} />} />
              <Route
                path="/signin-callback"
                render={() => <SignInPage action={'signin-callback'} />}
              />
              <Route path="/signout" render={() => <SignOutPage action={'signout'} />} />
              <Route
                path="/signout-callback"
                render={() => <SignOutPage action={'signout-callback'} />}
              />
              <Route path="/questions/:questionId" component={QuestionPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Div>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
}

export default App;
