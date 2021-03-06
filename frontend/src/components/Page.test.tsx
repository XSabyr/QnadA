import React from 'react';
import { Page } from './Page';
import { render, cleanup } from '@testing-library/react';

test('When the Page componentis rendered, it should contain the correct title and content', () => {
  const { getByText } = render(
    <Page title="Title test">
      <span>Test content</span>
    </Page>,
  );

  const title = getByText('Title test');
  expect(title).not.toBeNull();

  const content = getByText('Test content');
  expect(content).not.toBeNull();
});

afterEach(cleanup);
