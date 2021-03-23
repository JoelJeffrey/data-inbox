import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from './../../app/store';
import DataInbox from './DataInbox';

describe('Data Inbox App', () => {
  it('Should render remove button', () => {
    render(
      <Provider store={store}>
        <DataInbox />
      </Provider>
    );
    expect(screen.getByTestId('remove')).toBeTruthy();
  });

  it('Should check the first item, and then remove it', () => {
    render(
      <Provider store={store}>
        <DataInbox />
      </Provider>
    );
    // check length of checkbox inputs that exist, should be 3 given mock Data
    expect(screen.getAllByTestId('dueDate').length === 3);
    const checkbox = screen.getAllByTestId('remove-checkbox')[0];
    
    // click the checkbox, and test it
    act(() => {
      fireEvent.click(checkbox);
    });
    expect(checkbox.checked).toEqual(true);
    
    // check to make sure the length is 2, showing we removed one from the list
    act(() => {
      fireEvent.click(screen.getByTestId('remove'));
    })
    expect(screen.getAllByTestId('dueDate').length === 2);
  });
})

