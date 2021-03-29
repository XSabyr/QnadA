import React, { FC, useState, useEffect, Fragment } from 'react';
import { Page } from './Page';
import { RouteComponentProps } from 'react-router-dom';
import {
  QuestionData,
  getQuestion,
  postAnswer,
  mapQuestionFromServer,
  QuestionDataFromServer,
} from '../QuestionsData';

import styled from '@emotion/styled';
import { gray3, gray6 } from './Styles';
import { AnswerList } from './AnswerList';
import { Form, required, minLength, Values } from './Form';
import { Field } from './Field';

import { HubConnectionBuilder, HubConnectionState, HubConnection } from '@aspnet/signalr';

import { useAuth } from './Auth';

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

const DivForForm = styled.div`
  margin-top: 20px;
`;

export const QuestionPage: FC<RouteComponentProps<RouteParams>> = ({ match }) => {
  const [question, setQuestion] = useState<QuestionData | null>(null);

  const setUpSignalRConnection = async (questionId: number) => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:44336/questionshub')
      .withAutomaticReconnect()
      .build();

    connection.on('Message', (message: string) => {
      console.log('Message', message);
    });

    connection.on('ReceiveQuestion', (question: QuestionDataFromServer) => {
      console.log('ReceiveQuestion', question);
      setQuestion(mapQuestionFromServer(question));
    });

    try {
      await connection.start();
    } catch (error) {
      console.log(error);
    }

    if (connection.state === HubConnectionState.Connected) {
      connection.invoke('SubscribeQuestion', questionId).catch((err: Error) => {
        return console.error(err.toString());
      });
    }

    return connection;
  };

  const cleanUpSignalRConnection = async (questionId: number, connection: HubConnection) => {
    if (connection.state === HubConnectionState.Connected) {
      try {
        await connection.invoke('UnsubscribeQuestion', questionId);
      } catch (err) {
        return console.error(err.toString());
      }
      connection.off('Message');
      connection.off('ReceiveQuestion');
      connection.stop();
    } else {
      connection.off('Message');
      connection.off('ReceiveQuestion');
      connection.stop();
    }
  };

  useEffect(() => {
    let cancelled = false;
    const doGetQuestion = async (questionId: number) => {
      const foundQuestion = await getQuestion(questionId);
      if (!cancelled) {
        setQuestion(foundQuestion);
      }
    };

    let connection: HubConnection;

    if (match.params.questionId) {
      const questionId = Number(match.params.questionId);
      doGetQuestion(questionId);
      setUpSignalRConnection(questionId).then((con) => {
        connection = con;
      });
    }

    return function cleanUp() {
      cancelled = true;
      if (match.params.questionId) {
        const questionId = Number(match.params.questionId);
        cleanUpSignalRConnection(questionId, connection);
      }
    };
  }, [match.params.questionId]);

  const handleSubmit = async (values: Values) => {
    const result = await postAnswer({
      questionId: question!.questionId,
      content: values.content,
      userName: 'Fred',
      created: new Date(),
    });
    return { success: result ? true : false };
  };

  const { isAuthenticated } = useAuth();

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
            {isAuthenticated && (
              <DivForForm>
                <Form
                  submitCaption="Submit your answer"
                  validationRules={{
                    content: [{ validator: required }, { validator: minLength, arg: 50 }],
                  }}
                  onSubmit={handleSubmit}
                  failureMessage="There was a problem with your answer"
                  successMessage="Your answer was successfully submitted">
                  <Field name="content" label="Your Answer" type="TextArea" />
                </Form>
              </DivForForm>
            )}
          </Fragment>
        )}
      </Div1>
    </Page>
  );
};
