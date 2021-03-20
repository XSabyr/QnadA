import React, { useEffect, useState, FC } from 'react';
import styled from '@emotion/styled';
import { RouteComponentProps } from 'react-router-dom';

import { QuestionList } from './QuestionList';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { QuestionData } from '../QuestionsData';

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

const HomePage: FC<Props> = ({ history, questions, questionsLoading, getUnansweredQuestions }) => {
  useEffect(() => {
    if (questions === null) {
      getUnansweredQuestions();
    }
  }, [questions, getUnansweredQuestions]);

  const handleAskQuestionClick = () => {
    history.push('/ask');
  };

  return (
    <Page>
      <Div2>
        <PageTitle>Unanswered Questions</PageTitle>
        <PrimaryButton onClick={handleAskQuestionClick}>Ask a question</PrimaryButton>
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
