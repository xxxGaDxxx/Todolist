import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AddItemForm} from '../components/AddItemForm';
import {action} from '@storybook/addon-actions';



export default {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  argTypes: {
    callBack:{
      description:'Clicked inside form'
    }
  },
} as ComponentMeta<typeof AddItemForm>;


const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
  callBack:action('Clicked inside form')
};
