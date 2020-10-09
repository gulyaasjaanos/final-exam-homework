import React from 'react';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import configureStore from 'redux-mock-store';
import { BrowserRouter,  Route } from 'react-router-dom';

import Items from '../Items';

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
        <BrowserRouter>
          <Route>
            <Items />
          </Route>
        </BrowserRouter>
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toMatchSnapshot();
});

