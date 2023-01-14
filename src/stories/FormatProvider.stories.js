import React from 'react';

import { FormatProvider } from '../components/FormatProvider';

export default {
  title: 'FormatProvider',
  component: FormatProvider,
  argTypes: {
    format: {
        options: ['date', 'date-time', 'date-to-now', 'number', 'number-round', 'none'],
        control: { type: 'select' },
    },
    ct: {
        options: ['col-td', 'col-th', 'small', 'p', 'none'],
        control: { type: 'select'},
    },
    pos: {
        options: ['start', 'center', 'end'],
        control: {type: 'radio'},
    },
  }
};

const Template = (args) => <FormatProvider {...args} />;

export const TestProvider = Template.bind({});
TestProvider.args = {
    value: 5321.25,
    suffix: "m" + String.fromCharCode(178),
}

