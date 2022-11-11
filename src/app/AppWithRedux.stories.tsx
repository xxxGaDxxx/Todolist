import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {App} from './App';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

export default {
  title: 'TODOLIST/AppWithRedux',
  component: App,
  argTypes: {},
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof App>;


const Template: ComponentStory<typeof App> = () => <App/>;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWithReduxStory.args = {};
