import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Question } from './Question';

import { gray5, accent2 } from './Styles';
import { QuestionData } from '../QuestionsData';

interface Props {
  data: QuestionData[];
  renderItem?: (item: QuestionData) => JSX.Element;
}

const Ul = styled.ul`
  list-style: none;
  margin: 10px 0 0 0;
  padding: 0px 20px;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: 3px solid ${accent2};
  box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.16);
`;

const Li = styled.li`
  border-top: 1px solid ${gray5};
  :first-of-type {
    border-top: none;
  }
`;
export const QuestionList: FC<Props> = ({ data, renderItem }) => {
  return (
    <Ul>
      {data.map((question) => (
        <Li key={question.questionId}>
          {renderItem ? renderItem(question) : <Question data={question} />}
        </Li>
      ))}
    </Ul>
  );
};
