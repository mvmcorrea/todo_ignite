import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { TasksList } from '../../components/TasksList';

let tasks: {
  id: number;
  title: string;
  done: boolean;
}[] = [];

let mockedRemoveTask: jest.Mock;
let mockedToggleTaskDone: jest.Mock;

describe('MyTasksList', () => {

  beforeAll(() => {
    tasks = [
      {
        id: new Date().getTime(),
        title: 'Primeiro todo',
        done: false
      },
      {
        id: new Date().getTime() + 1,
        title: 'Segundo todo',
        done: false
      },
      {
        id: new Date().getTime() + 2,
        title: 'Terceiro todo',
        done: true
      },
    ];

    mockedRemoveTask = jest.fn();
    mockedToggleTaskDone = jest.fn();
  });

  it('should be able to render all tasks', () => {
    const { getByText } = render(<TasksList tasks={tasks} removeTask={mockedRemoveTask} toggleTaskDone={mockedToggleTaskDone} />)
    
    getByText('Primeiro todo');
    getByText('Segundo todo');
    getByText('Terceiro todo');
  });

  it('should be able to handle "removeTask" event', () => {
    const { getByTestId } = render(<TasksList tasks={tasks} removeTask={mockedRemoveTask} toggleTaskDone={mockedToggleTaskDone} />)
    const firstTaskTrashIcon = getByTestId('trash-0');

    fireEvent(firstTaskTrashIcon, 'press');

    expect(mockedRemoveTask).toHaveBeenCalledWith(tasks[0].id);
  });

  it('should be able to handle "toggleTaskDone" event', () => {    
    const { getByText } = render(<TasksList tasks={tasks} removeTask={mockedRemoveTask} toggleTaskDone={mockedToggleTaskDone} />)
    const secondTask = getByText('Segundo todo');

    fireEvent.press(secondTask);

    expect(mockedToggleTaskDone).toHaveBeenCalledWith(tasks[1].id);
  });
})