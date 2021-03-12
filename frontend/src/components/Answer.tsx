import React, { FC } from 'react';
import styled from '@emotion/styled';
import { AnswerData } from '../QuestionsData';
import { gray3 } from './Styles';

interface Props {
  data: AnswerData;
}

const Div1 = styled.div`
  padding: 10px 0px;
`;

const Div2 = styled.div`
  padding: 10px 0px;
  font-size: 13px;
`;

const Div3 = styled.div`
  font-size: 12px;
  font-style: italic;
  color: ${gray3};
`;

export const Answer: FC<Props> = ({ data }) => {
  return (
    <Div1>
      <Div2>{data.content}</Div2>
      <Div3>
        {`Answered by ${
          data.userName
        } on ${data.created.toLocaleDateString()} ${data.created.toLocaleTimeString()}`}
      </Div3>
    </Div1>
  );
};
