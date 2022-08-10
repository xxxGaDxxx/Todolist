import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Task} from '../Task';
import {ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskType} from '../Todolist';


export default {
    title: 'TODOLIST/Task',
    component: Task,
    args: {},
    decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof Task>;


const UsingReduxComponent = () => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId2'][1])

    return <Task
        task={task}
        todolistId={'todolistId2'}
    />
}


const Template: ComponentStory<typeof UsingReduxComponent> = () => <UsingReduxComponent/>;

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {}


// TaskIsDoneStory.args = {
//     task: {
//         id: 'qwe',
//         title: 'JS',
//         isDone: true,
//     },
//
// };
//
// export const TaskIsNotDoneStory = Template.bind({});
//
// TaskIsNotDoneStory.args = {
//     task: {
//         id: 'ewq',
//         title: 'JS',
//         isDone: false,
//     },
//     todolistId: 'EWQ'
// };

