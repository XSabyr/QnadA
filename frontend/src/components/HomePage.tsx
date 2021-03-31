import React, { useState, useEffect, FC } from 'react';
import styled from '@emotion/styled';
import { RouteComponentProps } from 'react-router-dom';
import { useAuth } from './Auth';

import { QuestionList } from './QuestionList';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { getUnansweredQuestions, QuestionData } from '../QuestionsData';

import { PrimaryButton } from './Styles';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { getUnansweredQuestionsActionCreator, AppState } from '../reduxState/Store';

const Div2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DivQuestionLoading = styled.div`
  font-size: 16px;
  font-style: italic;
`;

interface Props extends RouteComponentProps {
  getUnansweredQuestions: () => Promise<void>;
  questions: QuestionData[] | null;
  questionsLoading: boolean;
}

export const HomePage: FC<RouteComponentProps> = ({ history }) => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      if (!cancelled) {
        setQuestions(unansweredQuestions);
        setQuestionsLoading(false);
      }
    };
    doGetUnansweredQuestions();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };

  const { isAuthenticated } = useAuth();

  return (
    <Page>
      <Div2>
        <PageTitle>Unanswered Questions</PageTitle>
        {isAuthenticated && (
          <PrimaryButton onClick={handleAskQuestionClick}>Ask a question</PrimaryButton>
        )}
      </Div2>
      {questionsLoading ? (
        <DivQuestionLoading>Loading...</DivQuestionLoading>
      ) : (
        <QuestionList data={questions || []} />
      )}
    </Page>
  );
};

const mapStateToProps = (store: AppState) => {
  return {
    questions: store.questions.unanswered,
    questionsLoading: store.questions.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getUnansweredQuestions: () => dispatch(getUnansweredQuestionsActionCreator()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
