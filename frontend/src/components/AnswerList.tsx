import React, { FC } from 'react';
import styled from '@emotion/styled';
import { AnswerData } from '../QuestionsData';
import { Answer } from './Answer';
import { gray5 } from './Styles';

interface Props {
  data: AnswerData[];
}

const Ul1 = styled.ul`
  list-style: none;
  margin: 10px 0 0 0;
  padding: 0;
`;

const Li1 = styled.li`
  border-top: 1px solid ${gray5};
`;

export const AnswerList: FC<Props> = ({ data }) => {
  return (
    <Ul1>
      {data.map((answer) => (
        <Li1 key={answer.answerId}>
          <Answer data={answer} />
        </Li1>
      ))}
    </Ul1>
  );
};
