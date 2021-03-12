import React, { FC, useState, useEffect, Fragment } from 'react';
import { Page } from './Page';
import { RouteComponentProps } from 'react-router-dom';
import { QuestionData, getQuestion } from '../QuestionsData';
import styled from '@emotion/styled';
import { gray3, gray6 } from './Styles';
import { AnswerList } from './AnswerList';

interface RouteParams {
  questionId: string;
}

const Div1 = styled.div`
  background-color: white;
  padding: 15px 20px 20px 20px;
  border-radius: 4px;
  border: 1px solid ${gray6};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

const Div2 = styled.div`
  font-size: 19px;
  font-weight: bold;
  margin: 10px 0px 5px;
`;

const P1 = styled.p`
  margin-top: 0px;
  background-color: white;
`;

const Div3 = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${gray3};
`;

export const QuestionPage: FC<RouteComponentProps<RouteParams>> = ({ match }) => {
  const [question, setQuestion] = useState<QuestionData | null>(null);

  useEffect(() => {
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      setQuestion(foundQuestion);
    };

    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      doGetQuestion(questionId);
    }
  }, [match.params.questionId]);

  return (
    <Page>
      <Div1>
        <Div2>{question === null ? '' : question.title}</Div2>
        {question !== null && (
          <Fragment>
            <P1>{question.content}</P1>
            <Div3>
              {`Asked by ${
                question.userName
              } on ${question.created.toLocaleDateString()} ${question.created.toLocaleTimeString()}`}
            </Div3>
            <AnswerList data={question.answers} />
          </Fragment>
        )}
      </Div1>
    </Page>
  );
};
