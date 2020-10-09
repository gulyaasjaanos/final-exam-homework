import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';

import Login from '../Login';

let container;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('matches snapeshot', async () => {
  const mockStore = configureStore([]);
  const mockedStore = mockStore({
  });
  mockedStore.dispatch = jest.fn();
  await act(async () => {
    render(
      <Provider store={mockedStore}>
        <Login />
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toMatchSnapshot();
});

