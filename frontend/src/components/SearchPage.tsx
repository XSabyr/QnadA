import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Page } from './Page';
import { QuestionList } from './QuestionList';
import { searchQuestions, QuestionData } from '../QuestionsData';
import styled from '@emotion/styled';

const P1 = styled.p`
  font-size: 16px;
  font-style: italic;
  margin-top: 0px;
`;

export const SearchPage: FC<RouteComponentProps> = ({ location }) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);

  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get('criteria') || '';

  useEffect(() => {
    let cancelled = false;
    const doSearch = async (criteria: string) => {
      const foundResults = await searchQuestions(criteria);
      if (!cancelled) {
        setQuestions(foundResults);
      }
    };

    doSearch(search);

    return () => {
      cancelled = true;
    };
  }, [search]);

  return (
    <Page title="Search Result">
      {search && <P1>for "{search}""</P1>}
      <QuestionList data={questions} />
    </Page>
  );
};
