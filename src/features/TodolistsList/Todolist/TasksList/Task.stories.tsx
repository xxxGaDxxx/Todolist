import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {Task} from './Task';
import {ReduxStoreProviderDecorator} from '../../../../stories/ReduxStoreProviderDecorator';
import {useAppSelector} from '../../../../common/hoks/UseAppSelector';


export default {
  title: 'TODOLIST/Task',
  component: Task,
  args: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const UsingReduxComponent = () => {
  const task = useAppSelector(state => state.tasks['todolistId2'][1])

  return <Task
    task={task}
    todolistId={'todolistId2'}
  />
}


const Template: ComponentStory<typeof UsingReduxComponent> = () => <UsingReduxComponent/>;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {}
