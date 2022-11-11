import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {EditableSpan} from './EditableSpan';


export default {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  argTypes: {
    callBack: {
      description: 'Clicked inside form'
    }
  },
} as ComponentMeta<typeof EditableSpan>;


const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
  title: 'qqe',
  callBack: action('onChange')
};
