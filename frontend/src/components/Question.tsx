import React, { FC } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { QuestionData } from '../QuestionsData';
import { gray2, gray3 } from './Styles';

interface Props {
  data: QuestionData;
  showContent?: boolean;
}

const Div1 = styled.div`
  padding: 10px 0px;
`;

const Div2 = styled.div`
  padding: 10px 0px;
  font-size: 19px;
  text-decoration: none;
  color: ${gray2};
`;

const Div3 = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${gray3};
`;

const Div4 = styled.div`
  padding-bottom: 10px;
  font-size: 15px;
  color: ${gray2};
`;

export const Question: FC<Props> = ({ data, showContent = true }) => (
  <Div1>
    <Div2>
      <Link to={`/questions/${data.questionId}`}>{data.title}</Link>
    </Div2>
    {showContent && (
      <Div4>{data.content.length > 50 ? `${data.content.substring(0, 50)}...` : data.content}</Div4>
    )}
    <Div3>
      {`Asked by ${
        data.userName
      } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
    </Div3>
  </Div1>
);
