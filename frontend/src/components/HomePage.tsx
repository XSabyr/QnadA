import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { QuestionList } from './QuestionList';
import { Page } from './Page';
import { PageTitle } from './PageTitle';
import { getUnansweredQuestions, QuestionData } from '../QuestionsData';

import { PrimaryButton } from './Styles';

const Div2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DivQuestionLoading = styled.div`
  font-size: 16px;
  font-style: italic;
`;

export const HomePage = () => {
  const [questions, setQuestions] = useState<QuestionData[] | null>(null);
  const [questionsLoading, setQuestionsLoading] = useState(true);

  useEffect(() => {
    const doGetUnansweredQuestions = async () => {
      const unansweredQuestions = await getUnansweredQuestions();
      setQuestions(unansweredQuestions);
      setQuestionsLoading(false);
    };

    doGetUnansweredQuestions();
  }, []);

  const handleAskQuestionClick = () => {
    console.log('TODO - move to the ask page');
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

// const Div1 = styled.div`
//   margin: 50px auto 20px auto;
//   padding: 30px 20px;
//   max-width: 600px;
// `;

// const H2 = styled.h2`
//   font-size: 15px;
//   font-weight: bold;
//   margin: 10px 0px 5px;
//   text-align: center;
//   text-transform: uppercase;
// `;
