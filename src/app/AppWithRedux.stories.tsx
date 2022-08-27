import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AppWithRedux} from './AppWithRedux';
import {ReduxStoreProviderDecorator} from '../stories/ReduxStoreProviderDecorator';

export default {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  argTypes:{},
  decorators:[ ReduxStoreProviderDecorator],
} as ComponentMeta<
    typeof AppWithRedux>;



const Template: ComponentStory<typeof AppWithRedux> = () =><AppWithRedux/>;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWithReduxStory.args = {};
