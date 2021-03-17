import React, { lazy, Suspense } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import { HeaderWithRouter as Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { fontFamily, fontSize, gray2 } from './components/Styles';

import { SearchPage } from './components/SearchPage';
import { SignInPage } from './components/SignInPage';
import { NotFoundPage } from './components/NotFoundPage';
import { QuestionPage } from './components/QuestionPage';

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

function App() {
  return (
    <BrowserRouter>
      <Div>
        <Header />
        <Switch>
          <Redirect from="/home" to="/" />
          <Route exact path="/" component={HomePage} />
          <Route path="/search" component={SearchPage} />
          <Route path="/ask">
            <Suspense fallback={<FallBackDiv>Loading...</FallBackDiv>}>
              <AskPage />
            </Suspense>
          </Route>
          <Route path="/signin" component={SignInPage} />
          <Route path="/questions/:questionId" component={QuestionPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Div>
    </BrowserRouter>
  );
}

export default App;
